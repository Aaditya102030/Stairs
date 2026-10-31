"use client";

import { useState, useEffect, useRef } from "react";
import BranchesFooter from "@/components/BranchesFooter";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  :root {
    --red: #e8372c; --dark: #111111; --darker: #0a0a0a; --light: #ffffff;
    --gray: #888888; --bg-light: #f5f5f5;
    --font-display: 'Bebas Neue', sans-serif; --font-body: 'Barlow', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); color: var(--dark); background: var(--light); overflow-x: hidden; }
  a { text-decoration: none; color: inherit; } ul { list-style: none; }
  .reveal { opacity: 0; transform: translateY(50px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-60px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(60px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }
  .section-label { font-family: var(--font-body); font-weight: 600; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: var(--red); display: block; margin-bottom: 10px; }
  .section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.1; letter-spacing: 1px; text-transform: uppercase; }
  .btn-primary { display: inline-flex; align-items: center; gap: 14px; background: var(--red); color: var(--light); font-family: var(--font-body); font-weight: 700; font-size: 0.88rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 10px 10px 10px 32px; border-radius: 50px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
  .btn-primary:hover { background: #c0251b; transform: translateY(-2px); }
  .btn-primary .play-icon { width: 38px; height: 38px; background: var(--light); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .btn-primary .play-icon i { color: var(--red); font-size: 0.72rem; margin-left: 2px; }

  /* EQUIPMENT FLOAT ANIMATIONS */
  @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(-8deg); } 50% { transform: translateY(-20px) rotate(-8deg); } }
  @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(10deg); } 50% { transform: translateY(-14px) rotate(10deg); } }
  @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(-3deg); } 50% { transform: translateY(-24px) rotate(-3deg); } }
  @keyframes float4 { 0%,100% { transform: translateY(0px) rotate(6deg); } 50% { transform: translateY(-12px) rotate(6deg); } }
  @keyframes float5 { 0%,100% { transform: translateY(0px) rotate(-15deg); } 50% { transform: translateY(-16px) rotate(-15deg); } }
  @keyframes pulse-dot { 0%,100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.15); } }
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  @keyframes spin-ccw  { to { transform: rotate(-360deg); } }

  /* NAVBAR */
  #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 22px 72px; transition: background 0.4s, padding 0.4s, box-shadow 0.4s; }
  #navbar.scrolled { background: rgba(10,10,10,0.95); padding: 14px 72px; backdrop-filter: blur(12px); box-shadow: 0 2px 40px rgba(0,0,0,0.4); }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--light); }
  .nav-links { display: flex; align-items: center; gap: 38px; }
  .nav-links a { color: var(--light); font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; position: relative; transition: color 0.3s; }
  .nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: var(--red); transition: width 0.3s; }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
  .nav-links a.active, .nav-links a:hover { color: var(--red); }
  .nav-links .contact-btn { border: 2px solid var(--red); padding: 9px 26px; border-radius: 30px; color: var(--light); font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; transition: background 0.3s, color 0.3s; }
  .nav-links .contact-btn:hover { background: var(--red); color: #fff; }
  .nav-links .contact-btn::after { display: none; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); }

  /* PAGE HERO */
  #page-hero { position: relative; min-height: 60vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; padding-top: 80px; }
  .page-hero-bg { position: absolute; inset: 0; background: url('/images/DSC02217.JPG') center/cover no-repeat; opacity: 0.55; }
  .page-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.88) 38%, rgba(10,10,10,0.3) 100%); }

  /* Full-hero equipment SVG layer */
  .hero-equipment-layer {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 1;
  }
  .hero-equipment-layer svg { width: 100%; height: 100%; }

  .page-hero-content { position: relative; z-index: 2; padding: 0 60px; }
  .page-hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .page-hero-content h1 { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 16px; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.55); font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; }
  .breadcrumb a { color: var(--red); }
  .breadcrumb span { color: rgba(255,255,255,0.4); }

  /* SERVICES ACCORDION GRID */
  #services-full { padding: 90px 60px; background: var(--bg-light); }
  #services-full .services-header { text-align: center; background: var(--red); color: var(--light); margin: -90px -60px 60px -60px; padding: 60px 60px 50px; position: relative; overflow: hidden; }
  #services-full .services-header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 280px; height: 280px; border-radius: 50%; border: 50px solid rgba(255,255,255,0.07); pointer-events: none; }
  #services-full .services-header::after { content: ''; position: absolute; bottom: -80px; left: -40px; width: 200px; height: 200px; border-radius: 50%; border: 35px solid rgba(255,255,255,0.05); pointer-events: none; }
  #services-full .services-header .section-label { color: rgba(255,255,255,0.7); }
  #services-full .services-header .section-title { color: var(--light); }
  .services-book { display: flex; gap: 12px; max-width: 1300px; height: 440px; margin: 0 auto; align-items: stretch; justify-content: center; }
  .service-panel { position: relative; display: block; width: 100%; flex: 0.52; min-width: 52px; overflow: hidden; border: 0; border-radius: 8px; padding: 0; font: inherit; text-align: left; color: var(--light); cursor: pointer; background: #1d1d1d; box-shadow: 0 18px 45px rgba(0,0,0,0.24); transition: flex 0.55s ease, transform 0.55s ease, box-shadow 0.55s ease; }
  .service-panel.is-active { flex: 2.7; transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.34); }
  .service-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.75)), var(--service-bg); background-size: cover; background-position: center; filter: grayscale(0.6); transition: filter 0.55s ease; }
  .service-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(232,55,44,0.18), rgba(4,22,73,0.36)); opacity: 0.55; transition: opacity 0.55s ease; }
  .service-panel.is-active::before { filter: grayscale(0); }
  .service-panel.is-active::after { opacity: 0.15; }
  .service-panel .vertical-title { position: absolute; left: 50%; top: 50%; z-index: 2; transform: translate(-50%, -50%) rotate(-90deg); width: 360px; text-align: center; font-family: var(--font-display); font-size: 1.05rem; white-space: nowrap; text-shadow: 0 2px 10px rgba(0,0,0,0.7); transition: opacity 0.35s ease; }
  .service-panel .service-detail { position: absolute; inset: auto 22px 24px 22px; z-index: 3; color: var(--light); opacity: 0; transform: translateY(22px); transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s; }
  .service-panel.is-active .service-detail { opacity: 1; transform: translateY(0); }
  .service-panel.is-active .vertical-title { opacity: 0; }
  .service-detail .s-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.16); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .service-detail h3 { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .service-detail p { color: rgba(255,255,255,0.78); font-size: 0.9rem; line-height: 1.6; max-width: 290px; margin-bottom: 14px; }
  .service-detail .read-more { color: var(--light); font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 7px; }

  /* FOOTER */
  #footer { background: var(--dark); padding: 60px 60px 30px; color: #aaa; }
  .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.3fr; gap: 40px; margin-bottom: 40px; }
  .footer-brand .logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .footer-brand .logo .logo-icon { width: 36px; height: 36px; background: var(--red); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--light); font-size: 1rem; }
  .footer-brand .logo span { font-family: var(--font-display); font-size: 1.2rem; letter-spacing: 2px; color: var(--light); }
  .footer-brand p { font-size: 0.85rem; line-height: 1.8; margin-bottom: 20px; }
  .footer-social { display: flex; gap: 10px; }
  .footer-social a { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.75rem; transition: background 0.3s, color 0.3s; }
  .footer-social a:hover { background: var(--red); color: var(--light); }
  .footer-col h4 { font-family: var(--font-display); font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; color: var(--light); margin-bottom: 20px; }
  .footer-col ul li { margin-bottom: 10px; font-size: 0.85rem; }
  .footer-col ul li::before { content: '▶'; font-size: 0.5rem; color: var(--red); margin-right: 8px; vertical-align: middle; }
  .footer-col ul li a { color: #aaa; transition: color 0.3s; }
  .footer-col ul li a:hover { color: var(--red); }
  .footer-contact .contact-item { display: flex; flex-direction: column; margin-bottom: 12px; }
  .footer-contact .contact-item strong { color: var(--light); font-size: 0.85rem; margin-bottom: 2px; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; text-align: center; font-size: 0.8rem; }

  @media (min-width: 769px) and (max-width: 1100px) {
    .services-book { gap: 10px; }
    .service-panel { min-width: 44px; }
  }

  @media (max-width: 1024px) {
    #navbar { padding: 18px 30px; } #navbar.scrolled { padding: 12px 30px; }
    #services-full, #footer { padding-left: 30px; padding-right: 30px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; } .hamburger { display: flex; }
    .page-hero-content { padding: 0 20px; }
    .hero-equipment-layer { opacity: 0.4; }
    .services-book { flex-direction: column; height: auto; }
    .service-panel { min-width: unset; min-height: 80px; flex: none; }
    .service-panel.is-active { min-height: 280px; }
    .service-panel .vertical-title { transform: translate(-50%, -50%); white-space: normal; text-align: center; width: 90%; font-size: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

const services = [
  { href: "/services/advanced-physiotherapy", bg: "url('/images/physiotherapy.avif')", vertical: "Physiotherapy & Rehabilitation", icon: "fas fa-notes-medical", title: "Physiotherapy & Rehabilitation", desc: "Pain Management, Prehab & Rehab, Post-Surgical Rehabilitation" },
  { href: "/services/sports-rehab-injury-prevention", bg: "url('/images/sports%20secific%20training.avif')", vertical: "Sports Rehab & Injury Prevention", icon: "fas fa-shield-alt", title: "Sports Rehab & Injury Prevention", desc: "Get back to peak performance safely" },
  { href: "/services/strength-conditioning", bg: "url('/images/strength%20and%20conditioning.avif')", vertical: "Strength & Conditioning", icon: "fas fa-dumbbell", title: "Strength & Conditioning", desc: "Custom fitness programs for endurance and strength" },
  { href: "/services/manual-therapy-dry-needling", bg: "url('/images/bio%20mechanical%20assessment.avif')", vertical: "Manual Therapy, Dry Needling, Cupping", icon: "fas fa-hands", title: "Manual Therapy, Dry Needling, Cupping", desc: "Hands-on techniques for faster healing" },
  { href: "/services/myofascial-release", bg: "url('/images/myofascial%20release.avif')", vertical: "Myofascial Release Therapy (MFR)", icon: "fas fa-hand-holding-heart", title: "Myofascial Release Therapy (MFR)", desc: "Relieving muscle tightness and improving mobility" },
  { href: "/services/prehab-wellness-programs", bg: "url('/images/DSC02221.JPG')", vertical: "Massage Therapy", icon: "fas fa-spa", title: "Massage Therapy", desc: "Deep tissue and sports massage for recovery" },
  { href: "/services/nutrition-support", bg: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80')", vertical: "Nutrition Support", icon: "fas fa-apple-alt", title: "Nutrition Support", desc: "Personalized guidance to fuel recovery and performance" },
  { href: "/services/running-rehab-performance-training", bg: "url('https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80')", vertical: "Running Rehab & Performance Training", icon: "fas fa-running", title: "Running Rehab & Performance Training", desc: "Injury prevention and strength sessions for all levels, from beginners to Ironman & World Major Marathon athletes." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    document.querySelectorAll("#page-hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" },
    { href: "/trainers", label: "Team" }, { href: "/pricing", label: "Program" }, { href: "/coming-soon", label: "Initiatives" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 70, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/services" ? "active" : ""}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

function PageHero() {
  return (
    <section id="page-hero">
      <div className="page-hero-bg" />

      {/* ── Equipment scattered across the full hero ── */}
      <div className="hero-equipment-layer" aria-hidden="true">
        <svg viewBox="0 0 1400 520" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* ── DUMBBELL 1 — top-center-right ── */}
          <g style={{ animation: "float1 4.2s ease-in-out infinite", transformOrigin: "780px 90px" }}>
            <rect x="720" y="74" width="20" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="724" y="68" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="736" y="83" width="88" height="8" rx="4" fill="url(#sg1)"/>
            <rect x="824" y="74" width="20" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="828" y="68" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="736" y="83" width="88" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="780" y="104" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue,sans-serif" letterSpacing="1">20 KG</text>
          </g>

          {/* ── KETTLEBELL — far right ── */}
          <g style={{ animation: "float2 5s ease-in-out infinite", transformOrigin: "1260px 130px" }}>
            <path d="M1235 108 Q1235 85 1260 85 Q1285 85 1285 108" stroke="#e8372c" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M1235 108 Q1235 85 1260 85 Q1285 85 1285 108" stroke="#c0251b" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <ellipse cx="1260" cy="138" rx="34" ry="32" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2.5"/>
            <ellipse cx="1260" cy="138" rx="34" ry="32" fill="url(#sk1)"/>
            <rect x="1246" y="108" width="28" height="10" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
            <ellipse cx="1248" cy="128" rx="8" ry="6" fill="rgba(255,255,255,0.1)" transform="rotate(-20,1248,128)"/>
            <text x="1260" y="143" textAnchor="middle" fill="#e8372c" fontSize="8" fontFamily="Bebas Neue,sans-serif" letterSpacing="1">16KG</text>
          </g>

          {/* ── BARBELL — middle spanning wide ── */}
          <g style={{ animation: "float3 6s ease-in-out infinite", transformOrigin: "850px 260px" }}>
            <rect x="540" y="242" width="30" height="54" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            <rect x="544" y="236" width="20" height="66" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="564" y="250" width="16" height="42" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            <rect x="580" y="254" width="540" height="12" rx="6" fill="url(#sg2)"/>
            <rect x="580" y="254" width="540" height="5" rx="3" fill="rgba(255,255,255,0.1)"/>
            <rect x="1120" y="250" width="16" height="42" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            <rect x="1136" y="236" width="20" height="66" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="1140" y="242" width="30" height="54" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            {[640,680,720,760,800,840,880,920,960,1000,1040,1080].map((x, i) => (
              <rect key={i} x={x} y="254" width="2" height="12" rx="1" fill="rgba(255,255,255,0.18)"/>
            ))}
            <text x="850" y="286" textAnchor="middle" fill="#e8372c" fontSize="9" fontFamily="Bebas Neue,sans-serif" letterSpacing="2">STAIRS GYM</text>
          </g>

          {/* ── DUMBBELL 2 — bottom-right ── */}
          <g style={{ animation: "float4 4.8s ease-in-out infinite", transformOrigin: "1120px 400px" }}>
            <rect x="1058" y="384" width="20" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="1062" y="378" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="1074" y="391" width="92" height="8" rx="4" fill="url(#sg1)"/>
            <rect x="1166" y="384" width="20" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="1170" y="378" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="1074" y="391" width="92" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="1120" y="411" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue,sans-serif" letterSpacing="1">12 KG</text>
          </g>

          {/* ── DUMBBELL 3 — top-far-right ── */}
          <g style={{ animation: "float5 5.5s ease-in-out infinite 0.8s", transformOrigin: "1300px 380px" }}>
            <rect x="1240" y="366" width="18" height="28" rx="4" fill="#2a2a2a" stroke="#e8372c" strokeWidth="1.5"/>
            <rect x="1244" y="360" width="10" height="40" rx="3" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="1254" y="374" width="80" height="7" rx="3" fill="url(#sg1)"/>
            <rect x="1334" y="366" width="18" height="28" rx="4" fill="#2a2a2a" stroke="#e8372c" strokeWidth="1.5"/>
            <rect x="1338" y="360" width="10" height="40" rx="3" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <text x="1294" y="392" textAnchor="middle" fill="#e8372c" fontSize="6" fontFamily="Bebas Neue,sans-serif" letterSpacing="1">8 KG</text>
          </g>

          {/* ── JUMP ROPE — bottom-center ── */}
          <g style={{ animation: "float1 5.8s ease-in-out infinite 1.2s", transformOrigin: "900px 420px" }}>
            <circle cx="820" cy="418" r="11" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
            <circle cx="820" cy="418" r="5" fill="#e8372c"/>
            <path d="M831 418 Q865 385 900 418 Q935 451 970 418" stroke="#e8372c" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M831 418 Q865 385 900 418 Q935 451 970 418" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <circle cx="980" cy="418" r="11" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
            <circle cx="980" cy="418" r="5" fill="#e8372c"/>
          </g>

          {/* ── Subtle ambient rings (right-center) ── */}
          <circle cx="1050" cy="260" r="180" stroke="rgba(232,55,44,0.07)" strokeWidth="1" strokeDasharray="8 16"
            style={{ animation: "spin-slow 25s linear infinite", transformOrigin: "1050px 260px" }} />
          <circle cx="1050" cy="260" r="130" stroke="rgba(255,106,0,0.06)" strokeWidth="1" strokeDasharray="4 22"
            style={{ animation: "spin-ccw 35s linear infinite", transformOrigin: "1050px 260px" }} />

          {/* ── Floating spark particles ── */}
          {[
            { cx: 700,  cy: 160, r: 3,   d: "0s"   },
            { cx: 950,  cy: 80,  r: 2.5, d: "0.7s" },
            { cx: 1150, cy: 200, r: 3,   d: "1.3s" },
            { cx: 1320, cy: 300, r: 2,   d: "0.4s" },
            { cx: 850,  cy: 460, r: 2.5, d: "1.9s" },
            { cx: 1200, cy: 450, r: 2,   d: "2.4s" },
            { cx: 660,  cy: 380, r: 2,   d: "1.1s" },
            { cx: 1060, cy: 130, r: 2.5, d: "2.8s" },
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#ff6a00"
              style={{ animation: `pulse-dot 3s ease-in-out infinite ${p.d}`, transformOrigin: `${p.cx}px ${p.cy}px` }}
            />
          ))}

          <defs>
            <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666"/><stop offset="40%" stopColor="#999"/><stop offset="100%" stopColor="#444"/>
            </linearGradient>
            <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#777"/><stop offset="40%" stopColor="#aaa"/><stop offset="100%" stopColor="#555"/>
            </linearGradient>
            <radialGradient id="sk1" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#444"/><stop offset="100%" stopColor="#111"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="page-hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>OUR<br />SERVICES</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Services</span>
        </div>
      </div>
    </section>
  );
}

function ServicesFull() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIdxRef.current + 1) % services.length;
      activeIdxRef.current = next; setActiveIdx(next);
    }, 3000);
  };
  useEffect(() => { startCycle(); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);

  return (
    <section id="services-full">
      <div className="services-header">
        <span className="section-label reveal">Our Services</span>
        <h2 className="section-title reveal">Solutions for moving better &amp; One step at a time</h2>
      </div>
      <div className="services-book">
        {services.map((s, i) => (
          <a key={i} href={s.href} className={`service-panel${activeIdx === i ? " is-active" : ""}`}
            style={{ "--service-bg": s.bg } as React.CSSProperties}
            onMouseEnter={() => { activeIdxRef.current = i; setActiveIdx(i); if (intervalRef.current) clearInterval(intervalRef.current); }}
            onMouseLeave={startCycle}>
            <span className="vertical-title">{s.vertical}</span>
            <span className="service-detail">
              <span className="s-icon"><i className={s.icon} /></span>
              <h3>{s.title}</h3><p>{s.desc}</p>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <ServicesFull />
      <BranchesFooter />
    </>
  );
}
