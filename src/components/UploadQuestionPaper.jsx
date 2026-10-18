import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Header from "./Header";
import "./UploadQuestionPaper.css";
import {
  FACULTIES,
  getCoursesByFaculty,
  YEAR_OPTIONS,
  EXAM_TYPES,
  PAPER_TYPES,
  getSubjectsForCourseSem,
  isUploadedAlready,
  saveUploadedPaper,
} from "../utils/uploadedPapers";

const BACKEND_URL = "https://qbankbackend.onrender.com";

/* ============================================================
   SUBJECT COMBOBOX
   ============================================================ */
function SubjectCombobox({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((s) => s.toLowerCase().includes(q));
  }, [query, options]);

  const exactMatch = options.some(
    (s) => s.toLowerCase() === query.trim().toLowerCase()
  );

  const commit = (val) => {
    onChange(val);
    setQuery(val);
    setOpen(false);
  };

  return (
    <div className="subject-combo" ref={wrapRef}>
      <div className="subject-combo-input-wrap">
        <i className="fas fa-book subject-combo-ico" />
        <input
          ref={inputRef}
          type="text"
          className="subject-combo-input"
          placeholder={
            options.length
              ? "Search or type subject…"
              : "Type subject name"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
          spellCheck="false"
          required
        />
        <button
          type="button"
          className={`subject-combo-chev ${open ? "open" : ""}`}
          onClick={() => {
            setOpen((v) => !v);
            inputRef.current?.focus();
          }}
        >
          <i className="fas fa-chevron-down" />
        </button>
      </div>

      {open && (
        <div className="subject-combo-panel">
          <div className="subject-combo-panel-head">
            {filtered.length ? `Suggestions (${filtered.length})` : "Type any subject name"}
          </div>
          <ul className="subject-combo-list">
            {filtered.map((s) => (
              <li key={s}>
                <button type="button" className="subject-combo-row" onClick={() => commit(s)}>
                  <span className="subject-combo-dot" />
                  <span>{s}</span>
                  {s === value && <i className="fas fa-check subject-combo-check" />}
                </button>
              </li>
            ))}
            {query.trim() && !exactMatch && (
              <li className="subject-combo-custom">
                <button type="button" className="subject-combo-row custom" onClick={() => commit(query.trim())}>
                  <span className="subject-combo-dot custom" />
                  <span>Use custom: <strong>"{query.trim()}"</strong></span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function UploadQuestionPaper() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [faculty, setFaculty] = useState("sfet");
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [paperType, setPaperType] = useState("question");
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [successPaper, setSuccessPaper] = useState(null);

  const facultyCourses = useMemo(() => getCoursesByFaculty(faculty), [faculty]);
  const selectedCourse = useMemo(() => facultyCourses.find((c) => c.id === courseId), [courseId, facultyCourses]);
  const subjectOptions = useMemo(() => courseId && semester ? getSubjectsForCourseSem(courseId, semester) : [], [courseId, semester]);

  /* ---------- File Pick (Updated for Mobile) ---------- */
  const handleFileChange = (file) => {
    if (!file) return;
    
    // Check file type (relaxed for some mobile browsers)
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return alert("Only PDF files are allowed.");
    }
    
    // INCREASED LIMIT TO 15MB for mobile uploads
    if (file.size > 15 * 1024 * 1024) {
      return alert("File too large. Max 15 MB.");
    }
    
    setPdfFile(file);
    setFileName(file.name);
  };

  const onInputChange = (e) => handleFileChange(e.target.files?.[0]);
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files?.[0]);
  };

  const resetForm = () => {
    setStudentName(""); setRollNo(""); setFaculty("sfet"); setCourseId("");
    setSemester(""); setYear(""); setExamType(""); setSubject("");
    setPaperType("question"); setPdfFile(null); setFileName("");
    setStatus("idle"); setStatusMsg(""); setSuccessPaper(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) return alert("Please attach a PDF file.");
    if (!selectedCourse) return alert("Please select a course.");
    if (!semester) return alert("Please select a semester.");
    if (!subject.trim()) return alert("Please choose or type a subject.");

    const dup = isUploadedAlready({
      faculty, courseId: selectedCourse.id, courseName: selectedCourse.name,
      semester, subject: subject.trim(), year, type: paperType,
    });

    if (dup) {
      setStatus("error");
      setStatusMsg(`This ${paperType} for "${subject.trim()}" (${year}, ${semester}) is already uploaded.`);
      return;
    }

    setStatus("uploading");
    setStatusMsg("Uploading to Google Drive…");

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("studentName", studentName);
    formData.append("rollNo", rollNo);
    formData.append("faculty", faculty);
    formData.append("course", selectedCourse.name);
    formData.append("semester", semester);
    formData.append("year", year);
    formData.append("examType", examType);
    formData.append("subject", subject.trim());
    formData.append("type", paperType);

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Upload failed");

      const paper = {
        id: data.fileId, studentName, rollNo, faculty,
        courseId: selectedCourse.id, courseName: selectedCourse.name,
        courseShort: selectedCourse.short, semester, year, examType,
        subject: subject.trim(), type: paperType, fileName,
        fileUrl: data.fileUrl, downloadUrl: data.downloadUrl,
        uploadedAt: Date.now(), source: "drive",
      };

      saveUploadedPaper(paper);
      setSuccessPaper(paper);
      setStatus("success");
      setStatusMsg("Uploaded successfully!");
    } catch (err) {
      let friendly = "Upload failed.";
      const msg = err?.message || "";
      if (msg.includes("Failed to fetch")) friendly = "Cannot reach backend. Server might be waking up (wait 50s) or network issue.";
      else if (msg) friendly = msg;
      setStatus("error");
      setStatusMsg(friendly);
    }
  };

  return (
    <>
      <Header />
      <main className="upload-page">
        {/* HERO */}
        <section className="upload-hero">
          <div className="upload-hero-text">
            <span className="upload-badge">
              <span className="upload-dot" /> Contribute a paper
            </span>
            <h1 className="upload-title">
              Upload a paper,<br />
              <span className="upload-gradient-text">help every SVSU student.</span>
            </h1>
            <p className="upload-sub">
              Add a previous year paper or answer key. It saves to Google Drive.
            </p>
            <div className="upload-hero-cta">
              <Link to="/" className="upload-cta-primary">
                <i className="fas fa-book-open" /> Browse papers
              </Link>
            </div>
          </div>
          <div className="upload-hero-art">
            <div className="upload-art-glow" />
            <div className="upload-art-card">
              <i className="fas fa-cloud-arrow-up" />
              <span>PDF · Max 15MB</span>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="upload-grid">
          <div className="upload-card">
            <header className="upload-card-head">
              <h2>Paper details</h2>
              <p>Fill in every field.</p>
            </header>

            <form className="upload-form" onSubmit={handleSubmit}>
              {/* Student Details */}
              <div className="upload-section">
                <div className="upload-section-head">
                  <span className="upload-step-num">1</span>
                  <h3>Your details</h3>
                </div>
                <div className="upload-row">
                  <label className="upload-field">
                    <span>Full name</span>
                    <input type="text" placeholder="e.g. Aarav Sharma" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                  </label>
                  <label className="upload-field">
                    <span>Roll number</span>
                    <input type="text" placeholder="e.g. 2210100001" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
                  </label>
                </div>
              </div>

              {/* Paper Type */}
              <div className="upload-section">
                <div className="upload-section-head">
                  <span className="upload-step-num">2</span>
                  <h3>What are you uploading?</h3>
                </div>
                <div className="upload-type-toggle">
                  {PAPER_TYPES.map((t) => (
                    <button key={t.id} type="button" className={`upload-type-btn ${paperType === t.id ? "active" : ""}`} onClick={() => setPaperType(t.id)}>
                      <i className={`fas ${t.icon}`} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Details */}
              <div className="upload-section">
                <div className="upload-section-head">
                  <span className="upload-step-num">3</span>
                  <h3>Paper details</h3>
                </div>

                <label className="upload-field">
                  <span>Faculty</span>
                  <select value={faculty} onChange={(e) => { setFaculty(e.target.value); setCourseId(""); setSemester(""); setSubject(""); }} required>
                    {FACULTIES.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </label>

                <label className="upload-field">
                  <span>Course</span>
                  <select value={courseId} onChange={(e) => { setCourseId(e.target.value); setSemester(""); setSubject(""); }} required>
                    <option value="">Select course</option>
                    {facultyCourses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </label>

                <div className="upload-row">
                  <label className="upload-field">
                    <span>Semester</span>
                    <select value={semester} onChange={(e) => { setSemester(e.target.value); setSubject(""); }} disabled={!selectedCourse} required>
                      <option value="">{selectedCourse ? "Select semester" : "Pick course first"}</option>
                      {selectedCourse?.semesters.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </label>
                  <label className="upload-field">
                    <span>Year</span>
                    <select value={year} onChange={(e) => setYear(e.target.value)} required>
                      <option value="">Select year</option>
                      {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </label>
                  <label className="upload-field">
                    <span>Exam type</span>
                    <select value={examType} onChange={(e) => setExamType(e.target.value)} required>
                      <option value="">Select</option>
                      {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                </div>

                <div className="upload-field">
                  <span>Subject</span>
                  <SubjectCombobox options={subjectOptions} value={subject} onChange={setSubject} />
                </div>
              </div>

              {/* File Upload */}
              <div className="upload-section">
                <div className="upload-section-head">
                  <span className="upload-step-num">4</span>
                  <h3>Attach file</h3>
                </div>
                <label className={`upload-dropzone ${dragOver ? "is-over" : ""} ${pdfFile ? "has-file" : ""}`} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}>
                  <input type="file" accept=".pdf,application/pdf" onChange={onInputChange} hidden />
                  {pdfFile ? (
                    <div className="upload-dropzone-filled">
                      <span className="upload-dropzone-icon ok"><i className="fas fa-file-pdf" /></span>
                      <div className="upload-dropzone-meta">
                        <strong>{fileName}</strong>
                        <span>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB · Ready to upload</span>
                      </div>
                      <button type="button" className="upload-dropzone-remove" onClick={(e) => { e.preventDefault(); setPdfFile(null); setFileName(""); }}>
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-dropzone-empty">
                      <span className="upload-dropzone-icon"><i className="fas fa-cloud-arrow-up" /></span>
                      <strong>Drop your PDF here</strong>
                      <span>or tap to browse · PDF only · max 15 MB</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="upload-actions">
                <button type="button" className="upload-btn ghost" onClick={resetForm} disabled={status === "uploading"}>
                  <i className="fas fa-rotate-left" /> Reset
                </button>
                <button type="submit" className="upload-btn primary" disabled={status === "uploading"}>
                  {status === "uploading" ? <><i className="fas fa-spinner fa-spin" /> Uploading…</> : <><i className="fas fa-cloud-arrow-up" /> Upload</>}
                </button>
              </div>

              {status === "error" && (
                <div className="upload-error">
                  <i className="fas fa-triangle-exclamation" /> {statusMsg}
                </div>
              )}
            </form>
          </div>

          {/* Side Panel */}
          <aside className="upload-side">
            <div className="upload-tip">
              <span className="upload-tip-ico"><i className="fas fa-lightbulb" /></span>
              <div>
                <h4>Where it goes</h4>
                <p>Your paper is saved to Google Drive and appears in the papers section.</p>
              </div>
            </div>
            <div className="upload-tip">
              <span className="upload-tip-ico"><i className="fas fa-file-pdf" /></span>
              <div>
                <h4>PDF only</h4>
                <p>Make sure it's a clear scan. Max file size is 15 MB.</p>
              </div>
            </div>
            
            {status === "success" && successPaper && (
              <div className="upload-success">
                <span className="upload-success-ico"><i className="fas fa-circle-check" /></span>
                <div>
                  <h4>Uploaded!</h4>
                  <p><strong>{successPaper.subject}</strong> · {successPaper.semester}</p>
                  <div className="upload-success-actions">
                    <button type="button" className="upload-success-link" onClick={() => navigate("/")}>View in papers <i className="fas fa-arrow-right" /></button>
                    <button type="button" className="upload-success-btn" onClick={resetForm}>Upload another</button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>
      </main>
    </>
  );
}