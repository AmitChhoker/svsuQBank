

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Readable } = require("stream");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const FOLDER_ID = process.env.DRIVE_FOLDER_ID;
const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

console.log("\n=== SVSU Backend Startup (OAuth 2.0) ===");
console.log("Port:", PORT);
console.log("Drive folder ID:", FOLDER_ID || "❌ MISSING");
console.log("Client ID:", CLIENT_ID ? "✅ set" : "❌ MISSING");
console.log("Client Secret:", CLIENT_SECRET ? "✅ set" : "❌ MISSING");
console.log("Refresh Token:", REFRESH_TOKEN ? "✅ set" : "❌ MISSING");
console.log("=========================================\n");

if (!FOLDER_ID || !CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error("❌ Missing env vars — exiting");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({ version: "v3", auth: oauth2Client });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") return cb(null, true);
    cb(new Error("Only PDF files allowed"));
  },
});

/* ============================================================
   POST /upload — now accepts `type` = "question" | "solution"
   ============================================================ */
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("\n→ POST /upload");
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }
    console.log("  File:", req.file.originalname, req.file.size, "bytes");

    const {
      studentName = "",
      rollNo = "",
      course = "",
      semester = "",
      year = "",
      examType = "",
      subject = "",
      type = "question",
      faculty = "sfet",   // ← add
    } = req.body;

    const clean = (s) =>
      String(s).replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

    const typeTag = type === "solution" ? "SOLUTION" : "QP";
    const newFileName = `${typeTag}_${clean(course)}_${clean(semester)}_${clean(year)}_${clean(subject)}_${Date.now()}.pdf`;

    const metaDescription = JSON.stringify({
      studentName, rollNo, course, semester, year, examType, subject, type,
      faculty,   // ← add
    });

    console.log("  → Uploading to Drive as:", newFileName);

    const created = await drive.files.create({
      requestBody: {
        name: newFileName,
        parents: [FOLDER_ID],
        description: metaDescription,
      },
      media: {
        mimeType: "application/pdf",
        body: Readable.from(req.file.buffer),
      },
      fields: "id, name, webViewLink, createdTime, size",
    });

    const fileId = created.data.id;
    console.log("  ✅ Uploaded, file ID:", fileId);

    try {
      await drive.permissions.create({
        fileId,
        requestBody: { role: "reader", type: "anyone" },
      });
      console.log("  ✅ Made public");
    } catch (permErr) {
      console.warn("  ⚠️ Could not make public:", permErr.message);
    }

    res.json({
      success: true,
      fileId,
      fileName: created.data.name,
      fileUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      downloadUrl: `https://drive.google.com/uc?id=${fileId}&export=download`,
      viewUrl: created.data.webViewLink,
      createdTime: created.data.createdTime,
      meta: { studentName, rollNo, course, semester, year, examType, subject, type },
    });
  } catch (err) {
    console.error("  ❌ Upload error:", err.message);
    if (err.errors) console.error("  Detail:", JSON.stringify(err.errors, null, 2));
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ============================================================
   GET /papers — returns type for each paper
   ============================================================ */
app.get("/papers", async (req, res) => {
  console.log("\n→ GET /papers");
  try {
    const list = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false and mimeType = 'application/pdf'`,
      fields: "files(id, name, description, createdTime, size)",
      orderBy: "createdTime desc",
      pageSize: 300,
    });

    const papers = (list.data.files || []).map((f) => {
      let meta = {};
      try { meta = JSON.parse(f.description || "{}"); } catch {}
      return {
        id: f.id,
        fileName: f.name,
        fileUrl: `https://drive.google.com/file/d/${f.id}/preview`,
        downloadUrl: `https://drive.google.com/uc?id=${f.id}&export=download`,
        createdTime: f.createdTime,
        size: f.size,
        studentName: meta.studentName || "",
        rollNo: meta.rollNo || "",
        faculty: meta.faculty || "sfet",      // ← ADDED
        course: meta.course || "",
        semester: meta.semester || "",
        year: meta.year || "",
        examType: meta.examType || "",
        subject: meta.subject || "",
        type: meta.type || "question",
      };
    });

    console.log(`  ✅ Returning ${papers.length} papers`);
    res.json({ success: true, count: papers.length, papers });
  } catch (err) {
    console.error("  ❌ List error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
/* ---------- Delete ---------- */
app.delete("/papers/:id", async (req, res) => {
  try {
    await drive.files.delete({ fileId: req.params.id });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ SVSU upload backend is running (OAuth 2.0)");
});

app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
  console.log(`   Test: http://localhost:${PORT}/papers\n`);
});