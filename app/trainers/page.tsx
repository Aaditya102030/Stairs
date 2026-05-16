"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  :root { --red:#e8372c; --dark:#111111; --darker:#0a0a0a; --light:#ffffff; --gray:#888888; --bg-light:#f5f5f5; --font-display:'Bebas Neue',sans-serif; --font-body:'Barlow',sans-serif; }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:var(--dark);background:var(--light);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  .reveal{opacity:0;transform:translateY(50px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .reveal-left{opacity:0;transform:translateX(-60px);transition:opacity .7s ease,transform .7s ease;}
  .reveal-left.visible{opacity:1;transform:translateX(0);}
  .reveal-right{opacity:0;transform:translateX(60px);transition:opacity .7s ease,transform .7s ease;}
  .reveal-right.visible{opacity:1;transform:translateX(0);}
  .section-label{font-family:var(--font-body);font-weight:600;font-size:.85rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
  .section-title{font-family:var(--font-display);font-size:clamp(2rem,4vw,3.2rem);line-height:1.1;letter-spacing:1px;text-transform:uppercase;}
  .btn-primary{display:inline-flex;align-items:center;gap:14px;background:var(--red);color:var(--light);font-family:var(--font-body);font-weight:700;font-size:.88rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 10px 10px 32px;border-radius:50px;border:none;cursor:pointer;transition:background .3s,transform .2s;}
  .btn-primary:hover{background:#c0251b;transform:translateY(-2px);}
  .btn-primary .play-icon{width:38px;height:38px;background:var(--light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .btn-primary .play-icon i{color:var(--red);font-size:.72rem;margin-left:2px;}
  .circle-deco{position:absolute;border-radius:50%;border:20px solid var(--red);opacity:.85;}
  #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:18px 60px;transition:background .4s,padding .4s;}
  #navbar.scrolled{background:rgba(10,10,10,.95);padding:12px 60px;backdrop-filter:blur(8px);}
  .nav-logo{display:flex;align-items:center;gap:10px;color:var(--light);}
  .nav-links{display:flex;align-items:center;gap:32px;}
  .nav-links a{color:var(--light);font-size:.85rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;position:relative;transition:color .3s;}
  .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--red);transition:width .3s;}
  .nav-links a:hover::after,.nav-links a.active::after{width:100%;}
  .nav-links a.active,.nav-links a:hover{color:var(--red);}
  .nav-links .contact-btn{border:2px solid var(--red);padding:7px 20px;border-radius:30px;color:var(--light);transition:background .3s;}
  .nav-links .contact-btn:hover{background:var(--red);}
  .nav-links .contact-btn::after{display:none;}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;}
  .hamburger span{display:block;width:26px;height:2px;background:var(--light);}
  #page-hero{position:relative;min-height:60vh;background:var(--darker);display:flex;align-items:center;overflow:hidden;padding-top:80px;}
  .page-hero-bg{position:absolute;inset:0;background:url('/images/hero-bg.png') center/cover no-repeat;opacity:.4;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,.9) 50%,rgba(10,10,10,.3) 100%);}
  .page-hero-circle{width:420px;height:420px;right:5%;top:50%;transform:translateY(-50%);border-width:22px;pointer-events:none;animation:spin-slow 20s linear infinite;opacity:.7;}
  @keyframes spin-slow{to{transform:translateY(-50%) rotate(360deg);}}
  .page-hero-content{position:relative;z-index:2;padding:0 60px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,6rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;}
  .breadcrumb a{color:var(--red);}
  .breadcrumb span{color:rgba(255,255,255,.4);}

  /* TRAINERS SECTION */
  #trainers-full{background:var(--bg-light);padding:90px 60px;text-align:center;}
  #trainers-full .section-label{color:var(--red);}
  .trainers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;max-width:1000px;margin:50px auto 0;}
  .trainer-card{position:relative;background:#fff;border-radius:20px;padding:36px 28px 28px;box-shadow:0 4px 20px rgba(0,0,0,.07);transition:transform .3s,box-shadow .3s;overflow:hidden;}
  .trainer-card::before{content:'';position:absolute;inset:-3px;border-radius:22px;background:linear-gradient(135deg,#e8372c,#ff6b35,#ffb347,#e8372c,#8b0000);background-size:300% 300%;z-index:-1;opacity:0;transition:opacity .4s ease;animation:gradientSpin 3s ease infinite;}
  .trainer-card::after{content:'';position:absolute;inset:2px;border-radius:18px;background:#fff;z-index:-1;}
  @keyframes gradientSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  .trainer-card:hover{transform:translateY(-8px);box-shadow:0 16px 40px rgba(232,55,44,.25);}
  .trainer-card:hover::before{opacity:1;}
  .trainer-avatar{width:150px;height:150px;border-radius:50%;background:#f0f0f0;border:4px solid rgba(232,55,44,.2);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;color:#ccc;font-size:.7rem;flex-direction:column;gap:6px;transition:border-color .3s;}
  .trainer-card:hover .trainer-avatar{border-color:var(--red);}
  .trainer-avatar i{font-size:2.5rem;}
  .trainer-card h3{font-family:var(--font-display);font-size:1.25rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;}
  .trainer-card .role{color:var(--red);font-size:.82rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;display:block;}
  .trainer-card p{color:var(--gray);font-size:.85rem;line-height:1.7;margin-bottom:20px;}
  .trainer-social{display:flex;justify-content:center;gap:10px;}
  .trainer-social a{width:34px;height:34px;background:#f5f5f5;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--dark);font-size:.75rem;transition:background .3s,color .3s;}
  .trainer-social a:hover{background:var(--red);color:var(--light);}
  .specialty-tag{display:inline-block;background:#fef0ef;color:var(--red);font-size:.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:16px;}

  /* JOIN CTA */
  #join-cta{background:var(--red);padding:80px 60px;text-align:center;}
  #join-cta h2{font-family:var(--font-display);font-size:clamp(2rem,5vw,3.5rem);color:var(--light);letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;}
  #join-cta p{color:rgba(255,255,255,.8);font-size:1rem;margin-bottom:36px;}
  #join-cta .btn-light{display:inline-flex;align-items:center;gap:14px;background:var(--light);color:var(--red);font-family:var(--font-body);font-weight:700;font-size:.88rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 10px 10px 32px;border-radius:50px;border:none;cursor:pointer;transition:background .3s,transform .2s;}
  #join-cta .btn-light:hover{background:#f0f0f0;transform:translateY(-2px);}
  #join-cta .btn-light .play-icon{width:38px;height:38px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  #join-cta .btn-light .play-icon i{color:var(--light);font-size:.72rem;margin-left:2px;}

  #footer{background:var(--dark);padding:60px 60px 30px;color:#aaa;}
  .footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr;gap:40px;margin-bottom:40px;}
  .footer-brand .logo{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
  .footer-brand .logo .logo-icon{width:36px;height:36px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--light);font-size:1rem;}
  .footer-brand .logo span{font-family:var(--font-display);font-size:1.2rem;letter-spacing:2px;color:var(--light);}
  .footer-brand p{font-size:.85rem;line-height:1.8;margin-bottom:20px;}
  .footer-social{display:flex;gap:10px;}
  .footer-social a{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:#aaa;font-size:.75rem;transition:background .3s,color .3s;}
  .footer-social a:hover{background:var(--red);color:var(--light);}
  .footer-col h4{font-family:var(--font-display);font-size:1rem;letter-spacing:2px;text-transform:uppercase;color:var(--light);margin-bottom:20px;}
  .footer-col ul li{margin-bottom:10px;font-size:.85rem;}
  .footer-col ul li::before{content:'▶';font-size:.5rem;color:var(--red);margin-right:8px;vertical-align:middle;}
  .footer-col ul li a{color:#aaa;transition:color .3s;}
  .footer-col ul li a:hover{color:var(--red);}
  .footer-contact .contact-item{display:flex;flex-direction:column;margin-bottom:12px;}
  .footer-contact .contact-item strong{color:var(--light);font-size:.85rem;margin-bottom:2px;}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:24px;text-align:center;font-size:.8rem;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    #trainers-full,#join-cta,#footer{padding-left:30px;padding-right:30px;}
    .trainers-grid{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    .trainers-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr;}
  }
`;

const trainers = [
  { name: "Marvin Joiner", role: "CrossFit Coach", specialty: "Strength & Conditioning", bio: "10+ years coaching elite athletes. Certified CrossFit Level 3 trainer with expertise in Olympic lifting and metabolic conditioning." },
  { name: "Patricia Woodrum", role: "Cardio & Conditioning", specialty: "Endurance Training", bio: "Former marathon runner turned coach. Specialises in aerobic base building, zone training, and race preparation strategies." },
  { name: "Hannaz Stone", role: "Fitness Coach", specialty: "Body Recomposition", bio: "Passionate about helping everyday people transform their physique through science-backed programming and sustainable habits." },
  { name: "Derek Hale", role: "Strength & Power", specialty: "Powerlifting", bio: "Competitive powerlifter and certified strength coach. Programs for beginners through to competitive lifters." },
  { name: "Aisha Patel", role: "Yoga & Mobility", specialty: "Flexibility & Recovery", bio: "Certified yoga instructor and mobility specialist helping clients move better, recover faster, and stay injury-free." },
  { name: "Tom Reeves", role: "Youth Performance", specialty: "Youth Athletics", bio: "Dedicated to developing young athletes with age-appropriate training, movement fundamentals, and a love for sport." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
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
  useEffect(() => { const s = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
  const links = [
    { href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" },
    { href: "/trainers", label: "Trainers" }, { href: "/pricing", label: "Pricing" }, { href: "/coming-soon", label: "Coming Soon" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/trainers" ? "active" : ""}>{l.label}</a>)}
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
      <div className="page-hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>OUR<br />TRAINERS</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Trainers</span>
        </div>
      </div>
    </section>
  );
}

function TrainersFull() {
  return (
    <section id="trainers-full">
      <span className="section-label reveal">Team Members</span>
      <h2 className="section-title reveal">Meet Our Expert Coaches</h2>
      <div className="trainers-grid">
        {trainers.map((t, i) => (
          <div className="trainer-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="trainer-avatar"><i className="fas fa-user" /></div>
            <span className="specialty-tag">{t.specialty}</span>
            <h3>{t.name}</h3>
            <span className="role">{t.role}</span>
            <p>{t.bio}</p>
            <div className="trainer-social">
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fab fa-instagram" /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function JoinCta() {
  return (
    <section id="join-cta">
      <h2 className="reveal">Train With The Best</h2>
      <p className="reveal">Book a free consultation with one of our expert coaches today.</p>
      <motion.a href="/contact" whileTap={{ scale: 0.95 }} className="btn-light reveal">
        Book Now <span className="play-icon"><i className="fas fa-play" /></span>
      </motion.a>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <div className="logo"><div className="logo-icon"><i className="fas fa-dumbbell" /></div><span>Stairs</span></div>
          <p>Fulatrumat est aun dolorem ipsum natus dolor sit amet...</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a><a href="#"><i className="fab fa-twitter" /></a><a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col" style={{ paddingTop: 0 }}>
          <h4>Opening Hours</h4>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.8 }}><strong style={{ color: "#ccc" }}>Mon – Sat:</strong> 12:00 – 14:45</p>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.8, marginTop: 8 }}><strong style={{ color: "#ccc" }}>Sun – Thu:</strong> 17:30 – 00:00</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>{["about", "services", "trainers", "pricing", "contact"].map((l) => (<li key={l}><a href={`/${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>))}</ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne, 3000</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}

export default function TrainersPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <TrainersFull />
      <JoinCta />
      <Footer />
    </>
  );
}
