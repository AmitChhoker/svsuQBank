import React from "react";
import { Link } from "react-router";
import "../../footer.css";

/* Brand monogram SVG — same as the Header */
function BrandMark() {
  return (
    <svg
      className="footer-brand-svg"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="footerBrandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#footerBrandGrad)" />
      <path
        d="M20 18h20a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H20a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z"
        fill="rgba(255,255,255,0.18)"
      />
      <path d="M23 24h18M23 30h18M23 36h11" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="42" cy="40" r="4.5" fill="#fff" />
      <path d="M45 43l5 5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Top glow divider */}
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        {/* ============ BRAND COLUMN ============ */}
        <div className="footer-brand">
          <div className="footer-brand-head">
            <BrandMark />
            <div>
              <span className="footer-brand-name">प्रश्न पत्र संग्रहालय</span>
              <span className="footer-brand-sub">Question Paper Repository</span>
            </div>
          </div>

          <p className="footer-brand-desc">
            Every SVSU previous year question paper and question bank, in one
            clean place — free, fast, and ad-free.
          </p>

          <div className="footer-svsu">
            <img
              src="https://svsu.ac.in/assets/imgs/svsu_logo.png"
              alt="SVSU"
            />
            <div>
              <strong>Shri Vishwakarma Skill University</strong>
              <span>
                India's first Govt. Skill University · Dudhola (Palwal),
                Haryana
              </span>
            </div>
          </div>
        </div>

        {/* ============ EXPLORE ============ */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Papers</Link></li>
            <li><Link to="/UploadQuestionPaper">Upload</Link></li>
            <li><Link to="/">Syllabus</Link></li>
          </ul>
        </div>

        {/* ============ FACULTIES ============ */}
        <div className="footer-col">
          <h4>Faculties</h4>
          <ul>
            <li><Link to="/">SFET</Link></li>
            <li><Link to="/SFASH">SFASH</Link></li>
            <li><Link to="/SFMSR">SFMSR</Link></li>
            <li><Link to="/SFA">SFA</Link></li>
          </ul>
        </div>

        {/* ============ CONNECT ============ */}
        <div className="footer-col">
          <h4>Connect</h4>
          <ul className="footer-social-list">
            <li>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram" /> Instagram
              </a>
            </li>
            <li>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-x-twitter" /> Twitter
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/AmitChhoker/svsuQBank" aria-label="GitHub">
                <i className="fab fa-github" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} <span>प्रश्न पत्र संग्रहालय</span> · Built by{" "}
          <strong>Team Genzy Coders</strong>
        </p>

        <div className="footer-badges">
          <span className="footer-badge">
            <i className="fas fa-shield-halved" /> Free &amp; Safe
          </span>
          <span className="footer-badge">
            <i className="fas fa-bolt" /> Made for SVSU students
          </span>
        </div>
      </div>
    </footer>
  );
}