"use client";

import { useState, useEffect } from "react";
import BranchesFooter from "@/components/BranchesFooter";

/* Online Strength Training plans.
   Replace `buyUrl` with a payment link (Razorpay / Stripe / WhatsApp, etc.) when you have one. */
const plans = [
  {
    title: "Online S&C - 12 Sessions",
    price: "4,500",
    validity: "Valid for one month",
    buyUrl: "/contact",
    featured: false,
  },
  {
    title: "Online S&C - 36 Sessions",
    price: "12,500",
    validity: "Valid for 3 months",
    buyUrl: "/contact",
    featured: true,
  },
  {
    title: "Online S&C - 72 Sessions",
    price: "25,000",
    validity: "Valid for 6 months",
    buyUrl: "/contact",
    featured: false,
  },
];

const planDescription =
  "Energize your body and boost strength in our online S&C group fitness sessions for a transformation";

const included = [
  "Personalized training plan",
  "One-to-one online coaching sessions",
  "Exercise technique and movement guidance",
  "Progressive strength and conditioning",
  "Training adjustments based on your progress",
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
  :root{--red:#e8372c;--dark:#111111;--darker:#0a0a0a;--light:#ffffff;--gray:#888888;--font-display:'Bebas Neue',sans-serif;--font-body:'Barlow',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:var(--dark);background:#000;overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}

  /* NAVBAR */
  #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:18px 60px;transition:background .4s,padding .4s;}
  #navbar.scrolled{background:rgba(10,10,10,.95);padding:12px 60px;backdrop-filter:blur(8px);}
  .nav-logo{display:flex;align-items:center;gap:10px;color:var(--light);}
  .nav-links{display:flex;align-items:center;gap:32px;}
  .nav-links a{color:var(--light);font-size:.85rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;position:relative;transition:color .3s;}
  .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--red);transition:width .3s;}
  .nav-links a:hover::after{width:100%;}
  .nav-links a:hover{color:var(--red);}
  .nav-links .contact-btn{border:2px solid var(--red);padding:7px 20px;border-radius:30px;color:var(--light);transition:background .3s;}
  .nav-links .contact-btn:hover{background:var(--red);}
  .nav-links .contact-btn::after{display:none;}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;}
  .hamburger span{display:block;width:26px;height:2px;background:var(--light);}

  /* PAGE HERO */
  #page-hero{position:relative;min-height:46vh;background:var(--darker);display:flex;align-items:center;justify-content:center;overflow:hidden;padding-top:80px;text-align:center;}
  .page-hero-bg{position:absolute;inset:0;background:url('/images-optimized/DSC02060.webp') center/cover no-repeat;opacity:.3;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:rgba(10,10,10,.65);}
  .page-hero-content{position:relative;z-index:2;padding:0 40px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:inline-block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,5.5rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;justify-content:center;flex-wrap:wrap;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  /* PLANS */
  #osc-plans{background:#222;padding:90px 24px 100px;}
  .osc-head{text-align:center;max-width:900px;margin:0 auto 70px;}
  .osc-head h2{font-family:var(--font-display);font-size:clamp(2.4rem,5.5vw,4.2rem);letter-spacing:2px;line-height:1.05;color:#fff;text-transform:uppercase;margin-bottom:14px;}
  .osc-head p{font-size:clamp(1.05rem,2.2vw,1.5rem);color:#fff;font-weight:400;}
  .osc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:1200px;margin:0 auto;}
  .osc-card{position:relative;border:1px solid rgba(255,255,255,.18);padding:48px 34px 40px;text-align:center;color:#fff;display:flex;flex-direction:column;align-items:center;transition:transform .3s,box-shadow .3s;}
  .osc-card:hover{transform:translateY(-6px);box-shadow:0 14px 36px rgba(0,0,0,.45);}
  .osc-card.featured{background:#3a3a3a;box-shadow:0 0 30px rgba(255,255,255,.06);}
  .osc-badge{position:absolute;top:-18px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;font-size:1rem;padding:6px 18px;white-space:nowrap;}
  .osc-card h3{font-weight:600;font-size:1.2rem;margin-bottom:18px;}
  .osc-price{font-family:var(--font-display);font-size:5.2rem;line-height:1;letter-spacing:1px;margin-bottom:22px;display:flex;align-items:flex-start;justify-content:center;gap:4px;}
  .osc-price sup{font-family:var(--font-body);font-weight:700;font-size:1.4rem;margin-top:10px;}
  .osc-desc{font-size:1.1rem;line-height:1.55;font-weight:400;margin-bottom:16px;max-width:300px;}
  .osc-valid{font-size:.92rem;margin-bottom:28px;color:rgba(255,255,255,.9);}
  .osc-buy{margin-top:auto;display:block;width:100%;background:var(--red);color:#fff;font-weight:600;font-size:1.1rem;padding:15px 20px;border-radius:50px;transition:background .25s,transform .25s;}
  .osc-buy:hover{background:#c0251b;transform:translateY(-2px);}

  /* WHAT'S INCLUDED */
  #osc-included{background:#111;padding:70px 24px;}
  .osc-inc-inner{max-width:820px;margin:0 auto;}
  .osc-inc-inner h2{font-family:var(--font-display);font-size:clamp(1.9rem,4vw,2.8rem);letter-spacing:2px;color:#fff;text-align:center;margin-bottom:8px;}
  .osc-inc-inner .lbl{display:block;text-align:center;color:var(--red);font-weight:700;font-size:.8rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:30px;}
  .osc-inc-list li{display:flex;align-items:flex-start;gap:14px;color:rgba(255,255,255,.85);font-size:1rem;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.1);}
  .osc-inc-list li i{color:var(--red);margin-top:4px;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    .osc-grid{gap:24px;}
    .osc-price{font-size:4.2rem;}
  }
  @media(max-width:900px){
    .osc-grid{grid-template-columns:1fr;max-width:460px;gap:46px;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    #osc-plans{padding:70px 18px 80px;}
    .osc-head{margin-bottom:56px;}
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    document.querySelectorAll("#page-hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/trainers", label: "Team" },
    { href: "/pricing", label: "Initiatives" },
    { href: "/fit2run", label: "Fit2Run" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><a href="/"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></a></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

export default function OnlineStrengthTrainingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* PAGE HERO */}
      <section id="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <span className="sub reveal">Stairs</span>
          <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>ONLINE STRENGTH TRAINING</h1>
          <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
            <a href="/">Home</a><span>/</span>
            <span style={{ color: "#fff" }}>Online Strength Training</span>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="osc-plans">
        <div className="osc-head">
          <h2 className="reveal">Every Rep, Every Set Matters</h2>
          <p className="reveal">Choose a plan that aligns with the person you want to become</p>
        </div>
        <div className="osc-grid">
          {plans.map((p) => (
            <div key={p.title} className={`osc-card reveal${p.featured ? " featured" : ""}`}>
              {p.featured && <span className="osc-badge">Best Value</span>}
              <h3>{p.title}</h3>
              <div className="osc-price"><sup>₹</sup>{p.price}</div>
              <p className="osc-desc">{planDescription}</p>
              <p className="osc-valid">{p.validity}</p>
              <a href={p.buyUrl} className="osc-buy">Buy Now</a>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="osc-included">
        <div className="osc-inc-inner">
          <h2 className="reveal">Online Strength Training</h2>
          <span className="lbl reveal">What&apos;s Included</span>
          <ul className="osc-inc-list">
            {included.map((f) => (
              <li key={f} className="reveal"><i className="fas fa-check" />{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <BranchesFooter />
    </>
  );
}
