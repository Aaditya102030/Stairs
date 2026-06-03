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
  #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:22px 72px;transition:background .4s,padding .4s,box-shadow .4s;}
  #navbar.scrolled{background:rgba(10,10,10,.95);padding:14px 72px;backdrop-filter:blur(12px);box-shadow:0 2px 40px rgba(0,0,0,.4);}
  .nav-logo{display:flex;align-items:center;gap:10px;color:var(--light);}
  .nav-links{display:flex;align-items:center;gap:38px;}
  .nav-links a{color:var(--light);font-size:.78rem;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;position:relative;transition:color .3s;}
  .nav-links a::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:2px;background:var(--red);transition:width .3s;}
  .nav-links a:hover::after,.nav-links a.active::after{width:100%;}
  .nav-links a.active,.nav-links a:hover{color:var(--red);}
  .nav-links .contact-btn{border:2px solid var(--red);padding:9px 26px;border-radius:30px;color:var(--light);font-size:.78rem;font-weight:700;letter-spacing:2px;transition:background .3s,color .3s;}
  .nav-links .contact-btn:hover{background:var(--red);color:#fff;}
  .nav-links .contact-btn::after{display:none;}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;}
  .hamburger span{display:block;width:26px;height:2px;background:var(--light);}
  #page-hero{position:relative;min-height:60vh;background:var(--darker);display:flex;align-items:center;overflow:hidden;padding-top:80px;}
  .page-hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1800&q=80') center/cover no-repeat;opacity:.55;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,.85) 40%,rgba(10,10,10,.2) 100%);}
  .page-hero-circle-wrap{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:420px;height:420px;pointer-events:none;z-index:2;}
  @keyframes ph-spin-cw{to{transform:rotate(360deg);}}
  @keyframes ph-spin-ccw{to{transform:rotate(-360deg);}}
  @keyframes ph-pulse{0%,100%{opacity:.5;}50%{opacity:1;}}
  @keyframes spin-ring{to{transform:rotate(360deg);}}
  @keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
  @keyframes pulse-ring{0%,100%{opacity:.18;transform:scale(1);}50%{opacity:.32;transform:scale(1.06);}}
  .contact-scene{position:absolute;left:0;top:0;bottom:0;width:48%;display:flex;align-items:center;justify-content:center;z-index:1;pointer-events:none;overflow:hidden;}
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
    #navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}
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
    { href: "/trainers", label: "Team" }, { href: "/pricing", label: "Program" }, { href: "/coming-soon", label: "Initiatives" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 70, width: "auto" }} /></div>
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
      <div className="page-hero-circle-wrap">
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="210" cy="210" r="200" stroke="rgba(232,55,44,0.15)" strokeWidth="1" style={{animation:"ph-pulse 3s ease-in-out infinite",transformOrigin:"210px 210px"}} />
          <circle cx="210" cy="210" r="178" stroke="#e8372c" strokeWidth="3" strokeLinecap="round" strokeDasharray="1118 373" style={{animation:"ph-spin-cw 8s linear infinite",transformOrigin:"210px 210px"}} />
          <circle cx="210" cy="210" r="155" stroke="rgba(232,55,44,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="487 487" style={{animation:"ph-spin-ccw 12s linear infinite",transformOrigin:"210px 210px"}} />
          <circle cx="210" cy="210" r="132" stroke="rgba(255,100,50,0.12)" strokeWidth="28" style={{animation:"ph-pulse 5s ease-in-out infinite 1s",transformOrigin:"210px 210px"}} />
        </svg>
      </div>
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
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact-full">
      <div className="contact-bg" />
      <div className="contact-scene" aria-hidden="true">
        <svg width="400" height="420" viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cGlow2" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#e8372c" stopOpacity="0.13"/>
              <stop offset="100%" stopColor="#e8372c" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="210" rx="170" ry="180" fill="url(#cGlow2)"/>
          <circle cx="200" cy="210" r="165" stroke="#e8372c" strokeWidth="1" strokeDasharray="6 14" opacity="0.15" style={{animation:"spin-ring 20s linear infinite",transformOrigin:"200px 210px"}}/>
          <circle cx="200" cy="210" r="130" stroke="#ff6a00" strokeWidth="1" strokeDasharray="3 18" opacity="0.1" style={{animation:"spin-ring 30s linear infinite reverse",transformOrigin:"200px 210px"}}/>
          <g style={{animation:"bob 5s ease-in-out infinite",transformOrigin:"200px 200px"}}>
            <rect x="60" y="130" width="280" height="190" rx="14" fill="#1a1a1a" stroke="#e8372c" strokeWidth="2"/>
            <path d="M60 130 L200 230 L340 130" fill="none" stroke="#e8372c" strokeWidth="2"/>
            <rect x="90" y="200" width="220" height="8" rx="4" fill="#2a2a2a"/>
            <rect x="90" y="220" width="180" height="8" rx="4" fill="#242424"/>
            <rect x="90" y="240" width="200" height="8" rx="4" fill="#242424"/>
            <rect x="90" y="260" width="100" height="8" rx="4" fill="#e8372c" opacity="0.6"/>
            <rect x="90" y="285" width="80" height="24" rx="12" fill="#e8372c" opacity="0.85"/>
            <rect x="100" y="293" width="50" height="6" rx="3" fill="#fff" opacity="0.7"/>
          </g>
          <g style={{animation:"bob 4s ease-in-out infinite 1s",transformOrigin:"320px 110px"}}>
            <rect x="300" y="70" width="42" height="70" rx="8" fill="#1e1e1e" stroke="#ff6a00" strokeWidth="1.5"/>
            <rect x="310" y="80" width="22" height="40" rx="3" fill="#2a2a2a"/>
            <circle cx="321" cy="128" r="4" fill="#ff6a00" opacity="0.8"/>
          </g>
          <g style={{animation:"bob 6s ease-in-out infinite 0.5s",transformOrigin:"80px 100px"}}>
            <circle cx="80" cy="85" r="22" fill="#1e1e1e" stroke="#e8372c" strokeWidth="1.5"/>
            <circle cx="80" cy="85" r="10" fill="#e8372c" opacity="0.8"/>
            <path d="M80 107 L72 130 L80 122 L88 130 Z" fill="#e8372c" opacity="0.8"/>
          </g>
          {([{x:50,y:300,d:"0s"},{x:360,y:280,d:"1s"},{x:200,y:380,d:"1.8s"},{x:340,y:80,d:"2.2s"}] as {x:number,y:number,d:string}[]).map((p,i)=>(
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
          ))}
        </svg>
      </div>
      <div className="contact-form-wrap reveal-right">
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title">Send Us A Message<br />&amp; Join Our Team</h2>
        <div className="contact-form">
          <div className="form-row">
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
          </div>
          <div className="form-row single">
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} />
          </div>
          {status === "error" && (
            <p style={{ color: "#ff6b6b", fontSize: ".85rem", marginBottom: 8 }}>
              {!form.name || !form.email || !form.message
                ? "Please fill in Name, Email and Message."
                : "Something went wrong. Please try again."}
            </p>
          )}
          {status === "success" && (
            <p style={{ color: "#4caf50", fontSize: ".85rem", marginBottom: 8 }}>
              ✓ Message sent! We&apos;ll get back to you soon.
            </p>
          )}
          <div className="form-submit">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Now"}
              {status !== "loading" && <span className="play-icon"><i className="fas fa-play" /></span>}
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
          { icon: "fab fa-instagram", title: "Instagram", text: "@stairs.physio" },
          { icon: "fas fa-phone-alt", title: "Phone", text: "083103 31077" },
          { icon: "fas fa-envelope", title: "Email", text: "connect.stairsphysiotherapy@gmail.com" },
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
          <div className="logo"><img src="/logo.png" alt="Stairs" style={{ height: 60, width: "auto" }} /></div>
          <p>STAIRS is a premier physiotherapy &amp; performance centre helping athletes and individuals move better, recover faster, and reach their peak potential.</p>
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
          <div className="contact-item"><strong>Instagram:</strong><span><a href="https://instagram.com/stairs.physio" target="_blank" rel="noreferrer" style={{color:"#aaa"}}>@stairs.physio</a></span></div>
          <div className="contact-item"><strong>Phone:</strong><span><a href="tel:08310331077" style={{color:"#aaa"}}>083103 31077</a></span></div>
          <div className="contact-item"><strong>Email:</strong><span><a href="mailto:connect.stairsphysiotherapy@gmail.com" style={{color:"#aaa"}}>connect.stairsphysiotherapy@gmail.com</a></span></div>
          <div className="contact-item"><strong>Messenger:</strong><span>Stairs - Physiotherapy &amp; Fitness</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2025 Stairs. All Rights Reserved.</p></div>
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
