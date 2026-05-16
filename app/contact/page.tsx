"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  :root{--red:#e8372c;--dark:#111111;--darker:#0a0a0a;--light:#ffffff;--gray:#888888;--bg-light:#f5f5f5;--font-display:'Bebas Neue',sans-serif;--font-body:'Barlow',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}body{font-family:var(--font-body);color:var(--dark);background:var(--light);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  .reveal{opacity:0;transform:translateY(50px);transition:opacity .7s ease,transform .7s ease;}.reveal.visible{opacity:1;transform:translateY(0);}
  .reveal-right{opacity:0;transform:translateX(60px);transition:opacity .7s ease,transform .7s ease;}.reveal-right.visible{opacity:1;transform:translateX(0);}
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
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  /* CONTACT SECTION */
  #contact-full{position:relative;min-height:600px;background:var(--darker);display:flex;align-items:center;overflow:hidden;}
  .contact-bg{position:absolute;inset:0;background:url('/images/hero-bg.png') center/cover no-repeat;opacity:.25;}
  .contact-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,.2) 0%,rgba(10,10,10,.92) 50%);}
  .contact-circle{width:360px;height:360px;left:5%;top:50%;transform:translateY(-50%);border-width:20px;opacity:.6;pointer-events:none;}
  .contact-img-placeholder{position:absolute;left:0;top:0;bottom:0;width:48%;display:flex;align-items:center;justify-content:center;z-index:1;}
  .contact-img-box{width:380px;height:400px;background:rgba(255,255,255,.03);border:2px dashed rgba(255,255,255,.1);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:rgba(255,255,255,.2);font-size:.8rem;letter-spacing:1px;}
  .contact-img-box i{font-size:2.5rem;margin-bottom:10px;opacity:.3;}
  .contact-form-wrap{position:relative;z-index:2;margin-left:auto;width:50%;padding:80px 60px;}
  .contact-form-wrap .section-label{color:var(--red);}
  .contact-form-wrap .section-title{color:var(--light);margin-bottom:30px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
  .form-row.single{grid-template-columns:1fr;}
  .contact-form input,.contact-form textarea{width:100%;padding:14px 18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:4px;color:var(--light);font-family:var(--font-body);font-size:.9rem;outline:none;transition:border-color .3s;}
  .contact-form input::placeholder,.contact-form textarea::placeholder{color:rgba(255,255,255,.45);}
  .contact-form input:focus,.contact-form textarea:focus{border-color:var(--red);}
  .contact-form textarea{height:110px;resize:none;}
  .form-submit{margin-top:20px;}

  /* INFO CARDS */
  #contact-info{padding:80px 60px;background:var(--bg-light);}
  .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:900px;margin:0 auto;}
  .info-card{background:#fff;border-radius:16px;padding:32px 28px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.07);transition:transform .3s,box-shadow .3s;}
  .info-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(232,55,44,.2);}
  .info-card .icon{width:60px;height:60px;background:#fef0ef;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;transition:background .3s;}
  .info-card:hover .icon{background:var(--red);}
  .info-card .icon i{font-size:1.3rem;color:var(--red);transition:color .3s;}
  .info-card:hover .icon i{color:var(--light);}
  .info-card h4{font-family:var(--font-display);font-size:1.1rem;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;}
  .info-card p{color:var(--gray);font-size:.88rem;line-height:1.7;}

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
  .footer-col ul li a{color:#aaa;transition:color .3s;}.footer-col ul li a:hover{color:var(--red);}
  .footer-contact .contact-item{display:flex;flex-direction:column;margin-bottom:12px;}
  .footer-contact .contact-item strong{color:var(--light);font-size:.85rem;margin-bottom:2px;}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:24px;text-align:center;font-size:.8rem;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    #contact-info,#footer{padding-left:30px;padding-right:30px;}
    .contact-form-wrap{padding:60px 30px;}
    .info-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    .contact-img-placeholder{display:none;}
    .contact-form-wrap{width:100%;margin:0;padding:60px 20px;}
    .form-row{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr;}
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-right");
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
        {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="/contact" className="contact-btn active">Contact</a>
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
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>CONTACT<br />US</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Contact</span>
        </div>
      </div>
    </section>
  );
}

function ContactFull() {
  return (
    <section id="contact-full">
      <div className="contact-bg" />
      <div className="circle-deco contact-circle" />
      <div className="contact-img-placeholder">
        <div className="contact-img-box"><i className="fas fa-image" />contact-bg.jpg</div>
      </div>
      <div className="contact-form-wrap reveal-right">
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title">Send Us A Message<br />&amp; Join Our Team</h2>
        <div className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Your Name" />
            <input type="tel" placeholder="Phone Number" />
          </div>
          <div className="form-row">
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-row single">
            <textarea placeholder="Your Message" />
          </div>
          <div className="form-submit">
            <motion.button whileTap={{ scale: 0.95 }} className="btn-primary" type="button">
              Send Now <span className="play-icon"><i className="fas fa-play" /></span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <section id="contact-info">
      <div className="info-grid">
        {[
          { icon: "fas fa-map-marker-alt", title: "Address", text: "121 King Street, Melbourne 3000, Australia" },
          { icon: "fas fa-phone-alt", title: "Phone", text: "+61 3 8376 6284\n+61 3 8376 6285" },
          { icon: "fas fa-envelope", title: "Email", text: "info@stairs.com\nsupport@stairs.com" },
        ].map((c, i) => (
          <div className="info-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="icon"><i className={c.icon} /></div>
            <h4>{c.title}</h4>
            <p style={{ whiteSpace: "pre-line" }}>{c.text}</p>
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
          <div className="logo"><div className="logo-icon"><i className="fas fa-dumbbell" /></div><span>Stairs</span></div>
          <p>Fulatrumat est aun dolorem ipsum natus dolor sit amet...</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a><a href="#"><i className="fab fa-twitter" /></a><a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Opening Hours</h4>
          <p style={{ fontSize: ".85rem", lineHeight: 1.8 }}><strong style={{ color: "#ccc" }}>Mon – Sat:</strong> 12:00 – 14:45</p>
          <p style={{ fontSize: ".85rem", lineHeight: 1.8, marginTop: 8 }}><strong style={{ color: "#ccc" }}>Sun – Thu:</strong> 17:30 – 00:00</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>{["about","services","trainers","pricing","contact"].map((l)=>(<li key={l}><a href={`/${l}`}>{l.charAt(0).toUpperCase()+l.slice(1)}</a></li>))}</ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <ContactFull />
      <ContactInfo />
      <Footer />
    </>
  );
}
