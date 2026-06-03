"use client";

import { useState, useEffect } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  :root{--red:#e8372c;--dark:#111111;--darker:#0a0a0a;--light:#ffffff;--gray:#888888;--bg-light:#f5f5f5;--font-display:'Bebas Neue',sans-serif;--font-body:'Barlow',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:var(--dark);background:var(--light);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  img{max-width:100%;display:block;}

  .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .section-label{font-family:var(--font-body);font-weight:600;font-size:.85rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}

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
  #page-hero{position:relative;min-height:50vh;background:var(--darker);display:flex;align-items:center;justify-content:center;overflow:hidden;padding-top:80px;text-align:center;}
  .page-hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80') center/cover no-repeat;opacity:.3;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:rgba(10,10,10,.65);}
  .page-hero-content{position:relative;z-index:2;padding:0 40px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:inline-block;}
  .page-hero-content h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5.5rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;justify-content:center;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  /* TAB SWITCHER */
  #tab-section{background:#111;position:sticky;top:72px;z-index:100;border-bottom:1px solid rgba(255,255,255,.08);}
  .tab-bar{display:flex;justify-content:center;max-width:500px;margin:0 auto;}
  .tab-btn{flex:1;padding:18px 32px;background:transparent;border:none;color:rgba(255,255,255,.5);font-family:'Barlow',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:2px;text-transform:uppercase;cursor:pointer;position:relative;transition:color .3s;}
  .tab-btn::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--red);transform:scaleX(0);transition:transform .3s;}
  .tab-btn.active{color:#fff;}
  .tab-btn.active::after{transform:scaleX(1);}

  /* SECTION WRAPPER */
  .pricing-section{display:none;}.pricing-section.active{display:block;}

  /* ONLINE PLANS */
  #online-plans{background:var(--darker);padding:90px 60px;}
  .online-hero-text{text-align:center;margin-bottom:60px;}
  .online-hero-text h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,5vw,3.8rem);color:#fff;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
  .online-hero-text p{color:rgba(255,255,255,.6);font-size:1rem;max-width:560px;margin:0 auto;}
  .plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1000px;margin:0 auto;}
  .plan-card{background:#1a1a1a;border-radius:16px;padding:40px 28px 32px;border:1px solid rgba(255,255,255,.08);position:relative;text-align:center;transition:transform .3s,box-shadow .3s;}
  .plan-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(232,55,44,.2);}
  .plan-card.featured{background:#1e1e1e;border-color:var(--red);}
  .best-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;font-family:'Barlow',sans-serif;font-weight:700;font-size:.72rem;letter-spacing:2px;text-transform:uppercase;padding:5px 18px;border-radius:20px;white-space:nowrap;}
  .plan-name{color:rgba(255,255,255,.65);font-size:.9rem;font-weight:600;letter-spacing:1px;margin-bottom:16px;}
  .plan-price{font-family:'Bebas Neue',sans-serif;font-size:3.8rem;color:#fff;line-height:1;letter-spacing:-1px;margin-bottom:4px;}
  .plan-price sup{font-size:1.8rem;vertical-align:super;margin-right:2px;}
  .plan-validity{color:rgba(255,255,255,.4);font-size:.78rem;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;}
  .plan-desc{color:rgba(255,255,255,.55);font-size:.88rem;line-height:1.7;margin-bottom:28px;}
  .plan-btn{display:block;width:100%;background:var(--red);color:#fff;font-family:'Barlow',sans-serif;font-weight:700;font-size:.82rem;letter-spacing:2px;text-transform:uppercase;padding:13px 0;border-radius:50px;border:none;cursor:pointer;transition:background .3s;text-decoration:none;}
  .plan-btn:hover{background:#c0251b;}
  .plan-card:not(.featured) .plan-btn{background:rgba(232,55,44,.12);color:var(--red);border:1.5px solid var(--red);}
  .plan-card:not(.featured) .plan-btn:hover{background:var(--red);color:#fff;}

  /* FIT TO RUN PLAN */
  #fit-to-run-plan{position:relative;padding:90px 60px;background:var(--darker);overflow:hidden;}
  .ftr-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1400&q=80') center/cover no-repeat;opacity:.25;}
  .ftr-bg::after{content:'';position:absolute;inset:0;background:rgba(10,10,10,.7);}
  .ftr-wrap{position:relative;z-index:1;max-width:700px;margin:0 auto;text-align:center;}
  .ftr-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,6vw,4.5rem);color:var(--red);font-style:italic;letter-spacing:2px;margin-bottom:8px;}
  .ftr-subtitle{color:#fff;font-weight:700;font-size:1.1rem;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;}
  .ftr-price{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,3.5rem);color:var(--red);letter-spacing:1px;margin-bottom:4px;}
  .ftr-duration{color:rgba(255,255,255,.5);font-size:.78rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:36px;}
  .ftr-features{text-align:left;max-width:580px;margin:0 auto 36px;display:flex;flex-direction:column;gap:14px;list-style:none;}
  .ftr-features li{display:flex;align-items:flex-start;gap:12px;color:rgba(255,255,255,.8);font-size:.92rem;line-height:1.6;font-style:italic;}
  .ftr-features li::before{content:'•';color:var(--red);font-size:1.4rem;flex-shrink:0;line-height:1.3;}
  .ftr-btn{display:inline-flex;align-items:center;gap:10px;background:var(--red);color:#fff;font-family:'Barlow',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:2px;text-transform:uppercase;padding:13px 36px;border-radius:50px;border:none;cursor:pointer;transition:background .3s;text-decoration:none;}
  .ftr-btn:hover{background:#c0251b;}

  /* OFFLINE PLANS */
  #offline-plans{background:#fff;padding:90px 60px;}
  .offline-intro{text-align:center;margin-bottom:70px;}
  .offline-intro h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,5vw,3.5rem);color:var(--dark);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
  .offline-intro p{color:#666;font-size:1rem;max-width:560px;margin:0 auto;}
  .service-pricing-block{margin-bottom:72px;}
  .service-pricing-block:last-child{margin-bottom:0;}
  .spb-header{display:flex;align-items:center;gap:16px;margin-bottom:32px;padding-bottom:16px;border-bottom:2px solid #f0f0f0;}
  .spb-icon{width:52px;height:52px;background:rgba(232,55,44,.1);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .spb-icon i{color:var(--red);font-size:1.3rem;}
  .spb-header h3{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:2px;text-transform:uppercase;color:var(--dark);}
  .spb-header p{color:#888;font-size:.85rem;margin-top:2px;}
  .spb-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .spb-card{border-radius:14px;border:1px solid #eee;padding:32px 24px;text-align:center;transition:transform .3s,box-shadow .3s,border-color .3s;position:relative;background:#fff;}
  .spb-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(232,55,44,.12);border-color:var(--red);}
  .spb-card.best{border-color:var(--red);box-shadow:0 8px 30px rgba(232,55,44,.1);}
  .spb-best-tag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;font-size:.68rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 16px;border-radius:20px;white-space:nowrap;}
  .spb-sessions{color:#888;font-size:.82rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;}
  .spb-price{font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--dark);line-height:1;margin-bottom:4px;}
  .spb-price sup{font-size:1.4rem;vertical-align:super;}
  .spb-validity{color:#aaa;font-size:.75rem;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;}
  .spb-desc{color:#777;font-size:.83rem;line-height:1.6;margin-bottom:22px;}
  .spb-btn{display:block;width:100%;background:var(--red);color:#fff;font-family:'Barlow',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;padding:11px 0;border-radius:50px;border:none;cursor:pointer;transition:background .3s;text-decoration:none;}
  .spb-btn:hover{background:#c0251b;}
  .spb-card:not(.best) .spb-btn{background:transparent;color:var(--red);border:1.5px solid var(--red);}
  .spb-card:not(.best) .spb-btn:hover{background:var(--red);color:#fff;}

  /* FOOTER */
  #footer{background:var(--dark);padding:60px 60px 30px;color:#aaa;}
  .footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr;gap:40px;margin-bottom:40px;}
  .footer-brand p{font-size:.85rem;line-height:1.8;margin-bottom:20px;}
  .footer-social{display:flex;gap:10px;}
  .footer-social a{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:#aaa;font-size:.75rem;transition:background .3s,color .3s;}
  .footer-social a:hover{background:var(--red);color:var(--light);}
  .footer-col h4{font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:2px;text-transform:uppercase;color:var(--light);margin-bottom:20px;}
  .footer-col ul li{margin-bottom:10px;font-size:.85rem;}
  .footer-col ul li::before{content:'▶';font-size:.5rem;color:var(--red);margin-right:8px;vertical-align:middle;}
  .footer-col ul li a{color:#aaa;transition:color .3s;}
  .footer-col ul li a:hover{color:var(--red);}
  .footer-contact .contact-item{display:flex;flex-direction:column;margin-bottom:12px;}
  .footer-contact .contact-item strong{color:var(--light);font-size:.85rem;margin-bottom:2px;}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:24px;text-align:center;font-size:.8rem;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    #online-plans,#fit-to-run-plan,#offline-plans,#footer{padding-left:30px;padding-right:30px;}
    .plans-grid,.spb-cards{grid-template-columns:1fr 1fr;}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .plans-grid,.spb-cards{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr;}
  }
`;

const onlinePlans = [
  { name: "Online S&C – 12 Sessions", price: "4,500", validity: "Valid for one month", desc: "Energize your body and boost strength in our online S&C group fitness sessions for a transformation", featured: false },
  { name: "Online S&C – 36 Sessions", price: "12,500", validity: "Valid for 3 months", desc: "Energize your body and boost strength in our online S&C group fitness sessions for a transformation", featured: true },
  { name: "Online S&C – 72 Sessions", price: "25,000", validity: "Valid for 6 months", desc: "Energize your body and boost strength in our online S&C group fitness sessions for a transformation", featured: false },
];

const fitToRunFeatures = [
  "This program is designed for individuals at all running proficiency levels and those looking to embark on their fitness journey as well.",
  "Run at your convenience with our running plans on Tuesday, Thursday, and Saturday or join us at Kanterava Stadium at 6.30AM to run with our community.",
  "Enhance Performance Holistically.",
  "Increase Muscular Strength, Power & Endurance.",
  "Injury prevention and enhanced recovery.",
  "An Athletic Performance Training Platform.",
  "Enhance Mobility, Boost Stability.",
  "This program is structured to include warm-up routines, run preparation, injury prevention techniques, running-specific strength exercises, pain management strategies, and concludes with a community run.",
  "Take your fitness to the next level with our online and offline strength sessions! Whether you prefer working out from home or in-person, we've got you covered. Scroll down for details on our online strength classes and start your journey today!",
];

const offlineServices = [
  {
    icon: "fas fa-running", title: "Fit to Run", subtitle: "Offline Running Programme",
    cards: [
      { sessions: "1 Month", price: "3,500", validity: "4 weeks", desc: "Kickstart your running journey with guided sessions and injury prevention.", best: false },
      { sessions: "3 Months", price: "5,310", validity: "Incl. GST · 12 weeks", desc: "Full programme with S&C, physiotherapy & community runs. Best value!", best: true },
      { sessions: "6 Months", price: "9,500", validity: "24 weeks", desc: "Long-term commitment for serious runners looking to race and compete.", best: false },
    ],
  },
  {
    icon: "fas fa-spa", title: "Massage Therapy", subtitle: "Certified Specialist Therapists",
    cards: [
      { sessions: "Single Session", price: "1,200", validity: "60 minutes", desc: "Targeted deep tissue or sports massage for immediate relief and recovery.", best: false },
      { sessions: "5-Session Pack", price: "5,500", validity: "Valid for 2 months", desc: "Consistent therapy for sustained recovery, best for active athletes.", best: true },
      { sessions: "10-Session Pack", price: "10,000", validity: "Valid for 4 months", desc: "Comprehensive care plan for chronic issues and peak performance maintenance.", best: false },
    ],
  },
  {
    icon: "fas fa-notes-medical", title: "Physiotherapy", subtitle: "Prehab & Rehab Sessions",
    cards: [
      { sessions: "Single Session", price: "1,500", validity: "45–60 minutes", desc: "Assessment & treatment for injuries, pain, or movement dysfunction.", best: false },
      { sessions: "5-Session Pack", price: "6,500", validity: "Valid for 6 weeks", desc: "Structured rehab plan with progress tracking and home exercise guidance.", best: true },
      { sessions: "10-Session Pack", price: "12,000", validity: "Valid for 3 months", desc: "Full recovery programme ideal for post-surgery or chronic condition management.", best: false },
    ],
  },
  {
    icon: "fas fa-dumbbell", title: "Strength & Conditioning", subtitle: "In-Person Training Sessions",
    cards: [
      { sessions: "12 Sessions", price: "6,000", validity: "Valid for 6 weeks", desc: "Personalised S&C coaching to build strength and improve athletic performance.", best: false },
      { sessions: "24 Sessions", price: "11,000", validity: "Valid for 3 months", desc: "Progressive training blocks with regular assessments and plan updates.", best: true },
      { sessions: "48 Sessions", price: "20,000", validity: "Valid for 6 months", desc: "Long-term athletic development with comprehensive strength and mobility work.", best: false },
    ],
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
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
    { href: "/", label: "Home" }, { href: "/about", label: "About" },
    { href: "/services", label: "Services" }, { href: "/trainers", label: "Team" },
    { href: "/pricing", label: "Program" }, { href: "/coming-soon", label: "Initiatives" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

export default function NewPricingPage() {
  const [tab, setTab] = useState<"online" | "offline">("online");
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
          <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>PRICING PLANS</h1>
          <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
            <a href="/">Home</a><span>/</span>
            <a href="/pricing">Program</a><span>/</span>
            <span style={{ color: "#fff" }}>Pricing Plans</span>
          </div>
        </div>
      </section>

      {/* TAB BAR */}
      <div id="tab-section">
        <div className="tab-bar">
          <button className={`tab-btn${tab === "online" ? " active" : ""}`} onClick={() => setTab("online")}>
            <i className="fas fa-wifi" style={{ marginRight: 8 }} />Online
          </button>
          <button className={`tab-btn${tab === "offline" ? " active" : ""}`} onClick={() => setTab("offline")}>
            <i className="fas fa-map-marker-alt" style={{ marginRight: 8 }} />Offline
          </button>
        </div>
      </div>

      {/* ── ONLINE TAB ── */}
      <div className={`pricing-section${tab === "online" ? " active" : ""}`}>

        {/* S&C Online Plans */}
        <section id="online-plans">
          <div className="online-hero-text reveal">
            <h2>EVERY REP, EVERY SET MATTERS</h2>
            <p>Choose a plan that aligns with the person you want to become</p>
          </div>
          <div className="plans-grid">
            {onlinePlans.map((p, i) => (
              <div key={i} className={`plan-card reveal${p.featured ? " featured" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {p.featured && <span className="best-badge">Best Value</span>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price"><sup>₹</sup>{p.price}</div>
                <div className="plan-validity">{p.validity}</div>
                <div className="plan-desc">{p.desc}</div>
                <a href="/contact" className="plan-btn">Select</a>
              </div>
            ))}
          </div>
        </section>

        {/* Fit to Run Plan */}
        <section id="fit-to-run-plan">
          <div className="ftr-bg" />
          <div className="ftr-wrap">
            <div className="ftr-title reveal">Fit to Run</div>
            <div className="ftr-subtitle reveal">Everything a RUNNER needs</div>
            <div className="ftr-price reveal">₹5310/- incl GST</div>
            <div className="ftr-duration reveal">FOR 3 MONTHS</div>
            <ul className="ftr-features">
              {fitToRunFeatures.map((f, i) => (
                <li key={i} className="reveal" style={{ transitionDelay: `${i * 0.06}s` }}>{f}</li>
              ))}
            </ul>
            <a href="/contact" className="ftr-btn reveal">
              Join Now &nbsp;<i className="fas fa-arrow-right" />
            </a>
          </div>
        </section>
      </div>

      {/* ── OFFLINE TAB ── */}
      <div className={`pricing-section${tab === "offline" ? " active" : ""}`}>
        <section id="offline-plans">
          <div className="offline-intro reveal">
            <span className="section-label">In-Person · Bangalore</span>
            <h2>Offline Service Plans</h2>
            <p>All sessions conducted at our centre by certified coaches and therapists.</p>
          </div>

          {offlineServices.map((svc, si) => (
            <div key={si} className="service-pricing-block">
              <div className="spb-header reveal">
                <div className="spb-icon"><i className={svc.icon} /></div>
                <div>
                  <h3>{svc.title}</h3>
                  <p>{svc.subtitle}</p>
                </div>
              </div>
              <div className="spb-cards">
                {svc.cards.map((c, ci) => (
                  <div key={ci} className={`spb-card reveal${c.best ? " best" : ""}`} style={{ transitionDelay: `${ci * 0.1}s` }}>
                    {c.best && <span className="spb-best-tag">Best Value</span>}
                    <div className="spb-sessions">{c.sessions}</div>
                    <div className="spb-price"><sup>₹</sup>{c.price}</div>
                    <div className="spb-validity">{c.validity}</div>
                    <div className="spb-desc">{c.desc}</div>
                    <a href="/contact" className="spb-btn">Book Now</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* FOOTER */}
      <footer id="footer">
        <div className="footer-grid reveal">
          <div className="footer-brand">
            <img src="/logo.png" alt="Stairs" style={{ height: 60, width: "auto", marginBottom: 16 }} />
            <p>STAIRS is a premier physiotherapy &amp; performance centre helping athletes and individuals move better, recover faster, and reach their peak potential.</p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <p style={{ fontSize: ".85rem", lineHeight: 1.8 }}><strong style={{ color: "#ccc" }}>Mon – Sat:</strong> 12:00 – 14:45</p>
            <p style={{ fontSize: ".85rem", lineHeight: 1.8, marginTop: 8 }}><strong style={{ color: "#ccc" }}>Evenings:</strong> 17:30 – 00:00</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>{["about","services","trainers","pricing","contact"].map((l) => (
              <li key={l}><a href={`/${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
            ))}</ul>
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
    </>
  );
}
