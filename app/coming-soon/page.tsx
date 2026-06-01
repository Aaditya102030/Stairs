"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  :root{--red:#e8372c;--dark:#111111;--darker:#0a0a0a;--light:#ffffff;--gray:#888888;--bg-light:#f5f5f5;--font-display:'Bebas Neue',sans-serif;--font-body:'Barlow',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}body{font-family:var(--font-body);color:var(--dark);background:var(--darker);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  .reveal{opacity:0;transform:translateY(50px);transition:opacity .7s ease,transform .7s ease;}.reveal.visible{opacity:1;transform:translateY(0);}
  .section-label{font-family:var(--font-body);font-weight:600;font-size:.85rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
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
  .nav-links .contact-btn:hover{background:var(--red);color:#111;}
  .nav-links .contact-btn::after{display:none;}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;}
  .hamburger span{display:block;width:26px;height:2px;background:var(--light);}

  /* COMING SOON FULL PAGE */
  #coming-soon-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 40px 80px;position:relative;overflow:hidden;}
  .cs-bg{position:absolute;inset:0;background:url('/images/hero-bg.png') center/cover no-repeat;opacity:.25;}
  .cs-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(10,10,10,.6) 0%,rgba(10,10,10,.95) 100%);}
  .cs-circle-1{width:700px;height:700px;top:50%;left:50%;transform:translate(-50%,-50%);border-width:2px;opacity:.12;animation:spin-slow 30s linear infinite;}
  .cs-circle-2{width:500px;height:500px;top:50%;left:50%;transform:translate(-50%,-50%);border-width:2px;opacity:.18;animation:spin-slow 20s linear infinite reverse;}
  @keyframes spin-slow{to{transform:translate(-50%,-50%) rotate(360deg);}}
  .cs-content{position:relative;z-index:2;}
  .cs-content .section-label{color:var(--red);justify-content:center;display:block;margin-bottom:16px;}
  .cs-content h1{font-family:var(--font-display);font-size:clamp(3.5rem,12vw,9rem);color:var(--light);line-height:1;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;}
  .cs-content h1 span{color:var(--red);}
  .cs-content p{color:#aaa;font-size:1.05rem;max-width:520px;margin:0 auto 48px;line-height:1.8;}

  /* COUNTDOWN */
  .countdown{display:flex;gap:24px;justify-content:center;margin-bottom:50px;flex-wrap:wrap;}
  .cd-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px 30px;min-width:110px;transition:border-color .3s;}
  .cd-box:hover{border-color:var(--red);}
  .cd-box .num{font-family:var(--font-display);font-size:3.2rem;color:var(--light);letter-spacing:2px;line-height:1;display:block;}
  .cd-box .label{font-size:.7rem;color:#666;letter-spacing:2px;text-transform:uppercase;display:block;margin-top:6px;}

  /* NOTIFY FORM */
  .notify-form{display:flex;gap:12px;max-width:460px;margin:0 auto 40px;flex-wrap:wrap;justify-content:center;}
  .notify-form input{flex:1;min-width:200px;padding:14px 20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:50px;color:var(--light);font-family:var(--font-body);font-size:.9rem;outline:none;transition:border-color .3s;}
  .notify-form input::placeholder{color:rgba(255,255,255,.4);}
  .notify-form input:focus{border-color:var(--red);}
  .notify-form button{padding:14px 30px;background:var(--red);color:var(--light);font-family:var(--font-body);font-weight:700;font-size:.85rem;letter-spacing:1px;text-transform:uppercase;border:none;border-radius:50px;cursor:pointer;transition:background .3s;}
  .notify-form button:hover{background:#c0251b;}
  .cs-socials{display:flex;gap:14px;justify-content:center;}
  .cs-socials a{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#aaa;font-size:.85rem;transition:background .3s,color .3s,border-color .3s;}
  .cs-socials a:hover{background:var(--red);color:var(--light);border-color:var(--red);}

  @media(max-width:1024px){#navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}}
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .countdown{gap:12px;}.cd-box{min-width:80px;padding:16px 18px;}.cd-box .num{font-size:2.2rem;}
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    els.forEach((el) => el.classList.add("visible")); // all visible since it's a single screen
    return () => observer.disconnect();
  }, []);
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
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
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/coming-soon" ? "active" : ""}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

function ComingSoonContent() {
  // Target: 90 days from now (approximate launch date)
  const target = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section id="coming-soon-wrap">
      <div className="cs-bg" />
      <div className="circle-deco cs-circle-1" />
      <div className="circle-deco cs-circle-2" />
      <div className="cs-content">
        <span className="section-label reveal">Stairs</span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          COMING<br /><span>SOON</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          We're working hard on something amazing. Our new features are almost ready — stay tuned and be the first to know when we launch.
        </motion.p>

        <motion.div
          className="countdown reveal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[{ num: days, label: "Days" }, { num: hours, label: "Hours" }, { num: minutes, label: "Minutes" }, { num: seconds, label: "Seconds" }].map((c) => (
            <div className="cd-box" key={c.label}>
              <span className="num">{String(c.num).padStart(2, "0")}</span>
              <span className="label">{c.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="notify-form reveal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <input type="email" placeholder="Enter your email address" />
          <button type="button">Notify Me</button>
        </motion.div>

        <motion.div
          className="cs-socials reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="#"><i className="fab fa-facebook-f" /></a>
          <a href="#"><i className="fab fa-twitter" /></a>
          <a href="#"><i className="fab fa-instagram" /></a>
          <a href="#"><i className="fab fa-youtube" /></a>
        </motion.div>

        <motion.div style={{ marginTop: 40 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <a href="/" className="btn-primary">
            Back to Home <span className="play-icon"><i className="fas fa-play" /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function ComingSoonPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ComingSoonContent />
    </>
  );
}
