import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";
import Header from "./Header";

/* ============================================================
   📸 PHOTOS IMPORT — src/assets/team/ se
   Parcel in images ko bundle karega, 100% guaranteed chalega
   
   ⚠️ Agar tumhari images src/assets/ me DIRECT hain (bina team folder),
   to niche '/'team' hata do:
     import ushaImg from "../assets/usha.jpg";
   ============================================================ */
import ushaImg from "../assets/usha.jpg";
import amitImg from "../assets/amit.jpg";
import gokulImg from "../assets/gokul.jpg";
import lavishImg from "../assets//lavish.jpg";
// Ankit ki photo nahi hai — initials fallback dikhega

/* ============================================================
   Fallback initials avatar — photo fail ho to
   ============================================================ */
const makeInitialsAvatar = (name = "?") => {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7c3aed"/>
          <stop offset="50%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#g)"/>
      <text x="50%" y="50%" dy=".35em" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="150"
        font-weight="800" fill="#ffffff">${initials}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

/* ============================================================
   Avatar — photo + automatic fallback
   ============================================================ */
const Avatar = ({ src, name, href }) => {
  const [currentSrc, setCurrentSrc] = useState(
    () => src || makeInitialsAvatar(name)
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || makeInitialsAvatar(name));
    setFailed(false);
  }, [src, name]);

  const onError = () => {
    if (!failed) {
      console.warn(`[Avatar] Photo failed for ${name}:`, src);
      setCurrentSrc(makeInitialsAvatar(name));
      setFailed(true);
    }
  };

  const img = (
    <img
      src={currentSrc}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={onError}
    />
  );

  return (
    <div className="avatar-wrap">
      {href ? (
        <a className="avatar-link" href={href} target="_blank" rel="noreferrer">
          {img}
        </a>
      ) : (
        <div className="avatar-link">{img}</div>
      )}
    </div>
  );
};

/* ============================================================
   TiltCard — 3D tilt + cursor spotlight + lift
   ============================================================ */
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const frame = useRef(0);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const onMove = (e) => {
    if (isTouch.current) return;
    const el = ref.current;
    if (!el) return;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-6px)`;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    });
  };

  const onEnter = () => ref.current?.classList.add("is-hovered");

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "";
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.classList.remove("is-hovered");
  };

  return (
    <div
      ref={ref}
      className="team-card"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
};

/* ============================================================
   Scroll reveal
   ============================================================ */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

/* ============================================================
   Admin Page
   ============================================================ */
const Admin = () => {
  const refA = useReveal();
  const refB = useReveal();

  return (
    <>
      <Header />

      <main className="admin-page">
        {/* ---------- INSTRUCTOR ---------- */}
        <section className="team-container reveal" ref={refA}>
          <h2 className="team-title">Instructor &amp; Motivator</h2>

          <div className="team-cards team-cards--single">
            <TiltCard>
              <Avatar src={ushaImg} name="Usha Batra" />
              <div className="card-info">
                <h3>Prof. Usha Batra</h3>
                <p className="role">Head of Department · CSE</p>
                <p className="quote">
                  “Guiding minds, inspiring futures — your motivation drives our
                  innovation.”
                </p>
                <a
                  className="Linkdin"
                  href="https://www.linkedin.com/in/dr-usha-batra-90a8b97b"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* ---------- TEAM: GENZY CODERS ---------- */}
        <section className="team-container reveal" ref={refB}>
          <h2 className="team-title">Team: Genzy Coders</h2>

          <div className="team-cards">
            {/* Amit */}
            <TiltCard>
              <Avatar
                src={amitImg}
                name="Amit Chhoker"
                href="https://www.linkedin.com/in/amit-chhoker-520735313"
              />
              <div className="card-info">
                <h3>Amit</h3>
                <p className="roll">Roll No: 23UGBCE09103</p>
                <p className="course">B.Tech CSE · 2023–27</p>
                <a
                  className="Linkdin"
                  href="https://www.linkedin.com/in/amit-chhoker-520735313"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </TiltCard>

            {/* Gokul */}
            <TiltCard>
              <Avatar
                src={gokulImg}
                name="Gokul S H Danu"
                href="https://www.linkedin.com/in/gokul-s-h-danu-9a90612b5"
              />
              <div className="card-info">
                <h3>Gokul S.H Danu</h3>
                <p className="roll">Roll No: 23UGBCE09118</p>
                <p className="course">B.Tech CSE · 2023–27</p>
                <a
                  className="Linkdin"
                  href="https://www.linkedin.com/in/gokul-s-h-danu-9a90612b5"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </TiltCard>

            {/* Ankit — no photo, fallback */}
            <TiltCard>
              <Avatar
                name="Ankit Jha"
                href="https://www.linkedin.com/in/ankit-jha-48b246319/"
              />
              <div className="card-info">
                <h3>Ankit Jha</h3>
                <p className="roll">Roll No: 23UGBCE09105</p>
                <p className="course">B.Tech CSE · 2023–27</p>
                <a
                  className="Linkdin"
                  href="https://www.linkedin.com/in/ankit-jha-48b246319/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </TiltCard>

            {/* Lavish */}
            <TiltCard>
              <Avatar
                src={lavishImg}
                name="Lavish Dagar"
                href="https://www.linkedin.com/in/lavish-dagar-349924316/"
              />
              <div className="card-info">
                <h3>Lavish</h3>
                <p className="roll">Roll No: 23UGBCE09136</p>
                <p className="course">B.Tech CSE · 2023–27</p>
                <a
                  className="Linkdin"
                  href="https://www.linkedin.com/in/lavish-dagar-349924316/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </TiltCard>
          </div>
        </section>
      </main>
    </>
  );
};

export default Admin;