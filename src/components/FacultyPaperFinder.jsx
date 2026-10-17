import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";

import "../../footer.css";
import "../../sfet.css";
import "../../SFMSR.css";
import "../../sfa.css";
import "../../SFASH.css";

import Footer from "./footer";
import SocialMediaBar from "./SocialMediaBar";
import AIFloatingButton from "./AIFloatingButton";
import Header from "./Header";

import {
  COURSE_OPTIONS,
  getFaculty,
  getSubjectIcon,
  FALLBACK_ICON,
  mergeUploadedIntoCourses,
  countPapers,
  flattenAllSubjects,
} from "../utils/uploadedPapers";

/* ============================================================
   FACULTY MAP — bulletproof fallback
   Agar course me .faculty field missing ho to id se map karo
   ============================================================ */
const ID_TO_FACULTY = {
  /* SFET */
  "btech-cse": "sfet",
  "btech-ce": "sfet",
  "btech-cyber": "sfet",
  "btech-elec-ev": "sfet",
  "btech-vlsi": "sfet",
  "btech-smart-mfg": "sfet",
  "diploma-ce": "sfet",
  "diploma-cse": "sfet",
  "dip-mech": "sfet",
  "dip-civil": "sfet",
  "dip-elec": "sfet",
  "dip-ind-elec": "sfet",
  "dvoc-draught-civil": "sfet",
  "dvoc-mech-mfg": "sfet",
  "bvoc-robotics": "sfet",
  "bvoc-mech-mfg": "sfet",
  "bvoc-solar": "sfet",
  "bvoc-rac": "sfet",
  "bvoc-mechatronics": "sfet",
  bca: "sfet",
  mca: "sfet",
  "mtech-robotics": "sfet",
  "mtech-cse": "sfet",

  /* SFASH */
  dpharm: "sfash",
  "bvoc-japanese": "sfash",
  "bvoc-german": "sfash",
  "bvoc-french": "sfash",
  "bvoc-public-services": "sfash",
  "bpa-music": "sfash",
  bmls: "sfash",
  "bsc-nursing": "sfash",
  "bsc-yoga": "sfash",
  "bsc-math-computing": "sfash",
  "pgd-public-policy": "sfash",

  /* SFMSR */
  "dvoc-office-mgmt": "sfmsr",
  bhm: "sfmsr",
  "bcom-hons": "sfmsr",
  "bba-airlines": "sfmsr",
  "bba-bpm": "sfmsr",
  "bba-hons": "sfmsr",
  "mvoc-mgmt": "sfmsr",
  mba: "sfmsr",

  /* SFA */
  "dvoc-horticulture": "sfa",
  "bvoc-agriculture": "sfa",
  "bsc-agriculture": "sfa",
  "mvoc-agriculture": "sfa",
};

const getCourseFaculty = (course) => {
  if (course.faculty) return course.faculty;
  return ID_TO_FACULTY[course.id] || "sfet";
};

/* ============================================================
   STATIC PAPERS
   ============================================================ */
const STATIC_PAPERS = {
  "btech-cse": {
    "Semester 1": {
      "Applied Physics": { year: "2023", question: "https://drive.google.com/file/d/1HqiDpAz_6tC6K0OLN5FinIviY4aIacx6/preview" },
      "Programming with C": { year: "2023", question: "https://drive.google.com/file/d/1fv6JGA-WrvleGt6s0EM3aJnvKCjmbNos/preview" },
      BEEE: { year: "2023", question: "https://drive.google.com/file/d/1BusKUbBCMhe1HvbzrAMpI0VOjBkmlOWB/preview" },
      PC: { year: "2023", question: "https://drive.google.com/file/d/1QVfv8w2JSa2h6Ur3hskDPyhriqZIvil3/preview" },
      "Engineering Mathematics-I": { year: "2023", question: "https://drive.google.com/file/d/1JTO_5yFsZo9iq9Gp2mQPvcI59gzyGGzn/preview" },
    },
    "Semester 2": {
      "Engineering Mathematics-II": { year: "2024", question: "https://drive.google.com/file/d/1I88qYfkQcl7e9sWiJWqXA74ORDY2D8pM/preview" },
      "Digital Electronics": { year: "2024", question: "https://drive.google.com/file/d/1ZteZJLvqSrjRdDhRZDRpzmFeL_zHjt1R/preview" },
      "Data Structure & Algorithm": { year: "2024", question: "https://drive.google.com/file/d/1xK2O0H6_wCBqyp1D-cQvY8ckx_z7ejoK/preview" },
      "Applied Chemistry": { year: "2024", question: "https://drive.google.com/file/d/1_CnVYtcrbmHlZf0dYMTwJC_DXk4okwVC/preview" },
      "Foundation of Data Analytics": { year: "2024", question: "https://drive.google.com/file/d/1roguZ4oy7ZNkA-PKb7OGf-Xv5kJv_hd7/preview" },
    },
    "Semester 3": {
      "Discrete Mathematics": { year: "2025", question: "https://drive.google.com/file/d/1o6PD33awnQ115a2ie2VvMMVuU1qtxkoL/preview" },
      "Computer Architecture & Organisation": { year: "2025", question: "https://drive.google.com/file/d/1Coa5lKN61RJvb8w2ttdHGtj6ZlZ3wBFI/preview" },
      "Database Management System": { year: "2025", question: "https://drive.google.com/file/d/1p1Dqju2uijNXWL-D--rJmSiu2O6uRUcG/preview" },
      "Design & Analysis of Algorithms": { year: "2025", question: "https://drive.google.com/file/d/14FiMUwc8YORWvyd3C5NqelXtymzLSOh9/preview" },
      "Artificial Intelligence": { year: "2025", question: "https://drive.google.com/file/d/1pBG5WxnFAgCJgOp0qfzTIeVD3CwbZnRJ/preview" },
      "Signal System": { year: "2025", question: "https://drive.google.com/file/d/18u8uLSbMSDdqJ2-eyTyHZZCUkdDM_TFm/preview" },
    },
    "Semester 4": {
      "Operating System": { year: "2025", question: "https://drive.google.com/file/d/10pRzZGeg6ihF4Xgn23IFv6GA4ahfj9QY/preview" },
      "OOPs using C++": { year: "2025", question: "https://drive.google.com/file/d/1Lj9w8s4lXFQ4dRbe5dNkMp8DiAeoBwWv/preview" },
      "Machine Learning": { year: "2025", question: "https://drive.google.com/file/d/1AOrg3bhtcCgev_JE3FLt3IXxr8X-ceRM/preview" },
      "Computer Networks": { year: "2025", question: "https://drive.google.com/file/d/1Yz5FrQQQgdx5txQeMj74ixz-0kR09xQI/preview" },
      "Software Engineering": { year: "2025", question: "https://drive.google.com/file/d/1gUExcWM-5hvlOUaKO_G2dvKUBiQrc5mQ/preview" },
      "Universal Human Values & Ethics": { year: "2025", question: "https://drive.google.com/file/d/10NaByVJCzTG-m5mz8U5hRBJfNINgbnN8/preview" },
    },
  },
};

/* ---------- Build filtered BASE_COURSES (FIXED) ---------- */
const buildBaseCourses = (faculty) => {
  /* 1) Filter courses to ONLY this faculty */
  const facultyCourses = COURSE_OPTIONS.filter(
    (c) => getCourseFaculty(c) === faculty
  );

  /* 2) Map to display shape */
  return facultyCourses.map((c) => ({
    id: c.id,
    name: c.name,
    short: c.short,
    accent: c.accent || "indigo",
    category: c.category || faculty,
    image: c.image || "https://img.icons8.com/color/96/graduation-cap.png",
    semesters: c.semesters.map((sem) => {
      const statics = STATIC_PAPERS[c.id]?.[sem.name] || {};
      const set = new Set([...(sem.subjects || []), ...Object.keys(statics)]);
      return {
        name: sem.name,
        subjects: Array.from(set).map((subName) => {
          const s = statics[subName] || {};
          return {
            name: subName,
            year: s.year || "",
            question: s.question || "",
            solution: s.solution || "",
          };
        }),
      };
    }),
  }));
};

/* ============================================================
   QUESTION BANK LINKS
   ============================================================ */
const QUESTION_BANK_LINKS = {
  "Foundation of Blockchain": "https://drive.google.com/file/d/1zrdZnT_0fa5Pw-Q0NjbLxOBCR5L5h67Q/preview",
  "Technical Writing": "https://drive.google.com/file/d/1X3SCNiIZvjONqIB8tYGm690gITIRL5_l/preview",
  MFCS: "https://drive.google.com/file/d/1dMJ4OStfPRRk1jNJaSdUEOYtiH76dpzg/preview",
  "Java Programming": "https://drive.google.com/file/d/1dNVrrqt6RChg54TclaJ4qsskIGu7hPJd/preview",
  "EMP Skill": "https://drive.google.com/file/d/1Q9J6lCXNLJp6ARTBTfaonXnUncWflq1d/preview",
  IKS: "https://drive.google.com/file/d/1vu8W7s493prSmKfYpNbPdb0nrHcnaSSN/preview",
  IOT: "https://drive.google.com/file/d/1Jv0wY9Lk8LxgBxNFM_M4QQioZhe51Lsx/preview",
  DS: "https://drive.google.com/file/d/1A8LIjh7MlKachEsx_Ks29RERrPGURiAq/preview",
  DL: "https://drive.google.com/file/d/1NGK-DbwwPifzONsmvSSzDmu-Lw6wLMKy/preview",
  "Data encryption and compression": "https://drive.google.com/file/d/1XFSfgkbnJ4l5UntBoXwDpFzU_YgXeIk6/preview",
};

/* ============================================================
   PAPER VIEWER
   ============================================================ */
function PaperViewer({ paper, onClose }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paper) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [paper, onClose]);

  useEffect(() => {
    if (paper) setLoading(true);
  }, [paper]);

  if (!paper) return null;

  return createPortal(
    <div
      className="sfet-modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="sfet-modal">
        <header className="sfet-modal-head">
          <div className="sfet-modal-titles">
            <span className={`sfet-modal-kind ${paper.kind || "q"}`}>
              {paper.kind === "a" ? "Solution" : "Question Paper"}
            </span>
            <h3>{paper.title}</h3>
            {paper.subtitle ? <p>{paper.subtitle}</p> : null}
          </div>
          <div className="sfet-modal-actions">
            <a
              className="sfet-modal-ext"
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-arrow-up-right-from-square" />
              <span>Open in new tab</span>
            </a>
            <button type="button" className="sfet-modal-close" onClick={onClose}>
              <i className="fas fa-xmark" />
            </button>
          </div>
        </header>
        <div className="sfet-modal-body">
          {loading && (
            <div className="sfet-modal-loader">
              <span className="sfet-spinner" />
              <p>Loading paper…</p>
            </div>
          )}
          <iframe
            key={paper.url}
            src={paper.url}
            title={paper.title}
            className={loading ? "is-loading" : "is-ready"}
            onLoad={() => setLoading(false)}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ============================================================
   COURSE PICKER
   ============================================================ */
function CoursePicker({ courses, onPick }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
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
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.short.toLowerCase().includes(q)
    );
  }, [courses, query]);

  const handlePick = (id) => {
    onPick(id);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="sfet-course-picker" ref={wrapRef}>
      {!open && (
        <button
          type="button"
          className="sfet-course-trigger"
          onClick={() => {
            setOpen(true);
            setTimeout(() => inputRef.current?.focus(), 30);
          }}
        >
          <span className="sfet-course-trigger-ico">
            <i className="fas fa-graduation-cap" />
          </span>
          <span className="sfet-course-trigger-text">
            <span className="sfet-course-trigger-title">
              Select your course
            </span>
            <span className="sfet-course-trigger-sub">
              {courses.length} courses available · click to browse
            </span>
          </span>
          <i className="fas fa-chevron-down sfet-course-trigger-chev" />
        </button>
      )}

      {open && (
        <div className="sfet-course-dropdown">
          <div className="sfet-course-dropdown-search">
            <i className="fas fa-search" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search courses…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                className="sfet-course-dropdown-clear"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                <i className="fas fa-xmark" />
              </button>
            )}
            <button
              type="button"
              className="sfet-course-dropdown-close"
              onClick={() => setOpen(false)}
            >
              <i className="fas fa-xmark" />
            </button>
          </div>

          <div className="sfet-course-dropdown-list">
            {filtered.length ? (
              <ul>
                {filtered.map((c) => {
                  const papers = countPapers(c);
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        className={`sfet-course-dropdown-row sfet-accent-${c.accent}`}
                        onClick={() => handlePick(c.id)}
                      >
                        <span className="sfet-course-dropdown-logo">
                          <img
                            src={c.image}
                            alt=""
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_ICON;
                            }}
                          />
                        </span>
                        <span className="sfet-course-dropdown-body">
                          <span className="sfet-course-dropdown-name">
                            {c.name}
                          </span>
                          <span className="sfet-course-dropdown-meta">
                            {c.semesters.length} semesters · {papers} paper
                            {papers === 1 ? "" : "s"}
                          </span>
                        </span>
                        <i className="fas fa-arrow-right sfet-course-dropdown-arrow" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="sfet-course-dropdown-empty">
                <i className="fas fa-magnifying-glass" />
                <p>No courses match "{query}"</p>
              </div>
            )}
          </div>

          <div className="sfet-course-dropdown-foot">
            <span>
              <i className="fas fa-circle-info" /> Showing {filtered.length} of{" "}
              {courses.length} courses
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */
export default function FacultyPaperFinder({ faculty = "sfet" }) {
  const facultyInfo = getFaculty(faculty);

  /* ✅ Courses are filtered ONCE by faculty */
  const BASE_COURSES = useMemo(() => buildBaseCourses(faculty), [faculty]);

  const [courses, setCourses] = useState(() =>
    mergeUploadedIntoCourses(BASE_COURSES, faculty)
  );

  useEffect(() => {
    const refresh = () =>
      setCourses(mergeUploadedIntoCourses(BASE_COURSES, faculty));
    refresh();
    window.addEventListener("svsu:papersUpdated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("svsu:papersUpdated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [BASE_COURSES, faculty]);

  const [courseId, setCourseId] = useState(null);
  const [semesterIdx, setSemesterIdx] = useState(null);
  const [subjectIdx, setSubjectIdx] = useState(null);
  const [heroQuery, setHeroQuery] = useState("");
  const [qbQuery, setQbQuery] = useState("");
  const [qbLetter, setQbLetter] = useState("ALL");
  const [viewer, setViewer] = useState(null);

  const course = useMemo(
    () => courses.find((c) => c.id === courseId) || null,
    [courseId, courses]
  );
  const semester = course?.semesters?.[semesterIdx] || null;
  const subject = semester?.subjects?.[subjectIdx] || null;

  const allSubjects = useMemo(() => flattenAllSubjects(courses), [courses]);

  const heroResults = useMemo(() => {
    const q = heroQuery.toLowerCase().trim();
    if (!q) return [];
    return allSubjects
      .filter(
        (x) =>
          x.subject.name.toLowerCase().includes(q) ||
          x.course.name.toLowerCase().includes(q) ||
          x.semester.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [heroQuery, allSubjects]);

  const qbGroups = useMemo(() => {
    const groups = {};
    Object.keys(QUESTION_BANK_LINKS)
      .sort((a, b) => a.localeCompare(b))
      .forEach((title) => {
        const letter = title[0].toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push({ title, link: QUESTION_BANK_LINKS[title] });
      });
    return groups;
  }, []);

  const filteredQb = useMemo(() => {
    const q = qbQuery.toLowerCase().trim();
    const out = {};
    Object.entries(qbGroups).forEach(([letter, items]) => {
      if (qbLetter !== "ALL" && letter !== qbLetter) return;
      const f = items.filter((i) => i.title.toLowerCase().includes(q));
      if (f.length) out[letter] = f;
    });
    return out;
  }, [qbGroups, qbQuery, qbLetter]);

  const allLetters = useMemo(
    () => ["ALL", ...Object.keys(qbGroups).sort()],
    [qbGroups]
  );

  const closeViewer = useCallback(() => setViewer(null), []);
  const openPaper = useCallback((p) => p?.url && setViewer(p), []);

  const resetFlow = () => {
    setCourseId(null);
    setSemesterIdx(null);
    setSubjectIdx(null);
  };

  const currentStep =
    subjectIdx !== null ? 4 : semesterIdx !== null ? 3 : courseId ? 2 : 1;

  return (
    <>
      <Header />

      <main className="sfet-page">
        {/* HERO */}
        <section className="sfet-hero">
          <div className="sfet-hero-glow" aria-hidden="true" />
          <div className="sfet-hero-text">
            <span className="sfet-badge">
              <span className="sfet-dot" /> {facultyInfo.short} Question Bank
            </span>
            <h1 className="sfet-hero-title">
              Find your paper
              <br />
              <span className="sfet-gradient-text">in 4 easy steps.</span>
            </h1>
            <p className="sfet-hero-sub">
              Pick your course → semester → subject → open question or solution.
            </p>

            <div className="sfet-search-wrap">
              <i className="fas fa-search sfet-search-ico" />
              <input
                type="text"
                placeholder="Search any subject…"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
              />
              {heroQuery && heroResults.length > 0 && (
                <ul className="sfet-search-dropdown">
                  {heroResults.map((r, i) => (
                    <li key={`${r.course.id}-${r.semester}-${i}`}>
                      <button
                        type="button"
                        className="sfet-dd-row"
                        onClick={() => {
                          setCourseId(r.course.id);
                          const sIdx = r.course.semesters.findIndex(
                            (s) => s.name === r.semester
                          );
                          setSemesterIdx(sIdx);
                          const subIdx = r.course.semesters[
                            sIdx
                          ].subjects.findIndex(
                            (s) => s.name === r.subject.name
                          );
                          setSubjectIdx(subIdx);
                          setHeroQuery("");
                        }}
                      >
                        <span className="sfet-file-pill">
                          <i className="fas fa-file-pdf" />
                        </span>
                        <span className="sfet-dd-body">
                          <span className="sfet-dd-title">{r.subject.name}</span>
                          <span className="sfet-dd-meta">
                            {r.course.short} · {r.semester}
                          </span>
                        </span>
                        <i className="fas fa-arrow-right sfet-dd-arrow" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* PAGE TITLE */}
        <div className="sfet-page-title">
          <span className="sfet-page-title-eyebrow">
            <i className="fas fa-graduation-cap" /> {facultyInfo.name}
          </span>
          <h1 className="sfet-page-title-main">{facultyInfo.short}</h1>
          <p className="sfet-page-title-sub">Find your question paper</p>
        </div>

        {/* FINDER FLOW */}
        <section className="sfet-block">
          <div className="sfet-block-head">
            <div>
              <span className="sfet-tag">
                <i className="fas fa-compass" /> Paper Finder
              </span>
              <h2>Find your question paper</h2>
              <p>Follow the steps — papers only load when you choose.</p>
            </div>
          </div>

          <div className="sfet-steps">
            {[
              { n: 1, label: course ? course.short : "Select course", done: !!course },
              { n: 2, label: semester ? semester.name : "Select semester", done: !!semester, disabled: !course },
              { n: 3, label: subject ? subject.name : "Select subject", done: !!subject, disabled: !semester },
            ].map((s, i) => (
              <React.Fragment key={s.n}>
                <button
                  type="button"
                  className={`sfet-step-pill ${currentStep === s.n ? "active" : ""} ${s.done ? "done" : ""}`}
                  disabled={s.disabled}
                  onClick={() => {
                    if (s.n === 1) resetFlow();
                    if (s.n === 2 && course) setSemesterIdx(null);
                    if (s.n === 3 && course && semesterIdx !== null) setSubjectIdx(null);
                  }}
                >
                  <span className="sfet-step-num">
                    {s.done ? <i className="fas fa-check" /> : s.n}
                  </span>
                  <span className="sfet-step-label">{s.label}</span>
                </button>
                {i < 2 && <span className="sfet-step-line" aria-hidden="true" />}
              </React.Fragment>
            ))}
            <span className="sfet-step-line" aria-hidden="true" />
            <div className={`sfet-step-pill ${currentStep === 4 ? "active" : ""}`}>
              <span className="sfet-step-num">4</span>
              <span className="sfet-step-label">Open paper</span>
            </div>
          </div>

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="sfet-panel sfet-fade" key="step-1">
              <h3 className="sfet-panel-title">Choose a course</h3>
              <p className="sfet-course-hint">
                {facultyInfo.short} has {courses.length} courses · click to browse
              </p>
              <CoursePicker
                courses={courses}
                onPick={(id) => {
                  setCourseId(id);
                  setSemesterIdx(null);
                  setSubjectIdx(null);
                }}
              />
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && course && (
            <div className="sfet-panel sfet-fade" key="step-2">
              <div className="sfet-panel-head-row">
                <h3 className="sfet-panel-title">
                  <span className="sfet-pill-year">{course.short}</span>
                  Choose a semester
                </h3>
                <button type="button" className="sfet-back-btn" onClick={resetFlow}>
                  <i className="fas fa-arrow-left" /> Change course
                </button>
              </div>
              <div className="sfet-chip-row">
                {course.semesters.map((sem, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="sfet-chip sfet-chip-lg"
                    onClick={() => {
                      setSemesterIdx(idx);
                      setSubjectIdx(null);
                    }}
                  >
                    <span className="sfet-chip-main">{sem.name}</span>
                    <span className="sfet-chip-count">
                      {sem.subjects.length} subject
                      {sem.subjects.length === 1 ? "" : "s"}
                    </span>
                    <i className="fas fa-arrow-right sfet-chip-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && semester && (
            <div className="sfet-panel sfet-fade" key="step-3">
              <div className="sfet-panel-head-row">
                <h3 className="sfet-panel-title">
                  <span className="sfet-pill-year">{course.short}</span>
                  <span className="sfet-pill-year">{semester.name}</span>
                  Choose a subject
                </h3>
                <button
                  type="button"
                  className="sfet-back-btn"
                  onClick={() => {
                    setSemesterIdx(null);
                    setSubjectIdx(null);
                  }}
                >
                  <i className="fas fa-arrow-left" /> Change semester
                </button>
              </div>

              {semester.subjects.length === 0 && (
                <div className="sfet-empty-state sfet-empty-cta-wrap">
                  <i className="fas fa-cloud-arrow-up" />
                  <h3>No subjects yet for {semester.name}</h3>
                  <p>
                    Be the first to share a paper. Your subject will appear here
                    automatically once uploaded.
                  </p>
                  <Link to="/UploadQuestionPaper" className="sfet-empty-cta">
                    <i className="fas fa-cloud-arrow-up" /> Upload a paper
                  </Link>
                </div>
              )}

              {semester.subjects.length > 0 && (
                <div className="sfet-subject-grid">
                  {semester.subjects.map((s, idx) => {
                    const papers = Array.isArray(s.papers) ? s.papers : [];
                    const yearsWithQ = papers.filter((p) => p.question).length;
                    const yearsWithA = papers.filter((p) => p.solution).length;
                    const totalYears = papers.length;
                    const isUploaded = papers.some(
                      (p) => p.questionUploader || p.solutionUploader
                    );
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`sfet-subject-tile ${isUploaded ? "is-uploaded" : ""}`}
                        onClick={() => setSubjectIdx(idx)}
                      >
                        <div className="sfet-subject-top">
                          <span className="sfet-subject-icon">
                            <img
                              src={getSubjectIcon(s.name)}
                              alt=""
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = FALLBACK_ICON;
                              }}
                            />
                          </span>
                          <span className="sfet-subject-badges">
                            {yearsWithQ > 0 && (
                              <span className="sfet-badge-mini sfet-badge-q">
                                <i className="fas fa-circle-question" /> {yearsWithQ} Q
                              </span>
                            )}
                            {yearsWithA > 0 && (
                              <span className="sfet-badge-mini sfet-badge-a">
                                <i className="fas fa-circle-check" /> {yearsWithA} A
                              </span>
                            )}
                            {totalYears === 0 && (
                              <span className="sfet-badge-mini sfet-badge-soon">
                                Soon
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="sfet-subject-name">{s.name}</span>
                        {totalYears > 0 && (
                          <span className="sfet-subject-years">
                            {papers
                              .map((p) => p.year)
                              .filter(Boolean)
                              .sort((a, b) => String(b).localeCompare(String(a)))
                              .map((y, i) => (
                                <span key={`${y}-${i}`} className="sfet-year-chip">
                                  {y}
                                </span>
                              ))}
                          </span>
                        )}
                        <span className="sfet-subject-open">
                          Open <i className="fas fa-arrow-right" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && subject && (
            <div className="sfet-panel sfet-fade sfet-detail" key="step-4">
              <div className="sfet-panel-head-row">
                <h3 className="sfet-panel-title">
                  <span className="sfet-pill-year">{course.short}</span>
                  <span className="sfet-pill-year">{semester.name}</span>
                  {subject.name}
                </h3>
                <button
                  type="button"
                  className="sfet-back-btn"
                  onClick={() => setSubjectIdx(null)}
                >
                  <i className="fas fa-arrow-left" /> Back to subjects
                </button>
              </div>

              {(!subject.papers || subject.papers.length === 0) && (
                <div className="sfet-empty-state">
                  <i className="fas fa-hourglass-half" />
                  <h3>Material coming soon</h3>
                  <p>No papers have been uploaded for this subject yet.</p>
                </div>
              )}

              {subject.papers && subject.papers.length > 0 && (
                <div className="sfet-year-list">
                  {subject.papers
                    .slice()
                    .sort((a, b) =>
                      String(b.year || "").localeCompare(String(a.year || ""))
                    )
                    .map((p, idx) => (
                      <div key={p.year || idx} className="sfet-year-row">
                        <div className="sfet-year-row-head">
                          <span className="sfet-year-badge">
                            <i className="fas fa-calendar" /> {p.year || "Unknown"}
                          </span>
                        </div>
                        <div className="sfet-year-actions">
                          <button
                            type="button"
                            className={`sfet-option ${p.question ? "" : "disabled"}`}
                            onClick={() =>
                              p.question &&
                              openPaper({
                                url: p.question,
                                title: `${subject.name} — Question Paper`,
                                subtitle: `${course.short} · ${semester.name} · ${p.year}`,
                                kind: "q",
                              })
                            }
                            disabled={!p.question}
                          >
                            <span className="sfet-option-ico q">
                              <i className="fas fa-file-circle-question" />
                            </span>
                            <span className="sfet-option-text">
                              <span className="sfet-option-title">
                                Question Paper
                              </span>
                              <span className="sfet-option-sub">
                                {p.question ? `View · ${p.year}` : "Not uploaded yet"}
                              </span>
                              {p.questionUploader?.name && (
                                <span className="sfet-option-uploader q">
                                  <i className="fas fa-user" />{" "}
                                  {p.questionUploader.name}
                                  {p.questionUploader.roll
                                    ? ` · ${p.questionUploader.roll}`
                                    : ""}
                                </span>
                              )}
                            </span>
                            <i className="fas fa-arrow-up-right-from-square sfet-option-arrow" />
                          </button>

                          <button
                            type="button"
                            className={`sfet-option ${p.solution ? "" : "disabled"}`}
                            onClick={() =>
                              p.solution &&
                              openPaper({
                                url: p.solution,
                                title: `${subject.name} — Solution`,
                                subtitle: `${course.short} · ${semester.name} · ${p.year}`,
                                kind: "a",
                              })
                            }
                            disabled={!p.solution}
                          >
                            <span className="sfet-option-ico a">
                              <i className="fas fa-circle-check" />
                            </span>
                            <span className="sfet-option-text">
                              <span className="sfet-option-title">Solution</span>
                              <span className="sfet-option-sub">
                                {p.solution ? `View · ${p.year}` : "Not uploaded yet"}
                              </span>
                              {p.solutionUploader?.name && (
                                <span className="sfet-option-uploader a">
                                  <i className="fas fa-user" />{" "}
                                  {p.solutionUploader.name}
                                  {p.solutionUploader.roll
                                    ? ` · ${p.solutionUploader.roll}`
                                    : ""}
                                </span>
                              )}
                            </span>
                            <i className="fas fa-arrow-up-right-from-square sfet-option-arrow" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* QUESTION BANKS — only on SFET */}
        {faculty === "sfet" && (
          <section className="sfet-block">
            <div className="sfet-block-head">
              <div>
                <span className="sfet-tag">
                  <i className="fas fa-database" /> Question Banks
                </span>
                <h2>Question Banks</h2>
                <p>Curated material — search or filter by letter.</p>
              </div>
              <div className="sfet-mini-search">
                <i className="fas fa-search" />
                <input
                  type="text"
                  placeholder="Search question banks…"
                  value={qbQuery}
                  onChange={(e) => setQbQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="sfet-letter-filter">
              {allLetters.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`sfet-letter-btn ${qbLetter === l ? "active" : ""}`}
                  onClick={() => setQbLetter(l)}
                >
                  {l}
                </button>
              ))}
            </div>

            {Object.keys(filteredQb).length ? (
              <div className="sfet-qb-grid">
                {Object.entries(filteredQb).map(([letter, items]) => (
                  <div key={letter} className="sfet-qb-group">
                    <div className="sfet-qb-letter">{letter}</div>
                    <ul className="sfet-qb-list">
                      {items.map(({ title, link }) => (
                        <li key={title}>
                          <button
                            type="button"
                            className="sfet-qb-row"
                            onClick={() =>
                              openPaper({
                                url: link,
                                title,
                                subtitle: "Question Bank",
                                kind: "q",
                              })
                            }
                          >
                            <span className="sfet-qb-dot" />
                            <span className="sfet-qb-title">{title}</span>
                            <i className="fas fa-arrow-up-right-from-square sfet-qb-arrow" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sfet-empty-state">
                <i className="fas fa-magnifying-glass" />
                <h3>No question banks found</h3>
                <p>Try a different letter or clear the search.</p>
              </div>
            )}
          </section>
        )}
      </main>

      <SocialMediaBar />
      <AIFloatingButton />
      <Footer />

      <PaperViewer paper={viewer} onClose={closeViewer} />
    </>
  );
}