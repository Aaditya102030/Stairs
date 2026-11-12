"use client";

import { useState, useEffect } from "react";
import BranchesFooter from "@/components/BranchesFooter";
import Navbar from "@/components/SiteNav";
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

/* ─── Location Team Data ─── */
const locationTeams: Record<string, { name: string; location: string; description: string; members: { name: string; role: string; experience?: string; specialty?: string }[] }> = {
  "ulsoor-team": {
    name: "Ulsoor Team",
    location: "Ulsoor, Bangalore",
    description: "The Ulsoor Team is dedicated to providing exceptional physiotherapy care with professionalism, compassion, and expertise. Their commitment to patient recovery, personalized treatment plans, and supportive approach makes them a trusted team for rehabilitation and wellness.",
    members: [
      { name: "Akshata Koli", role: "Sports Physiotherapist" },
      { name: "Rohan Charles", role: "Strength & Conditioning Coach" },
      { name: "Riti Shetty", role: "Sports Physiotherapist" },
      { name: "Aadhav Panchu Thomas", role: "Physiotherapist" },
      { name: "Chaitra", role: "Sports Scientist" },
      { name: "Gautam Satish", role: "Physiotherapist" },
      { name: "Soumya SK", role: "Physiotherapist" },
      { name: "Srijanya Rajesh", role: "Physiotherapist" },
      { name: "Swathi M V", role: "Physiotherapist" },
      { name: "Vedith", role: "Sports Scientist" },
      { name: "Bhumika", role: "Physiotherapist" },
    ],
  },
  "koramangala-team": {
    name: "Koramangala Team",
    location: "Koramangala, Bangalore",
    description: "Our Koramangala Team combines experience, dedication, and patient-focused care to deliver outstanding physiotherapy treatment. With a passion for helping people recover stronger and healthier, the team creates a positive and motivating healing environment.",
    members: [
      { name: "Gagan Gowda", role: "Strength and Conditioning Coach" },
      { name: "Martin Thomas", role: "Strength and Conditioning Coach" },
      { name: "Niha", role: "Sports Physiotherapist" },
      { name: "Sindhura Udupa", role: "Sports Physiotherapist" },
      { name: "Sairam M", role: "Sports Physiotherapist" },
      { name: "Aashutosh Karna", role: "Orthopaedic Physiotherapist" },
      { name: "Achintya P R", role: "Physiotherapist" },
      { name: "Bijoy Joseph Bastian", role: "Strength and Conditioning Coach" },
      { name: "Kiran Prakash Dsouza", role: "Sports Physiotherapist" },
      { name: "Malan Karthikeyan", role: "Strength and Conditioning Coach" },
      { name: "Naveenraj A", role: "Sports Physiotherapist" },
      { name: "Niharika J Somayaji", role: "Sports Physiotherapist" },
      { name: "Ramya Shetty", role: "Physiotherapist" },
      { name: "Vasudha Siddappa", role: "Physiotherapist" },
      { name: "Shreya Sharma", role: "Physiotherapist" },
      { name: "Inchara", role: "Strength and Conditioning Coach" },
    ],
  },
  "indiranagar-team": {
    name: "Indiranagar Team",
    location: "Indiranagar, Bangalore",
    description: "The Indiranagar Team is known for its friendly approach, expert guidance, and commitment to every patient's recovery journey. Their teamwork and dedication ensure that every patient receives the highest quality care and support.",
    members: [
      { name: "Niketh Madhu", role: "Sports Physiotherapist" },
      { name: "Manoj Prasath", role: "Sports Physiotherapist" },
      { name: "Bhavika Advani", role: "Sports Physiotherapist" },
      { name: "Varsha Gowda", role: "Strength & Conditioning Coach" },
      { name: "Nithya Shree N", role: "Physiotherapist" },
      { name: "Jayani", role: "Physiotherapist" },
      { name: "Gokulnath G", role: "Physiotherapist" },
      { name: "Devika R S", role: "Physiotherapist" },
    ],
  },
  "whitefield-team": {
    name: "Whitefield Team",
    location: "Whitefield, Bangalore",
    description: "The Whitefield Team is committed to delivering high-quality physiotherapy care through expertise, dedication, and compassion. Their patient-first approach and focus on long-term recovery help individuals regain strength, mobility, and confidence.",
    members: [
      { name: "Shivani Vyas", role: "Sports Physiotherapist" },
      { name: "Karthik A", role: "Sports Physiotherapist" },
      { name: "Tanushka Acharya", role: "Physiotherapist" },
      { name: "Imthiyaz Ibrahim", role: "Sports Physiotherapist" },
    ],
  },
  "admin-team": {
    name: "Admin Team",
    location: "All Centres",
    description: "The Admin Team is dedicated to providing a smooth and stress-free experience for every visitor. Their friendly approach, quick assistance, and strong coordination ensure that patients feel supported from the moment they walk in.",
    members: [
      { name: "Sumalatha SP", role: "Head Admin" },
      { name: "Shuaib", role: "Admin Ulsoor" },
      { name: "Pavithra", role: "Admin Koramangala" },
      { name: "Reeta", role: "Admin Team" },
      { name: "Elavarasi", role: "Admin Team" },
      { name: "Nafiya", role: "Admin Team" },
      { name: "Bindu", role: "Admin Executive" },
      { name: "Deepthi", role: "Front Office Executive" },
    ],
  },
  "founders": {
    name: "Founders",
    location: "Bangalore",
    description: "The Founders envisioned a centre built on trust, care, and excellence in physiotherapy. Through their dedication, leadership, and passion for improving lives, they have created a place focused on healing, recovery, and patient well-being.",
    members: [
      { name: "Somya Rout", role: "Co-Founder & Head Physio Coach", experience: "12+ Yrs", specialty: "Musculoskeletal Rehab" },
      { name: "Harinag S P", role: "Co-Founder & S&C Lead Coach", experience: "10+ Yrs", specialty: "Strength & Conditioning" },
    ],
  },
};

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
  .nav-links .contact-btn:hover{background:var(--red);color:#111;}
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

  /* ── TEAM MEMBER LIST (collapsed) ── */
  .tm-list{display:flex;flex-direction:column;gap:0;max-width:760px;margin:0 auto;}
  .tm-row{display:flex;align-items:center;gap:18px;padding:14px 20px;border-radius:14px;cursor:pointer;transition:background .2s;position:relative;}
  .tm-row:not(:last-child)::after{content:'';position:absolute;bottom:0;left:20px;right:20px;height:1px;background:rgba(0,0,0,.07);}
  .tm-row:hover{background:rgba(232,55,44,.04);}
  .tm-row.active{background:rgba(232,55,44,.06);}
  .tm-thumb{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#f0f0f0,#e0e0e0);border:2.5px solid rgba(232,55,44,.25);flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#bbb;font-size:1.3rem;transition:border-color .2s;}
  .tm-row.active .tm-thumb,.tm-row:hover .tm-thumb{border-color:var(--red);}
  .tm-info{flex:1;text-align:left;}
  .tm-info .tm-name{font-family:var(--font-display);font-size:1.05rem;letter-spacing:1.5px;text-transform:uppercase;color:#111;line-height:1.1;margin-bottom:3px;}
  .tm-info .tm-role{font-size:.78rem;color:#888;letter-spacing:.5px;}
  .tm-play{width:40px;height:40px;border-radius:50%;border:2px solid rgba(0,0,0,.12);display:flex;align-items:center;justify-content:center;color:#888;font-size:.78rem;flex-shrink:0;transition:background .2s,border-color .2s,color .2s;}
  .tm-row:hover .tm-play,.tm-row.active .tm-play{background:var(--red);border-color:var(--red);color:#fff;}

  /* ── EXPANDED PANEL ── */
  .tm-expand-wrap{overflow:hidden;max-height:0;transition:max-height .45s cubic-bezier(.4,0,.2,1),opacity .35s ease;opacity:0;}
  .tm-expand-wrap.open{max-height:1000px;opacity:1;}
  .tm-expand{background:#fff;border-radius:20px;margin:4px 0 12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.10);}
  .tm-expand-top{position:relative;height:200px;background:linear-gradient(160deg,#1a1a1a 0%,#2d2d2d 100%);display:flex;align-items:flex-end;padding:24px;}
  .tm-expand-top-avatar{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#333,#222);border:3px solid var(--red);display:flex;align-items:center;justify-content:center;color:rgba(232,55,44,.5);font-size:2.2rem;flex-shrink:0;}
  .tm-expand-top-text{margin-left:20px;}
  .tm-expand-top-text h3{font-family:var(--font-display);font-size:1.8rem;letter-spacing:2px;text-transform:uppercase;color:#fff;line-height:1;margin-bottom:6px;}
  .tm-expand-top-text .te-role{color:var(--red);font-size:.8rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;}
  .tm-expand-top-badge{position:absolute;top:18px;right:18px;background:var(--red);color:#fff;font-size:.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:20px;}
  .tm-expand-body{padding:24px 28px;}
  .tm-expand-body .te-bio{color:#555;font-size:.92rem;line-height:1.85;margin-bottom:20px;}
  .tm-expand-stats{display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
  .te-stat{background:#f8f8f8;border-radius:12px;padding:12px 20px;text-align:center;min-width:100px;}
  .te-stat .te-num{font-family:var(--font-display);font-size:1.5rem;color:var(--red);line-height:1;display:block;}
  .te-stat .te-lbl{font-size:.65rem;color:#888;letter-spacing:1.5px;text-transform:uppercase;margin-top:4px;display:block;}
  .te-book-btn{display:inline-flex;align-items:center;gap:10px;background:var(--red);color:#fff;font-family:var(--font-body);font-weight:700;font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 24px;border-radius:50px;text-decoration:none;transition:background .2s;border:none;cursor:pointer;}
  .te-book-btn:hover{background:#c0251b;}
  .te-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px;}
  .te-ig-btn{display:inline-flex;align-items:center;gap:8px;border:2px solid #111;color:#111;font-family:var(--font-body);font-weight:700;font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;padding:8px 22px;border-radius:50px;transition:background .3s,color .3s;}
  .te-ig-btn:hover{background:#111;color:#fff;}

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


/* ─── Page Hero (individual trainer) ─── */
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

/* ─── MemberList: compact list with click-to-expand ─── */
function MemberList({ members }: { members: { name: string; role: string; experience?: string; specialty?: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const bios: Record<string, string> = {
    "Akshata Koli":    "Akshata holds a Bachelor's degree in Physiotherapy and is a certified International Dry Needling practitioner. Her professional pursuits align with her passion for helping others. Beyond her dedicated work, she finds solace in sketching and cherishes quality time spent socializing with loved ones. Akshata's leisure activities also encompass watching insightful videos. Her adventurous spirit shines through as she explores new destinations, embarks on lengthy bike rides, tends to her garden, and nurtures her love for pets. Within the realm of her career at Stairs, she thrives within a collaborative team that values innovation. Akshata deeply appreciates the team's supportive and forward-thinking environment, which enables her to flourish and contribute meaningfully.",
    "Rohan Charles":   "Meet Coach Rohan, a certified Functional Training Coach, Special Population Trainer, and holder of ASCA Level 1 certification, dedicated to optimizing your fitness and performance journey. With a personalized and hands-on approach, he designs individualized fitness strategies that align with your unique goals and lifestyle. Rohan's expertise spans sports performance and athlete testing, serving individuals of all fitness levels. Based in Bengaluru's Ulsoor branch at Stairs Physiotherapy & Fitness, he's committed to helping you uncover your physical capabilities and achieve excellence through scientifically tailored training methods. Join Rohan on the path to a healthier, stronger, and more vibrant you today.",
    "Riti Shetty":     "Riti, a dedicated Bachelor's of Physiotherapy graduate, brings her expertise to the realm of sports rehabilitation. With a focus on precise diagnosis, tailored treatment, and sports-specific management, she strives to aid injured athletes in reclaiming their place on the field. Specializing in return-to-sport programs and performance enhancement, Riti is committed to crafting individualized strategies. Her infectious energy and rhythmic prowess, drawn from her passion for dance, further complement her work. You can find her alternating between Ulsoor and Koramangala, where her dynamic approach is geared towards guiding athletes on their journey to recovery and excellence.",
    "Aadhav Panchu Thomas": "Meet Aadhav Panchu Thomas, a Physiotherapist with 1.5 years of experience and a Master's degree in Physiotherapy (MPT). With expertise in Mulligan Manual Therapy, he is dedicated to helping individuals recover from injuries, reduce pain, and improve mobility. Aadhav focuses on delivering personalized, evidence-based care to support optimal recovery and long-term physical well-being.",
    "Chaitra":         "Meet Chaitra, a Sports Science professional with 2 years of experience and a Master’s degree in Sports Sciences. She is passionate about helping individuals improve performance, enhance fitness, and achieve their health goals through a scientific and evidence-based approach. Chaitra focuses on optimizing movement, supporting recovery, and promoting long-term physical well-being and athletic development.",
    "Gautam Satish":   "Meet Gautam Satish, a Musculoskeletal Physiotherapist with 1.5 years of experience and a Bachelor's degree in Physiotherapy (BPT). He is passionate about helping individuals overcome pain, restore movement, and improve their overall quality of life. Gautam focuses on evidence-based rehabilitation and personalized care to support recovery, enhance mobility, and promote long-term physical well-being.",
    "Soumya SK":       "Meet Soumya SK, a Musculoskeletal Physiotherapist with a Master's degree in Physiotherapy (MPT) and a Certified Orthopedic Manual Therapist qualification. She is passionate about helping individuals recover from injuries, restore movement, and improve their quality of life. Soumya focuses on delivering evidence-based, personalized care to support effective rehabilitation and long-term physical well-being.",
    "Srijanya Rajesh": "Meet Srijanya Rajesh, a Sports and Musculoskeletal Physiotherapist with 1.8 years of experience and a Master's degree in Physiotherapy (MPT). Her expertise includes Dry Needling and Clinical Neurodynamics. Srijanya is passionate about helping individuals recover from injuries, improve movement, and enhance performance through personalized, evidence-based rehabilitation and patient-centered care.",
    "Swathi M V":      "Meet Swathi M V, a Sports and Musculoskeletal Physiotherapist with 4.5 years of experience and a Master's degree in Physiotherapy (MPT). Her expertise includes Dry Needling, Cupping Therapy, Taping, IASTM, Clinical Neurodynamics, Hand Rehabilitation, and On-Field Sports Evaluation. Swathi is passionate about helping individuals recover from injuries, restore function, and enhance performance through evidence-based rehabilitation and personalized care.",
    "Vedith":          "Meet Vedith, a Sports Science professional with 2 years of experience and a Master’s degree in Sports Science. He is passionate about improving athletic performance, enhancing fitness, and supporting recovery through evidence-based training methods. Vedith focuses on helping individuals build strength, optimize movement, and achieve their fitness and performance goals safely and effectively.",
    "Martin Thomas":   "Meet Martin Thomas C T, a Strength and Conditioning Coach with 5 years of experience, an MBA, and ASCA Level 2 certification. He is passionate about helping individuals improve strength, fitness, and athletic performance through structured and evidence-based training programs. Martin focuses on enhancing movement quality, injury prevention, and long-term physical development to help clients achieve their goals.",
    "Niha":            "Meet Niha, a dedicated physiotherapy professional with a Master's degree in Sports Physiotherapy. As a fresher in the field, Niha brings a fresh perspective and eagerness to learn and grow. Specializing in assessment and treatment planning, Niha is adept at developing comprehensive strategies tailored to each patient's needs. With a focus on therapeutic exercise prescription and manual therapy techniques, Niha strives to optimize recovery and enhance performance. Passionate about patient education, Niha empowers individuals to take an active role in their rehabilitation journey. With a commitment to excellence and a compassionate approach, Niha is poised to make a positive impact in the realm of sports physiotherapy.",
    "Sindhura Udupa":  "Meet Sindhura Udupa, a Musculoskeletal Physiotherapist with 4 years of experience and qualifications in BPT and MSc Physiotherapy. She has a special interest in Women's Health and is dedicated to helping individuals improve mobility, manage pain, and achieve optimal physical well-being. Sindhura combines evidence-based rehabilitation with personalized care to support long-term health and recovery.",
    "Sairam M":        "Meet Sairam! A valuable addition to our team, Sairam holds a Masters in Physiotherapy, specializing in Musculoskeletal Sciences and Sports. His enthusiasm for continuous learning shines through, and at Stairs, he relishes the platform for physiotherapists and coaches to collaborate, sharing innovative ideas and holistic rehabilitation approaches. Sairam's professional passion aligns seamlessly with his personal interests, including cricket and swimming. His leisure moments are spent wisely with long drives, exploring new locales, and connecting with friends. His dedication to his craft mirrors his zest for life's pleasures – particularly his love for diverse culinary experiences.",
    "Aashutosh Karna": "Meet Aashutosh Karna, an Orthopaedic Physiotherapist with a Master's degree in Physiotherapy (MPT) and 2 years of experience. With expertise in Myofascial Release (MFR), he focuses on helping individuals recover from injuries, manage pain, and improve mobility. Aashutosh is committed to providing personalized, evidence-based care to support long-term recovery and functional well-being.",
    "Achintya P R":    "Meet Achintya P R, a Sports Physiotherapist with a Master's degree in Sports Physiotherapy. His expertise includes dry needling, cupping, and sports injury rehabilitation. Certified as a London Shoulder Clinic Certified Practitioner (LSCCP), IASMT practitioner, and FIFA Diploma holder, Achintya is passionate about helping individuals recover efficiently, prevent injuries, and enhance their athletic performance.",
    "Bijoy Joseph Bastian": "Meet Bijoy Joseph Bastian, a Sports Science professional with 5 years of experience and a Master’s degree in Sports Science. He is passionate about optimizing athletic performance, enhancing recovery, and improving overall fitness through a scientific and evidence-based approach. Bijoy works closely with individuals to help them achieve their performance, rehabilitation, and wellness goals.",
    "Kiran Prakash Dsouza": "Meet Kiran Prakash Dsouza, a Sports Science professional with a Master's degree in Physiotherapy (MPT) and 1 year of experience. His expertise includes dry needling, kinesiotaping, cupping therapy, mat Pilates, and IAFT. Kiran is passionate about helping individuals recover efficiently, improve movement quality, and enhance physical performance through evidence-based rehabilitation and training approaches.",
    "Malan Karthikeyan": "Meet Malan Karthikeyan, a Strength and Conditioning Coach with a Master's degree (MSc) and 8 months of experience. He is passionate about helping individuals build strength, improve fitness, and enhance athletic performance through structured and goal-oriented training programs. Malan focuses on movement quality, injury prevention, and long-term physical development to help clients perform at their best.",
    "Naveenraj A":     "Meet Naveenraj A, a Musculoskeletal and Sports Physiotherapist with a Master's degree in Physiotherapy (MPT) and 3 years of experience. He is dedicated to helping individuals recover from injuries, improve movement, and achieve their physical goals. With a strong focus on rehabilitation and performance enhancement, Naveenraj combines evidence-based practice with personalized care to support optimal recovery and long-term well-being.",
    "Niharika J Somayaji": "Meet Niharika J Somayaji, a Sports and Musculoskeletal Physiotherapist with 1.9 years of experience and a Master's degree in Physiotherapy (MPT). As a Certified Orthopedic Manual Therapist, she specializes in assessing and treating musculoskeletal conditions, helping individuals recover from injuries, improve movement, and return to their activities with confidence through personalized, evidence-based care.",
    "Ramya Shetty":    "Meet Ramya Shetty, a Physiotherapist with a Bachelor's degree in Physiotherapy (BPT) and 10 months of experience. She is passionate about helping individuals recover from injuries, improve mobility, and achieve their health and wellness goals. Through a patient-centered and evidence-based approach, Ramya focuses on rehabilitation, pain management, and promoting long-term physical well-being.",
    "Vasudha Siddappa": "Meet Vasudha Siddappa, a Musculoskeletal Physiotherapist with clinical and academic experience. Her expertise includes Dry Needling, Cupping Therapy, IASTM, and Therapeutic Taping. Passionate about evidence-based rehabilitation, Vasudha focuses on helping individuals recover from injuries, manage pain, and improve functional movement while promoting long-term health and well-being through personalized care.",
    "Niketh Madhu":   "Meet Niketh Madhu, a passionate and dedicated physiotherapist specializing in Physical Medicine and Rehabilitation, Musculoskeletal Assessment, Pain Management, Athletic Exercise Testing & Rehabilitation, and Sports-Specific Rehabilitation & Conditioning. With a master's degree in Physiotherapy focused on Musculoskeletal Sciences and Sports, Niketh brings a wealth of knowledge and expertise to his practice. With a keen eye for detail and a compassionate approach, Niketh has honed his skills over one year of practical experience, serving individuals with diverse needs and goals. He is also a certified K Tape practitioner, adept at utilizing innovative techniques to optimize recovery and performance. Whether you're recovering from an injury, managing chronic pain, or striving for peak athletic performance, Niketh is committed to providing personalized care tailored to your unique needs, helping you achieve your health and wellness objectives.",
    "Manoj Prasath":   "Meet Manoj Prasath Arumugam, a skilled physiotherapist with 4 years of experience in the field of sports physiotherapy. With a Master's in Sports Physiotherapy, Manoj brings a wealth of knowledge and expertise in assessment and treatment planning tailored to athletes and active individuals. He specializes in pain management and manual therapy, utilizing hands-on techniques to alleviate discomfort and promote healing. His proficiency extends to sports injury management, where he focuses on prehabilitation and rehabilitation to optimize recovery. Additionally, Manoj is dedicated to return-to-sports training, ensuring athletes regain peak performance while minimizing the risk of re-injury.",
    "Bhavika Advani":  "Meet Bhavika Advani, a Sports Physiotherapist with 5 years of experience and a Master's degree in Sports Physiotherapy. She specializes in sports injury rehabilitation, performance enhancement, and recovery techniques, including dry needling, myofascial release (MFR), muscle energy techniques (MET), taping, and cupping. With FIFA Diploma and ASCA Level 1 certifications, Bhavika is dedicated to helping individuals move better, recover faster, and perform at their best.",
    "Nithya Shree N":  "Meet Nithya Shree N, a Musculoskeletal Physiotherapist with a Master's degree in Physiotherapy (MPT) and 1 year of experience. She specializes in myofascial release and chronic pain management, helping individuals overcome pain, restore movement, and improve their quality of life. Nithya is committed to delivering personalized, evidence-based care that supports long-term recovery and overall well-being.",
    "Jayani":          "Meet Jayani, a Physiotherapist with a Master's degree in Physiotherapy (MPT) and a strong interest in musculoskeletal rehabilitation. She is committed to helping individuals recover from injuries, improve mobility, and achieve their health goals through personalized care, evidence-based treatment, and a patient-centered approach to rehabilitation and wellness.",
    "Gokulnath G":     "Meet Gokulnath G, a Sports and Musculoskeletal Physiotherapist with a Master's degree in Sports Physiotherapy and 1 year of experience. His expertise includes dry needling, Mulligan Manual Therapy, and myofascial release. Passionate about sports-specific rehabilitation, Gokulnath focuses on helping individuals recover from injuries, enhance performance, and return to their activities with confidence.",
    "Devika R S":      "Meet Devika R S, a Physiotherapist with a Master's degree in Physiotherapy (MPT) who is passionate about helping individuals recover, move efficiently, and improve their overall well-being. She is committed to delivering personalized care through evidence-based practices, focusing on rehabilitation, injury prevention, and supporting clients in achieving their health and fitness goals.",
    "Shivani Vyas":   "Meet Shivani Vyas, a Sports and Orthopaedic Physiotherapist with 2 years of experience and a Master's degree in Sports Physiotherapy (MPT Sports). Her expertise includes Applied Dry Needling and Quadrant System Global Assessment. Shivani is passionate about sports-specific rehabilitation and performance enhancement, helping individuals recover from injuries, improve movement, and return to their activities stronger and more confident.",
    "Karthik A":       "Meet Kartik Arumugam, a Sports and Musculoskeletal Physiotherapist with 5 years of experience and a Master's degree in Sports Physiotherapy (MPT Sports). With expertise in Dry Needling, he is passionate about helping individuals recover from injuries, optimize movement, and enhance performance. Kartik combines evidence-based rehabilitation with personalized care to support long-term health and athletic success.",
    "Tanushka Acharya": "Meet Tanushka Acharya, a Physiotherapist with 7 months of experience and a Bachelor's degree in Physiotherapy (BPT). Her expertise includes Dry Needling, Cupping Therapy, IASTM, Kinesiotaping, Mat Pilates, Manipulation, and PNF techniques. Tanushka is dedicated to helping individuals recover from injuries, improve mobility, and achieve their health goals through personalized, evidence-based rehabilitation and care.",
    "Imthiyaz Ibrahim": "Meet Imthiyaz Ibrahim, a Sports and Musculoskeletal Physiotherapist with 2 years of experience and a Master's degree in Physiotherapy (MPT). His expertise includes Dry Needling, Cupping Therapy, IASTM, Therapeutic Taping, and Deep Friction Massage (DFM). Imthiyaz is committed to helping individuals recover from injuries, improve movement, and enhance performance through personalized, evidence-based rehabilitation and care.",
    "Sumalatha SP":   "Suma stands out as the ultimate support for both team members and clients alike. With a solid educational background and expertise in communication, including roles as a medical transcriptionist and in HR with a focus on recruitment and vendor management, Suma's capabilities are second to none. Her passion for social interaction allows her to effortlessly connect with others, while her black belt in karate exemplifies her dedication and discipline. Beyond her professional accomplishments, Suma finds joy in harnessing the power of Microsoft Excel and maintaining an active lifestyle through workouts. Additionally, she channels her creativity into interior design, showcasing her talent for space planning and decoration. Suma's holistic approach to her work is a testament to her multifaceted skills and unwavering commitment.",
    "Shuaib":          "Meet Our Admin Executive, Mr. Shuaib. our dedicated Admin Executive. With a Bachelor’s degree in Commerce (BCOM), Shuaib brings a blend of professionalism and a friendly, compassionate approach to his work. His commitment to providing excellent support ensures smooth operations behind the scenes, making him an invaluable part of our team. Always approachable and eager to assist, Shuaib’s positive attitude helps create a welcoming environment for both clients and colleagues alike.",
    "Pavithra":        "Meet Mrs. Pavithra, our Admin Executive, who brings a blend of professionalism, friendliness, and compassion to our team. A B.Com graduate, Pavithra is dedicated to ensuring smooth and efficient operations, always going above and beyond to support both staff and clients. Her approachable nature and commitment to excellence make her an invaluable part of our community, and we’re thrilled to have her with us.",
    "Bindu":           "Meet Bindu Radhika VijayaRao, our Admin Executive with a Bachelor's degree in Engineering (B.E.) and over a year of experience at Stairs. She plays a key role in supporting daily operations and ensuring a smooth experience for clients and team members. With strong organizational and communication skills, Bindu contributes to the efficient functioning of Stairs and its services.",
    "Deepthi":         "Meet Ms. Deepthi who has been a valued member of the Stairs team for over a year. As a Front Office Executive, she plays a key role in creating a welcoming and seamless experience for clients. With a background in Biotechnology, she brings strong organizational skills, attention to detail, and a friendly approach to her work.",
    "Marvin Joiner":   "Expert CrossFit & strength coach with 10+ years developing elite athletes through progressive overload and movement quality.",
    "Derek Hale":      "Competitive powerlifter and certified coach programming for all levels — from first-time lifters to state champions.",
    "Sofia Reyes":     "Yoga and mobility specialist helping clients move freely, recover faster, and maintain long-term athletic health.",
    "Patricia Woodrum":"Former marathon runner coaching aerobic base building, zone training, and race preparation for all distances.",
    "Hannaz Stone":    "Body recomposition expert guiding clients through science-backed, sustainable transformation programs.",
    "Luke Brennan":    "Sports rehab physiotherapist bridging the gap between injury recovery and return to full athletic performance.",
    "Aisha Patel":     "Holistic mobility and yoga coach working at the intersection of flexibility, fascia, and athletic recovery.",
    "Rohan Mehta":     "Physiotherapist specialising in acute and chronic sports injuries with a focus on quick, lasting recovery.",
    "Priya Nair":      "Functional training coach building real-world strength and movement competency for everyday athletes.",
    "Tom Reeves":      "Youth performance specialist developing young athletes with age-appropriate, sport-specific training programs.",
    "Ananya Kumar":    "Post-surgery rehab specialist guiding patients from initial recovery back to full strength and mobility.",
    "Vikram Das":      "Strength & conditioning coach dedicated to unlocking peak athletic performance through intelligent programming.",
    "Sneha Rao":       "Centre manager ensuring smooth operations and a welcoming experience for every patient and visitor.",
    "Kiran Shetty":    "Front desk coordinator providing attentive patient support and a warm first point of contact.",
    "Deepa Iyer":      "Finance and admin specialist handling billing and coordination with precision and care.",
    "Somya Rout":      "EDUCATION & QUALIFICATIONS: Bachelor's in Physiotherapy. Post-Graduation in Clinical Research. Fellowship in Sports Sciences (Apollo Hospitals). Certification in Asian Football Sports Physiotherapy course (ASPETAR, Qatar). Certificate in Manual Therapy (MTFI). Certified Strength and Conditioning Trainer (Exercise and Sport Sciences International Consultancy). Certification in Cranial and Spinal Osteopathy (European Union). Member of the Indian Association of Physiotherapists. Certificate Physiotherapy course in Marathon Running.\n\nWORK EXPERIENCE: Former Head Physiotherapist for a Ranji Cricket Team and Academy. Former Head Physiotherapist for the U19 and U17 Indian football teams. Former Physiotherapist for a national player at the Vietnam Tennis Open. Former Head Physiotherapist at Sports Authority of Gujarat. Somya worked closely with cricketer Michael Bevan from 2011-12. He was also part of the physio team for the Asian Football Qualifiers in Kuwait and the Asian Football Championship in Malaysia.\n\nCURRENTLY: Founded STAIRS Physiotherapy and Fitness Centre (Ulsoor and Koramangala, Bangalore) in 2019.",
    "Harinag S P":     "Hari is one of the co-founders of Stairs and one of its strength and conditioning coaches. He completed his Bachelor's in Civil Engineering. A sports enthusiast since childhood, he loves running, football and badminton, and holds a black belt in Karate, having won various state and national level tournaments. He is an expert in functional training and plyometrics and has been practising Olympic lifting for many years. He loves exploring different forms of training and building creative, fun training programs. In his leisure time Hari takes up different fitness challenges. Apart from loving everything related to sports, Hari enjoys meeting new people and learning new skills.",
  };

  // Social links shown as a button in the expanded member panel.
  const socials: Record<string, string> = {
    "Somya Rout": "https://www.instagram.com/somyarout2806/",
  };

  // Member photos (files in /public/images). objectPosition keeps faces framed inside the circles.
  const photos: Record<string, { src: string; pos: string }> = {
    "Somya Rout":  { src: "/images-optimized/0H9A0792.webp", pos: "center 20%" },
    "Harinag S P": { src: "/images-optimized/0H9A0795.webp", pos: "center 20%" },
    "Akshata Koli":  { src: "/images/team/ulsoor%20team/Akshata%20koli.avif", pos: "center 20%" },
    "Rohan Charles": { src: "/images/team/ulsoor%20team/Rohan%20Charles.avif", pos: "center 20%" },
    "Riti Shetty":   { src: "/images/team/ulsoor%20team/Riti%20Shetty.avif", pos: "center 20%" },
    "Aadhav Panchu Thomas": { src: "/images/team/ulsoor%20team/Aadhav%20Panchu%20Thomas.avif", pos: "center 20%" },
    "Chaitra":       { src: "/images/team/ulsoor%20team/Chaitra.avif", pos: "center 20%" },
    "Gautam Satish": { src: "/images/team/ulsoor%20team/Gautam%20Satish.avif", pos: "center 20%" },
    "Soumya SK":     { src: "/images/team/ulsoor%20team/Soumya%20SK.avif", pos: "center 20%" },
    "Srijanya Rajesh": { src: "/images/team/ulsoor%20team/Srijanya%20Rajesh.avif", pos: "center 20%" },
    "Swathi M V":    { src: "/images/team/ulsoor%20team/Swathi%20M%20V.avif", pos: "center 20%" },
    "Vedith":        { src: "/images/team/ulsoor%20team/Vedith.avif", pos: "center 20%" },
    "Bhumika":       { src: "/images/team/ulsoor%20team/Bhumika.avif", pos: "center 20%" },
    "Gagan Gowda":   { src: "/images/team/koramangla%20team/Gagan%20Gowda.avif", pos: "center 20%" },
    "Martin Thomas": { src: "/images/team/koramangla%20team/Martin%20Thomas.avif", pos: "center 20%" },
    "Niha":          { src: "/images/team/koramangla%20team/Niha.avif", pos: "center 20%" },
    "Sindhura Udupa": { src: "/images/team/koramangla%20team/Sindhura%20Udupa.avif", pos: "center 20%" },
    "Sairam M":      { src: "/images/team/koramangla%20team/Sairam%20M.avif", pos: "center 20%" },
    "Aashutosh Karna": { src: "/images/team/koramangla%20team/Aashutosh%20Karna.avif", pos: "center 20%" },
    "Achintya P R":  { src: "/images/team/koramangla%20team/Achintya%20P%20R.avif", pos: "center 20%" },
    "Bijoy Joseph Bastian": { src: "/images/team/koramangla%20team/Bijoy%20Joseph%20Bastian.avif", pos: "center 20%" },
    "Kiran Prakash Dsouza": { src: "/images/team/koramangla%20team/Kiran%20Prakash%20Dsouza.avif", pos: "center 20%" },
    "Malan Karthikeyan": { src: "/images/team/koramangla%20team/Malan%20Karthikeyan.avif", pos: "center 20%" },
    "Naveenraj A":   { src: "/images/team/koramangla%20team/Naveenraj%20A.avif", pos: "center 20%" },
    "Niharika J Somayaji": { src: "/images/team/koramangla%20team/Niharika%20J%20Somayaji.avif", pos: "center 20%" },
    "Ramya Shetty":  { src: "/images/team/koramangla%20team/Ramya%20Shetty.avif", pos: "center 20%" },
    "Vasudha Siddappa": { src: "/images/team/koramangla%20team/Vasudha%20Siddappa.avif", pos: "center 20%" },
    "Shreya Sharma": { src: "/images/team/koramangla%20team/Shreya%20Sharma.avif", pos: "center 20%" },
    "Inchara":       { src: "/images/team/koramangla%20team/Inchara.avif", pos: "center 20%" },
    "Niketh Madhu":  { src: "/images/team/Indiranagar%20Team/Niketh%20Madhu.avif", pos: "center 20%" },
    "Manoj Prasath": { src: "/images/team/Indiranagar%20Team/Manoj%20Prasath.avif", pos: "center 20%" },
    "Bhavika Advani": { src: "/images/team/Indiranagar%20Team/Bhavika%20Advani.avif", pos: "center 20%" },
    "Varsha Gowda":  { src: "/images/team/Indiranagar%20Team/Varsha%20Gowda.avif", pos: "center 20%" },
    "Nithya Shree N": { src: "/images/team/Indiranagar%20Team/Nithya%20Shree%20N.avif", pos: "center 20%" },
    "Jayani":        { src: "/images/team/Indiranagar%20Team/Jayani.avif", pos: "center 20%" },
    "Gokulnath G":   { src: "/images/team/Indiranagar%20Team/Gokulnath%20G.avif", pos: "center 20%" },
    "Devika R S":    { src: "/images/team/Indiranagar%20Team/Devika%20R%20S.avif", pos: "center 20%" },
    "Shivani Vyas":  { src: "/images/team/Whitefield/Shivani%20Vyas.avif", pos: "center 20%" },
    "Karthik A":     { src: "/images/team/Whitefield/Karthik%20A.avif", pos: "center 20%" },
    "Tanushka Acharya": { src: "/images/team/Whitefield/Tanushka%20Acharya.avif", pos: "center 20%" },
    "Imthiyaz Ibrahim": { src: "/images/team/Whitefield/Imthiyaz%20Ibrahim.avif", pos: "center 20%" },
    "Sumalatha SP":  { src: "/images/team/admin/Sumalatha%20SP.avif", pos: "center 20%" },
    "Shuaib":        { src: "/images/team/admin/Shuaib.avif", pos: "center 20%" },
    "Pavithra":      { src: "/images/team/admin/Pavithra.avif", pos: "center 20%" },
    "Reeta":         { src: "/images/team/admin/Reeta.avif", pos: "center 20%" },
    "Elavarasi":     { src: "/images/team/admin/Elavarasi.avif", pos: "center 20%" },
    "Nafiya":        { src: "/images/team/admin/Nafiya.avif", pos: "center 20%" },
    "Bindu":         { src: "/images/team/admin/Bindu.avif", pos: "center 20%" },
    "Deepthi":       { src: "/images/team/admin/Deepthi.avif", pos: "center 20%" },
  };
  const avatarImg = (name: string) => {
    const p = photos[name];
    if (!p) return <i className="fas fa-user" />;
    return <img src={p.src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos, display: "block" }} />;
  };

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  // Splits a bio on blank lines; a leading "LABEL:" (all caps) is shown as a small heading.
  const renderBio = (text: string) =>
    text.split("\n\n").map((para, i) => {
      const m = para.match(/^([A-Z &]+):\s*([\s\S]*)$/);
      return (
        <p className="te-bio" key={i}>
          {m ? (
            <>
              <strong style={{ color: "#111", fontSize: ".8rem", letterSpacing: "1.5px" }}>{m[1]}</strong>
              <br />
              {m[2]}
            </>
          ) : (
            para
          )}
        </p>
      );
    });

  return (
    <div className="tm-list reveal" style={{ marginTop: 48 }}>
      {members.map((m, i) => (
        <div key={i}>
          {/* ── Collapsed row ── */}
          <div
            className={`tm-row${openIdx === i ? " active" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="tm-thumb" style={photos[m.name] ? { overflow: "hidden", padding: 0 } : undefined}>{avatarImg(m.name)}</div>
            <div className="tm-info">
              <div className="tm-name">{m.name}</div>
              <div className="tm-role">{m.role}</div>
            </div>
            {m.specialty && <span style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#e8372c", background: "#fef0ef", padding: "3px 10px", borderRadius: 20, flexShrink: 0 }}>{m.specialty}</span>}
            <div className="tm-play">
              <i className={`fas fa-${openIdx === i ? "chevron-up" : "play"}`} style={{ marginLeft: openIdx === i ? 0 : 2 }} />
            </div>
          </div>

          {/* ── Expanded panel ── */}
          <div className={`tm-expand-wrap${openIdx === i ? " open" : ""}`}>
            <div className="tm-expand">
              <div className="tm-expand-top">
                <div className="tm-expand-top-avatar" style={photos[m.name] ? { overflow: "hidden", padding: 0, width: 130, height: 130 } : undefined}>{avatarImg(m.name)}</div>
                <div className="tm-expand-top-text">
                  <h3>{m.name}</h3>
                  <span className="te-role">{m.role}</span>
                </div>
              </div>
              <div className="tm-expand-body">
                {renderBio(bios[m.name] || `${m.name} is a dedicated member of the Stairs team, committed to delivering exceptional care and results for every patient.`)}
                <div className="te-actions">
                  <a href="/contact" className="te-book-btn">Book a Session <i className="fas fa-arrow-right" /></a>
                  {socials[m.name] && (
                    <a href={socials[m.name]} target="_blank" rel="noopener noreferrer" className="te-ig-btn" aria-label={`${m.name} on Instagram`}>
                      <i className="fab fa-instagram" /> Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Team View Component ─── */
function TeamView({ teamSlug }: { teamSlug: string }) {
  const team = locationTeams[teamSlug];
  if (!team) return null;
  return (
    <>
      {/* Hero */}
      <section id="page-hero">
        <div className="page-hero-bg" />
        <div className="circle-deco page-hero-circle" />
        <div className="hero-3d-scene">
          <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="160" stroke="#e8372c" strokeWidth="1" strokeDasharray="6 12" opacity="0.18" style={{ animation: "spin-ring 20s linear infinite", transformOrigin: "190px 190px" }} />
            <circle cx="190" cy="190" r="120" stroke="#ff6a00" strokeWidth="1" strokeDasharray="3 16" opacity="0.12" style={{ animation: "spin-ring 30s linear infinite reverse", transformOrigin: "190px 190px" }} />
            <circle cx="190" cy="190" r="80" fill="none" stroke="rgba(232,55,44,0.07)" strokeWidth="50" style={{ animation: "pulse-ring 4s ease-in-out infinite", transformOrigin: "190px 190px" }} />
            <g style={{ animation: "float1 5s ease-in-out infinite", transformOrigin: "190px 190px" }}>
              <circle cx="190" cy="130" r="44" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2.5" />
              <circle cx="190" cy="130" r="32" fill="#1e1e1e" />
              {[160, 185, 210].map((x, i) => (
                <circle key={i} cx={x} cy="190" r="16" fill="#1e1e1e" stroke="#e8372c" strokeWidth="1.5" />
              ))}
            </g>
            {[{x:55,y:95,d:"0s"},{x:325,y:110,d:"1s"},{x:75,y:285,d:"1.8s"},{x:305,y:295,d:"0.5s"}].map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
            ))}
          </svg>
        </div>
        <div className="page-hero-content">
          <span className="sub reveal">Location Team</span>
          <span className="hero-role-badge reveal" style={{ transitionDelay: "0.05s" }}>{team.location}</span>
          <h1 className="reveal" style={{ transitionDelay: "0.1s", fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>{team.name.toUpperCase()}</h1>
          <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
            <a href="/">Home</a><span>/</span>
            <a href="/trainers">Team</a><span>/</span>
            <span style={{ color: "#fff" }}>{team.name}</span>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section id="profile" style={{ padding: "80px 60px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <span className="section-label reveal">Our Team</span>
          <h2 className="section-title reveal" style={{ marginBottom: 20 }}>{team.name}</h2>
          <p className="reveal" style={{ color: "#666", fontSize: "1rem", lineHeight: 1.9, maxWidth: 700, margin: "0 auto 60px" }}>{team.description}</p>

          {/* Members List — compact, click to expand */}
          <MemberList members={team.members} />

          {/* Back button */}
          <div className="reveal" style={{ marginTop: 56 }}>
            <a href="/trainers" style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "2px solid #111", color: "#111", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".85rem", letterSpacing: "1px", textTransform: "uppercase", padding: "12px 28px", borderRadius: "50px", textDecoration: "none", transition: "background 0.3s, color 0.3s" }}>
              <i className="fas fa-arrow-left" /> Back to All Teams
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Main Page ─── */
export default function TrainerProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const trainer = trainers.find((t) => t.slug === slug);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  // Check if this is a location team slug — render team members view
  const isTeamSlug = slug in locationTeams;
  if (isTeamSlug) {
    return (
      <>
        <style>{globalStyles}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <TeamView teamSlug={slug} />
        <BranchesFooter />
      </>
    );
  }

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
      <BranchesFooter />
    </>
  );
}
