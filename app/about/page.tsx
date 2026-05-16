"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

/* ─── Shared styles (same as main site) ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  :root {
    --red: #e8372c;
    --dark: #111111;
    --darker: #0a0a0a;
    --light: #ffffff;
    --gray: #888888;
    --bg-light: #f5f5f5;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Barlow', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); color: var(--dark); background: var(--light); overflow-x: hidden; }
  img { max-width: 100%; display: block; }
  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }

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
  .nav-links .contact-btn:hover { background: var(--red); }
  .nav-links .contact-btn::after { display: none; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); }

  /* HERO */
  #hero { position: relative; min-height: 100vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .hero-bg-img { position: absolute; inset: 0; background: url('/images/hero-bg.png') center/cover no-repeat; opacity: 0.55; }
  .hero-bg-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.2) 100%); }
  .hero-circle { width: 580px; height: 580px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 30px; pointer-events: none; animation: spin-slow 20s linear infinite; }
  @keyframes spin-slow { to { transform: translateY(-50%) rotate(360deg); } }
  .hero-content { position: relative; z-index: 2; padding: 0 60px; max-width: 700px; }
  .hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .hero-content h1 { font-family: var(--font-display); font-size: clamp(4rem, 10vw, 8rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 20px; }
  .hero-content p { color: #cccccc; font-size: 1.05rem; margin-bottom: 36px; font-weight: 400; }

  /* PAGE HERO (inner pages) */
  #page-hero { position: relative; min-height: 60vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; padding-top: 80px; }
  .page-hero-bg { position: absolute; inset: 0; background: url('/images/hero-bg.png') center/cover no-repeat; opacity: 0.4; }
  .page-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.9) 50%, rgba(10,10,10,0.3) 100%); }
  .page-hero-circle { width: 420px; height: 420px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 22px; pointer-events: none; animation: spin-slow 20s linear infinite; opacity: 0.7; }
  .page-hero-content { position: relative; z-index: 2; padding: 0 60px; }
  .page-hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .page-hero-content h1 { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 16px; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.55); font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; }
  .breadcrumb a { color: var(--red); transition: opacity 0.2s; }
  .breadcrumb a:hover { opacity: 0.8; }
  .breadcrumb span { color: rgba(255,255,255,0.4); }

  /* ABOUT DETAIL SECTION */
  #about-detail { padding: 90px 60px; background: var(--bg-light); }
  .about-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .about-img-wrap { position: relative; }
  .about-img-wrap .img-box { width: 100%; height: 460px; background: #ddd; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: rgba(0,0,0,0.25); font-size: 0.85rem; flex-direction: column; gap: 10px; }
  .about-img-wrap .img-box i { font-size: 2.5rem; }
  .about-img-wrap .exp-badge { position: absolute; bottom: -24px; right: -24px; background: var(--red); color: var(--light); border-radius: 50%; width: 110px; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 2rem; line-height: 1; text-align: center; }
  .about-img-wrap .exp-badge small { font-size: 0.6rem; font-family: var(--font-body); letter-spacing: 1px; }
  .about-text .section-label { color: var(--red); }
  .about-text h2 { margin-bottom: 20px; }
  .about-text p { color: var(--gray); font-size: 0.95rem; line-height: 1.8; margin-bottom: 20px; }
  .about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
  .value-item { display: flex; align-items: flex-start; gap: 14px; }
  .value-item .icon { width: 44px; height: 44px; background: #fef0ef; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .value-item .icon i { color: var(--red); font-size: 1.1rem; }
  .value-item h4 { font-family: var(--font-display); font-size: 1rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
  .value-item p { color: var(--gray); font-size: 0.82rem; line-height: 1.6; margin: 0; }

  /* STATS BANNER */
  #stats-banner { background: var(--red); padding: 60px 60px; }
  .stats-banner-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; text-align: center; }
  .stat-box h3 { font-family: var(--font-display); font-size: 3rem; color: var(--light); letter-spacing: 2px; }
  .stat-box p { color: rgba(255,255,255,0.75); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }

  /* TEAM SECTION */
  #team { background: var(--darker); padding: 90px 60px; text-align: center; }
  #team .section-label { color: var(--red); }
  #team .section-title { color: var(--light); margin-bottom: 60px; }
  .team-grid { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
  .team-card { text-align: center; background: rgba(255,255,255,0.06); border-radius: 16px; padding: 30px 28px; width: 220px; transition: transform 0.3s, box-shadow 0.3s; border: 1px solid rgba(255,255,255,0.08); }
  .team-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); border-color: var(--red); }
  .team-card .trainer-img { width: 140px; height: 140px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 3px solid rgba(255,255,255,0.2); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.25); font-size: 0.7rem; flex-direction: column; gap: 6px; }
  .team-card .trainer-img i { font-size: 2rem; }
  .team-card h4 { font-family: var(--font-display); font-size: 1.05rem; color: var(--light); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .team-card .role { color: rgba(255,255,255,0.6); font-size: 0.8rem; margin-bottom: 14px; }
  .trainer-social { display: flex; justify-content: center; gap: 10px; }
  .trainer-social a { width: 32px; height: 32px; background: rgba(255,255,255,0.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--light); font-size: 0.75rem; transition: background 0.3s; }
  .trainer-social a:hover { background: var(--red); }

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
  .footer-hours p, .footer-contact p { font-size: 0.85rem; margin-bottom: 6px; }
  .footer-contact .contact-item { display: flex; flex-direction: column; margin-bottom: 12px; }
  .footer-contact .contact-item strong { color: var(--light); font-size: 0.85rem; margin-bottom: 2px; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; text-align: center; font-size: 0.8rem; }

  @media (max-width: 1024px) {
    #navbar { padding: 16px 30px; }
    #navbar.scrolled { padding: 10px 30px; }
    .page-hero-content, .about-detail-grid, #stats-banner, #team, #footer { padding-left: 30px; padding-right: 30px; }
    .about-detail-grid { grid-template-columns: 1fr; }
    .stats-banner-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .page-hero-content { padding: 0 20px; }
    .about-img-wrap .exp-badge { display: none; }
    .about-values { grid-template-columns: 1fr; }
    .stats-banner-grid { grid-template-columns: 1fr 1fr; }
    .team-grid { flex-direction: column; align-items: center; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

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
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/trainers", label: "Trainers" },
    { href: "/pricing", label: "Pricing" },
    { href: "/coming-soon", label: "Coming Soon" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        <img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} />
      </div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={l.href === "/about" ? "active" : ""}>{l.label}</a>
        ))}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
        <span /><span /><span />
      </div>
    </nav>
  );
}

function PageHero() {
  return (
    <section id="page-hero">
      <div className="page-hero-bg" />
      <div className="circle-deco page-hero-circle" />
      <div className="page-hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>ABOUT<br />US</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>About</span>
        </div>
      </div>
    </section>
  );
}

function AboutDetail() {
  return (
    <section id="about-detail">
      <div className="about-detail-grid">
        <div className="about-img-wrap reveal-left">
          <div className="img-box"><i className="fas fa-image" /><span>about-team.jpg</span></div>
          <div className="exp-badge">15+<small>Years<br />Exp.</small></div>
        </div>
        <div className="about-text reveal-right">
          <span className="section-label">About Us</span>
          <h2 className="section-title">Welcome To The<br />Stairs</h2>
          <p>Euis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat cupidatat non proident, sunt in culpa aui officia deserunt mollit anim laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.</p>
          <div className="about-values">
            {[
              { icon: "fas fa-dumbbell", title: "Expert Coaching", text: "Certified coaches with years of experience in performance training." },
              { icon: "fas fa-heartbeat", title: "Health Focused", text: "Holistic programs that balance fitness, recovery, and wellbeing." },
              { icon: "fas fa-users", title: "Community Driven", text: "A supportive environment where every member belongs." },
              { icon: "fas fa-chart-line", title: "Proven Results", text: "Track record of delivering measurable improvements for clients." },
            ].map((v, i) => (
              <div className="value-item" key={i}>
                <div className="icon"><i className={v.icon} /></div>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
          <motion.a href="/contact" whileTap={{ scale: 0.95 }} className="btn-primary">
            Get Started <span className="play-icon"><i className="fas fa-play" /></span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section id="stats-banner">
      <div className="stats-banner-grid">
        {[
          { num: "600K+", label: "Working Hours" },
          { num: "790+", label: "Success Programs" },
          { num: "2560+", label: "Happy Clients" },
          { num: "830+", label: "Perfect Bodies" },
        ].map((s, i) => (
          <div className="stat-box reveal" key={i}>
            <h3>{s.num}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const trainers = [
    { name: "Marvin Joiner", role: "CrossFit Coach" },
    { name: "Patricia Woodrum", role: "Cardio & Conditioning" },
    { name: "Hannaz Stone", role: "Fitness Coach" },
    { name: "Derek Hale", role: "Strength & Power" },
  ];
  return (
    <section id="team">
      <span className="section-label reveal">Our Team</span>
      <h2 className="section-title reveal">Meet The Experts</h2>
      <br /><br />
      <div className="team-grid">
        {trainers.map((t, i) => (
          <div className="team-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="trainer-img"><i className="fas fa-user" /></div>
            <h4>{t.name}</h4>
            <p className="role">{t.role}</p>
            <div className="trainer-social">
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fas fa-envelope" /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon"><i className="fas fa-dumbbell" /></div>
            <span>Stairs</span>
          </div>
          <p>Fulatrumat est aun dolorem ipsum natus dolor sit amet...</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col footer-hours">
          <h4>Opening Hours</h4>
          <p><strong style={{ color: "#ccc" }}>Monday – Saturday</strong><br />12:00 – 14:45</p><br />
          <p><strong style={{ color: "#ccc" }}>Sunday – Thursday</strong><br />17:30 – 00:00</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {["about", "services", "trainers", "pricing", "contact"].map((l) => (
              <li key={l}><a href={`/${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne, 3000, Australia</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <AboutDetail />
      <StatsBanner />
      <Team />
      <Footer />
    </>
  );
}
