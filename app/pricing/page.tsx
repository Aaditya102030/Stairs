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
  .section-label{font-family:var(--font-body);font-weight:600;font-size:.85rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
  .section-title{font-family:var(--font-display);font-size:clamp(2rem,4vw,3.2rem);line-height:1.1;letter-spacing:1px;text-transform:uppercase;}
  .btn-primary{display:inline-flex;align-items:center;gap:14px;background:var(--red);color:var(--light);font-family:var(--font-body);font-weight:700;font-size:.88rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 10px 10px 32px;border-radius:50px;border:none;cursor:pointer;transition:background .3s,transform .2s;}
  .btn-primary:hover{background:#c0251b;transform:translateY(-2px);}
  .btn-primary .play-icon{width:38px;height:38px;background:var(--light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .btn-primary .play-icon i{color:var(--red);font-size:.72rem;margin-left:2px;}
  .btn-outline{display:inline-block;border:2px solid var(--red);color:var(--red);font-weight:700;font-size:.8rem;letter-spacing:1px;text-transform:uppercase;padding:10px 28px;border-radius:30px;transition:background .3s,color .3s;}
  .btn-outline:hover{background:var(--red);color:var(--light);}
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
  .hero-3d-scene{position:absolute;right:0;top:0;bottom:0;width:55%;display:flex;align-items:center;justify-content:center;z-index:1;pointer-events:none;}
  @keyframes float1{0%,100%{transform:translateY(0px) rotate(-8deg);}50%{transform:translateY(-22px) rotate(-8deg);}}
  @keyframes float2{0%,100%{transform:translateY(0px) rotate(12deg);}50%{transform:translateY(-16px) rotate(12deg);}}
  @keyframes float3{0%,100%{transform:translateY(0px) rotate(-4deg);}50%{transform:translateY(-28px) rotate(-4deg);}}
  @keyframes float4{0%,100%{transform:translateY(0px) rotate(6deg);}50%{transform:translateY(-14px) rotate(6deg);}}
  @keyframes pulse-ring{0%,100%{opacity:.18;transform:scale(1);}50%{opacity:.32;transform:scale(1.06);}}
  @keyframes spin-ring{to{transform:rotate(360deg);}}
  @keyframes spin-slow{to{transform:translateY(-50%) rotate(360deg);}}
  .page-hero-content{position:relative;z-index:2;padding:0 60px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,6rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  @keyframes gradientSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

  /* PRICING */
  #pricing-full{padding:90px 60px;background:var(--bg-light);text-align:center;}
  .pricing-header{margin-bottom:60px;}
  .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1000px;margin:0 auto;}
  .pricing-card{position:relative;border-radius:16px;overflow:visible;transition:transform .3s,box-shadow .3s;box-shadow:0 4px 16px rgba(0,0,0,.07);z-index:0;}
  .pricing-card.featured{transform:scale(1.04);}
  .pricing-card::before{content:'';position:absolute;inset:-3px;border-radius:18px;background:linear-gradient(135deg,#e8372c,#ff6b35,#ffb347,#e8372c,#8b0000);background-size:300% 300%;z-index:-1;opacity:0;transition:opacity .4s ease;animation:gradientSpin 3s ease infinite;}
  .pricing-card.featured::before{opacity:1;}
  .pricing-card::after{content:'';position:absolute;inset:2px;border-radius:14px;background:#fff;z-index:-1;}
  .pricing-card:hover{transform:translateY(-8px);box-shadow:0 16px 40px rgba(232,55,44,.25);}
  .pricing-card:hover::before{opacity:1;}
  .pricing-card.featured:hover{transform:scale(1.04) translateY(-8px);}
  .card-img{height:180px;background:#222;position:relative;overflow:hidden;border-radius:14px 14px 0 0;}
  .card-img .img-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:rgba(255,255,255,.2);font-size:.75rem;letter-spacing:1px;}
  .card-img .img-placeholder i{font-size:2rem;margin-bottom:8px;}
  .featured-badge{position:absolute;top:12px;right:12px;background:var(--red);color:var(--light);font-size:.65rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;}
  .price-badge{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);background:var(--red);color:var(--light);border-radius:50%;width:80px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1.6rem;letter-spacing:0;line-height:1;z-index:2;}
  .price-badge small{font-size:.55rem;letter-spacing:1px;font-family:var(--font-body);}
  .pricing-body{padding:46px 30px 30px;text-align:center;}
  .pricing-body h3{font-family:var(--font-display);font-size:1.4rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;}
  .pricing-body ul{margin-bottom:28px;}
  .pricing-body ul li{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;color:#555;}
  .pricing-body ul li i{color:var(--red);font-size:.8rem;}
  .pricing-body ul li.no i{color:#ccc;}
  .pricing-body ul li.no{color:#ccc;text-decoration:line-through;}

  /* FAQ */
  #faq{background:var(--darker);padding:90px 60px;}
  #faq .section-label{color:var(--red);display:block;margin-bottom:10px;}
  #faq .section-title{color:var(--light);margin-bottom:50px;}
  .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:0 auto;}

  /* Edge Glow Card */
  .faq-item{
    position:relative;
    background:rgba(255,255,255,.05);
    border-radius:12px;
    padding:24px 28px;
    transition:transform .3s;
    overflow:hidden;
    isolation:isolate;
  }
  .faq-item::before{
    content:'';
    position:absolute;
    inset:-1px;
    border-radius:12px;
    background:conic-gradient(
      from var(--angle, 0deg),
      transparent 0deg,
      transparent 60deg,
      #e8372c 120deg,
      #ff6b6b 180deg,
      #e8372c 240deg,
      transparent 300deg,
      transparent 360deg
    );
    z-index:-1;
    opacity:0;
    transition:opacity .4s;
    animation:faq-spin 3s linear infinite;
    animation-play-state:paused;
  }
  .faq-item::after{
    content:'';
    position:absolute;
    inset:1px;
    border-radius:11px;
    background:#111827;
    z-index:-1;
  }
  .faq-item:hover::before{
    opacity:1;
    animation-play-state:running;
  }
  .faq-item:hover{
    transform:translateY(-4px);
  }
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes faq-spin{
    to { --angle: 360deg; }
  }
  .faq-item h4{font-family:var(--font-display);font-size:1rem;color:var(--light);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;}
  .faq-item p{color:rgba(255,255,255,.6);font-size:.88rem;line-height:1.7;}

  /* Typewriter animation for QUESTIONS */
  .typewriter-word{
    display:inline-block;
    position:relative;
    overflow:hidden;
    border-right:4px solid rgba(255,255,255,.75);
    width:0px;
    white-space:nowrap;
    vertical-align:bottom;
    animation:faq-typewriter 2s steps(5) infinite alternate, faq-blink 0.5s steps(9) infinite;
  }
  @keyframes faq-typewriter{
    0%{width:0px;}
    100%{width:410px;}
  }
  @keyframes faq-blink{
    0%{border-right-color:rgba(255,255,255,.75);}
    100%{border-right-color:transparent;}
  }

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
    #pricing-full,#faq,#footer{padding-left:30px;padding-right:30px;}
    .pricing-grid{grid-template-columns:1fr 1fr;}
    .faq-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    .pricing-grid{grid-template-columns:1fr;}.pricing-card.featured{transform:none;}
    .footer-grid{grid-template-columns:1fr;}
  }
`;

const pricingPlans = [
  {
    price: "$45", title: "Basic Gym", featured: false,
    features: [
      { text: "Unlimited club access", ok: true },
      { text: "Group attendance", ok: true },
      { text: "Gym visits", ok: true },
      { text: "Bath complex access", ok: false },
      { text: "Personal trainer session", ok: false },
      { text: "Nutrition consultation", ok: false },
    ]
  },
  {
    price: "$50", title: "Standard Gym", featured: true,
    features: [
      { text: "Unlimited club access", ok: true },
      { text: "Group attendance", ok: true },
      { text: "Gym visits", ok: true },
      { text: "Bath complex access", ok: true },
      { text: "Personal trainer session", ok: false },
      { text: "Nutrition consultation", ok: false },
    ]
  },
  {
    price: "$60", title: "Premium Gym", featured: false,
    features: [
      { text: "Unlimited club access", ok: true },
      { text: "Group attendance", ok: true },
      { text: "Gym visits", ok: true },
      { text: "Bath complex access", ok: true },
      { text: "Personal trainer session", ok: true },
      { text: "Nutrition consultation", ok: true },
    ]
  },
];

const faqs = [
  { q: "How do I schedule an appointment?", a: "Our scheduling is easy and we offer a convenient location and appointment times with our physiotherapist and S & C Coach for you through our online booking option in our website. We have morning and evening appointments available to meet the demands of your busy schedule." },
  { q: "How do we treat Physical Therapy at Stairs?", a: "As a patient, at Stairs Physiotherapy and Fitness Centre, you will receive the highest quality care while achieving the results you need. We pride ourselves on providing a positive, encouraging environment with well-trained, friendly staff. We are confident in our ability to help you reach your goals and live a pain-free life.  "},
  { q: "How long does a physiotherapy/traning session last?", a: "Typically, the first session lasts for 1 hour. Each session after that may be 45-60 minutes. The amount of time will be based on your specific needs and your therapist will discuss this with you." },
  { q: "How many session do I need before I can fully recover from my injury?", a: "Each patients’ diagnosis is different, so your therapist will develop a plan of care that is right for you. Your plan of care and number of visits will be determined during your first visit and explained to you by your physical therapist." },
  { q: "How can you treat my injury without touching me?", a: "Physical therapy is more than hands-on treatment. It focuses on patient education, lifestyle improvement, and personalized exercise programs to support recovery. Modern therapy emphasizes guided self-care and rehabilitation, helping patients take control of their healing. Research shows online consultations can be highly effective, and if hands-on or medical care is needed, we will guide you immediately. " },
  { q: "What if I'm not sure if I'm doing my prescribed exercises right?", a: "During your evaluation and treatment sessions, we will guide you through every exercise and technique until you feel confident performing them correctly on your own. We encourage questions throughout the consultation to ensure you fully understand your treatment plan. Your confidence and understanding are essential for a successful recovery and long-term results." },
  { q: "Are online sessions available?", a: "Yes absolutely! If you would like to schedule an online session, simply book an appointment or call us on the numbers provided or fill out the contact form. These are one-on-one sessions with coaches/physiotherapists conducted on video platforms of your choice (such as Zoom, WhatsApp etc.)."},
  { q: "What forms of payment do you accept?", a: "We accept UPI, Cash and card payment (Please note : 3% extra on any card payments).We encourage our clients to make payments prior to the sessions by booking an appointment from the website." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/pricing" ? "active" : ""}>{l.label}</a>)}
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
            <rect x="90" y="151" width="80" height="8" rx="4" fill="url(#pBarGrad)"/>
            <rect x="170" y="138" width="22" height="34" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="174" y="133" width="14" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="90" y="151" width="80" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="130" y="172" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">20 KG</text>
          </g>
          <g style={{ animation: "float2 5s ease-in-out infinite", transformOrigin: "370px 145px" }}>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#e8372c" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#c0251b" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2.5"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="url(#pKettleGrad)"/>
            <rect x="356" y="118" width="28" height="10" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
            <text x="370" y="153" textAnchor="middle" fill="#e8372c" fontSize="8" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">16KG</text>
          </g>
          <g style={{ animation: "float3 6s ease-in-out infinite", transformOrigin: "260px 265px" }}>
            <rect x="82" y="246" width="28" height="52" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            <rect x="86" y="240" width="18" height="64" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="104" y="252" width="14" height="40" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            <rect x="118" y="258" width="284" height="12" rx="6" fill="url(#pBarGrad2)"/>
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
            <rect x="328" y="373" width="84" height="8" rx="4" fill="url(#pBarGrad)"/>
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
            <linearGradient id="pBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666"/><stop offset="40%" stopColor="#999"/><stop offset="100%" stopColor="#444"/>
            </linearGradient>
            <linearGradient id="pBarGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#777"/><stop offset="40%" stopColor="#aaa"/><stop offset="100%" stopColor="#555"/>
            </linearGradient>
            <radialGradient id="pKettleGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#444"/><stop offset="100%" stopColor="#111"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="page-hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>PRICING<br />PLANS</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Pricing</span>
        </div>
      </div>
    </section>
  );
}

function PricingFull() {
  return (
    <section id="pricing-full">
      <div className="pricing-header">
        <span className="section-label reveal">Pricing Tables</span>
        <h2 className="section-title reveal">Choose Your Plan</h2>
      </div>
      <div className="pricing-grid">
        {pricingPlans.map((plan, i) => (
          <div className={`pricing-card reveal${plan.featured ? " featured" : ""}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="card-img">
              <div className="img-placeholder"><i className="fas fa-image" />{plan.title}</div>
              {plan.featured && <span className="featured-badge">Most Popular</span>}
              <div className="price-badge">{plan.price}<small>Monthly</small></div>
            </div>
            <div className="pricing-body">
              <h3>{plan.title}</h3>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j} className={f.ok ? "" : "no"}>
                    <i className={f.ok ? "fas fa-check" : "fas fa-times"} /> {f.text}
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-outline">Join Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq">
      <span className="section-label reveal">FAQ</span>
      <h2 className="section-title reveal">Common <span className="typewriter-word">Questions</span></h2>
      <br /><br />
      <div className="faq-grid">
        {faqs.map((f, i) => (
          <div className="faq-item reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
            <h4>{f.q}</h4><p>{f.a}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <motion.a href="/contact" whileTap={{ scale: 0.95 }} className="btn-primary reveal">
          Still have questions? <span className="play-icon"><i className="fas fa-play" /></span>
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

export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <PricingFull />
      <FAQ />
      <Footer />
    </>
  );
}
