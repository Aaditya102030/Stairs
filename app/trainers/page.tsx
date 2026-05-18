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
  .breadcrumb a{color:var(--red);}
  .breadcrumb span{color:rgba(255,255,255,.4);}

  /* ── TRAINERS SECTION ── */
  #trainers-full{
    background:#ffffff;
    padding:100px 60px;
    text-align:center;
    position:relative;
    overflow:hidden;
  }
  #trainers-full::before{
    content:'';
    position:absolute;inset:0;
    background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(232,55,44,.06) 0%,transparent 70%);
    pointer-events:none;
  }
  #trainers-full .section-label{color:var(--red);}
  #trainers-full .section-title{color:#111111;}
  #trainers-full .section-subtitle{
    color:rgba(0,0,0,.5);
    font-size:.95rem;
    margin-top:10px;
    letter-spacing:1px;
  }

  /* ── LAYOUT ── */
  .trainers-layout{max-width:1160px;margin:60px auto 0;display:flex;flex-direction:column;gap:28px;}

  /* ── ADMIN HERO CARD (top, full-width spotlight) ── */
  .admin-hero{
    position:relative;
    border-radius:28px;
    overflow:hidden;
    background:linear-gradient(135deg,#1a0a08 0%,#1e0f0c 40%,#180808 100%);
    border:1px solid rgba(232,55,44,.3);
    display:grid;
    grid-template-columns:1fr 1fr;
    align-items:center;
    min-height:280px;
    transition:transform .3s,box-shadow .3s;
    box-shadow:0 8px 40px rgba(232,55,44,.12);
  }
  .admin-hero::before{
    content:'';
    position:absolute;inset:0;
    background:conic-gradient(from var(--admin-angle,0deg) at 50% 50%,transparent 0deg,transparent 60deg,rgba(232,55,44,.5) 120deg,rgba(255,107,53,.6) 180deg,rgba(232,55,44,.5) 240deg,transparent 300deg,transparent 360deg);
    z-index:0;
    opacity:0;
    transition:opacity .5s;
    animation:adminSpin 3s linear infinite;
    animation-play-state:paused;
    border-radius:28px;
  }
  .admin-hero::after{
    content:'';
    position:absolute;inset:1px;
    background:linear-gradient(135deg,#1a0a08 0%,#1e0f0c 40%,#180808 100%);
    border-radius:27px;
    z-index:0;
  }
  .admin-hero:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(232,55,44,.3);}
  .admin-hero:hover::before{opacity:1;animation-play-state:running;}
  @property --admin-angle{syntax:'<angle>';initial-value:0deg;inherits:false;}
  @keyframes adminSpin{to{--admin-angle:360deg;}}

  .admin-hero-left{
    position:relative;z-index:1;
    padding:50px 50px 50px 60px;
    text-align:left;
  }
  .admin-priority-badge{
    display:inline-flex;align-items:center;gap:8px;
    background:var(--red);color:#fff;
    font-size:.82rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;
    padding:6px 16px 6px 10px;border-radius:30px;
    margin-bottom:22px;
  }
  .admin-priority-badge i{font-size:.9rem;}
  .admin-hero-left h3{
    font-family:var(--font-display);
    font-size:3.2rem;letter-spacing:3px;text-transform:uppercase;
    color:#fff;line-height:1;margin-bottom:16px;
  }
  .admin-hero-left p{color:rgba(255,255,255,.6);font-size:1rem;line-height:1.75;margin-bottom:28px;max-width:440px;}
  .admin-stats{display:flex;gap:32px;margin-bottom:28px;}
  .admin-stat{text-align:left;}
  .admin-stat .num{font-family:var(--font-display);font-size:2.4rem;color:var(--red);letter-spacing:1px;}
  .admin-stat .lbl{font-size:.82rem;color:rgba(255,255,255,.45);letter-spacing:1px;text-transform:uppercase;margin-top:2px;}

  .admin-hero-right{
    position:relative;z-index:1;
    display:flex;align-items:center;justify-content:center;
    padding:40px;
  }
  .admin-avatar-wrap{position:relative;}
  .admin-avatar-ring{
    width:220px;height:220px;border-radius:50%;
    border:3px solid rgba(232,55,44,.4);
    display:flex;align-items:center;justify-content:center;
    position:relative;
    animation:adminRingPulse 3s ease-in-out infinite;
  }
  @keyframes adminRingPulse{
    0%,100%{box-shadow:0 0 0 0 rgba(232,55,44,.3),0 0 30px rgba(232,55,44,.15);}
    50%{box-shadow:0 0 0 16px rgba(232,55,44,0),0 0 50px rgba(232,55,44,.3);}
  }
  .admin-avatar-ring::before{
    content:'';position:absolute;inset:-12px;border-radius:50%;
    border:1px dashed rgba(232,55,44,.25);
    animation:adminSpin2 12s linear infinite;
  }
  @keyframes adminSpin2{to{transform:rotate(360deg);}}
  .admin-avatar-inner{
    width:180px;height:180px;border-radius:50%;
    background:linear-gradient(135deg,#2a1010,#1a0808);
    border:3px solid rgba(232,55,44,.5);
    display:flex;align-items:center;justify-content:center;
    color:rgba(232,55,44,.6);font-size:3.5rem;
  }
  .admin-floating-tag{
    position:absolute;bottom:-10px;right:-20px;
    background:var(--red);color:#fff;
    font-size:.68rem;font-weight:700;letter-spacing:1.5px;
    text-transform:uppercase;padding:6px 14px;border-radius:20px;
    box-shadow:0 4px 16px rgba(232,55,44,.5);
  }

  /* ── FOUNDERS + MID BAND ── */
  .founders-row{
    display:grid;
    grid-template-columns:1fr 1.6fr 1fr;
    gap:20px;
    align-items:stretch;
  }
  .founders-center{
    position:relative;
    border-radius:24px;
    overflow:hidden;
    background:linear-gradient(150deg,#161616 0%,#1c1c1c 100%);
    border:1px solid rgba(232,55,44,.2);
    padding:40px 32px 32px;
    text-align:center;
    transition:transform .3s,box-shadow .3s;
    box-shadow:0 4px 24px rgba(0,0,0,.4);
  }
  .founders-center::before{
    content:'';
    position:absolute;inset:-2px;border-radius:24px;
    background:conic-gradient(from var(--fc-angle,0deg),transparent 0deg,transparent 80deg,rgba(232,55,44,.7) 140deg,rgba(255,100,50,.8) 180deg,rgba(232,55,44,.7) 220deg,transparent 280deg,transparent 360deg);
    z-index:0;opacity:0;transition:opacity .4s;
    animation:fcSpin 3s linear infinite;animation-play-state:paused;
  }
  .founders-center::after{content:'';position:absolute;inset:1px;border-radius:23px;background:linear-gradient(150deg,#161616,#1c1c1c);z-index:0;}
  @property --fc-angle{syntax:'<angle>';initial-value:0deg;inherits:false;}
  @keyframes fcSpin{to{--fc-angle:360deg;}}
  .founders-center:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(232,55,44,.25);}
  .founders-center:hover::before{opacity:1;animation-play-state:running;}
  .founders-center>*{position:relative;z-index:1;}
  .founders-crown{
    display:inline-flex;align-items:center;gap:6px;
    background:linear-gradient(90deg,#e8372c,#ff6b35);
    color:#fff;font-size:.78rem;font-weight:700;letter-spacing:2px;
    text-transform:uppercase;padding:5px 16px;border-radius:20px;
    margin-bottom:20px;
    box-shadow:0 4px 14px rgba(232,55,44,.4);
  }
  .founders-center .f-avatar{
    width:130px;height:130px;border-radius:50%;
    background:linear-gradient(135deg,#222,#161616);
    border:3px solid rgba(232,55,44,.4);
    display:flex;align-items:center;justify-content:center;
    color:rgba(232,55,44,.5);font-size:2.8rem;
    margin:0 auto 20px;
    transition:border-color .3s;
  }
  .founders-center:hover .f-avatar{border-color:var(--red);}
  .founders-center h3{font-family:var(--font-display);font-size:1.75rem;letter-spacing:2px;color:#fff;text-transform:uppercase;margin-bottom:10px;}
  .founders-center p{color:rgba(255,255,255,.5);font-size:.95rem;line-height:1.75;margin-bottom:24px;}

  /* side location cards in founders row */
  .loc-card{
    position:relative;
    border-radius:20px;
    overflow:hidden;
    background:#141414;
    border:1px solid rgba(255,255,255,.07);
    padding:32px 24px 26px;
    text-align:center;
    transition:transform .3s,border-color .3s,box-shadow .3s;
    display:flex;flex-direction:column;
  }
  .loc-card::before{
    content:'';
    position:absolute;inset:-2px;border-radius:20px;
    background:conic-gradient(from var(--lc-angle,0deg),transparent 0deg,transparent 80deg,rgba(232,55,44,.6) 140deg,rgba(232,55,44,.6) 200deg,transparent 260deg,transparent 360deg);
    z-index:0;opacity:0;transition:opacity .4s;
    animation:lcSpin 3s linear infinite;animation-play-state:paused;
  }
  .loc-card::after{content:'';position:absolute;inset:1px;border-radius:19px;background:#141414;z-index:0;}
  @property --lc-angle{syntax:'<angle>';initial-value:0deg;inherits:false;}
  @keyframes lcSpin{to{--lc-angle:360deg;}}
  .loc-card:hover{transform:translateY(-6px);box-shadow:0 16px 36px rgba(232,55,44,.18);border-color:transparent;}
  .loc-card:hover::before{opacity:1;animation-play-state:running;}
  .loc-card>*{position:relative;z-index:1;}
  .loc-num{
    position:absolute;top:16px;right:20px;z-index:2;
    font-family:var(--font-display);font-size:3rem;line-height:1;
    color:rgba(232,55,44,.08);letter-spacing:1px;
    transition:color .3s;
  }
  .loc-card:hover .loc-num{color:rgba(232,55,44,.15);}
  .loc-icon{
    width:72px;height:72px;border-radius:50%;
    background:rgba(232,55,44,.08);
    border:2px solid rgba(232,55,44,.15);
    display:flex;align-items:center;justify-content:center;
    margin:0 auto 16px;
    color:var(--red);font-size:1.4rem;
    transition:background .3s,border-color .3s;
  }
  .loc-card:hover .loc-icon{background:rgba(232,55,44,.15);border-color:rgba(232,55,44,.4);}
  .loc-card h3{font-family:var(--font-display);font-size:1.25rem;letter-spacing:2px;color:#fff;text-transform:uppercase;margin-bottom:8px;}
  .loc-card p{color:rgba(255,255,255,.42);font-size:.92rem;line-height:1.75;margin-bottom:20px;flex:1;}
  .loc-tag{
    display:inline-block;background:rgba(232,55,44,.1);color:var(--red);
    font-size:.78rem;font-weight:700;letter-spacing:1.5px;
    text-transform:uppercase;padding:4px 12px;border-radius:20px;
    margin-bottom:16px;border:1px solid rgba(232,55,44,.2);
  }

  /* ── BOTTOM ROW: 2 location teams ── */
  .bottom-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}

  /* shared explore btn */
  .explore-btn{display:inline-flex;align-items:center;gap:10px;background:var(--red);color:#fff;font-family:var(--font-body);font-weight:700;font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 10px 10px 22px;border-radius:50px;cursor:pointer;transition:background .3s,transform .2s;text-decoration:none;border:none;}
  .explore-btn:hover{background:#c0251b;transform:translateY(-2px);}
  .explore-btn .play-icon{width:30px;height:30px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .explore-btn .play-icon i{color:var(--red);font-size:.6rem;margin-left:2px;}
  .explore-btn-inv{background:transparent;border:1.5px solid rgba(255,255,255,.2);color:#fff;}
  .explore-btn-inv:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.4);}
  .explore-btn-inv .play-icon{background:var(--red);}
  .explore-btn-inv .play-icon i{color:#fff;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    #trainers-full,#join-cta,#footer{padding-left:30px;padding-right:30px;}
    .admin-hero{grid-template-columns:1fr;}
    .admin-hero-right{padding:0 40px 40px;}
    .founders-row{grid-template-columns:1fr 1fr;}
    .founders-center{grid-column:1/-1;order:-1;}
    .bottom-row{grid-template-columns:1fr 1fr;}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    #trainers-full{padding:70px 20px;}
    .admin-hero{grid-template-columns:1fr;}
    .admin-hero-left{padding:36px 28px;}
    .admin-stats{flex-wrap:wrap;gap:16px;}
    .founders-row{grid-template-columns:1fr;}
    .bottom-row{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr;}
  }

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
  { slug: "marvin-joiner", name: "ULSOOR TEAM",   bio: "The Ulsoor Team is dedicated to providing exceptional physiotherapy care with professionalism, compassion, and expertise. Their commitment to patient recovery, personalized treatment plans, and supportive approach makes them a trusted team for rehabilitation and wellness." },
  { slug: "patricia-woodrum", name: "KORAMANGALA TEAM",  bio: "Our Koramangala Team combines experience, dedication, and patient-focused care to deliver outstanding physiotherapy treatment. With a passion for helping people recover stronger and healthier, the team creates a positive and motivating healing environment." },
  { slug: "hannaz-stone", name: "INDIRANAGAR TEAM",  bio: "The Indiranagar Team is known for its friendly approach, expert guidance, and commitment to every patients’ recovery journey. Their teamwork and dedication ensure that every patient receives the highest quality care and support." },
  { slug: "derek-hale", name: "WHITEFIELD TEAM",  bio: "The Whitefield Team is committed to delivering high-quality physiotherapy care through expertise, dedication, and compassion. Their patient-first approach and focus on long-term recovery help individuals regain strength, mobility, and confidence" },
  { slug: "aisha-patel", name: "ADMIN TEAM", bio: "The Admin Team is dedicated to providing a smooth and stress-free experience for every visitor. Their friendly approach, quick assistance, and strong coordination ensure that patients feel supported from the moment they walk in" },
  { slug: "tom-reeves", name: "FOUNDERS",  bio: "The Founders envisioned a centre built on trust, care, and excellence in physiotherapy. Through their dedication, leadership, and passion for improving lives, they have created a place focused on healing, recovery, and patient well-being" },
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
            <rect x="90" y="151" width="80" height="8" rx="4" fill="url(#tBarGrad)"/>
            <rect x="170" y="138" width="22" height="34" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="174" y="133" width="14" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="90" y="151" width="80" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="130" y="172" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">20 KG</text>
          </g>
          <g style={{ animation: "float2 5s ease-in-out infinite", transformOrigin: "370px 145px" }}>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#e8372c" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#c0251b" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2.5"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="url(#tKettleGrad)"/>
            <rect x="356" y="118" width="28" height="10" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
            <text x="370" y="153" textAnchor="middle" fill="#e8372c" fontSize="8" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">16KG</text>
          </g>
          <g style={{ animation: "float3 6s ease-in-out infinite", transformOrigin: "260px 265px" }}>
            <rect x="82" y="246" width="28" height="52" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            <rect x="86" y="240" width="18" height="64" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="104" y="252" width="14" height="40" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            <rect x="118" y="258" width="284" height="12" rx="6" fill="url(#tBarGrad2)"/>
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
            <rect x="328" y="373" width="84" height="8" rx="4" fill="url(#tBarGrad)"/>
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
            <linearGradient id="tBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666"/><stop offset="40%" stopColor="#999"/><stop offset="100%" stopColor="#444"/>
            </linearGradient>
            <linearGradient id="tBarGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#777"/><stop offset="40%" stopColor="#aaa"/><stop offset="100%" stopColor="#555"/>
            </linearGradient>
            <radialGradient id="tKettleGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#444"/><stop offset="100%" stopColor="#111"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
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
  const admin   = trainers.find(t => t.slug === "aisha-patel")!;
  const founder = trainers.find(t => t.slug === "tom-reeves")!;
  const ulsoor  = trainers.find(t => t.slug === "marvin-joiner")!;
  const kora    = trainers.find(t => t.slug === "patricia-woodrum")!;
  const indira  = trainers.find(t => t.slug === "hannaz-stone")!;
  const white   = trainers.find(t => t.slug === "derek-hale")!;

  const locIcons: Record<string, string> = {
    "marvin-joiner":   "fas fa-map-marker-alt",
    "patricia-woodrum":"fas fa-map-marker-alt",
    "hannaz-stone":    "fas fa-map-marker-alt",
    "derek-hale":      "fas fa-map-marker-alt",
  };

  const LocCard = ({ t, num }: { t: typeof trainers[0]; num: number }) => (
    <div className="loc-card reveal">
      <span className="loc-num">{String(num).padStart(2,"0")}</span>
      <div className="loc-icon"><i className={locIcons[t.slug] || "fas fa-users"} /></div>
      <span className="loc-tag">Location Team</span>
      <h3>{t.name}</h3>
      <p>{t.bio}</p>
      <a href={`/trainers/${t.slug}`} className="explore-btn">
        Explore <span className="play-icon"><i className="fas fa-arrow-right" /></span>
      </a>
    </div>
  );

  return (
    <section id="trainers-full">
      <span className="section-label reveal">Our People</span>
      <h2 className="section-title reveal">Meet The Full Team</h2>
      <p className="section-subtitle reveal">The backbone of every great experience</p>

      <div className="trainers-layout">

        {/* ── ROW 1: FOUNDERS — Full-width hero ── */}
        <div className="admin-hero reveal">
          <div className="admin-hero-left">
            <span className="admin-priority-badge">
              <i className="fas fa-crown" /> Founders
            </span>
            <h3>{founder.name}</h3>
            <p>{founder.bio}</p>
            <div className="admin-stats">
              <div className="admin-stat"><div className="num">1+</div><div className="lbl">Vision</div></div>
              <div className="admin-stat"><div className="num">10+</div><div className="lbl">Years</div></div>
              <div className="admin-stat"><div className="num">100%</div><div className="lbl">Passion</div></div>
            </div>
            <a href={`/trainers/${founder.slug}`} className="explore-btn">
              Explore <span className="play-icon"><i className="fas fa-arrow-right" /></span>
            </a>
          </div>
          <div className="admin-hero-right">
            <div className="admin-avatar-wrap">
              <div className="admin-avatar-ring">
                <div className="admin-avatar-inner"><i className="fas fa-user" /></div>
              </div>
              <span className="admin-floating-tag">Founders</span>
            </div>
          </div>
        </div>

        {/* ── ROW 2: ADMIN TEAM center + 2 location teams ── */}
        <div className="founders-row">
          <LocCard t={ulsoor} num={1} />

          {/* Admin — secondary featured */}
          <div className="founders-center reveal">
            <span className="founders-crown"><i className="fas fa-star" /> Priority Team</span>
            <div className="f-avatar"><i className="fas fa-user-tie" /></div>
            <h3>{admin.name}</h3>
            <p>{admin.bio}</p>
            <a href={`/trainers/${admin.slug}`} className="explore-btn explore-btn-inv">
              Explore <span className="play-icon"><i className="fas fa-arrow-right" /></span>
            </a>
          </div>

          <LocCard t={kora} num={2} />
        </div>

        {/* ── ROW 3: 2 remaining location teams ── */}
        <div className="bottom-row">
          <LocCard t={indira} num={3} />
          <LocCard t={white}  num={4} />
        </div>

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
