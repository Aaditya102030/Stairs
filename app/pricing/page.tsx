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
  .page-hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1800&q=80') center/cover no-repeat;opacity:.55;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,.85) 40%,rgba(10,10,10,.2) 100%);}
  .page-hero-circle-wrap{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:420px;height:420px;pointer-events:none;z-index:2;}
  @keyframes spin-slow-ph{to{transform:rotate(360deg);}}
  @keyframes neon-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes pulse-ring{0%,100%{opacity:.18;transform:scale(1);}50%{opacity:.32;transform:scale(1.06);}}
  @keyframes spin-ring{to{transform:rotate(360deg);}}
  .page-hero-content{position:relative;z-index:2;padding:0 60px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,6rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  @keyframes gradientSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

  /* PROGRAMS SECTION */
  #programs-full{padding:0 0 100px;background:#ffffff;}
  .programs-intro{text-align:center;padding:80px 60px 60px;position:relative;}
  .programs-intro::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:80px;height:3px;background:var(--red);border-radius:2px;}
  .programs-intro .section-label{color:var(--red);}
  .programs-intro .section-title{color:var(--dark);margin-bottom:18px;}
  .programs-intro p{color:#555;font-size:1rem;max-width:620px;margin:0 auto;line-height:1.8;}

  /* Individual program blocks */
  .prog-block{display:grid;grid-template-columns:1fr 1fr;min-height:520px;position:relative;overflow:hidden;}
  .prog-block.reverse{direction:rtl;}
  .prog-block.reverse > *{direction:ltr;}
  .prog-block-visual{position:relative;overflow:hidden;min-height:440px;}
  .prog-block-visual img,.prog-block-visual .visual-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background-size:cover;background-position:center;}
  .prog-block-visual .visual-overlay{position:absolute;inset:0;background:linear-gradient(120deg,rgba(10,10,10,.7) 0%,rgba(10,10,10,.15) 100%);}
  .prog-block.reverse .prog-block-visual .visual-overlay{background:linear-gradient(240deg,rgba(10,10,10,.7) 0%,rgba(10,10,10,.15) 100%);}
  .prog-block-visual .prog-num{position:absolute;bottom:24px;left:28px;font-family:var(--font-display);font-size:7rem;line-height:1;color:rgba(232,55,44,.18);letter-spacing:-4px;pointer-events:none;user-select:none;}
  .prog-block.reverse .prog-block-visual .prog-num{left:auto;right:28px;}
  .prog-block-content{background:#ffffff;padding:60px 56px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
  .prog-block-content::before{content:'';position:absolute;top:-60px;right:-60px;width:220px;height:220px;border-radius:50%;border:40px solid rgba(232,55,44,.05);pointer-events:none;}
  .prog-block-content .prog-tag{font-family:var(--font-body);font-weight:700;font-size:.78rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:inline-block;margin-bottom:14px;border-left:3px solid var(--red);padding-left:12px;}
  .prog-block-content h2{font-family:var(--font-display);font-size:clamp(2rem,3.5vw,2.8rem);color:var(--dark);letter-spacing:2px;text-transform:uppercase;line-height:1.05;margin-bottom:8px;}
  .prog-block-content .prog-tagline{color:var(--red);font-size:.88rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:22px;display:block;}
  .prog-block-content p{color:#555;font-size:.95rem;line-height:1.8;margin-bottom:28px;}
  .prog-features{list-style:none;margin:0 0 32px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;}
  .prog-features li{display:flex;align-items:flex-start;gap:10px;font-size:.88rem;color:#444;line-height:1.5;}
  .prog-features li i{color:var(--red);font-size:.75rem;margin-top:4px;flex-shrink:0;}
  .prog-cta{display:inline-flex;align-items:center;gap:12px;background:var(--red);color:#fff;font-family:var(--font-body);font-weight:700;font-size:.82rem;letter-spacing:1.5px;text-transform:uppercase;padding:12px 12px 12px 28px;border-radius:50px;text-decoration:none;transition:background .3s,transform .2s;width:fit-content;}
  .prog-cta:hover{background:#c0251b;transform:translateY(-2px);}
  .prog-cta .cta-icon{width:36px;height:36px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .prog-cta .cta-icon i{color:var(--red);font-size:.65rem;margin-left:2px;}

  /* accent bar between blocks */
  .prog-divider{height:3px;background:linear-gradient(90deg,transparent,var(--red),transparent);opacity:.35;}

  /* highlights strip */
  .prog-highlights{background:#f5f5f5;padding:70px 60px;text-align:center;}
  .prog-highlights .section-title{color:var(--dark);margin-bottom:50px;}
  .prog-highlights .section-label{color:var(--red);}
  .highlights-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1100px;margin:0 auto;}
  .hl-card{background:#ffffff;border-radius:14px;padding:32px 24px;border:1px solid rgba(232,55,44,.1);box-shadow:0 4px 16px rgba(0,0,0,.07);transition:border-color .3s,transform .3s;}
  .hl-card:hover{border-color:var(--red);transform:translateY(-6px);}
  .hl-icon{width:56px;height:56px;background:rgba(232,55,44,.12);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;}
  .hl-icon i{color:var(--red);font-size:1.4rem;}
  .hl-card h4{font-family:var(--font-display);font-size:1.1rem;letter-spacing:2px;color:var(--dark);text-transform:uppercase;margin-bottom:10px;}
  .hl-card p{color:#666;font-size:.85rem;line-height:1.7;}

  @media(max-width:1024px){
    .prog-block{grid-template-columns:1fr;}
    .prog-block.reverse{direction:ltr;}
    .prog-block-visual{min-height:300px;}
    .prog-block-content{padding:40px 30px;}
    .prog-features{grid-template-columns:1fr;}
    .highlights-grid{grid-template-columns:repeat(2,1fr);}
    .programs-intro{padding:60px 30px 50px;}
    .prog-highlights{padding:60px 30px;}
  }
  @media(max-width:768px){
    .highlights-grid{grid-template-columns:1fr;}
    .prog-block-content{padding:32px 20px;}
  }

  /* FAQ */
  #faq{background:#ffffff;padding:90px 60px;}
  #faq .section-label{color:var(--red);display:block;margin-bottom:10px;}
  #faq .section-title{color:var(--dark);margin-bottom:50px;}
  .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:0 auto;}

  /* Edge Glow Card */
  .faq-item{
    position:relative;
    background:#f9f9f9;
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
    background:#f9f9f9;
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
  .faq-item h4{font-family:var(--font-display);font-size:1rem;color:var(--dark);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;}
  .faq-item p{color:#555;font-size:.88rem;line-height:1.7;}

  /* Typewriter animation for QUESTIONS */
  .typewriter-word{
    display:inline-block;
    overflow:hidden;
    white-space:nowrap;
    vertical-align:bottom;
    border-right:4px solid var(--red);
    animation:faq-typewriter 3.5s steps(9,end) infinite, faq-blink .75s step-end infinite;
  }
  @keyframes faq-typewriter{
    0%{width:0;}
    60%{width:9ch;}
    85%{width:9ch;}
    95%{width:0;}
    100%{width:0;}
  }
  @keyframes faq-blink{
    0%,100%{border-right-color:var(--red);}
    50%{border-right-color:transparent;}
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
    #navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}
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

const programs = [
  {
    id: "01",
    tag: "Rehabilitation & Fitness",
    title: "Online Programme",
    tagline: "Stairs Rehab & Fitness",
    desc: "Our Online Programme brings world-class physiotherapy and fitness coaching directly to you, wherever you are. Through personalised 1-on-1 video sessions, our expert coaches craft a plan built around your specific goals — whether it's recovering from injury, building strength, or transforming your lifestyle. No gym required, just results.",
    features: [
      "1-on-1 video coaching sessions",
      "Personalised training plan",
      "Physiotherapy consultations",
      "Diet & recovery guidance",
      "Flexible scheduling (Mon–Sat)",
      "Progress tracking & check-ins",
    ],
    cta: "Enroll Now",
    href: "/new-pricing-plan",
    bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
  },
  {
    id: "02",
    tag: "Therapy & Recovery",
    title: "Massage Therapy",
    tagline: "Feel Better, Move Better",
    desc: "Our certified massage therapists deliver targeted, results-driven therapy tailored to athletes, active individuals, and anyone dealing with chronic tension or injury. From deep tissue work to myofascial release, every session is designed to accelerate recovery, reduce pain, and restore your body's natural movement patterns.",
    features: [
      "Personalised massage therapy",
      "Deep tissue & sports massage",
      "Myofascial release techniques",
      "Pre & post event massage",
      "Relaxation & recovery sessions",
      "Certified specialist therapists",
    ],
    cta: "Book a Session",
    href: "/new-pricing-plan",
    bg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
  },
  {
    id: "03",
    tag: "Running & Conditioning",
    title: "Fit To Run",
    tagline: "Step Into A New You",
    desc: "Fit To Run is a comprehensive running programme designed for everyone — from first-time runners to competitive athletes. Combining strength & conditioning, injury prevention physiotherapy, and expert nutritional guidance, our coaches give you everything you need to run faster, further, and injury-free. All levels are welcome.",
    features: [
      "Strength & conditioning training",
      "Injury prevention & physiotherapy",
      "Nutrition guidance for runners",
      "Recovery & sleep optimisation",
      "Step into Good Shoes guidance",
      "Beginner to advanced tracks",
    ],
    cta: "Explore Programme",
    href: "/contact",
    bg: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80",
  },
];

const highlights = [
  { icon: "fas fa-video", title: "Online & In-Person", text: "Flexible access — attend live at our centre or join remotely from anywhere in the world." },
  { icon: "fas fa-user-md", title: "Expert Practitioners", text: "Our team consists of certified physiotherapists, S&C coaches, and specialist therapists." },
  { icon: "fas fa-chart-line", title: "Measurable Progress", text: "Every programme includes regular assessments and check-ins so you can track real results." },
  { icon: "fas fa-shield-alt", title: "Injury-Safe Methods", text: "Evidence-based protocols ensure you build performance without compromising your health." },
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
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 70, width: "auto" }} /></div>
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
      <div className="page-hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>OUR<br />PROGRAMMES</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Programs</span>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section id="programs-full">
      <div className="programs-intro">
        <span className="section-label reveal">What We Offer</span>
        <h2 className="section-title reveal">Our Programmes</h2>
        <p className="reveal" style={{ transitionDelay: "0.1s" }}>
          Every body is different. That&apos;s why each Stairs programme is built around your goals, your schedule, and your unique physiology — giving you the tools to move better, recover faster, and perform at your peak.
        </p>
      </div>

      {programs.map((prog, i) => (
        <div key={i}>
          <div className={`prog-block reveal${i % 2 !== 0 ? " reverse" : ""}`}>
            {/* Visual side */}
            <div className="prog-block-visual">
              <div className="visual-bg" style={{ backgroundImage: `url('${prog.bg}')` }} />
              <div className="visual-overlay" />
              <div className="prog-num">{prog.id}</div>
            </div>
            {/* Content side */}
            <div className="prog-block-content">
              <span className="prog-tag">{prog.tag}</span>
              <h2>{prog.title}</h2>
              <span className="prog-tagline">{prog.tagline}</span>
              <p>{prog.desc}</p>
              <ul className="prog-features">
                {prog.features.map((f, j) => (
                  <li key={j}><i className="fas fa-check-circle" />{f}</li>
                ))}
              </ul>
              {i !== 2 && (
                <a href={prog.href} className="prog-cta">
                  {prog.cta}
                  <span className="cta-icon"><i className="fas fa-arrow-right" /></span>
                </a>
              )}
            </div>
          </div>
          {i < programs.length - 1 && <div className="prog-divider" />}
          {i === 2 && <FitToRunDetail />}
        </div>
      ))}

      {/* Highlights strip */}
      <div className="prog-highlights">
        <span className="section-label reveal">Why Choose Stairs</span>
        <h2 className="section-title reveal">Built For Results</h2>
        <br />
        <div className="highlights-grid">
          {highlights.map((h, i) => (
            <div className="hl-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="hl-icon"><i className={h.icon} /></div>
              <h4>{h.title}</h4>
              <p>{h.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Fit To Run Detail Section ─── */
function FitToRunDetail() {
  const [slideIdx, setSlideIdx] = useState(0);
  const dosSlides = [
    { title: "Do's and Don'ts before running", quote: '"Running is a simple activity, but the following guidelines will help you succeed at it."', bg: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=80" },
    { title: "Warm Up & Cool Down Right", quote: '"A proper warm-up prepares your body and mind for the run ahead."', bg: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1400&q=80" },
  ];

  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % dosSlides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const whyCards = [
    { icon: "fas fa-running", title: "Training", text: "Our strength and conditioning coach focuses on creating personalized training programs for runners to enhance their muscular strength, power, and endurance while reducing the risk of injuries." },
    { icon: "fas fa-shield-alt", title: "Prevention", text: "Our physiotherapists place a strong emphasis on preventing injuries in runners. This includes evaluating biomechanics, identifying potential weak points or imbalances, and creating customized exercise programs to target and resolve these concerns." },
    { icon: "fas fa-apple-alt", title: "Nutrition", text: "Our nutritionist emphasizes the significance of nutrition to all runners in optimizing their dietary choices to fuel their training, enhance performance, and support overall health." },
    { icon: "fas fa-bed", title: "Recovery", text: "Essential for runners, rest allows the body to repair and adapt, preventing injuries and promoting optimal performance. Incorporating techniques like active recovery, sleep, and recovery strategies is crucial for maintaining long-term success." },
  ];

  return (
    <div style={{ background: "#ffffff" }}>
      {/* ── VIDEO + INTRO ── */}
      <div style={{ padding: "80px 60px 60px", textAlign: "center", background: "#ffffff" }}>
        {/* YouTube embed */}
        <div className="reveal" style={{ maxWidth: 780, margin: "0 auto 40px", borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 60px rgba(232,55,44,0.2)", border: "2px solid rgba(232,55,44,0.3)" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/Xk93TAvj_gA"
              title="Fit to Run Program by Stairs Physiotherapy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>

        {/* Welcome text */}
        <p className="reveal" style={{ color: "#555", fontSize: ".97rem", lineHeight: 1.9, maxWidth: 860, margin: "0 auto 24px" }}>
          Welcome to the Fit to Run program, your go-to destination for all things fitness and running! We are passionate about promoting an active and healthy lifestyle through our wide range of activities designed to cater to runners of all levels. Whether you&apos;re a seasoned marathoner or just starting out on your fitness journey, our program is the perfect place to connect with like-minded individuals, set new goals, and challenge yourself.
        </p>
        <p className="reveal" style={{ color: "#555", fontSize: ".97rem", lineHeight: 1.9, maxWidth: 860, margin: "0 auto" }}>
          Our dedicated team of experienced coaches and trainers are here to provide expert guidance, support, and motivation every step of the way. Join us and experience the exhilaration of conquering stairs, improving your endurance, and achieving your fitness goals. Together, we will climb new heights and make every stride count. Lace up your shoes, join the Stairs Fit to Run Club, and let&apos;s embark on this incredible journey together!
        </p>
      </div>

      {/* ── DO'S AND DON'TS SLIDER ── */}
      <div style={{ position: "relative", height: 320, overflow: "hidden" }}>
        {dosSlides.map((s, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url('${s.bg}')`, backgroundSize: "cover", backgroundPosition: "center",
            opacity: i === slideIdx ? 1 : 0, transition: "opacity .8s ease",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.62)" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "0 40px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,.75)", fontStyle: "italic", fontSize: ".95rem", maxWidth: 600, marginBottom: 0 }}>{s.quote}</p>
            </div>
          </div>
        ))}
        {/* dots */}
        <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {dosSlides.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)} style={{ width: i === slideIdx ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === slideIdx ? "var(--red)" : "rgba(255,255,255,0.4)", padding: 0, transition: "all .3s" }} />
          ))}
        </div>
        {/* arrows */}
        <button onClick={() => setSlideIdx((i) => (i - 1 + dosSlides.length) % dosSlides.length)} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem" }}>&#8249;</button>
        <button onClick={() => setSlideIdx((i) => (i + 1) % dosSlides.length)} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem" }}>&#8250;</button>
      </div>

      {/* ── WHY JOIN US ── */}
      <div style={{ padding: "80px 60px", background: "rgba(0,0,0,0.4)", backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1400&q=80')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "overlay", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.75)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 50 }}>
          <h2 className="section-title reveal" style={{ color: "#fff", display: "inline" }}>WHY </h2>
          <h2 className="section-title reveal" style={{ color: "var(--red)", display: "inline", fontStyle: "italic" }}>JOIN </h2>
          <h2 className="section-title reveal" style={{ color: "#fff", display: "inline" }}>US</h2>
          <p className="reveal" style={{ color: "rgba(255,255,255,.65)", marginTop: 10, fontSize: ".95rem" }}>One Stop Solution to Improve your Performance</p>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28, maxWidth: 1100, margin: "0 auto" }} className="why-join-grid">
          {whyCards.map((c, i) => (
            <div key={i} className="reveal" style={{ textAlign: "center", padding: "32px 20px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,55,44,0.15)", transition: "border-color .3s,transform .3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--red)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,55,44,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <i className={c.icon} style={{ color: "#fff", fontSize: "1.8rem" }} />
              </div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: 2, textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>{c.title}</h4>
              <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".85rem", lineHeight: 1.7 }}>{c.text}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:1024px){.why-join-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:600px){.why-join-grid{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </div>
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

export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <ProgramsSection />
      <FAQ />
      <Footer />
    </>
  );
}
