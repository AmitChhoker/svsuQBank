import React, { useState } from "react";
import driveLinks from "../data/driveLinks";
// import "./ProgramCard.css";

const ProgramCard = ({ programs = [] }) => {
  const [activeCourseIndex, setActiveCourseIndex] = useState(null);
  const [activeSemesterIndex, setActiveSemesterIndex] = useState(null);
  const [activeYearIndex, setActiveYearIndex] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const activeProgram =
    activeCourseIndex !== null ? programs[activeCourseIndex] : null;

  const openLink = (url) => {
    if (!url) {
      alert("No file available");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* ---------------- Helpers ---------------- */
  const resetBelowCourse = () => {
    setActiveSemesterIndex(null);
    setActiveYearIndex(null);
    setSelectedSubject(null);
  };

  const resetBelowSemester = () => {
    setActiveYearIndex(null);
    setSelectedSubject(null);
  };

  const getSemester = () =>
    activeProgram?.semesters?.[activeSemesterIndex];

  const getYear = () =>
    getSemester()?.years?.[activeYearIndex];

  return (
    <div className="pc-wrap">
      {/* ================= PROGRAMS (DROPDOWN) ================= */}
      <div className="pc-step">
        <div className="pc-step-head">
          <span className="pc-step-num">1</span>
          <h4>Choose a course</h4>
        </div>

        <div className="pc-dropdown-wrap">
          <select
            className="pc-dropdown"
            value={activeCourseIndex !== null ? activeCourseIndex : ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setActiveCourseIndex(null);
              } else {
                setActiveCourseIndex(Number(val));
              }
              resetBelowCourse();
            }}
          >
            <option value="">-- Select a Course --</option>
            {programs.map((program, index) => (
              <option key={index} value={index}>
                {program.title}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down pc-dropdown-icon" />
        </div>
      </div>

      {/* ================= SEMESTER ================= */}
      {activeProgram && (
        <div className="pc-step pc-fade">
          <div className="pc-step-head">
            <span className="pc-step-num">2</span>
            <h4>Pick a semester</h4>
          </div>

          <div className="pc-chip-row">
            {activeProgram.semesters?.map((sem, index) => (
              <button
                key={index}
                type="button"
                className={`pc-chip ${
                  index === activeSemesterIndex ? "active" : ""
                }`}
                onClick={() => {
                  setActiveSemesterIndex(index);
                  resetBelowSemester();
                }}
              >
                {sem.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= YEAR ================= */}
      {activeSemesterIndex !== null && (
        <div className="pc-step pc-fade">
          <div className="pc-step-head">
            <span className="pc-step-num">3</span>
            <h4>Select year</h4>
          </div>

          <div className="pc-chip-row">
            {getSemester()?.years?.map((yearObj, index) => (
              <button
                key={index}
                type="button"
                className={`pc-chip pc-chip-year ${
                  index === activeYearIndex ? "active" : ""
                }`}
                onClick={() => {
                  setActiveYearIndex(index);
                  setSelectedSubject(null);
                }}
              >
                {yearObj.year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= SUBJECTS ================= */}
      {activeSemesterIndex !== null &&
        activeYearIndex !== null &&
        !selectedSubject && (
          <div className="pc-step pc-fade">
            <div className="pc-step-head">
              <span className="pc-step-num">4</span>
              <h4>
                Subjects in{" "}
                <span className="pc-pill">
                  {getYear()?.year || ""} · {getSemester()?.name || ""}
                </span>
              </h4>
            </div>

            <ul className="pc-subject-list">
              {getYear()?.subjects?.map((subject, subIndex) => {
                const hasLink = Boolean(driveLinks[subject]);
                return (
                  <li key={subIndex}>
                    {hasLink ? (
                      <button
                        type="button"
                        className="pc-subject"
                        onClick={() => setSelectedSubject(subject)}
                      >
                        <span className="pc-subject-ico">
                          <i className="fas fa-file-lines" />
                        </span>
                        <span className="pc-subject-name">{subject}</span>
                        <i className="fas fa-arrow-right pc-subject-arrow" />
                      </button>
                    ) : (
                      <div className="pc-subject disabled">
                        <span className="pc-subject-ico muted">
                          <i className="fas fa-ban" />
                        </span>
                        <span className="pc-subject-name">{subject}</span>
                        <span className="pc-subject-tag">No file</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

      {/* ================= SUBJECT DETAIL ================= */}
      {selectedSubject && (
        <div className="pc-step pc-fade pc-detail">
          <div className="pc-detail-head">
            <button
              type="button"
              className="pc-back"
              onClick={() => setSelectedSubject(null)}
            >
              <i className="fas fa-arrow-left" /> Back
            </button>
            <h3 className="pc-detail-title">{selectedSubject}</h3>
          </div>

          <div className="pc-options">
            <button
              type="button"
              className={`pc-option ${
                driveLinks[selectedSubject]?.questions ? "" : "disabled"
              }`}
              onClick={() =>
                driveLinks[selectedSubject]?.questions &&
                openLink(driveLinks[selectedSubject].questions)
              }
              disabled={!driveLinks[selectedSubject]?.questions}
            >
              <span className="pc-option-ico q">
                <i className="fas fa-circle-question" />
              </span>
              <span className="pc-option-text">
                <span className="pc-option-title">View Questions</span>
                <span className="pc-option-sub">
                  {driveLinks[selectedSubject]?.questions
                    ? "Tap to open in Drive"
                    : "Not available yet"}
                </span>
              </span>
              <i className="fas fa-arrow-up-right-from-square pc-option-arrow" />
            </button>

            <button
              type="button"
              className={`pc-option ${
                driveLinks[selectedSubject]?.answers ? "" : "disabled"
              }`}
              onClick={() =>
                driveLinks[selectedSubject]?.answers &&
                openLink(driveLinks[selectedSubject].answers)
              }
              disabled={!driveLinks[selectedSubject]?.answers}
            >
              <span className="pc-option-ico a">
                <i className="fas fa-circle-check" />
              </span>
              <span className="pc-option-text">
                <span className="pc-option-title">View Answers</span>
                <span className="pc-option-sub">
                  {driveLinks[selectedSubject]?.answers
                    ? "Tap to open in Drive"
                    : "Not available yet"}
                </span>
              </span>
              <i className="fas fa-arrow-up-right-from-square pc-option-arrow" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramCard;