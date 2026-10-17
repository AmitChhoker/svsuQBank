/* ============================================================
   uploadedPapers.js — faculties + courses + subjects + storage
   ============================================================ */

const STORAGE_KEY = "svsu_uploaded_papers_v1";
const BACKEND_URL = "http://localhost:5000";

/* ============================================================
   FACULTIES
   ============================================================ */
export const FACULTIES = [
  { id: "sfet",  name: "Skill Faculty of Engineering & Technology",      short: "SFET"  },
  { id: "sfash", name: "Skill Faculty of Applied Science & Humanities",  short: "SFASH" },
  { id: "sfmsr", name: "Skill Faculty of Management Studies & Research", short: "SFMSR" },
  { id: "sfa",   name: "Skill Faculty of Agriculture",                   short: "SFA"   },
];

export const getFaculty = (id) =>
  FACULTIES.find((f) => f.id === id) || FACULTIES[0];

/* ============================================================
   SUBJECT ICONS
   ============================================================ */
export const SUBJECT_ICONS = [
  { test: /pharmacy|pharmaceutic/i, icon: "medical-heart" },
  { test: /nursing/i, icon: "nurse" },
  { test: /medical|lab(oratory)?/i, icon: "test-tube" },
  { test: /yoga|spiritual/i, icon: "brain" },
  { test: /japanese/i, icon: "japan" },
  { test: /german/i, icon: "germany" },
  { test: /french/i, icon: "france" },
  { test: /music|performing/i, icon: "music" },
  { test: /public (policy|services)/i, icon: "briefcase" },
  { test: /policy/i, icon: "briefcase" },
  { test: /agriculture|farming|horticulture/i, icon: "leaf" },
  { test: /hotel|hospitality/i, icon: "business" },
  { test: /office management/i, icon: "briefcase" },
  { test: /business|bba|management|mba|bpm/i, icon: "business" },
  { test: /commerce|b\.com|finance|banking/i, icon: "business" },
  { test: /airlines|airport/i, icon: "business" },
  { test: /physics/i, icon: "physics" },
  { test: /chemistry/i, icon: "chemistry" },
  { test: /mathematics|math/i, icon: "math" },
  { test: /biochemistry/i, icon: "test-tube" },
  { test: /microbiology/i, icon: "microscope" },
  { test: /hematology|blood banking/i, icon: "blood" },
  { test: /immunology|serology/i, icon: "shield" },
  { test: /molecular|diagnostic/i, icon: "dna-helix" },
  { test: /medicine|preventive/i, icon: "medical-heart" },
  { test: /python/i, icon: "python" },
  { test: /java(?!script)/i, icon: "java-coffee-cup-logo" },
  { test: /c\+\+|oops|object oriented/i, icon: "c-plus-plus" },
  { test: /programming in c|programming with c|c program/i, icon: "c-programming" },
  { test: /data structure/i, icon: "flow-chart" },
  { test: /algorithm/i, icon: "flow-chart" },
  { test: /machine learning/i, icon: "brain" },
  { test: /artificial intelligence|^ai\b|\bai\b/i, icon: "artificial-intelligence" },
  { test: /database|dbms/i, icon: "database" },
  { test: /network/i, icon: "network" },
  { test: /operating system/i, icon: "settings" },
  { test: /signal/i, icon: "sound-waves" },
  { test: /architecture|organisation|organization/i, icon: "cpu" },
  { test: /microprocessor/i, icon: "cpu" },
  { test: /digital electronic|digital logic/i, icon: "circuit" },
  { test: /electrical|beee/i, icon: "electrical" },
  { test: /software engineering/i, icon: "source-code" },
  { test: /web/i, icon: "internet" },
  { test: /mobile/i, icon: "smartphone-tablet" },
  { test: /cloud/i, icon: "cloud" },
  { test: /big data|data analytic/i, icon: "data-configuration" },
  { test: /iot|internet of things/i, icon: "internet-of-things" },
  { test: /security|crypto|hacking|forensic/i, icon: "security-shield" },
  { test: /computer fundamental/i, icon: "computer" },
  { test: /computer graphics/i, icon: "paint-palette" },
  { test: /information system/i, icon: "briefcase" },
  { test: /drawing/i, icon: "pencil" },
  { test: /communication/i, icon: "communication" },
  { test: /entrepreneurship/i, icon: "business" },
  { test: /environment/i, icon: "leaf" },
  { test: /human values|ethics|uhv/i, icon: "handshake" },
  { test: /project/i, icon: "clipboard" },
];

export const FALLBACK_ICON = "https://img.icons8.com/color/96/book.png";

export const getSubjectIcon = (name) => {
  const m = SUBJECT_ICONS.find((x) => x.test.test(name));
  return `https://img.icons8.com/color/96/${m ? m.icon : "book"}.png`;
};

/* ============================================================
   LOCAL STORAGE
   ============================================================ */
export const loadUploadedPapers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistPapers = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("[uploadedPapers] write failed:", err);
  }
  window.dispatchEvent(new CustomEvent("svsu:papersUpdated"));
};

export const saveUploadedPaper = (paper) => {
  const list = loadUploadedPapers();
  const withMeta = {
    ...paper,
    faculty: paper.faculty || "sfet",
    type: paper.type || "question",
    id: paper.id || `up_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    uploadedAt: paper.uploadedAt || Date.now(),
    source: paper.source || "local",
  };
  list.push(withMeta);
  persistPapers(list);
  return withMeta;
};

export const removeUploadedPaper = (id) => {
  const list = loadUploadedPapers().filter((p) => p.id !== id);
  persistPapers(list);
};

/* ============================================================
   DUPLICATE CHECK
   ============================================================ */
export const isUploadedAlready = ({
  faculty,
  courseId,
  courseName,
  semester,
  subject,
  year,
  type,
}) => {
  if (!subject || !year) return false;
  const list = loadUploadedPapers();
  const subj = subject.trim().toLowerCase();
  return list.some((p) => {
    const matchFaculty = !faculty || p.faculty === faculty;
    const matchCourse =
      (courseId && p.courseId === courseId) ||
      (courseName && p.courseName === courseName);
    const matchType = (p.type || "question") === (type || "question");
    return (
      matchFaculty &&
      matchCourse &&
      p.semester === semester &&
      (p.subject || "").toLowerCase() === subj &&
      String(p.year) === String(year) &&
      matchType
    );
  });
};

/* ============================================================
   BACKEND
   ============================================================ */
export const fetchPapersFromDrive = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/papers`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Backend error");
    return (data.papers || []).map(normalizeDrivePaper);
  } catch (err) {
    console.warn("[uploadedPapers] Drive fetch failed:", err.message);
    return [];
  }
};

const normalizeDrivePaper = (p) => {
  const courseName = p.course || "";
  const match = COURSE_OPTIONS.find(
    (c) => c.name === courseName || c.short === courseName
  );
  return {
    id: p.id,
    faculty: match?.faculty || p.faculty || "sfet",
    studentName: p.studentName || "",
    rollNo: p.rollNo || "",
    courseId: match?.id || "",
    courseName: match?.name || courseName,
    courseShort: match?.short || courseName,
    semester: p.semester || "",
    year: p.year || "",
    examType: p.examType || "",
    subject: p.subject || "",
    type: p.type || "question",
    fileName: p.fileName || "",
    fileUrl: p.fileUrl || "",
    downloadUrl: p.downloadUrl || "",
    uploadedAt: p.createdTime ? new Date(p.createdTime).getTime() : Date.now(),
    source: "drive",
  };
};

/* Auto-sync */
let driveSyncPromise = null;

const syncDriveToStorage = async () => {
  if (driveSyncPromise) return driveSyncPromise;
  driveSyncPromise = (async () => {
    const drivePapers = await fetchPapersFromDrive();
    if (!drivePapers.length) return;
    const local = loadUploadedPapers();
    const byId = new Map();
    local.forEach((p) => {
      const key = p.id || p.fileUrl;
      if (key) byId.set(key, p);
    });
    drivePapers.forEach((p) => {
      const key = p.id || p.fileUrl;
      if (key && !byId.has(key)) byId.set(key, p);
      else if (key) byId.set(key, { ...byId.get(key), ...p });
    });
    persistPapers([...byId.values()]);
  })();
  return driveSyncPromise;
};

export const refreshDrivePapers = async () => {
  driveSyncPromise = null;
  return syncDriveToStorage();
};

if (typeof window !== "undefined") {
  syncDriveToStorage();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      driveSyncPromise = null;
      syncDriveToStorage();
    }
  });
}

/* ============================================================
   NORMALIZE + MERGE
   ============================================================ */
const normalizeSubject = (s) => {
  if (Array.isArray(s.papers)) {
    return { name: s.name, papers: s.papers.map((p) => ({ ...p })) };
  }
  const papers = [];
  if (s.year || s.question || s.solution) {
    papers.push({
      year: s.year || "",
      question: s.question || "",
      solution: s.solution || "",
      questionUploader:
        s.questionUploader ||
        (s.uploadedBy ? { name: s.uploadedBy, roll: s.uploadedRoll } : null),
      solutionUploader: s.solutionUploader || null,
    });
  }
  return { name: s.name, papers };
};

export const mergeUploadedIntoCourses = (courses, faculty, uploadedOverride = null) => {
  const allUploaded = uploadedOverride || loadUploadedPapers();
  const uploaded = faculty
    ? allUploaded.filter((p) => (p.faculty || "sfet") === faculty)
    : allUploaded;

  const next = courses.map((c) => ({
    ...c,
    semesters: c.semesters.map((sem) => ({
      ...sem,
      subjects: sem.subjects.map(normalizeSubject),
    })),
  }));

  if (!uploaded.length) return next;

  const sorted = [...uploaded].sort(
    (a, b) => (a.uploadedAt || 0) - (b.uploadedAt || 0)
  );

  sorted.forEach((p) => {
    const course = next.find(
      (c) =>
        c.id === p.courseId ||
        c.short === p.courseShort ||
        c.name === p.courseName
    );
    if (!course) return;

    let sem = course.semesters.find(
      (s) => s.name.toLowerCase() === (p.semester || "").toLowerCase()
    );
    if (!sem && p.semester) {
      sem = { name: p.semester, subjects: [] };
      course.semesters.push(sem);
    }
    if (!sem) return;

    let subject = sem.subjects.find(
      (s) => (s.name || "").toLowerCase() === (p.subject || "").toLowerCase()
    );
    if (!subject) {
      subject = { name: p.subject, papers: [] };
      sem.subjects.push(subject);
    } else if (!Array.isArray(subject.papers)) {
      subject.papers = normalizeSubject(subject).papers;
    }

    const yearKey = String(p.year || "");
    let paper = subject.papers.find((pp) => String(pp.year || "") === yearKey);
    if (!paper) {
      paper = { year: p.year || "", question: "", solution: "" };
      subject.papers.push(paper);
    }

    const uploaderInfo = { name: p.studentName || "", roll: p.rollNo || "" };

    if (p.type === "solution") {
      if (paper.solution) return;
      paper.solution = p.fileUrl || "";
      paper.solutionUploader = uploaderInfo;
    } else {
      if (paper.question) return;
      paper.question = p.fileUrl || "";
      paper.questionUploader = uploaderInfo;
    }
  });

  next.forEach((c) =>
    c.semesters.forEach((sem) =>
      sem.subjects.forEach((s) => {
        if (Array.isArray(s.papers)) {
          s.papers.sort((a, b) =>
            String(b.year || "").localeCompare(String(a.year || ""))
          );
        }
      })
    )
  );

  return next;
};

/* ============================================================
   HELPERS
   ============================================================ */
export const countPapers = (course) =>
  course.semesters.reduce(
    (n, sem) =>
      n +
      sem.subjects.reduce(
        (m, s) =>
          m + (s.papers || []).filter((p) => p.question || p.solution).length,
        0
      ),
    0
  );

export const flattenAllSubjects = (courses) =>
  courses.flatMap((c) =>
    c.semesters.flatMap((sem) =>
      sem.subjects.map((s) => ({
        course: c,
        semester: sem.name,
        subject: s,
        years: (s.papers || []).map((p) => p.year).filter(Boolean),
      }))
    )
  );

export const getCoursesByFaculty = (faculty) =>
  COURSE_OPTIONS.filter((c) => c.faculty === faculty);

const sems = (n) =>
  Array.from({ length: n }, (_, i) => ({
    name: `Semester ${i + 1}`,
    subjects: [],
  }));

/* ============================================================
   ALL COURSES
   ============================================================ */
export const COURSE_OPTIONS = [
  /* ============================================================
     SFET — Engineering & Technology
     ============================================================ */
  { id: "btech-cse", name: "B.Tech Computer Science & Engineering", short: "B.Tech CSE", faculty: "sfet", accent: "indigo", image: "https://img.icons8.com/color/96/computer.png", semesters: [
    { name: "Semester 1", subjects: ["Applied Physics","Programming with C","BEEE","PC","Engineering Mathematics-I"] },
    { name: "Semester 2", subjects: ["Engineering Mathematics-II","Digital Electronics","Data Structure & Algorithm","Applied Chemistry","Foundation of Data Analytics"] },
    { name: "Semester 3", subjects: ["Discrete Mathematics","Computer Architecture & Organisation","Database Management System","Design & Analysis of Algorithms","Artificial Intelligence","Signal System"] },
    { name: "Semester 4", subjects: ["Operating System","OOPs using C++","Machine Learning","Computer Networks","Software Engineering","Universal Human Values & Ethics"] },
    ...sems(8).slice(4),
  ]},
  { id: "btech-ce", name: "B.Tech Computer Engineering", short: "B.Tech CE", faculty: "sfet", accent: "violet", image: "https://img.icons8.com/color/96/electronics.png", semesters: sems(8) },
  { id: "btech-cyber", name: "B.Tech Cyber Security", short: "B.Tech Cyber", faculty: "sfet", accent: "emerald", image: "https://img.icons8.com/color/96/cyber-security.png", semesters: [
    { name: "Semester 1", subjects: ["Engineering Mathematics-I","Programming with Python","Applied Physics","Basic Electrical Engineering","Communication Skills"] },
    { name: "Semester 2", subjects: ["Engineering Mathematics-II","Data Structures","Digital Logic Design","Object Oriented Programming","Environmental Studies"] },
    { name: "Semester 3", subjects: ["Computer Networks","Operating Systems","Cryptography & Network Security","Database Management Systems","Discrete Mathematics"] },
    { name: "Semester 4", subjects: ["Cyber Forensics","Ethical Hacking","Web Application Security","Design & Analysis of Algorithms","Software Engineering"] },
    ...sems(8).slice(4),
  ]},
  { id: "btech-elec-ev", name: "B.Tech Electrical Engineering (Hons.)", short: "B.Tech EE", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/electrical.png", semesters: sems(8) },
  { id: "btech-vlsi", name: "B.Tech Electronics Engineering (VLSI)", short: "B.Tech VLSI", faculty: "sfet", accent: "rose", image: "https://img.icons8.com/color/96/circuit.png", semesters: sems(8) },
  { id: "btech-smart-mfg", name: "B.Tech Mechanical and Smart Manufacturing", short: "B.Tech Smart Mfg", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/factory.png", semesters: sems(8) },
  { id: "diploma-ce", name: "Diploma in Computer Engineering", short: "Diploma CE", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/laptop.png", semesters: [
    { name: "Semester 1", subjects: ["Applied Mathematics-I","Applied Physics-I","Communication Skills-I","Computer Fundamentals","Engineering Drawing"] },
    { name: "Semester 2", subjects: ["Applied Mathematics-II","Applied Physics-II","Programming in C","Digital Electronics","Communication Skills-II"] },
    { name: "Semester 3", subjects: ["Data Structures using C","Object Oriented Programming","Database Management System","Computer Organisation","Web Development"] },
    { name: "Semester 4", subjects: ["Operating Systems","Computer Networks","Software Engineering","Java Programming","Microprocessors"] },
    { name: "Semester 5", subjects: ["Advanced Java","Python Programming","Mobile Application Development","Information Security"] },
    { name: "Semester 6", subjects: ["Cloud Computing","Big Data Analytics","Internet of Things","Entrepreneurship"] },
  ]},
  { id: "diploma-cse", name: "Diploma in Computer Science & Engineering", short: "Diploma CSE", faculty: "sfet", accent: "rose", image: "https://img.icons8.com/color/96/source-code.png", semesters: [
    { name: "Semester 1", subjects: ["Applied Mathematics-I","Applied Chemistry","Communication Skills","Computer Fundamentals","Basic Electronics"] },
    { name: "Semester 2", subjects: ["Applied Mathematics-II","Applied Physics","Programming in C","Digital Electronics","Environmental Studies"] },
    { name: "Semester 3", subjects: ["Data Structures","OOPs using C++","Database Management System","Computer Organisation","Operating Systems"] },
    { name: "Semester 4", subjects: ["Computer Networks","Java Programming","Web Technologies","Software Engineering","Python Programming"] },
    { name: "Semester 5", subjects: ["Mobile Application Development","Cloud Computing","Information Security","Advanced Java"] },
    { name: "Semester 6", subjects: ["Big Data Analytics","Internet of Things","Machine Learning","Entrepreneurship"] },
  ]},
  { id: "dip-mech", name: "Diploma in Mechanical Engineering", short: "Diploma Mech", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/gear.png", semesters: sems(6) },
  { id: "dip-civil", name: "Diploma in Civil Engineering", short: "Diploma Civil", faculty: "sfet", accent: "sky", image: "https://img.icons8.com/color/96/architecture.png", semesters: sems(6) },
  { id: "dip-elec", name: "Diploma in Electrical Engineering", short: "Diploma Electrical", faculty: "sfet", accent: "violet", image: "https://img.icons8.com/color/96/electrical.png", semesters: sems(6) },
  { id: "dip-ind-elec", name: "Diploma in Industrial Electronics", short: "Diploma Ind. Elec", faculty: "sfet", accent: "rose", image: "https://img.icons8.com/color/96/circuit.png", semesters: sems(6) },
  { id: "dvoc-draught-civil", name: "D.Voc. Draughtsmanship (Civil)", short: "D.Voc. Draughtsmanship", faculty: "sfet", accent: "sky", image: "https://img.icons8.com/color/96/architecture.png", semesters: sems(6) },
  { id: "dvoc-mech-mfg", name: "D.Voc. Mechanical Manufacturing", short: "D.Voc. Mech Mfg", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/gear.png", semesters: sems(6) },
  { id: "bvoc-robotics", name: "B.Voc. Robotics and Automation", short: "B.Voc. Robotics", faculty: "sfet", accent: "indigo", image: "https://img.icons8.com/color/96/robot-2.png", semesters: sems(6) },
  { id: "bvoc-mech-mfg", name: "B.Voc. Mechanical Engineering (Manf.)", short: "B.Voc. Mech Mfg", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/gear.png", semesters: sems(6) },
  { id: "bvoc-solar", name: "B.Voc. Solar Technology", short: "B.Voc. Solar", faculty: "sfet", accent: "amber", image: "https://img.icons8.com/color/96/solar-panel.png", semesters: sems(6) },
  { id: "bvoc-rac", name: "B.Voc. Refrigeration and Air Conditioning", short: "B.Voc. RAC", faculty: "sfet", accent: "sky", image: "https://img.icons8.com/color/96/snowflake.png", semesters: sems(6) },
  { id: "bvoc-mechatronics", name: "B.Voc. Mechatronics", short: "B.Voc. Mechatronics", faculty: "sfet", accent: "violet", image: "https://img.icons8.com/color/96/settings.png", semesters: sems(6) },
  { id: "bca", name: "Bachelor in Computer Applications (BCA)", short: "BCA", faculty: "sfet", accent: "sky", image: "https://img.icons8.com/color/96/graduation-cap.png", semesters: [
    { name: "Semester 1", subjects: ["Computer Fundamentals","Programming in C","Mathematics-I","Communication Skills","Digital Electronics"] },
    { name: "Semester 2", subjects: ["Data Structures","Object Oriented Programming with C++","Mathematics-II","Operating Systems","Environmental Studies"] },
    { name: "Semester 3", subjects: ["Database Management System","Java Programming","Computer Networks","Software Engineering","Web Technologies"] },
    { name: "Semester 4", subjects: ["Python Programming","Design & Analysis of Algorithms","Computer Graphics","Advanced Java","Management Information System"] },
    { name: "Semester 5", subjects: ["Cloud Computing","Mobile Application Development","Big Data Analytics","Internet of Things","Information Security"] },
    { name: "Semester 6", subjects: ["Machine Learning","Artificial Intelligence","Major Project","Entrepreneurship"] },
  ]},
  { id: "mca", name: "Master of Computer Applications (MCA)", short: "MCA", faculty: "sfet", accent: "sky", image: "https://img.icons8.com/color/96/graduation-cap.png", semesters: [
    { name: "Semester 1", subjects: ["Programming in C","Computer Organization","Discrete Mathematics","Database Management System","Communication Skills"] },
    { name: "Semester 2", subjects: ["Data Structures & Algorithms","Java Programming","Operating Systems","Computer Networks","Software Engineering"] },
    { name: "Semester 3", subjects: ["Web Technologies","Python Programming","Advanced DBMS","Machine Learning","Cloud Computing"] },
    { name: "Semester 4", subjects: ["Big Data Analytics","Artificial Intelligence","Mobile App Development","Major Project","Entrepreneurship"] },
  ]},
  { id: "mtech-robotics", name: "M.Tech Robotics and Automation", short: "M.Tech Robotics", faculty: "sfet", accent: "indigo", image: "https://img.icons8.com/color/96/robot-2.png", semesters: sems(4) },
  { id: "mtech-cse", name: "M.Tech Computer Science & Engineering", short: "M.Tech CSE", faculty: "sfet", accent: "emerald", image: "https://img.icons8.com/color/96/computer.png", semesters: sems(4) },

  /* ============================================================
     SFASH — Applied Science & Humanities
     ============================================================ */
  { id: "dpharm", name: "Diploma in Pharmacy (D.Pharm.)", short: "D.Pharm", faculty: "sfash", accent: "emerald", image: "https://img.icons8.com/color/96/medical-heart.png", semesters: sems(6) },
  { id: "bvoc-japanese", name: "B.Voc. Japanese Language", short: "B.Voc. Japanese", faculty: "sfash", accent: "rose", image: "https://img.icons8.com/color/96/japan.png", semesters: sems(6) },
  { id: "bvoc-german", name: "B.Voc. German Language", short: "B.Voc. German", faculty: "sfash", accent: "amber", image: "https://img.icons8.com/color/96/germany.png", semesters: sems(6) },
  { id: "bvoc-french", name: "B.Voc. French Language", short: "B.Voc. French", faculty: "sfash", accent: "sky", image: "https://img.icons8.com/color/96/france.png", semesters: sems(6) },
  { id: "bvoc-public-services", name: "B.Voc. Public Services", short: "B.Voc. Public Services", faculty: "sfash", accent: "indigo", image: "https://img.icons8.com/color/96/briefcase.png", semesters: sems(6) },
  { id: "bpa-music", name: "Bachelor of Performing Arts (Music)", short: "BPA Music", faculty: "sfash", accent: "violet", image: "https://img.icons8.com/color/96/musical-notes.png", semesters: sems(6) },
  { id: "bmls", name: "Bachelor of Medical Laboratory Sciences (B.MLS)", short: "B.MLS", faculty: "sfash", accent: "rose", image: "https://img.icons8.com/color/96/test-tube.png", semesters: sems(6) },
  { id: "bsc-nursing", name: "B.Sc. Nursing", short: "B.Sc. Nursing", faculty: "sfash", accent: "emerald", image: "https://img.icons8.com/color/96/nurse.png", semesters: sems(8) },
  { id: "bsc-yoga", name: "B.Sc. Yoga & Spiritual Science", short: "B.Sc. Yoga", faculty: "sfash", accent: "violet", image: "https://img.icons8.com/color/96/brain.png", semesters: sems(6) },
  { id: "bsc-math-computing", name: "B.Sc. Mathematics & Computing (Hons.)", short: "B.Sc. Math & Computing", faculty: "sfash", accent: "sky", image: "https://img.icons8.com/color/96/math.png", semesters: sems(6) },
  { id: "pgd-public-policy", name: "PG Diploma Public Policy", short: "PGD Public Policy", faculty: "sfash", accent: "indigo", image: "https://img.icons8.com/color/96/briefcase.png", semesters: sems(2) },

  /* ============================================================
     SFMSR — Management Studies & Research
     ============================================================ */
  { id: "dvoc-office-mgmt", name: "D.Voc. Office Management", short: "D.Voc. Office Mgmt", faculty: "sfmsr", accent: "amber", image: "https://img.icons8.com/color/96/briefcase.png", semesters: sems(6) },
  { id: "bhm", name: "Bachelor of Hotel Management", short: "BHM", faculty: "sfmsr", accent: "rose", image: "https://img.icons8.com/color/96/business.png", semesters: sems(8) },
  { id: "bcom-hons", name: "B.Com. (Hons. / Hons. with Research)", short: "B.Com. (Hons.)", faculty: "sfmsr", accent: "emerald", image: "https://img.icons8.com/color/96/business.png", semesters: sems(6) },
  { id: "bba-airlines", name: "BBA (Airlines and Airport Management)", short: "BBA Airlines", faculty: "sfmsr", accent: "sky", image: "https://img.icons8.com/color/96/business.png", semesters: sems(6) },
  { id: "bba-bpm", name: "BBA-BPM and Analytics (Hons. / Hons. with Research)", short: "BBA-BPM", faculty: "sfmsr", accent: "indigo", image: "https://img.icons8.com/color/96/business.png", semesters: sems(6) },
  { id: "bba-hons", name: "BBA Hons. / Hons. with Research", short: "BBA (Hons.)", faculty: "sfmsr", accent: "violet", image: "https://img.icons8.com/color/96/business.png", semesters: sems(6) },
  { id: "mvoc-mgmt", name: "M.Voc. Management (Banking & Finance)", short: "M.Voc. Mgmt", faculty: "sfmsr", accent: "amber", image: "https://img.icons8.com/color/96/business.png", semesters: sems(4) },
  { id: "mba", name: "Master of Business Administration (MBA)", short: "MBA", faculty: "sfmsr", accent: "emerald", image: "https://img.icons8.com/color/96/graduation-cap.png", semesters: sems(4) },

  /* ============================================================
     SFA — Agriculture
     ============================================================ */
  { id: "dvoc-horticulture", name: "D.Voc. Horticulture", short: "D.Voc. Horticulture", faculty: "sfa", accent: "emerald", image: "https://img.icons8.com/color/96/leaf.png", semesters: sems(6) },
  { id: "bvoc-agriculture", name: "B.Voc. Agriculture", short: "B.Voc. Agriculture", faculty: "sfa", accent: "amber", image: "https://img.icons8.com/color/96/leaf.png", semesters: sems(6) },
  { id: "bsc-agriculture", name: "B.Sc. (Hons.) Agriculture", short: "B.Sc. Agriculture", faculty: "sfa", accent: "emerald", image: "https://img.icons8.com/color/96/leaf.png", semesters: sems(8) },
  { id: "mvoc-agriculture", name: "M.Voc. Agriculture", short: "M.Voc. Agriculture", faculty: "sfa", accent: "violet", image: "https://img.icons8.com/color/96/leaf.png", semesters: sems(4) },
];

/* ============================================================
   OPTIONS
   ============================================================ */
export const getSubjectsForCourseSem = (courseId, semesterName) => {
  const course = COURSE_OPTIONS.find((c) => c.id === courseId);
  if (!course) return [];
  const sem = course.semesters.find((s) => s.name === semesterName);
  return sem ? sem.subjects : [];
};

export const YEAR_OPTIONS = ["2022", "2023", "2024", "2025", "2026"];
export const EXAM_TYPES = ["Sessional-I", "Sessional-II", "End Sem"];
export const PAPER_TYPES = [
  { id: "question", label: "Question Paper", icon: "fa-file-circle-question" },
  { id: "solution", label: "Solution", icon: "fa-circle-check" },
];