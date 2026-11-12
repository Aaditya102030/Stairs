"use client";

import { useState, useEffect } from "react";
import BranchesFooter from "@/components/BranchesFooter";
import Navbar from "@/components/SiteNav";

/* Prices live in lib/fit2run-plans.ts - edit them there. */
import { inr, price, payHref } from "@/lib/fit2run-plans";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');
  :root { --red:#e8372c; --dark:#111111; --darker:#0a0a0a; --light:#ffffff; --gray:#888888; --bg-light:#f5f5f5; --font-display:'Bebas Neue',sans-serif; --font-body:'Barlow',sans-serif; }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:var(--dark);background:var(--light);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul,ol{list-style:none;}
  img{max-width:100%;display:block;}
  .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  @media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none;}}

  /* NAVBAR (same as the rest of the site) */
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

  /* SHARED */
  .f2r-wrap{max-width:1180px;margin:0 auto;}
  .f2r-h2{font-family:var(--font-display);font-size:clamp(2.4rem,5vw,4rem);line-height:1;letter-spacing:1.5px;text-transform:uppercase;}
  .f2r-h2 em{font-style:normal;color:var(--red);}
  .f2r-btn{display:inline-flex;align-items:center;gap:14px;background:var(--red);color:#fff;font-family:var(--font-body);font-weight:700;font-size:.88rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 10px 10px 30px;border-radius:50px;border:2px solid var(--red);cursor:pointer;transition:background .3s,transform .2s;}
  .f2r-btn:hover{background:#c0251b;border-color:#c0251b;transform:translateY(-2px);}
  .f2r-btn .dot{width:36px;height:36px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .f2r-btn .dot i{color:var(--red);font-size:.72rem;}
  .f2r-btn.ghost{background:transparent;border-color:rgba(255,255,255,.35);padding:10px 30px;}
  .f2r-btn.ghost:hover{background:rgba(255,255,255,.08);border-color:#fff;}
  .f2r-photo{position:relative;overflow:hidden;background:linear-gradient(135deg,#2a1010,#150808);display:flex;align-items:center;justify-content:center;}
  .f2r-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center bottom;}
  .f2r-photo .ini{font-family:var(--font-display);font-size:4rem;letter-spacing:4px;color:rgba(232,55,44,.55);}

  /* HERO */
  #f2r-hero{position:relative;min-height:100vh;background:var(--darker);overflow:hidden;display:flex;align-items:center;padding:130px 72px 90px;}
  #f2r-hero::before{content:'';position:absolute;inset:-20% -10%;background:repeating-linear-gradient(0deg,rgba(232,55,44,.22) 0 2px,transparent 2px 46px);transform:rotate(-9deg);-webkit-mask-image:radial-gradient(ellipse 60% 60% at 75% 55%,#000 0%,transparent 75%);mask-image:radial-gradient(ellipse 60% 60% at 75% 55%,#000 0%,transparent 75%);pointer-events:none;}
  #f2r-hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 70% at 0% 100%,rgba(232,55,44,.28),transparent 70%);pointer-events:none;}
  .f2r-hero-runner{position:absolute;right:-3%;bottom:-8%;width:min(760px,62vw);opacity:.4;pointer-events:none;z-index:1;}
  .f2r-hero-grid{position:relative;z-index:2;width:100%;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;}
  .f2r-hero-logo{height:64px;width:auto;margin-bottom:28px;}
  .f2r-hero-copy h1{font-family:var(--font-display);font-size:clamp(4.2rem,11vw,9rem);line-height:.88;letter-spacing:2px;color:#fff;}
  .f2r-hero-copy h1 span{color:var(--red);}
  .f2r-hero-sub{font-family:var(--font-display);font-size:clamp(1.6rem,3.4vw,2.6rem);letter-spacing:2px;color:#fff;text-transform:uppercase;margin:14px 0 22px;line-height:1.05;}
  .f2r-hero-copy p.f2r-hero-text{color:rgba(255,255,255,.7);font-size:1.05rem;line-height:1.75;max-width:520px;margin-bottom:34px;}
  .f2r-hero-cta{display:flex;flex-wrap:wrap;gap:14px;}
  .f2r-stack{display:flex;flex-direction:column;gap:2px;border-left:4px solid var(--red);padding-left:28px;}
  .f2r-stack span{font-family:var(--font-display);font-size:clamp(2.6rem,5.4vw,4.6rem);line-height:1.02;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.16);transition:color .3s;}
  .f2r-stack span:nth-child(odd){color:#fff;}
  .f2r-stack span:hover{color:var(--red);}
  .f2r-evolve{margin-top:28px;padding-left:32px;color:rgba(255,255,255,.55);font-size:.95rem;line-height:1.7;max-width:420px;}
  .f2r-evolve strong{color:#fff;}

  /* INTRO */
  #f2r-intro{background:#fff;padding:100px 72px;}
  .f2r-intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:start;}
  .f2r-intro-grid p{color:#444;font-size:1.05rem;line-height:1.85;margin-bottom:18px;}
  .f2r-intro-grid .mark{color:var(--red);font-weight:700;}

  /* APPROACH */
  #f2r-approach{background:var(--darker);padding:100px 72px;color:#fff;position:relative;overflow:hidden;}
  #f2r-approach::before{content:'';position:absolute;top:-200px;right:-160px;width:520px;height:520px;border-radius:50%;border:34px solid var(--red);opacity:.08;}
  .f2r-approach-head{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:56px;}
  .f2r-approach-head p{color:rgba(255,255,255,.65);line-height:1.8;font-size:1rem;}
  .f2r-approach-head p b{color:#fff;}
  .f2r-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .f2r-pillar{background:#161616;border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:30px 26px;transition:border-color .3s,transform .3s;}
  .f2r-pillar:hover{border-color:rgba(232,55,44,.5);transform:translateY(-4px);}
  .f2r-pillar .ic{width:54px;height:54px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;margin-bottom:18px;}
  .f2r-pillar h3{font-family:var(--font-display);font-size:1.5rem;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}
  .f2r-pillar p{color:rgba(255,255,255,.55);font-size:.95rem;line-height:1.7;}

  .f2r-track{margin-top:70px;padding:44px 40px 40px;border:1px solid rgba(232,55,44,.35);border-radius:22px;background:linear-gradient(135deg,#1a0a08,#120808);}
  .f2r-track h3{font-family:var(--font-display);font-size:clamp(1.8rem,3.4vw,2.8rem);letter-spacing:1.5px;text-transform:uppercase;line-height:1.05;font-weight:400;}
  .f2r-track h3 em{font-style:normal;color:var(--red);}
  .f2r-track > p{color:rgba(255,255,255,.6);margin:10px 0 36px;font-size:.98rem;}
  .f2r-stations{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:8px;}
  .f2r-stations::before{content:'';position:absolute;left:8%;right:8%;top:31px;height:2px;background:repeating-linear-gradient(90deg,var(--red) 0 10px,transparent 10px 18px);}
  .f2r-station{position:relative;text-align:center;}
  .f2r-station .node{width:62px;height:62px;border-radius:50%;background:#120808;border:2px solid var(--red);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:var(--red);font-size:1.15rem;position:relative;}
  .f2r-station.final .node{background:var(--red);color:#fff;}
  .f2r-station span{font-family:var(--font-display);font-size:1.1rem;letter-spacing:1.2px;text-transform:uppercase;line-height:1.15;display:block;}

  /* ELITE MILERS */
  #f2r-elite{background:var(--bg-light);padding:100px 72px;}
  .f2r-elite-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:stretch;}
  .f2r-elite-copy p{color:#444;line-height:1.85;font-size:1.02rem;margin:18px 0 0;max-width:560px;}
  .f2r-elite-copy .kicker{font-weight:700;letter-spacing:5px;font-size:.78rem;color:#666;text-transform:uppercase;}
  .f2r-elite-copy .brand{font-family:var(--font-display);font-size:clamp(3rem,7vw,5.6rem);line-height:.95;color:var(--red);letter-spacing:2px;}
  .f2r-goal{background:var(--dark);color:#fff;border-radius:22px;padding:42px 38px;display:flex;flex-direction:column;justify-content:center;border-top:6px solid var(--red);}
  .f2r-goal small{display:inline-block;align-self:flex-start;background:var(--red);font-weight:700;font-size:.85rem;padding:6px 16px;border-radius:4px;margin-bottom:20px;letter-spacing:.5px;}
  .f2r-goal strong{font-family:var(--font-display);font-size:clamp(1.8rem,3vw,2.5rem);letter-spacing:1.2px;line-height:1.12;font-weight:400;}
  .f2r-goal strong em{font-style:normal;color:var(--red);}

  /* COACHES */
  #f2r-coaches{background:var(--darker);padding:100px 72px;color:#fff;}
  .f2r-section-head{margin-bottom:54px;}
  .f2r-section-head p{color:rgba(255,255,255,.55);margin-top:14px;font-size:1rem;}
  .f2r-coach{display:grid;grid-template-columns:380px 1fr;border-radius:26px;overflow:hidden;background:linear-gradient(135deg,#1a0a08,#121212);border:1px solid rgba(232,55,44,.3);margin-bottom:28px;}
  .f2r-coach.flip{grid-template-columns:1fr 380px;}
  .f2r-coach.flip .f2r-photo{order:2;}
  .f2r-coach .f2r-photo{min-height:520px;}
  .f2r-coach-body{padding:48px 48px 44px;}
  .f2r-role-tag{display:inline-block;background:rgba(232,55,44,.12);border:1px solid rgba(232,55,44,.3);color:var(--red);font-weight:700;font-size:.76rem;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:30px;margin-bottom:16px;}
  .f2r-coach-body h3{font-family:var(--font-display);font-size:clamp(2.4rem,4.4vw,3.8rem);letter-spacing:2px;line-height:1;text-transform:uppercase;font-weight:400;}
  .f2r-coach-title{font-size:1.12rem;color:rgba(255,255,255,.85);margin:8px 0 22px;line-height:1.4;}
  .f2r-coach-body .about{color:rgba(255,255,255,.6);line-height:1.8;font-size:.98rem;max-width:620px;margin-bottom:28px;}
  .f2r-stats{display:flex;flex-wrap:wrap;gap:28px 36px;margin-bottom:28px;padding:22px 0;border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);}
  .f2r-stat .n{font-family:var(--font-display);font-size:2.2rem;color:var(--red);letter-spacing:1px;line-height:1;}
  .f2r-stat .l{font-size:.82rem;color:rgba(255,255,255,.5);margin-top:4px;max-width:150px;line-height:1.4;}
  .f2r-cols{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:26px;}
  .f2r-cols h4{font-family:var(--font-display);font-size:1.15rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;font-weight:400;}
  .f2r-cols li{display:flex;gap:10px;align-items:flex-start;color:rgba(255,255,255,.7);font-size:.95rem;line-height:1.5;padding:5px 0;}
  .f2r-cols li i{color:var(--red);font-size:.75rem;margin-top:6px;}
  .f2r-atfit{background:rgba(232,55,44,.1);border-left:4px solid var(--red);padding:16px 20px;border-radius:0 12px 12px 0;color:rgba(255,255,255,.8);font-size:.95rem;line-height:1.7;}
  .f2r-atfit b{display:block;font-family:var(--font-display);font-size:1.1rem;letter-spacing:2px;color:#fff;margin-bottom:4px;font-weight:400;}

  .f2r-nutri{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:10px;}
  .f2r-coach.stacked{display:block;margin:0;}
  .f2r-coach.stacked .f2r-photo{min-height:340px;}
  .f2r-coach.stacked .f2r-coach-body{padding:34px 32px 32px;}
  .f2r-coach.stacked .f2r-coach-body h3{font-size:clamp(2rem,3.4vw,2.8rem);}
  .f2r-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px;}
  .f2r-chips span{border:1px solid rgba(255,255,255,.18);border-radius:30px;padding:6px 14px;font-size:.82rem;color:rgba(255,255,255,.8);}
  .f2r-fact{margin-bottom:16px;}
  .f2r-fact b{display:block;font-family:var(--font-display);font-size:1.05rem;letter-spacing:2px;color:var(--red);font-weight:400;margin-bottom:4px;}
  .f2r-fact p{color:rgba(255,255,255,.7);font-size:.95rem;line-height:1.65;}

  /* STAIRS TEAM */
  #f2r-stairs{background:#fff;padding:100px 72px;}
  .f2r-stairs-head{text-align:center;max-width:760px;margin:0 auto 44px;}
  .f2r-stairs-head .quote{font-style:italic;font-weight:700;font-size:1.15rem;line-height:1.6;margin:20px 0 14px;}
  .f2r-stairs-head .quote em{color:var(--red);font-style:italic;}
  .f2r-stairs-head p{color:#555;line-height:1.8;}
  .f2r-groupphoto{border-radius:22px;overflow:hidden;height:420px;margin-bottom:34px;position:relative;background:radial-gradient(ellipse 70% 90% at 50% 100%,#3a0f0b 0%,#150808 70%);display:flex;align-items:flex-end;justify-content:center;}
  .f2r-groupphoto img{width:100%;height:100%;object-fit:contain;object-position:center bottom;}
  .f2r-support{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .f2r-support-card{border-radius:20px;padding:34px 28px;background:var(--dark);color:#fff;border-top:5px solid var(--red);display:flex;flex-direction:column;}
  .f2r-support-card .f2r-recovery-img{margin-top:auto;padding-top:22px;width:100%;max-width:340px;align-self:center;}
  .f2r-support-card .ic{width:54px;height:54px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:18px;}
  .f2r-support-card h3{font-family:var(--font-display);font-size:1.7rem;letter-spacing:1.5px;text-transform:uppercase;font-weight:400;}
  .f2r-support-card .by{color:var(--red);font-weight:700;font-size:.9rem;margin:2px 0 14px;}
  .f2r-support-card p{color:rgba(255,255,255,.6);line-height:1.75;font-size:.95rem;margin-bottom:16px;}
  .f2r-support-card li{display:flex;gap:10px;align-items:center;padding:5px 0;font-weight:600;font-size:.95rem;}
  .f2r-support-card li i{color:var(--red);font-size:.5rem;}

  /* PACKAGES */
  #f2r-packages{background:var(--bg-light);padding:100px 72px;}
  .f2r-pkg{background:#fff;border-radius:22px;padding:40px;margin-bottom:28px;box-shadow:0 4px 24px rgba(0,0,0,.06);}
  .f2r-pkg-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:24px;}
  .f2r-pkg-head .f2r-h2{font-size:clamp(2rem,3.6vw,3rem);}
  .f2r-pkg-head p{color:#666;font-size:.92rem;line-height:1.6;max-width:460px;}
  .f2r-pkg-head p.f2r-pkg-note{border-left:4px solid var(--red);padding-left:14px;color:#555;font-size:.9rem;line-height:1.5;}
  .f2r-table-wrap{overflow-x:auto;border-radius:14px;}
  .f2r-table{width:100%;border-collapse:collapse;min-width:520px;}
  .f2r-table th{background:var(--red);color:#fff;font-weight:700;font-size:.85rem;letter-spacing:1.5px;text-transform:uppercase;padding:15px 20px;text-align:center;}
  .f2r-table th:first-child,.f2r-table td:first-child{text-align:left;}
  .f2r-table td{padding:16px 20px;text-align:center;border-bottom:1px solid #f0e4e3;font-size:1rem;}
  .f2r-table tbody tr:nth-child(odd){background:#fdf6f5;}
  .f2r-table td.price{font-weight:700;font-size:1.05rem;white-space:nowrap;}
  .f2r-table td small{display:block;font-size:.76rem;letter-spacing:.8px;text-transform:uppercase;color:#888;margin-top:3px;}
  .f2r-table tr.total td{background:#fdecea;font-weight:700;font-size:1.15rem;border-bottom:none;}
  .f2r-table tr.total td.price{color:var(--red);}
  .f2r-table del{color:#999;font-weight:400;font-size:.88rem;margin-right:8px;}
  .f2r-table th.pay-col,.f2r-table td.pay-col{text-align:right;width:1%;white-space:nowrap;}
  .f2r-pay{display:inline-flex;align-items:center;background:var(--red);color:#fff;font-weight:700;font-size:.78rem;letter-spacing:1.2px;text-transform:uppercase;padding:9px 20px;border-radius:50px;border:2px solid var(--red);transition:background .3s,border-color .3s,transform .2s;}
  .f2r-pay:hover{background:#c0251b;border-color:#c0251b;transform:translateY(-2px);}
  .f2r-hybrid .f2r-table tr.total .f2r-pay,.f2r-table tr.total .f2r-pay{box-shadow:0 2px 10px rgba(232,55,44,.25);}
  .f2r-hybrid .f2r-table tr.total .f2r-pay{background:#fff;color:var(--red);border-color:#fff;box-shadow:none;}
  .f2r-hybrid .f2r-table tr.total .f2r-pay:hover{background:#f0f0f0;border-color:#f0f0f0;}

  .f2r-hybrid{background:var(--darker);color:#fff;border-radius:22px;padding:44px 40px;margin-bottom:28px;}
  .f2r-hybrid-top{display:grid;grid-template-columns:1.2fr .8fr;gap:50px;align-items:start;margin-bottom:36px;}
  .f2r-hybrid-top p{color:rgba(255,255,255,.65);line-height:1.8;margin-top:16px;font-size:1rem;}
  .f2r-hybrid-top p strong{color:#fff;}
  .f2r-flow{position:relative;padding-left:30px;}
  .f2r-flow::before{content:'';position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:var(--red);}
  .f2r-flow li{position:relative;padding:0 0 18px;}
  .f2r-flow li::before{content:'';position:absolute;left:-30px;top:6px;width:16px;height:16px;border-radius:50%;background:var(--darker);border:3px solid var(--red);}
  .f2r-flow li b{display:block;font-family:var(--font-display);font-size:1.4rem;letter-spacing:2px;color:var(--red);font-weight:400;line-height:1;}
  .f2r-flow li span{color:rgba(255,255,255,.7);font-size:.9rem;}
  .f2r-flow-wrap{display:flex;gap:28px;align-items:flex-end;flex-wrap:wrap;}
  .f2r-flow-wrap img{height:300px;width:auto;opacity:.9;margin-left:auto;}
  .f2r-hybrid .f2r-table td{color:#fff;border-bottom:1px solid rgba(255,255,255,.1);}
  .f2r-hybrid .f2r-table tbody tr:nth-child(odd){background:rgba(255,255,255,.03);}
  .f2r-hybrid .f2r-table del{color:rgba(255,255,255,.4);}
  .f2r-hybrid .f2r-table td small{color:rgba(255,255,255,.45);}
  .f2r-hybrid .f2r-table tr.total td{background:var(--red);color:#fff;}
  .f2r-hybrid .f2r-table tr.total td.price{color:#fff;}

  .f2r-custom{background:#fff;border-radius:22px;padding:40px;display:grid;grid-template-columns:1.3fr .7fr;gap:40px;align-items:center;box-shadow:0 4px 24px rgba(0,0,0,.06);}
  .f2r-custom p{color:#555;line-height:1.8;margin-top:14px;}
  .f2r-custom p.big{font-family:var(--font-display);font-size:1.5rem;letter-spacing:1.5px;color:var(--dark);margin-top:18px;line-height:1.2;}
  .f2r-custom p.big span{color:var(--red);}
  .f2r-custom .box{background:var(--bg-light);border-radius:16px;padding:28px 26px;}
  .f2r-custom .box b{font-family:var(--font-display);font-size:1.3rem;letter-spacing:1.5px;font-weight:400;display:block;margin-bottom:6px;}
  .f2r-custom .box p{margin:0 0 18px;font-size:.95rem;}

  /* CONTACT CTA */
  #f2r-cta{background:var(--red);padding:80px 72px;color:#fff;}
  .f2r-cta-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:50px;align-items:center;}
  #f2r-cta h2{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,3.8rem);letter-spacing:2px;text-transform:uppercase;line-height:1;font-weight:400;}
  #f2r-cta p{color:rgba(255,255,255,.88);margin:14px 0 26px;font-size:1.02rem;line-height:1.7;max-width:520px;}
  .f2r-cta-btns{display:flex;flex-wrap:wrap;gap:14px;}
  .f2r-btn.light{background:#fff;color:var(--red);border-color:#fff;}
  .f2r-btn.light:hover{background:#f0f0f0;border-color:#f0f0f0;}
  .f2r-btn.light .dot{background:var(--red);}
  .f2r-btn.light .dot i{color:#fff;}
  .f2r-btn.outline-light{background:transparent;border-color:rgba(255,255,255,.7);padding:10px 30px;}
  .f2r-btn.outline-light:hover{background:rgba(255,255,255,.12);border-color:#fff;}
  .f2r-contact-list li{display:flex;gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.25);font-weight:600;}
  .f2r-contact-list li:last-child{border-bottom:none;}
  .f2r-contact-list i{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;}

  @media(max-width:1100px){
    #navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}
    #f2r-hero,#f2r-intro,#f2r-approach,#f2r-elite,#f2r-coaches,#f2r-stairs,#f2r-packages,#f2r-cta{padding-left:30px;padding-right:30px;}
    .f2r-hero-grid,.f2r-intro-grid,.f2r-approach-head,.f2r-elite-grid,.f2r-hybrid-top,.f2r-custom,.f2r-cta-grid{grid-template-columns:1fr;gap:40px;}
    .f2r-pillars,.f2r-support{grid-template-columns:repeat(2,1fr);}
    .f2r-coach,.f2r-coach.flip{grid-template-columns:1fr;}
    .f2r-coach.flip .f2r-photo{order:0;}
    .f2r-coach .f2r-photo{min-height:420px;}
    .f2r-nutri{grid-template-columns:1fr;}
    .f2r-stations{grid-template-columns:repeat(3,1fr);row-gap:28px;}
    .f2r-stations::before{display:none;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    #f2r-hero{padding:120px 20px 70px;min-height:auto;}
    #f2r-intro,#f2r-approach,#f2r-elite,#f2r-coaches,#f2r-stairs,#f2r-packages,#f2r-cta{padding:70px 20px;}
    .f2r-pillars,.f2r-support,.f2r-cols{grid-template-columns:1fr;}
    .f2r-coach-body{padding:32px 24px;}
    .f2r-pkg,.f2r-hybrid,.f2r-custom,.f2r-track{padding:28px 20px;}
    .f2r-stations{grid-template-columns:repeat(2,1fr);}
    .f2r-groupphoto{height:260px;}
  }
`;

/* ───────── DATA (copied from the Fit2Run PDF) ───────── */

const pillars = [
  { icon: "fa-person-running", title: "Running Coaching", text: "Structured and progressive running plans designed around your current ability, goals and race requirements." },
  { icon: "fa-dumbbell", title: "Strength & Conditioning", text: "Build the strength, stability, mobility and power required to run efficiently and handle training loads." },
  { icon: "fa-user-doctor", title: "Physiotherapy", text: "Regular access to physiotherapy to identify movement limitations, manage niggles and support long-term running health." },
  { icon: "fa-spa", title: "Recovery", text: "Dedicated deep-tissue/massage sessions to support recovery and help you manage training load." },
  { icon: "fa-brain", title: "Runners Mental Well-Being", text: "A strong mind is just as important as a strong body. Build confidence, manage pressure, stay motivated." },
  { icon: "fa-apple-whole", title: "Nutrition", text: "Individualised nutrition planning with consultations and weekly follow-ups to support training, recovery and performance." },
];

const stations = [
  { icon: "fa-person-running", label: "Running Coaching", final: false },
  { icon: "fa-user-doctor", label: "Physiotherapy", final: false },
  { icon: "fa-dumbbell", label: "Strength & Conditioning", final: false },
  { icon: "fa-spa", label: "Recovery", final: false },
  { icon: "fa-apple-whole", label: "Nutrition", final: false },
  { icon: "fa-flag-checkered", label: "Better Performance", final: true },
];

const runningPlans = [3, 6, 12].map((term) => ({ term, duration: `${term} months` }));

const allInclusive = [
  { id: "allinc-running", item: "Running Plan", note: "Tuesday, Thursday, Saturday at Kanteerava – 6:30 AM" },
  { id: "allinc-physio", item: "Physiotherapy", note: "2 sessions / month at 20% off" },
  { id: "allinc-massage", item: "Deep Tissue Massage", note: "2 sessions / month at 20% off" },
  { id: "allinc-nutrition", item: "Nutrition Plan", note: "At 20% off" },
  { id: "allinc-sc", item: "Strength & Conditioning", note: "2 semi-personal sessions / month at 20% off" },
];

const hybridFlow = [
  { step: "Run", text: "Structured running program" },
  { step: "Build", text: "1-to-1 Strength & Conditioning" },
  { step: "Simulate", text: "Group race simulation sessions" },
  { step: "Fuel", text: "Personalised nutrition" },
  { step: "Recover", text: "Recovery & physiotherapy support" },
  { step: "Perform", text: "" },
];

const hybridRows: { id: string; item: string; note?: string; was?: string }[] = [
  { id: "hybrid-running", item: "Running Program" },
  { id: "hybrid-sc", item: "1-to-1 Strength & Conditioning", note: "8 sessions / month", was: "₹12,000" },
  { id: "hybrid-weekend", item: "Group Weekend Simulation", note: "12 sessions / month" },
  { id: "hybrid-nutrition", item: "Nutrition Plan", was: "₹7,000" },
  { id: "hybrid-recovery", item: "Recovery – Deep Tissue / Massage", note: "2 sessions / month", was: "₹5,000" },
];

type Coach = {
  name: string; photo: string; tag: string; title: string; sub?: string; about: string;
  stats: { n: string; l: string }[];
  leftHead: string; left: string[]; rightHead: string; right: string[];
  atFit: string;
};

const coaches: Coach[] = [
  {
    name: "Ramith R. Sindia", photo: "/images/team/fit2run/ramith.webp", tag: "Endurance Coaching · Race Preparation · Athlete Development",
    title: "Professional Middle & Long-Distance Coach", sub: "Founder — Elite Milers Athletics Club",
    about: "Ramith is a Bengaluru-based professional endurance coach specialising in 800m to 10,000m, cross country, half marathon and full marathon preparation. A former national-level athlete, he brings competitive experience and a race-specific approach to developing runners.",
    stats: [
      { n: "6+", l: "Years of coaching & competitive endurance experience" },
      { n: "All levels", l: "From developing runners to competitive athletes" },
      { n: "Race-focused", l: "Track + Road + Cross Country" },
    ],
    leftHead: "Athlete achievements", left: ["State titles & medals", "State records", "National medals", "National-level finalists", "International qualifying standards"],
    rightHead: "Coaching approach", right: ["Individualised training", "Progressive loading", "Race-specific preparation", "Long-term athlete development"],
    atFit: "Ramith brings specialised endurance coaching and race-specific programming to Fit2Run, helping runners train with greater structure, purpose and progression.",
  },
  {
    name: "Navdeep", photo: "/images/team/fit2run/navdeep.webp", tag: "Endurance Coaching · Race Preparation · Performance Running",
    title: "AFI Level 1 Certified Endurance Coach", sub: "Competitive Athlete",
    about: "Navdeep combines competitive racing experience with formal endurance coaching expertise to help runners develop consistency, performance and race readiness.",
    stats: [
      { n: "AFI L1", l: "Certified Endurance Coach" },
      { n: "8+ yrs", l: "Competitive racing experience" },
      { n: "U23", l: "State Champion, 10,000m" },
      { n: "15:43", l: "5K personal best" },
      { n: "32:51", l: "10K personal best" },
      { n: "1:13:00", l: "Half marathon personal best" },
    ],
    leftHead: "Specialisation", left: ["Endurance Running", "Performance Development", "Race Preparation", "Athlete Training"],
    rightHead: "Coaching approach", right: ["Train with purpose.", "Build consistency.", "Progress systematically."],
    atFit: "Navdeep brings the perspective of both an endurance athlete and coach, supporting Fit2Run runners through structured training and performance-focused preparation.",
  },
];

/* ───────── HELPERS ───────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    document.querySelectorAll("#f2r-hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

/* Shows the photo if the file exists, otherwise falls back to the person's initials. */
function Photo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className="f2r-photo">
      {failed ? (
        <span className="ini">{initials}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} onError={() => setFailed(true)} />
      )}
    </div>
  );
}


/* ───────── SECTIONS ───────── */

function Hero() {
  return (
    <section id="f2r-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="f2r-hero-runner" src="/images/team/fit2run/runner-particles.webp" alt="" aria-hidden="true" />
      <div className="f2r-hero-grid">
        <div className="f2r-hero-copy">
          <img className="f2r-hero-logo reveal" src="/images/fit-to-run-white_edited_edited.avif" alt="Fit to Run" />
          <h1 className="reveal">FIT<span>2</span>RUN</h1>
          <p className="f2r-hero-sub reveal">A complete holistic running program</p>
          <p className="f2r-hero-text reveal">
            Stairs Fit2Run, in association with Elite Milers, brings together expert running coaching, Strength &amp; Conditioning, physiotherapy, recovery and nutrition under one integrated program.
          </p>
          <div className="f2r-hero-cta reveal">
            <a href="#f2r-packages" className="f2r-btn">View packages <span className="dot"><i className="fas fa-arrow-down" /></span></a>
            <a href="tel:+919738477255" className="f2r-btn ghost">Call us</a>
          </div>
        </div>
        <div className="reveal">
          <div className="f2r-stack" aria-label="Run Better. Get Stronger. Recover Smarter. Perform Better.">
            <span>Run Better.</span>
            <span>Get Stronger.</span>
            <span>Recover Smarter.</span>
            <span>Perform Better.</span>
          </div>
          <p className="f2r-evolve"><strong>Fit2Run is evolving.</strong> New coaching expertise, new coaches and a more holistic approach to perform longer.</p>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="f2r-intro">
      <div className="f2r-wrap f2r-intro-grid">
        <h2 className="f2r-h2 reveal">Not just a<br />running plan. A <em>system.</em></h2>
        <div className="reveal">
          <p>This isn&apos;t just about following a running plan. It&apos;s about understanding where you are, where you want to go, and building the right system to get you there.</p>
          <p>With new coaching expertise, new coaches and a more holistic approach to perform longer, Fit2Run is designed for runners and hybrid athletes who want to <span className="mark">train smarter</span>, stay consistent and become stronger.</p>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="f2r-approach">
      <div className="f2r-wrap">
        <div className="f2r-approach-head">
          <h2 className="f2r-h2 reveal">The new Fit2Run <em>approach</em></h2>
          <p className="reveal">
            <b>One runner. One goal. One integrated system.</b><br />
            Your running performance isn&apos;t only about running more. Your <b>training load, strength, movement, recovery, nutrition and injury management</b> all influence how you train and perform. That&apos;s why the new Fit2Run model brings everything together:
          </p>
        </div>
        <div className="f2r-pillars">
          {pillars.map((p) => (
            <div key={p.title} className="f2r-pillar reveal">
              <div className="ic"><i className={`fas ${p.icon}`} /></div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        <div className="f2r-track reveal">
          <h3>One running program. <em>One support system.</em></h3>
          <p>Your running coach guides your training. The Stairs team supports everything around it.</p>
          <ol className="f2r-stations">
            {stations.map((s) => (
              <li key={s.label} className={`f2r-station${s.final ? " final" : ""}`}>
                <div className="node"><i className={`fas ${s.icon}`} /></div>
                <span>{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Elite() {
  return (
    <section id="f2r-elite">
      <div className="f2r-wrap f2r-elite-grid">
        <div className="f2r-elite-copy reveal">
          <span className="kicker">In association with</span>
          <div className="brand">Elite Milers</div>
          <p>Fit2Run is entering a new phase through our association with Elite Milers.</p>
          <p>This collaboration brings specialised endurance coaching and race-focused expertise into the Fit2Run ecosystem.</p>
        </div>
        <div className="f2r-goal reveal">
          <small>The goal is simple:</small>
          <strong>Build better runners through <em>better coaching, better preparation and a more complete approach to performance.</em></strong>
        </div>
      </div>
    </section>
  );
}

function CoachCard({ c, flip }: { c: Coach; flip: boolean }) {
  return (
    <article className={`f2r-coach reveal${flip ? " flip" : ""}`}>
      <Photo src={c.photo} name={c.name} />
      <div className="f2r-coach-body">
        <span className="f2r-role-tag">{c.tag}</span>
        <h3>{c.name}</h3>
        <p className="f2r-coach-title">
          {c.title}
          {c.sub ? <><br /><span style={{ color: "rgba(255,255,255,.5)" }}>{c.sub}</span></> : null}
        </p>
        <p className="about">{c.about}</p>
        <div className="f2r-stats">
          {c.stats.map((s) => (
            <div key={s.l} className="f2r-stat"><div className="n">{s.n}</div><div className="l">{s.l}</div></div>
          ))}
        </div>
        <div className="f2r-cols">
          <div><h4>{c.leftHead}</h4><ul>{c.left.map((x) => <li key={x}><i className="fas fa-check" />{x}</li>)}</ul></div>
          <div><h4>{c.rightHead}</h4><ul>{c.right.map((x) => <li key={x}><i className="fas fa-check" />{x}</li>)}</ul></div>
        </div>
        <div className="f2r-atfit"><b>At Fit2Run</b>{c.atFit}</div>
      </div>
    </article>
  );
}

function Coaches() {
  return (
    <section id="f2r-coaches">
      <div className="f2r-wrap">
        <div className="f2r-section-head reveal">
          <h2 className="f2r-h2">Meet the <em>Fit2Run</em> team</h2>
          <p>Running coaches from Elite Milers and the nutritionists who plan the fuel behind your training.</p>
        </div>
        {coaches.map((c, i) => <CoachCard key={c.name} c={c} flip={i % 2 === 1} />)}

        <div className="f2r-nutri">
          <article className="f2r-coach stacked reveal">
            <Photo src="/images/team/fit2run/keertana.webp" name="Keertana Ramu" />
            <div className="f2r-coach-body">
              <span className="f2r-role-tag">Nutritionist</span>
              <h3>Keertana Ramu</h3>
              <p className="f2r-coach-title">MSc — Nutrition &amp; Dietetics | Sports Nutrition &amp; Holistic Nutrition</p>
              <p className="about" style={{ marginBottom: 18 }}>
                With 13 years of experience in Nutrition &amp; Dietetics, Keertana brings a holistic and practical approach to nutrition, helping individuals build sustainable eating habits while supporting their health, training and performance goals. Her expertise spans Sports Nutrition and Holistic Nutrition, making nutrition an integral part of the Fit2Run approach rather than simply a diet plan.
              </p>
              <div className="f2r-chips">
                {["Sports Nutrition", "Holistic Nutrition", "Performance Nutrition", "Sustainable Nutrition"].map((x) => <span key={x}>{x}</span>)}
              </div>
            </div>
          </article>

          <article className="f2r-coach stacked reveal">
            <Photo src="/images/team/fit2run/anubhav.webp" name="Anubhav" />
            <div className="f2r-coach-body">
              <span className="f2r-role-tag">Nutritionist</span>
              <h3>Anubhav</h3>
              <div className="f2r-fact" style={{ marginTop: 22 }}>
                <b>Qualification</b>
                <p>M.Sc. in Sports Nutrition from ICMR — National Institute of Nutrition, Hyderabad. All India Rank 16 in NCET.</p>
              </div>
              <div className="f2r-fact">
                <b>Experience</b>
                <p>Completed a Sports Nutrition internship at the Sports Authority of India (SAI), Bengaluru. Experience working in athlete nutrition and performance support.</p>
              </div>
              <div className="f2r-fact" style={{ marginBottom: 0 }}>
                <b>Approach</b>
                <p>Focuses on practical, evidence-based nutrition strategies to help individuals build sustainable eating habits, improve performance and achieve their health and fitness goals.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function StairsTeam() {
  return (
    <section id="f2r-stairs">
      <div className="f2r-wrap">
        <div className="f2r-stairs-head reveal">
          <h2 className="f2r-h2">The team behind <em>your performance</em></h2>
          <p className="quote">You run with Fit2Run. <em>You&apos;re supported by the entire Stairs team.</em></p>
          <p>At Fit2Run, running is only one part of the journey. Through our association with <strong>Stairs Physiotherapy &amp; Fitness</strong>, you have access to a multidisciplinary team supporting your training, recovery and performance.</p>
        </div>
        <div className="f2r-groupphoto reveal">
          <img src="/images/team/fit2run/stairs-team.webp" alt="The Stairs team" />
        </div>
        <div className="f2r-support">
          <div className="f2r-support-card reveal">
            <div className="ic"><i className="fas fa-user-doctor" /></div>
            <h3>Physiotherapy</h3>
            <div className="by">Supported by the Stairs Physiotherapy Team</div>
            <p>Our physiotherapy team works alongside your running journey to help you understand your body, address movement limitations, manage running-related concerns and support your long-term training.</p>
            <ul>{["Assessment", "Injury Management", "Movement", "Recovery", "Return to Running"].map((x) => <li key={x}><i className="fas fa-circle" />{x}</li>)}</ul>
          </div>
          <div className="f2r-support-card reveal">
            <div className="ic"><i className="fas fa-dumbbell" /></div>
            <h3>Strength &amp; Conditioning</h3>
            <div className="by">Supported by the Stairs S&amp;C team</div>
            <p>Running performance isn&apos;t built through running alone. Our S&amp;C team helps you develop the strength, stability, mobility and power required to handle training loads and become a stronger, more resilient runner.</p>
            <ul>{["Strength", "Stability", "Mobility", "Power", "Performance"].map((x) => <li key={x}><i className="fas fa-circle" />{x}</li>)}</ul>
          </div>
          <div className="f2r-support-card reveal">
            <div className="ic"><i className="fas fa-spa" /></div>
            <h3>Recovery</h3>
            <div className="by">Supported by the Stairs Recovery Team</div>
            <p>Recovery is an important part of your training process. With access to deep tissue and massage support, Fit2Run members can make recovery a structured part of their training journey.</p>
            <ul>{["Recover", "Reset", "Get ready for the next run"].map((x) => <li key={x}><i className="fas fa-circle" />{x}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="f2r-packages">
      <div className="f2r-wrap">
        <div className="f2r-section-head reveal" style={{ marginBottom: 40 }}>
          <h2 className="f2r-h2">Fit2Run program <em>packages</em></h2>
        </div>

        {/* Running plan */}
        <div className="f2r-pkg reveal">
          <div className="f2r-pkg-head">
            <h2 className="f2r-h2">Running plan <em>charges</em></h2>
            <p className="f2r-pkg-note">Running plan only. Tuesday, Thursday, Saturday at Kanteerava – 6:30 AM.</p>
          </div>
          <div className="f2r-table-wrap">
            <table className="f2r-table">
              <thead><tr><th>Plan duration</th><th>Charges</th><th className="pay-col">Pay</th></tr></thead>
              <tbody>
                {runningPlans.map((r) => (
                  <tr key={r.term}><td>{r.duration}</td><td className="price">{inr(price("running", r.term))}</td><td className="pay-col"><a href={payHref("running", r.term)} className="f2r-pay">Pay now</a></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All inclusive */}
        <div className="f2r-pkg reveal">
          <div className="f2r-pkg-head">
            <h2 className="f2r-h2">Fit2Run <em>all-inclusive</em> program</h2>
            <p>A holistic approach to building your run, with running, strength, recovery and nutrition working together.</p>
          </div>
          <div className="f2r-table-wrap">
            <table className="f2r-table">
              <thead><tr><th>All inclusive for Fit2Run members</th><th>3 months</th><th>6 months</th><th className="pay-col">Pay</th></tr></thead>
              <tbody>
                {allInclusive.map((r) => (
                  <tr key={r.item}>
                    <td>{r.item}<small>{r.note}</small></td>
                    <td className="price">{inr(price(r.id, 3))}</td>
                    <td className="price">{inr(price(r.id, 6))}</td>
                    <td className="pay-col"><a href={payHref(r.id)} className="f2r-pay">Pay now</a></td>
                  </tr>
                ))}
                <tr className="total"><td>Total</td><td className="price">{inr(price("allinc-total", 3))}</td><td className="price">{inr(price("allinc-total", 6))}</td><td className="pay-col"><a href={payHref("allinc-total")} className="f2r-pay">Pay now</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Nutrition */}
        <div className="f2r-pkg reveal">
          <div className="f2r-pkg-head">
            <h2 className="f2r-h2">Nutrition <em>charges</em></h2>
            <p>Customised nutrition plans with meal timings, portions and food options tailored to your lifestyle, food preferences and eating habits. (As per current rates)</p>
          </div>
          <div className="f2r-table-wrap">
            <table className="f2r-table">
              <thead><tr><th>Nutrition plan</th><th>Charges</th></tr></thead>
              <tbody>
                <tr><td>3 months<small>3 nutrition plans + 3 consultations with weekly follow-ups</small></td><td className="price">₹18,000</td></tr>
                <tr><td>6 months<small>6 nutrition plans + 6 consultations with weekly follow-ups</small></td><td className="price">₹38,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hybrid */}
        <div id="hybrid-training" className="f2r-hybrid reveal" style={{ scrollMarginTop: 110 }}>
          <div className="f2r-hybrid-top">
            <div>
              <h2 className="f2r-h2">Hybrid <em>training</em></h2>
              <p>The program brings together running, personalised strength training, group-based race simulations, nutrition and recovery — <strong>all under one structured system.</strong></p>
              <p>You get the flexibility of hybrid training, combining personalised coaching with the energy and accountability of group training, while keeping strength, recovery and nutrition integrated into your program.</p>
            </div>
            <div className="f2r-flow-wrap">
              <ol className="f2r-flow">
                {hybridFlow.map((f) => (
                  <li key={f.step}><b>{f.step}</b>{f.text ? <span>{f.text}</span> : null}</li>
                ))}
              </ol>
              <img src="/images/team/fit2run/runner-back.webp" alt="" aria-hidden="true" />
            </div>
          </div>
          <h2 className="f2r-h2" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", marginBottom: 18 }}>Hybrid training <em>package</em></h2>
          <div className="f2r-table-wrap">
            <table className="f2r-table">
              <thead><tr><th>Component</th><th>1 month</th><th className="pay-col">Pay</th></tr></thead>
              <tbody>
                {hybridRows.map((r) => (
                  <tr key={r.item}>
                    <td>{r.item}{r.note ? <small>{r.note}</small> : null}</td>
                    <td className="price">{r.was ? <del>{r.was}</del> : null}{inr(price(r.id, 1))}</td>
                    <td className="pay-col" />
                  </tr>
                ))}
                <tr className="total"><td>Total package</td><td className="price">{inr(price("hybrid-total", 1))}</td><td className="pay-col"><a href={payHref("hybrid-total")} className="f2r-pay">Pay now</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Customise */}
        <div className="f2r-custom reveal">
          <div>
            <h2 className="f2r-h2">Hybrid training: <em>customise your plan</em></h2>
            <p className="big">Everyone cannot have the same program.<br /><span>Your training should be as per your needs.</span></p>
            <p>Choose the combination of running plans, 1-to-1 S&amp;C, weekend simulations, nutrition and recovery sessions that would help you progress. Our team will help you put together the right mix based on your goals, training level and race calendar.</p>
          </div>
          <div className="box">
            <b>Not sure what you need?</b>
            <p>That&apos;s exactly why we are here.</p>
            <a href="tel:+919738477255" className="f2r-btn">DM us / Call us <span className="dot"><i className="fas fa-phone" /></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="f2r-cta">
      <div className="f2r-wrap f2r-cta-grid">
        <div className="reveal">
          <h2>Talk to our admin team today</h2>
          <p>Let&apos;s build your personalised Fit2Run Hybrid plan.</p>
          <div className="f2r-cta-btns">
            <a href="tel:+919738477255" className="f2r-btn light">Call us <span className="dot"><i className="fas fa-phone" /></span></a>
            <a href="/contact" className="f2r-btn outline-light">Contact page</a>
          </div>
        </div>
        <ul className="f2r-contact-list reveal">
          <li><i className="fas fa-phone" /><a href="tel:+919738477255">+91 97384 77255</a></li>
          <li><i className="fas fa-phone" /><a href="tel:+917975849062">+91 79 7584 9062</a></li>
          <li><i className="fas fa-envelope" /><a href="mailto:info@stairsphysiotherapy.in">info@stairsphysiotherapy.in</a></li>
          <li><i className="fas fa-globe" /><a href="https://stairsphysiotherapy.in" target="_blank" rel="noopener noreferrer">stairsphysiotherapy.in</a></li>
        </ul>
      </div>
    </section>
  );
}

export default function Fit2RunPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Intro />
      <Approach />
      <Elite />
      <Coaches />
      <StairsTeam />
      <Packages />
      <Cta />
      <BranchesFooter />
    </>
  );
}
