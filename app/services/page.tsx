"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

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
  .circle-deco { position: absolute; border-radius: 50%; border: 20px solid var(--red); opacity: 0.85; }

  /* NAVBAR */
  #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; transition: background 0.4s, padding 0.4s; }
  #navbar.scrolled { background: rgba(10,10,10,0.95); padding: 12px 60px; backdrop-filter: blur(8px); }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--light); }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-links a { color: var(--light); font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; position: relative; transition: color 0.3s; }
  .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--red); transition: width 0.3s; }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
  .nav-links a.active, .nav-links a:hover { color: var(--red); }
  .nav-links .contact-btn { border: 2px solid var(--red); padding: 7px 20px; border-radius: 30px; color: var(--light); transition: background 0.3s; }
  .nav-links .contact-btn:hover { background: var(--red); color: #111; }
  .nav-links .contact-btn::after { display: none; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); }

  /* PAGE HERO */
  #page-hero { position: relative; min-height: 60vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; padding-top: 80px; }
  .page-hero-bg { position: absolute; inset: 0; background: url('/images/hero-bg.png') center/cover no-repeat; opacity: 0.4; }
  .page-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.9) 50%, rgba(10,10,10,0.3) 100%); }
  .page-hero-circle { width: 420px; height: 420px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 22px; pointer-events: none; animation: spin-slow 20s linear infinite; opacity: 0.7; }
  .hero-3d-scene { position: absolute; right: 0; top: 0; bottom: 0; width: 55%; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; }
  @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(-8deg); } 50% { transform: translateY(-22px) rotate(-8deg); } }
  @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(12deg); } 50% { transform: translateY(-16px) rotate(12deg); } }
  @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(-4deg); } 50% { transform: translateY(-28px) rotate(-4deg); } }
  @keyframes float4 { 0%,100% { transform: translateY(0px) rotate(6deg); } 50% { transform: translateY(-14px) rotate(6deg); } }
  @keyframes pulse-ring { 0%,100% { opacity: 0.18; transform: scale(1); } 50% { opacity: 0.32; transform: scale(1.06); } }
  @keyframes spin-ring { to { transform: rotate(360deg); } }
  @keyframes spin-slow { to { transform: translateY(-50%) rotate(360deg); } }
  .page-hero-content { position: relative; z-index: 2; padding: 0 60px; }
  .page-hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .page-hero-content h1 { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 16px; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.55); font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; }
  .breadcrumb a { color: var(--red); }
  .breadcrumb span { color: rgba(255,255,255,0.4); }

  /* SERVICES ACCORDION GRID */
  #services-full { padding: 90px 60px; background: var(--bg-light); }
  #services-full .services-header { text-align: center; margin-bottom: 60px; }
  .services-book { display: flex; gap: 18px; max-width: 1100px; height: 500px; margin: 0 auto; align-items: stretch; justify-content: center; }
  .service-panel { position: relative; display: block; width: 100%; flex: 0.52; min-width: 74px; overflow: hidden; border: 0; border-radius: 8px; padding: 0; font: inherit; text-align: left; color: var(--light); cursor: pointer; background: #1d1d1d; box-shadow: 0 18px 45px rgba(0,0,0,0.24); transition: flex 0.55s ease, transform 0.55s ease, box-shadow 0.55s ease; }
  .service-panel.is-active { flex: 2.7; transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.34); }
  .service-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.75)), var(--service-bg); background-size: cover; background-position: center; filter: grayscale(0.6); transition: filter 0.55s ease; }
  .service-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(232,55,44,0.18), rgba(4,22,73,0.36)); opacity: 0.55; transition: opacity 0.55s ease; }
  .service-panel.is-active::before { filter: grayscale(0); }
  .service-panel.is-active::after { opacity: 0.15; }
  .service-panel .vertical-title { position: absolute; left: 50%; top: 50%; z-index: 2; transform: translate(-50%, -50%) rotate(-90deg); width: 260px; font-family: var(--font-display); font-size: 1.05rem; white-space: nowrap; text-shadow: 0 2px 10px rgba(0,0,0,0.7); transition: opacity 0.35s ease; }
  .service-panel .service-detail { position: absolute; inset: auto 22px 24px 22px; z-index: 3; color: var(--light); opacity: 0; transform: translateY(22px); transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s; }
  .service-panel.is-active .service-detail { opacity: 1; transform: translateY(0); }
  .service-panel.is-active .vertical-title { opacity: 0; }
  .service-detail .s-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.16); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .service-detail h3 { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .service-detail p { color: rgba(255,255,255,0.78); font-size: 0.9rem; line-height: 1.6; max-width: 290px; margin-bottom: 14px; }
  .service-detail .read-more { color: var(--light); font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 7px; }

  /* SERVICE CARDS ROW */
  #service-cards { padding: 80px 60px; background: #ffffff; }
  #service-cards .section-title { color: var(--dark); text-align: center; margin-bottom: 50px; }
  #service-cards .section-label { color: var(--red); display: block; text-align: center; margin-bottom: 10px; }
  .sc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; max-width: 1100px; margin: 0 auto; }
  .sc-card { display: block; background: #f7f7f7; border: 1px solid #e8e8e8; border-radius: 14px; padding: 32px 28px; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
  .sc-card:hover { border-color: var(--red); transform: translateY(-6px); box-shadow: 0 16px 40px rgba(232,55,44,0.15); }
  .sc-card .icon { width: 56px; height: 56px; background: rgba(232,55,44,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: background 0.3s; }
  .sc-card:hover .icon { background: var(--red); }
  .sc-card .icon i { font-size: 1.4rem; color: var(--red); transition: color 0.3s; }
  .sc-card:hover .icon i { color: var(--light); }
  .sc-card h3 { font-family: var(--font-display); font-size: 1.2rem; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
  .sc-card p { color: #666; font-size: 0.88rem; line-height: 1.7; }

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

  @media (max-width: 1024px) {
    #navbar { padding: 16px 30px; } #navbar.scrolled { padding: 10px 30px; }
    #services-full, #service-cards, #footer { padding-left: 30px; padding-right: 30px; }
    .sc-grid { grid-template-columns: repeat(2,1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; } .hamburger { display: flex; }
    .page-hero-content { padding: 0 20px; }
    .services-book { flex-direction: column; height: auto; }
    .service-panel { min-width: unset; min-height: 80px; flex: none; }
    .service-panel.is-active { min-height: 280px; }
    .service-panel .vertical-title { transform: translate(-50%, -50%); white-space: normal; text-align: center; width: 90%; font-size: 1rem; letter-spacing: 1px; }
    .sc-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

const services = [
  { href: "/services/bio-mechanical-assessment", bg: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80')", vertical: "Bio Mechanical Assessment", icon: "fas fa-ruler-horizontal", title: "Bio Mechanical Assessment", desc: "Body assessment" },
  { href: "/services/physiotherapy", bg: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')", vertical: "Physiotherapy", icon: "fas fa-notes-medical", title: "Physiotherapy", desc: "Prehab / Rehab" },
  { href: "/services/strength-conditioning", bg: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80')", vertical: "Strength & Conditioning", icon: "fas fa-dumbbell", title: "Strength & Conditioning", desc: "Mobility / Strength" },
  { href: "/services/myofascial-release", bg: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80')", vertical: "Myofascial Release", icon: "fas fa-hand-holding-heart", title: "Myofascial Release", desc: "Treatment / Release" },
  { href: "/services/sports-specific-training", bg: "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80')", vertical: "Sports Specific Training", icon: "fas fa-basketball-ball", title: "Sports Specific Training", desc: "Training specific to sport" },
  { href: "/services/group-session", bg: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80')", vertical: "Group Session", icon: "fas fa-users", title: "Group Session", desc: "Runners, triathlete or any sport" },
];

const serviceCards = [
  { href: "/services/bio-mechanical-assessment", icon: "fas fa-ruler-horizontal", title: "Bio Mechanical Assessment", desc: "Body assessment" },
  { href: "/services/physiotherapy", icon: "fas fa-notes-medical", title: "Physiotherapy", desc: "Prehab / Rehab" },
  { href: "/services/strength-conditioning", icon: "fas fa-dumbbell", title: "Strength & Conditioning", desc: "Mobility / Strength" },
  { href: "/services/myofascial-release", icon: "fas fa-hand-holding-heart", title: "Myofascial Release", desc: "Treatment / Release" },
  { href: "/services/sports-specific-training", icon: "fas fa-basketball-ball", title: "Sports Specific Training", desc: "Training specific to sport" },
  { href: "/services/group-session", icon: "fas fa-users", title: "Group Session", desc: "Runners, triathlete or any sport" },
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
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
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
      <div className="circle-deco page-hero-circle" />
      <div className="hero-3d-scene">
        <svg width="420" height="420" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="260" cy="260" r="210" stroke="#e8372c" strokeWidth="1" strokeDasharray="8 14" opacity="0.18" style={{ animation: "spin-ring 18s linear infinite", transformOrigin: "260px 260px" }} />
          <circle cx="260" cy="260" r="175" stroke="#ff6a00" strokeWidth="1" strokeDasharray="4 20" opacity="0.12" style={{ animation: "spin-ring 28s linear infinite reverse", transformOrigin: "260px 260px" }} />
          <circle cx="260" cy="260" r="140" fill="none" stroke="rgba(232,55,44,0.08)" strokeWidth="60" style={{ animation: "pulse-ring 4s ease-in-out infinite", transformOrigin: "260px 260px" }} />
          <g style={{ animation: "float1 4s ease-in-out infinite", transformOrigin: "130px 155px" }}>
            <rect x="72" y="138" width="22" height="34" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="76" y="133" width="14" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="90" y="151" width="80" height="8" rx="4" fill="url(#sBarGrad)"/>
            <rect x="170" y="138" width="22" height="34" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="174" y="133" width="14" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="90" y="151" width="80" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="130" y="172" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">20 KG</text>
          </g>
          <g style={{ animation: "float2 5s ease-in-out infinite", transformOrigin: "370px 145px" }}>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#e8372c" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#c0251b" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2.5"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="url(#sKettleGrad)"/>
            <rect x="356" y="118" width="28" height="10" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
            <text x="370" y="153" textAnchor="middle" fill="#e8372c" fontSize="8" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">16KG</text>
          </g>
          <g style={{ animation: "float3 6s ease-in-out infinite", transformOrigin: "260px 265px" }}>
            <rect x="82" y="246" width="28" height="52" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            <rect x="86" y="240" width="18" height="64" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="104" y="252" width="14" height="40" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            <rect x="118" y="258" width="284" height="12" rx="6" fill="url(#sBarGrad2)"/>
            <rect x="118" y="258" width="284" height="5" rx="3" fill="rgba(255,255,255,0.1)"/>
            <rect x="402" y="252" width="14" height="40" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            <rect x="410" y="240" width="18" height="64" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="412" y="246" width="28" height="52" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            {[170,190,210,230,250,270,290,310,330,350].map((x: number, i: number) => (
              <rect key={i} x={x} y="258" width="2" height="12" rx="1" fill="rgba(255,255,255,0.18)"/>
            ))}
            <text x="260" y="290" textAnchor="middle" fill="#e8372c" fontSize="9" fontFamily="Bebas Neue, sans-serif" letterSpacing="2">STAIRS GYM</text>
          </g>
          <g style={{ animation: "float4 4.5s ease-in-out infinite", transformOrigin: "370px 380px" }}>
            <rect x="312" y="364" width="18" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="316" y="358" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="328" y="373" width="84" height="8" rx="4" fill="url(#sBarGrad)"/>
            <rect x="412" y="364" width="18" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="412" y="358" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="328" y="373" width="84" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="370" y="393" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">12 KG</text>
          </g>
          <g style={{ animation: "float1 5.5s ease-in-out infinite 1s", transformOrigin: "140px 385px" }}>
            <circle cx="108" cy="375" r="10" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
            <circle cx="108" cy="375" r="5" fill="#e8372c"/>
            <path d="M118 375 Q150 345 180 375 Q210 405 240 375" stroke="#e8372c" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="250" cy="375" r="10" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
            <circle cx="250" cy="375" r="5" fill="#e8372c"/>
          </g>
          {[
            { cx: 180, cy: 210, r: 3, delay: "0s" },
            { cx: 310, cy: 190, r: 2, delay: "0.8s" },
            { cx: 420, cy: 300, r: 3, delay: "1.4s" },
            { cx: 150, cy: 320, r: 2, delay: "2s" },
            { cx: 350, cy: 400, r: 2.5, delay: "0.4s" },
          ].map((p: { cx: number; cy: number; r: number; delay: string }, i: number) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#ff6a00"
              style={{ animation: `pulse-ring 3s ease-in-out infinite ${p.delay}`, transformOrigin: `${p.cx}px ${p.cy}px` }}
            />
          ))}
          <defs>
            <linearGradient id="sBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666"/><stop offset="40%" stopColor="#999"/><stop offset="100%" stopColor="#444"/>
            </linearGradient>
            <linearGradient id="sBarGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#777"/><stop offset="40%" stopColor="#aaa"/><stop offset="100%" stopColor="#555"/>
            </linearGradient>
            <radialGradient id="sKettleGrad" cx="40%" cy="35%">
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
        <h2 className="section-title reveal">Solutions For Moving Better<br />&amp; Feeling Healthier</h2>
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
              <span className="read-more">View details <i className="fas fa-arrow-right" /></span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ServiceCards() {
  return (
    <section id="service-cards">
      <span className="section-label reveal">What We Offer</span>
      <h2 className="section-title reveal">All Services At A Glance</h2>
      <br /><br />
      <div className="sc-grid">
        {serviceCards.map((c, i) => (
          <a href={c.href} key={i} className="sc-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="icon"><i className={c.icon} /></div>
            <h3>{c.title}</h3><p>{c.desc}</p>
          </a>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <motion.a href="/contact" whileTap={{ scale: 0.95 }} className="btn-primary">
          Book a Session <span className="play-icon"><i className="fas fa-play" /></span>
        </motion.a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <div className="logo"><img src="/logo.png" alt="Stairs" style={{ height: 60, width: "auto" }} /></div>
          <p>STAIRS is a premier physiotherapy &amp; performance centre helping athletes and individuals move better, recover faster, and reach their peak potential.</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a><a href="#"><i className="fab fa-twitter" /></a><a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col footer-hours">
          <h4>Opening Hours</h4>
          <p><strong style={{ color: "#ccc" }}>Monday – Saturday</strong><br />12:00 – 14:45</p><br />
          <p><strong style={{ color: "#ccc" }}>Sunday – Thursday</strong><br />17:30 – 00:00</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>{["about", "services", "trainers", "pricing", "contact"].map((l) => (<li key={l}><a href={`/${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>))}</ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne, 3000, Australia</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2025 Stairs. All Rights Reserved.</p></div>
    </footer>
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
      <ServiceCards />
      <Footer />
    </>
  );
}
