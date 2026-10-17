import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./ThemeToggle.css";
import "./Header.css";

/* ============================================================
   Custom SVG Logo — "QP" monogram for Question Paper Repository
   ============================================================ */
function BrandMark() {
  return (
    <svg
      className="brand-mark-svg"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="brandShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#brandGrad)"
      />
      {/* Top shine */}
      <rect
        x="2"
        y="2"
        width="60"
        height="30"
        rx="16"
        fill="url(#brandShine)"
      />

      {/* Stylised "Q" + book */}
      <path
        d="M20 18h20a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H20a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z"
        fill="rgba(255,255,255,0.18)"
      />
      <path
        d="M23 24h18M23 30h18M23 36h11"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="42" cy="40" r="4.5" fill="#fff" />
      <path
        d="M45 43l5 5"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.body.classList.toggle("dark-mode", next);
  };

  const toggleDropdown = (name) =>
    setActiveDropdown((cur) => (cur === name ? null : name));

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* Close dropdowns / menu on outside click */
  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest(".navbar")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      {/* ================= TOP BAR ================= */}
      <div className="header-top">
        {/* Left: SVSU logo + brand */}
        <div className="header-brand">
          <a
            href="https://svsu.ac.in"
            target="_blank"
            rel="noreferrer"
            className="svsu-chip"
            aria-label="SVSU home"
          >
            <img
              src="https://svsu.ac.in/assets/imgs/svsu_logo.png"
              alt="SVSU"
            />
          </a>

          <Link to="/" className="brand" onClick={closeMenu}>
            <BrandMark />
            <div className="brand-text">
              <span className="brand-name">प्रश्न पत्र संग्रहालय</span>
              <span className="brand-sub">Question Paper Repository</span>
            </div>
          </Link>
        </div>

        {/* Right: Nav */}
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={closeMenu} className="nav-link">
                Home
              </Link>
            </li>

            <li
              className={`nav-item-dropdown ${
                activeDropdown === "faculty" ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="nav-link nav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("faculty");
                }}
              >
                Faculty
                <i className="fas fa-chevron-down chev" />
              </button>
              <div className="dropdown-panel">
                <ul>
                  <li>
                    <Link to="/" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-microchip" /></span>
                      <span>SFET</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/SFASH" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-flask" /></span>
                      <span>SFASH</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/SFMSR" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-chart-line" /></span>
                      <span>SFMSR</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/SFA" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-leaf" /></span>
                      <span>SFA</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link to="/FeederSchool" onClick={closeMenu} className="nav-link">
                Feeder School
              </Link>
            </li>

            <li
              className={`nav-item-dropdown ${
                activeDropdown === "syllabus" ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="nav-link nav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("syllabus");
                }}
              >
                Syllabus
                <i className="fas fa-chevron-down chev" />
              </button>
              <div className="dropdown-panel">
                <ul>
                  <li>
                    <Link to="#" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-microchip" /></span>
                      <span>SFET</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-flask" /></span>
                      <span>SFASH</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-chart-line" /></span>
                      <span>SFMSR</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={closeMenu}>
                      <span className="dd-icon"><i className="fas fa-leaf" /></span>
                      <span>SFA</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link to="/UploadQuestionPaper" onClick={closeMenu} className="nav-link">
                Upload Paper
              </Link>
            </li>

            <li>
              <Link to="/QBankUpload" onClick={closeMenu} className="nav-link">
                QBank Upload
              </Link>
            </li>

            <li>
              <Link to="/Admin" onClick={closeMenu} className="nav-link">
                Profile
              </Link>
            </li>

            <li className="theme-li">
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <i className="fas fa-sun" />
                ) : (
                  <i className="fas fa-moon" />
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Breadcrumb strip */}
      <div className="breadcrumb">
        <a
          href="https://www.svsu.ac.in/"
          className="breadcrumb-link"
          target="_blank"
          rel="noreferrer"
        >
          SVSU-IR
        </a>
        <i className="fas fa-chevron-right breadcrumb-chev" />
        <span className="breadcrumb-current">
          Shri Vishwakarma Skill University
        </span>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && <div className="overlay active" onClick={closeMenu} />}
    </header>
  );
}

export default Header;