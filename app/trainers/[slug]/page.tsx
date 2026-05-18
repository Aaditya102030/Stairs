"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";

/* ─── Trainer Data ─── */
const trainers = [
  {
    slug: "marvin-joiner",
    name: "Marvin Joiner",
    role: "CrossFit Coach",
    specialty: "Strength & Conditioning",
    bio: "10+ years coaching elite athletes. Certified CrossFit Level 3 trainer with expertise in Olympic lifting and metabolic conditioning.",
    fullBio: "Marvin Joiner is one of the most sought-after strength coaches in the region with over a decade of experience working with elite athletes across multiple disciplines. Holding a CrossFit Level 3 certification, Marvin combines the intensity of CrossFit methodology with the precision of Olympic weightlifting to deliver transformative results. His programming philosophy centers on progressive overload, movement quality, and building mental resilience alongside physical strength. Marvin has coached national-level competitors and everyday fitness enthusiasts alike — he believes every body deserves elite coaching.",
    experience: "10+ Yrs",
    clients: "200+",
    certifications: ["CrossFit Level 3 Trainer", "CSCS – Certified Strength & Conditioning Specialist", "Olympic Weightlifting Coach (USAW)", "CPR & First Aid Certified"],
    specialties: ["Olympic Weightlifting", "Metabolic Conditioning", "Strength Programming", "Competition Prep", "Injury Prevention"],
    schedule: ["Mon / Wed / Fri — 6:00 AM – 12:00 PM", "Tue / Thu — 4:00 PM – 8:00 PM", "Saturday — 8:00 AM – 12:00 PM"],
  },
  {
    slug: "patricia-woodrum",
    name: "Patricia Woodrum",
    role: "Cardio & Conditioning",
    specialty: "Endurance Training",
    bio: "Former marathon runner turned coach. Specialises in aerobic base building, zone training, and race preparation strategies.",
    fullBio: "Patricia Woodrum's coaching journey began on the roads of her hometown, where she completed over 20 marathons and multiple ultramarathons before transitioning to full-time coaching. Her lived experience as an endurance athlete gives her an unmatched ability to understand what clients face mentally and physically during long training blocks. Patricia specialises in aerobic base development, heart-rate zone training, and race-day strategy. She has guided runners of all levels — from first 5K participants to Boston Marathon qualifiers — toward their personal bests.",
    experience: "8 Yrs",
    clients: "150+",
    certifications: ["RRCA Certified Running Coach", "NASM – Personal Trainer", "USA Track & Field Level 2", "Nutrition for Endurance Athletes"],
    specialties: ["Marathon Training", "Zone 2 Aerobic Base Building", "Race Strategy", "VO2 Max Development", "Recovery Protocols"],
    schedule: ["Mon / Wed / Fri — 5:30 AM – 11:00 AM", "Tue / Thu — 3:00 PM – 7:00 PM", "Sunday — 7:00 AM – 11:00 AM"],
  },
  {
    slug: "hannaz-stone",
    name: "Hannaz Stone",
    role: "Fitness Coach",
    specialty: "Body Recomposition",
    bio: "Passionate about helping everyday people transform their physique through science-backed programming and sustainable habits.",
    fullBio: "Hannaz Stone built her career on one simple belief: sustainable transformation beats rapid results every time. After her own fitness journey taught her the pitfalls of crash diets and extreme programs, she dedicated herself to evidence-based coaching that changes bodies and mindsets for life. Hannaz excels at body recomposition — simultaneously reducing body fat and building lean muscle — through intelligent programming and nutritional guidance. Her empathetic coaching style makes her particularly effective with clients who have tried and failed with conventional approaches.",
    experience: "6 Yrs",
    clients: "180+",
    certifications: ["ACE Certified Personal Trainer", "Precision Nutrition Level 1", "NASM Corrective Exercise Specialist", "Functional Movement Screen (FMS)"],
    specialties: ["Body Recomposition", "Habit Coaching", "Nutrition Guidance", "Corrective Exercise", "Women's Fitness"],
    schedule: ["Mon – Fri — 9:00 AM – 1:00 PM", "Mon / Wed — 5:00 PM – 8:00 PM", "Saturday — 9:00 AM – 12:00 PM"],
  },
  {
    slug: "derek-hale",
    name: "Derek Hale",
    role: "Strength & Power",
    specialty: "Powerlifting",
    bio: "Competitive powerlifter and certified strength coach. Programs for beginners through to competitive lifters.",
    fullBio: "Derek Hale is a competitive powerlifter with multiple state championship titles to his name. His coaching bridges the gap between sport-specific powerlifting and general strength development, making him equally effective with beginners who want to get strong and seasoned competitors chasing PRs. Derek's programming is rooted in periodisation science, with a deep focus on the three competition lifts — squat, bench press, and deadlift — while building the accessory work needed for longevity and injury resilience. Under his guidance, athletes learn to train smarter, not just harder.",
    experience: "9 Yrs",
    clients: "120+",
    certifications: ["NSCA – Certified Strength & Conditioning Specialist", "IPF Technical Official", "USAW Sports Performance Coach", "Westside Barbell Certified"],
    specialties: ["Powerlifting Competition Prep", "Squat / Bench / Deadlift Technique", "Strength Periodisation", "Meet Day Strategy", "Raw & Equipped Lifting"],
    schedule: ["Mon / Tue / Thu / Fri — 7:00 AM – 1:00 PM", "Wednesday — 3:00 PM – 7:00 PM", "Saturday — 10:00 AM – 2:00 PM"],
  },
  {
    slug: "aisha-patel",
    name: "Aisha Patel",
    role: "Yoga & Mobility",
    specialty: "Flexibility & Recovery",
    bio: "Certified yoga instructor and mobility specialist helping clients move better, recover faster, and stay injury-free.",
    fullBio: "Aisha Patel's work sits at the crossroads of yoga, mobility science, and athletic recovery. With a background in Ashtanga and Yin yoga complemented by advanced mobility and fascia training, Aisha brings a holistic perspective to physical wellness that is rare in the fitness industry. She works with athletes recovering from injury, desk workers battling chronic tightness, and high-performers seeking to add longevity to their training. Her sessions are simultaneously challenging and restorative — a combination clients consistently describe as life-changing.",
    experience: "7 Yrs",
    clients: "160+",
    certifications: ["RYT-500 Yoga Alliance", "FRC Mobility Specialist (FRCms)", "NASM Corrective Exercise Specialist", "Myofascial Release Practitioner"],
    specialties: ["Yoga for Athletes", "Hip & Shoulder Mobility", "Fascia & Soft Tissue Work", "Breathwork & Recovery", "Injury Rehab Bridging"],
    schedule: ["Mon / Wed / Fri — 8:00 AM – 12:00 PM", "Tue / Thu — 5:00 PM – 8:00 PM", "Sunday — 9:00 AM – 12:00 PM"],
  },
  {
    slug: "tom-reeves",
    name: "Tom Reeves",
    role: "Youth Performance",
    specialty: "Youth Athletics",
    bio: "Dedicated to developing young athletes with age-appropriate training, movement fundamentals, and a love for sport.",
    fullBio: "Tom Reeves has spent his career championing the physical development of young athletes, firmly believing that the foundations built in youth training echo through an entire athletic career. Tom designs age-appropriate programs that prioritise movement quality, coordination, and sport-specific skills over premature specialisation. His sessions are energetic, fun, and purposeful — cultivating not just physical ability but confidence, teamwork, and a lifelong love of movement. Tom works with athletes aged 8–18 across football, cricket, athletics, and multi-sport programs.",
    experience: "11 Yrs",
    clients: "300+",
    certifications: ["IYCA – Youth Fitness Specialist", "NSCA – Certified Personal Trainer", "First Aid & Safeguarding in Sport", "Football Australia Coaching License"],
    specialties: ["Speed & Agility Development", "Multi-Sport Athletic Foundation", "Sport-Specific Conditioning", "Movement Literacy", "Long-Term Athlete Development (LTAD)"],
    schedule: ["Mon – Fri — 3:00 PM – 7:00 PM (after school)", "Saturday — 8:00 AM – 1:00 PM", "School Holiday Programs available"],
  },
];

/* ─── Styles ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  :root{--red:#e8372c;--dark:#111111;--darker:#0a0a0a;--light:#ffffff;--gray:#888888;--bg-light:#f5f5f5;--font-display:'Bebas Neue',sans-serif;--font-body:'Barlow',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:var(--dark);background:var(--light);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .reveal-left{opacity:0;transform:translateX(-50px);transition:opacity .7s ease,transform .7s ease;}
  .reveal-left.visible{opacity:1;transform:translateX(0);}
  .reveal-right{opacity:0;transform:translateX(50px);transition:opacity .7s ease,transform .7s ease;}
  .reveal-right.visible{opacity:1;transform:translateX(0);}
  .section-label{font-family:var(--font-body);font-weight:600;font-size:.85rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
  .section-title{font-family:var(--font-display);font-size:clamp(2rem,4vw,3.2rem);line-height:1.1;letter-spacing:1px;text-transform:uppercase;}
  .circle-deco{position:absolute;border-radius:50%;border:20px solid var(--red);opacity:.85;}

  /* NAVBAR */
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

  /* PAGE HERO */
  #page-hero{position:relative;min-height:60vh;background:var(--darker);display:flex;align-items:center;overflow:hidden;padding-top:80px;}
  .page-hero-bg{position:absolute;inset:0;background:url('/images/hero-bg.png') center/cover no-repeat;opacity:.35;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,.92) 55%,rgba(10,10,10,.3) 100%);}
  .page-hero-circle{width:420px;height:420px;right:5%;top:50%;transform:translateY(-50%);border-width:22px;pointer-events:none;animation:spin-slow 20s linear infinite;opacity:.6;}
  @keyframes spin-slow{to{transform:translateY(-50%) rotate(360deg);}}
  @keyframes spin-ring{to{transform:rotate(360deg);}}
  @keyframes pulse-ring{0%,100%{opacity:.18;transform:scale(1);}50%{opacity:.32;transform:scale(1.06);}}
  @keyframes float1{0%,100%{transform:translateY(0px);}50%{transform:translateY(-18px);}}
  .hero-3d-scene{position:absolute;right:0;top:0;bottom:0;width:50%;display:flex;align-items:center;justify-content:center;z-index:1;pointer-events:none;}
  .page-hero-content{position:relative;z-index:2;padding:0 60px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(2.8rem,7vw,5.5rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;}
  .breadcrumb a{color:var(--red);}
  .breadcrumb span{color:rgba(255,255,255,.4);}
  .hero-role-badge{display:inline-block;background:var(--red);color:var(--light);font-size:.78rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 18px;border-radius:30px;margin-bottom:18px;}

  /* PROFILE SECTION */
  #profile{padding:90px 60px;background:var(--bg-light);}
  .profile-grid{display:grid;grid-template-columns:1fr 1.6fr;gap:60px;align-items:start;max-width:1100px;margin:0 auto;}
  .profile-avatar-wrap{display:flex;flex-direction:column;align-items:center;gap:28px;}
  .profile-avatar{width:280px;height:280px;border-radius:50%;background:#e0e0e0;border:6px solid var(--red);display:flex;align-items:center;justify-content:center;color:#bbb;font-size:5rem;position:relative;overflow:hidden;box-shadow:0 16px 50px rgba(232,55,44,.2);}
  .profile-avatar::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.18),transparent);}
  .stat-pills{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
  .stat-pill{background:#fff;border:2px solid #eeeeee;border-radius:50px;padding:14px 24px;text-align:center;min-width:115px;box-shadow:0 2px 14px rgba(0,0,0,.06);}
  .stat-pill .num{font-family:var(--font-display);font-size:1.7rem;color:var(--red);letter-spacing:1px;display:block;line-height:1;}
  .stat-pill .lbl{font-size:.68rem;color:var(--gray);letter-spacing:1.5px;text-transform:uppercase;margin-top:5px;display:block;}
  .profile-text{}
  .profile-text .specialty-tag{display:inline-block;background:#fef0ef;color:var(--red);font-size:.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:5px 14px;border-radius:20px;margin-bottom:18px;}
  .profile-text h2{font-family:var(--font-display);font-size:clamp(2rem,4vw,2.8rem);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
  .profile-text .role-label{color:var(--red);font-weight:700;font-size:.9rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;display:block;}
  .profile-text .full-bio{color:var(--gray);font-size:.95rem;line-height:1.9;margin-bottom:36px;}

  /* CERTS & SPECIALTIES */
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px;}
  .info-box{background:#fff;border-radius:16px;padding:28px;box-shadow:0 4px 18px rgba(0,0,0,.06);}
  .info-box h4{font-family:var(--font-display);font-size:1rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;color:var(--dark);}
  .info-box ul li{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:.85rem;color:#555;line-height:1.5;}
  .info-box ul li:last-child{border-bottom:none;}
  .info-box ul li i{color:var(--red);font-size:.72rem;margin-top:4px;flex-shrink:0;}

  /* SCHEDULE */
  .schedule-box{background:var(--darker);border-radius:16px;padding:30px;margin-bottom:36px;}
  .schedule-box h4{font-family:var(--font-display);font-size:1rem;letter-spacing:2px;text-transform:uppercase;color:var(--light);margin-bottom:18px;}
  .schedule-box ul li{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:.85rem;color:#bbb;}
  .schedule-box ul li:last-child{border-bottom:none;}
  .schedule-box ul li i{color:var(--red);flex-shrink:0;}

  /* BUTTONS */
  .btn-primary{display:inline-flex;align-items:center;gap:14px;background:var(--red);color:var(--light);font-family:var(--font-body);font-weight:700;font-size:.88rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 10px 10px 32px;border-radius:50px;border:none;cursor:pointer;transition:background .3s,transform .2s;text-decoration:none;}
  .btn-primary:hover{background:#c0251b;transform:translateY(-2px);}
  .btn-primary .play-icon{width:38px;height:38px;background:var(--light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .btn-primary .play-icon i{color:var(--red);font-size:.72rem;margin-left:2px;}
  .btn-outline-dark{display:inline-flex;align-items:center;gap:10px;border:2px solid var(--dark);color:var(--dark);font-family:var(--font-body);font-weight:700;font-size:.85rem;letter-spacing:1px;text-transform:uppercase;padding:12px 28px;border-radius:50px;transition:background .3s,color .3s;text-decoration:none;}
  .btn-outline-dark:hover{background:var(--dark);color:var(--light);}
  .profile-cta{display:flex;gap:16px;flex-wrap:wrap;align-items:center;}

  /* OTHER TRAINERS */
  #other-trainers{padding:80px 60px;background:var(--light);text-align:center;}
  #other-trainers .section-label{color:var(--red);}
  .other-grid{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-top:40px;}
  .other-card{background:#fff;border-radius:16px;padding:28px 22px;width:190px;box-shadow:0 4px 16px rgba(0,0,0,.07);transition:transform .3s,box-shadow .3s;text-align:center;position:relative;z-index:0;}
  .other-card::before{content:'';position:absolute;inset:-2px;border-radius:18px;background:linear-gradient(135deg,#e8372c,#ff6b35,#ffb347,#e8372c);background-size:300% 300%;z-index:-1;opacity:0;transition:opacity .4s;animation:gradientSpin 3s ease infinite;}
  .other-card::after{content:'';position:absolute;inset:2px;border-radius:14px;background:#fff;z-index:-1;}
  @keyframes gradientSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  .other-card:hover{transform:translateY(-6px);box-shadow:0 12px 32px rgba(232,55,44,.2);}
  .other-card:hover::before{opacity:1;}
  .other-avatar{width:90px;height:90px;border-radius:50%;background:#f0f0f0;border:3px solid rgba(232,55,44,.2);margin:0 auto 14px;display:flex;align-items:center;justify-content:center;color:#bbb;font-size:1.8rem;transition:border-color .3s;}
  .other-card:hover .other-avatar{border-color:var(--red);}
  .other-card h4{font-family:var(--font-display);font-size:.95rem;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;}
  .other-card .role{color:var(--red);font-size:.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;display:block;}
  .explore-sm{display:inline-block;border:2px solid var(--red);color:var(--red);font-size:.72rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 16px;border-radius:30px;transition:background .3s,color .3s;}
  .explore-sm:hover{background:var(--red);color:var(--light);}

  /* FOOTER */
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
    #profile,#other-trainers,#footer{padding-left:30px;padding-right:30px;}
    .profile-grid{grid-template-columns:1fr;}
    .profile-avatar-wrap{flex-direction:row;flex-wrap:wrap;align-items:flex-start;}
    .two-col{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    .profile-avatar{width:200px;height:200px;font-size:3.5rem;}
    .footer-grid{grid-template-columns:1fr;}
    .profile-cta{flex-direction:column;align-items:flex-start;}
  }
`;

/* ─── Hooks ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    document.querySelectorAll("#page-hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

/* ─── Navbar ─── */
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
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/trainers" ? "active" : ""}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

/* ─── Page Hero ─── */
function PageHero({ trainer }: { trainer: typeof trainers[0] }) {
  const firstName = trainer.name.split(" ")[0];
  const lastName = trainer.name.split(" ").slice(1).join(" ");
  return (
    <section id="page-hero">
      <div className="page-hero-bg" />
      <div className="circle-deco page-hero-circle" />
      <div className="hero-3d-scene">
        <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
          <circle cx="190" cy="190" r="160" stroke="#e8372c" strokeWidth="1" strokeDasharray="6 12" opacity="0.18" style={{ animation: "spin-ring 20s linear infinite", transformOrigin: "190px 190px" }} />
          <circle cx="190" cy="190" r="120" stroke="#ff6a00" strokeWidth="1" strokeDasharray="3 16" opacity="0.12" style={{ animation: "spin-ring 30s linear infinite reverse", transformOrigin: "190px 190px" }} />
          <circle cx="190" cy="190" r="80" fill="none" stroke="rgba(232,55,44,0.07)" strokeWidth="50" style={{ animation: "pulse-ring 4s ease-in-out infinite", transformOrigin: "190px 190px" }} />
          <g style={{ animation: "float1 4s ease-in-out infinite", transformOrigin: "190px 190px" }}>
            <circle cx="190" cy="128" r="44" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2.5" />
            <circle cx="190" cy="128" r="32" fill="#1e1e1e" />
            <circle cx="190" cy="116" r="16" fill="#333" />
            <ellipse cx="190" cy="142" rx="22" ry="16" fill="#333" />
            <path d="M146 172 Q190 158 234 172 L244 258 Q190 272 136 258 Z" fill="#2a2a2a" stroke="#333" strokeWidth="1"/>
            <rect x="156" y="180" width="68" height="7" rx="3.5" fill="#e8372c" opacity="0.65"/>
            <path d="M146 178 Q124 193 114 222" stroke="#2a2a2a" strokeWidth="15" strokeLinecap="round" fill="none"/>
            <path d="M234 178 Q256 193 266 222" stroke="#2a2a2a" strokeWidth="15" strokeLinecap="round" fill="none"/>
            <path d="M152 258 L144 324 L160 326 L190 286 L220 326 L236 324 L228 258 Z" fill="#222"/>
          </g>
          {[{x:55,y:95,d:"0s"},{x:325,y:110,d:"1s"},{x:75,y:285,d:"1.8s"},{x:305,y:295,d:"0.5s"},{x:190,y:358,d:"2.2s"}].map((p,i)=>(
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
          ))}
        </svg>
      </div>
      <div className="page-hero-content">
        <span className="sub reveal">Team Member</span>
        <span className="hero-role-badge reveal" style={{ transitionDelay: "0.05s" }}>{trainer.specialty}</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>{firstName}<br />{lastName}</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span>
          <a href="/trainers">Team</a><span>/</span>
          <span style={{ color: "#fff" }}>{trainer.name}</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Profile Section ─── */
function ProfileSection({ trainer }: { trainer: typeof trainers[0] }) {
  return (
    <section id="profile">
      <div className="profile-grid">
        {/* Left */}
        <div className="profile-avatar-wrap reveal-left">
          <div className="profile-avatar">
            <i className="fas fa-user" />
          </div>
          <div className="stat-pills">
            <div className="stat-pill">
              <span className="num">{trainer.experience}</span>
              <span className="lbl">Experience</span>
            </div>
            <div className="stat-pill">
              <span className="num">{trainer.clients}</span>
              <span className="lbl">Clients</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="profile-text reveal-right">
          <span className="specialty-tag">{trainer.specialty}</span>
          <h2>{trainer.name}</h2>
          <span className="role-label">{trainer.role}</span>
          <p className="full-bio">{trainer.fullBio}</p>

          <div className="two-col">
            <div className="info-box">
              <h4>Certifications</h4>
              <ul>
                {trainer.certifications.map((c, i) => (
                  <li key={i}><i className="fas fa-certificate" />{c}</li>
                ))}
              </ul>
            </div>
            <div className="info-box">
              <h4>Specialties</h4>
              <ul>
                {trainer.specialties.map((s, i) => (
                  <li key={i}><i className="fas fa-check" />{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="schedule-box reveal">
            <h4>Available Schedule</h4>
            <ul>
              {trainer.schedule.map((s, i) => (
                <li key={i}><i className="fas fa-clock" />{s}</li>
              ))}
            </ul>
          </div>

          <div className="profile-cta reveal">
            <motion.a href="/contact" whileTap={{ scale: 0.95 }} className="btn-primary">
              Book a Session <span className="play-icon"><i className="fas fa-play" /></span>
            </motion.a>
            <a href="/trainers" className="btn-outline-dark">
              <i className="fas fa-arrow-left" /> Back to Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Other Trainers ─── */
function OtherTrainers({ currentSlug }: { currentSlug: string }) {
  const others = trainers.filter((t) => t.slug !== currentSlug);
  return (
    <section id="other-trainers">
      <span className="section-label reveal">The Team</span>
      <h2 className="section-title reveal">Meet Our Other Coaches</h2>
      <div className="other-grid">
        {others.map((t, i) => (
          <div className="other-card reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="other-avatar"><i className="fas fa-user" /></div>
            <h4>{t.name}</h4>
            <span className="role">{t.role}</span>
            <a href={`/trainers/${t.slug}`} className="explore-sm">Explore</a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ─── */
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
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne, 3000</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function TrainerProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const trainer = trainers.find((t) => t.slug === slug);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  if (!trainer) {
    return (
      <>
        <style>{globalStyles}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#fff", gap: 20 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", letterSpacing: 2 }}>Trainer Not Found</h1>
          <a href="/trainers" style={{ color: "#e8372c", fontSize: "1rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>← Back to Team</a>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero trainer={trainer} />
      <ProfileSection trainer={trainer} />
      <OtherTrainers currentSlug={slug} />
      <Footer />
    </>
  );
}
