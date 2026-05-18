"use client";

import { useState, useEffect, useRef } from "react";

import { motion } from "motion/react";

import { NoiseBackground } from "@/components/ui/noise-background";

/* ─── Inline CSS ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  :root {
    --red: #e8372c;
    --dark: #111111;
    --darker: #0a0a0a;
    --light: #ffffff;
    --gray: #888888;
    --bg-light: #f5f5f5;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Barlow', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); color: var(--dark); background: var(--light); overflow-x: hidden; }
  img { max-width: 100%; display: block; }
  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }

  .reveal { opacity: 0; transform: translateY(50px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-60px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(60px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }
  .reveal-scale { opacity: 0; transform: scale(0.85); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-scale.visible { opacity: 1; transform: scale(1); }

  .stagger > *:nth-child(1) { transition-delay: 0.05s; }
  .stagger > *:nth-child(2) { transition-delay: 0.15s; }
  .stagger > *:nth-child(3) { transition-delay: 0.25s; }
  .stagger > *:nth-child(4) { transition-delay: 0.35s; }

  .section-label { font-family: var(--font-body); font-weight: 600; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: var(--red); display: block; margin-bottom: 10px; }
  .section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.1; letter-spacing: 1px; text-transform: uppercase; }

  /* ROTATING BORDER BUTTON */
  .glow-btn-wrap { position: relative; display: inline-block; border-radius: 50px; padding: 3px; margin-top: 2.5rem; }
  .glow-btn-wrap::before { content: ''; position: absolute; inset: 0; border-radius: 50px; padding: 3px;
    background: conic-gradient(from var(--angle, 0deg), #ff6a00, #ffffff, #ff6a00, #ffffff, #ff6a00);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    animation: spin-border 2.5s linear infinite; }
  .glow-btn-wrap::after { content: ''; position: absolute; inset: 0; border-radius: 50px;
    background: conic-gradient(from var(--angle, 0deg), #ff6a00, #ffffff, #ff6a00, #ffffff, #ff6a00);
    filter: blur(8px); opacity: 0.55; animation: spin-border 2.5s linear infinite; z-index: -1; }
  @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
  @keyframes spin-border { to { --angle: 360deg; } }
  .glow-btn-inner { display: inline-flex; align-items: center; gap: 14px; background: #0a0a0a; color: #ffffff;
    font-family: var(--font-body); font-weight: 700; font-size: 0.88rem; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 12px 36px; border-radius: 50px; cursor: pointer;
    text-decoration: none; transition: background 0.3s; position: relative; z-index: 1; }
  .glow-btn-inner:hover { background: #1a1a1a; }

  .btn-outline { display: inline-block; border: 2px solid var(--red); color: var(--red); font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; padding: 10px 28px; border-radius: 30px; transition: background 0.3s, color 0.3s; }
  .btn-outline:hover { background: var(--red); color: var(--light); }
  .circle-deco { position: absolute; border-radius: 50%; border: 20px solid var(--red); opacity: 0.85; }

  /* NAVBAR */
  #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; transition: background 0.4s, padding 0.4s; }
  #navbar.scrolled { background: rgba(10,10,10,0.95); padding: 12px 60px; backdrop-filter: blur(8px); }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--light); }
  .nav-logo .logo-icon { width: 40px; height: 40px; background: var(--red); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: var(--light); }
  .nav-logo span { font-family: var(--font-display); font-size: 1.3rem; letter-spacing: 2px; }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-links a { color: var(--light); font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; position: relative; transition: color 0.3s; }
  .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--red); transition: width 0.3s; }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
  .nav-links a.active, .nav-links a:hover { color: var(--red); }
  .nav-links .contact-btn { border: 2px solid var(--red); padding: 7px 20px; border-radius: 30px; color: var(--light); transition: background 0.3s; }
  .nav-links .contact-btn:hover { background: var(--red); }
  .nav-links .contact-btn::after { display: none; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); transition: 0.3s; }

  /* HERO */
  #hero { position: relative; min-height: 100vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .hero-bg-img { position: absolute; inset: 0; background: url('images/hero-bg.png') center/cover no-repeat; opacity: 0.55; }
  .hero-bg-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.2) 100%); }
  .hero-circle { width: 580px; height: 580px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 30px; pointer-events: none; animation: spin-slow 20s linear infinite; }
  .hero-circle-wrap { position: absolute; right: 5%; top: 50%; transform: translateY(-50%); width: 580px; height: 580px; pointer-events: none; z-index: 2; }
  .hero-circle-ring { position: absolute; inset: 0; border-radius: 50%; border: 30px solid var(--red); opacity: 0.85; }
  .neon-orbit { position: absolute; inset: -15px; border-radius: 50%; animation: neon-spin 3s linear infinite; }
  .neon-ball { position: absolute; top: 0px; left: 50%; transform: translateX(-50%); width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff8e0, #ff8c00 40%, #ff4500); box-shadow: 0 0 14px 6px rgba(255,120,0,0.95), 0 0 32px 14px rgba(255,80,0,0.55); }
  @keyframes neon-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes spin-slow { to { transform: translateY(-50%) rotate(360deg); } }
  @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .hero-content { position: relative; z-index: 2; padding: 0 60px; max-width: 700px; }
  .hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .hero-content h1 { font-family: var(--font-display); font-size: clamp(4rem, 10vw, 8rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 20px; }
  .hero-content p { color: #cccccc; font-size: 1.05rem; margin-bottom: 36px; font-weight: 400; }
  .hero-img-placeholder { display: none; }
  .hero-3d-scene { position: absolute; right: 0; top: 0; bottom: 0; width: 55%; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; }
  @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(-8deg); } 50% { transform: translateY(-22px) rotate(-8deg); } }
  @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(12deg); } 50% { transform: translateY(-16px) rotate(12deg); } }
  @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(-4deg); } 50% { transform: translateY(-28px) rotate(-4deg); } }
  @keyframes float4 { 0%,100% { transform: translateY(0px) rotate(6deg); } 50% { transform: translateY(-14px) rotate(6deg); } }
  @keyframes pulse-ring { 0%,100% { opacity: 0.18; transform: scale(1); } 50% { opacity: 0.32; transform: scale(1.06); } }
  @keyframes spin-ring { to { transform: rotate(360deg); } }

  /* ORGANISATIONS */
  #organisations { padding: 40px 60px 40px; background: var(--light); text-align: center; position: relative; overflow: hidden; }
  .org-glow-bg { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 700px; height: 320px; pointer-events: none; z-index: 0; }
  .org-glow-bg::before { content: ''; position: absolute; right: 50%; top: 0; width: 320px; height: 280px; background: radial-gradient(ellipse at 100% 0%, rgba(232,55,44,0.38) 0%, transparent 70%); filter: blur(18px); }
  .org-glow-bg::after { content: ''; position: absolute; left: 50%; top: 0; width: 320px; height: 280px; background: radial-gradient(ellipse at 0% 0%, rgba(255,140,0,0.32) 0%, transparent 70%); filter: blur(18px); }
  .org-heading-wrap { margin-bottom: 28px; position: relative; z-index: 1; }
  .org-title-line1 { color: var(--dark); font-size: clamp(2rem, 4.5vw, 3.4rem); line-height: 1.05; }
  .org-title-line2 { color: var(--red); font-style: italic; font-size: clamp(2rem, 4.5vw, 3.4rem); line-height: 1.05; }
  .org-title-line3 { color: var(--dark); font-size: clamp(1.5rem, 3.2vw, 2.6rem); line-height: 1.1; }
  .org-title-anim { position: relative; display: inline-block; }
  .org-title-anim::before { content: ''; position: absolute; top: -14px; left: 50%; transform: translateX(-50%); width: 100px; height: 2px; background: var(--red); border-radius: 2px; box-shadow: 0 0 14px 3px rgba(232,55,44,0.5); }
  .org-track-wrapper { overflow: hidden; position: relative; }
  .org-track { display: flex; gap: 30px; animation: scroll-logos 18s linear infinite; width: max-content; }
  @keyframes scroll-logos { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .org-card { width: 140px; height: 140px; border-radius: 50%; background: #f0f0f0; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: box-shadow 0.3s; }
  .org-card:hover { box-shadow: 0 8px 30px rgba(232,55,44,0.2); }
  .org-card .org-img-box { width: 90px; height: 90px; background: rgba(0,0,0,0.06); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gray); font-size: 0.65rem; letter-spacing: 0.5px; text-align: center; padding: 8px; }

  /* WHY */
  #why { padding: 90px 60px; background: var(--bg-light); }
  #why .why-header { text-align: center; margin-bottom: 60px; }
  .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }

  @keyframes gradientSpin {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .feature-card { position: relative; padding: 30px 24px; border-radius: 16px; background: #ffffff; z-index: 0; transition: transform 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
  .feature-card::before { content: ''; position: absolute; inset: -3px; border-radius: 18px; background: linear-gradient(135deg, #e8372c, #ff6b35, #ffb347, #e8372c, #8b0000); background-size: 300% 300%; z-index: -1; opacity: 0; transition: opacity 0.4s ease; animation: gradientSpin 3s ease infinite; }
  .feature-card::after { content: ''; position: absolute; inset: 2px; border-radius: 14px; background: #ffffff; z-index: -1; }
  .feature-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); }
  .feature-card:hover::before { opacity: 1; }
  .feature-card .icon-wrap { width: 64px; height: 64px; background: #fef0ef; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: background 0.3s; }
  .feature-card:hover .icon-wrap { background: var(--red); }
  .feature-card .icon-wrap i { font-size: 1.6rem; color: var(--red); transition: color 0.3s; }
  .feature-card:hover .icon-wrap i { color: var(--light); }
  .feature-card h3 { font-family: var(--font-display); font-size: 1.25rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
  .feature-card p { color: var(--gray); font-size: 0.9rem; line-height: 1.7; margin-bottom: 16px; }
  .feature-card .read-more { color: var(--red); font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 6px; transition: gap 0.2s; }
  .feature-card .read-more:hover { gap: 10px; }

  /* ABOUT */
  #about { position: relative; min-height: 500px; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .about-bg { position: absolute; inset: 0; background: url('images/about-bg.png') center/cover no-repeat; opacity: 0.4; }
  .about-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.92) 55%); }
  .about-circle { width: 460px; height: 460px; left: 2%; top: 50%; transform: translateY(-50%); border-width: 25px; pointer-events: none; opacity: 0.7; }
  /* SECTION ILLUSTRATIONS */
  .about-img-placeholder { display: none; }
  .about-scene { position: absolute; left: 0; top: 0; bottom: 0; width: 48%; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; overflow: hidden; }
  .testi-img-placeholder { display: none; }
  .testi-scene { position: absolute; right: 0; top: 0; bottom: 0; width: 50%; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; overflow: hidden; }
  .contact-img-placeholder { display: none; }
  .contact-scene { position: absolute; left: 0; top: 0; bottom: 0; width: 48%; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; overflow: hidden; }
  @keyframes orbit { from { transform: rotate(0deg) translateX(90px) rotate(0deg); } to { transform: rotate(360deg) translateX(90px) rotate(-360deg); } }
  @keyframes orbit2 { from { transform: rotate(120deg) translateX(60px) rotate(-120deg); } to { transform: rotate(480deg) translateX(60px) rotate(-480deg); } }
  @keyframes orbit3 { from { transform: rotate(240deg) translateX(110px) rotate(-240deg); } to { transform: rotate(600deg) translateX(110px) rotate(-600deg); } }
  @keyframes draw-line { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
  @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes trainer-float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.02); } }
  .about-content { position: relative; z-index: 2; margin-left: auto; width: 48%; padding: 80px 60px 80px 40px; color: var(--light); }
  .about-content .section-label { color: var(--red); }
  .about-content .section-title { color: var(--light); margin-bottom: 20px; }
  .about-content p { color: #cccccc; font-size: 0.95rem; line-height: 1.8; margin-bottom: 36px; }
  .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 36px; }
  .stat-item h3 { font-family: var(--font-display); font-size: 2.2rem; color: var(--red); letter-spacing: 1px; }
  .stat-item p { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: #aaa; margin-bottom: 0; }

  /* SERVICES */
  #services { background: var(--bg-light); padding: 90px 60px; }
  #services .services-header { text-align: center; background: var(--red); color: var(--light); margin: -90px -60px 60px -60px; padding: 60px 60px 50px; position: relative; overflow: hidden; }
  #services .services-header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 280px; height: 280px; border-radius: 50%; border: 50px solid rgba(255,255,255,0.07); pointer-events: none; }
  #services .services-header::after { content: ''; position: absolute; bottom: -80px; left: -40px; width: 200px; height: 200px; border-radius: 50%; border: 35px solid rgba(255,255,255,0.05); pointer-events: none; }
  #services .services-header .section-label { color: rgba(255,255,255,0.7); }
  #services .services-header .section-title { color: var(--light); }
  .services-book { display: flex; gap: 18px; max-width: 920px; height: 440px; margin: 0 auto; align-items: stretch; justify-content: center; }
  .service-panel { position: relative; flex: 0.52; min-width: 74px; overflow: hidden; border: 0; border-radius: 8px; padding: 0; font: inherit; text-align: left; color: var(--light); cursor: pointer; background: #1d1d1d; box-shadow: 0 18px 45px rgba(0,0,0,0.24); transition: flex 0.55s ease, transform 0.55s ease, box-shadow 0.55s ease; }
  .service-panel.is-active { flex: 2.7; transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.34); outline: none; }
  .service-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.75)), var(--service-bg); background-size: cover; background-position: center; filter: grayscale(0.6); transition: filter 0.55s ease, transform 0.55s ease; }
  .service-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(232,55,44,0.18), rgba(4,22,73,0.36)); opacity: 0.55; transition: opacity 0.55s ease; }
  .service-panel.is-active::before { filter: grayscale(0); transform: scale(1.04); }
  .service-panel.is-active::after { opacity: 0.15; }
  .service-panel .vertical-title { position: absolute; left: 50%; top: 50%; z-index: 2; transform: translate(-50%, -50%) rotate(-90deg); transform-origin: center; width: 260px; font-family: var(--font-display); font-size: 1.05rem; letter-spacing: 0.7px; line-height: 1; text-align: left; white-space: nowrap; text-shadow: 0 2px 10px rgba(0,0,0,0.7); transition: opacity 0.35s ease; }
  .service-panel .service-detail { position: absolute; inset: auto 22px 24px 22px; z-index: 3; color: var(--light); opacity: 0; transform: translateY(22px); transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s; text-align: left; }
  .service-panel .service-detail h3, .service-panel .service-detail p, .service-panel .service-detail .read-more { text-shadow: 0 2px 10px rgba(0,0,0,0.65); }
  .service-panel.is-active .service-detail { opacity: 1; transform: translateY(0); }
  .service-panel.is-active .vertical-title { opacity: 0; }
  .service-detail .s-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.16); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .service-detail h3 { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .service-detail p { color: rgba(255,255,255,0.78); font-size: 0.9rem; line-height: 1.6; max-width: 290px; margin-bottom: 14px; }
  .service-detail .read-more { color: var(--light); font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 7px; }
  .services-join { text-align: center; margin-top: 50px; }

  /* TESTIMONIALS */
  #testimonials { position: relative; min-height: 420px; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .testimonials-bg { position: absolute; inset: 0; background: url('images/testimonials-bg.png') center/cover no-repeat; opacity: 0.3; }
  .testi-circle { width: 400px; height: 400px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 20px; pointer-events: none; opacity: 0.65; }
  .testi-img-placeholder .img-box i { font-size: 2.5rem; margin-bottom: 10px; opacity: 0.3; }
  /* kept for mobile fallback */
  .testimonial-content { position: relative; z-index: 2; padding: 80px 60px; max-width: 52%; }
  .testimonial-content .section-label { color: var(--red); }
  .testimonial-content .section-title { color: var(--light); margin-bottom: 32px; }
  .testimonial-content .quote-icon { font-size: 3rem; color: var(--red); line-height: 1; margin-bottom: 10px; display: block; }
  .testimonial-content blockquote { color: #ccc; font-size: 0.95rem; line-height: 1.8; font-style: italic; margin-bottom: 24px; border: none; transition: opacity 0.5s; }
  .testi-author strong { display: block; color: var(--light); font-size: 0.95rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-top: 2px solid var(--light); padding-top: 10px; margin-bottom: 4px; }
  .testi-author span { color: var(--gray); font-size: 0.8rem; }
  .testi-nav { display: flex; gap: 12px; margin-top: 28px; }
  .testi-nav button { width: 40px; height: 40px; border-radius: 50%; border: none; background: rgba(255,255,255,0.15); color: var(--light); cursor: pointer; font-size: 0.9rem; transition: background 0.3s; }
  .testi-nav button:hover { background: var(--red); }

  /* PRICING */
  #pricing { padding: 90px 60px; background: var(--light); text-align: center; }
  #pricing .pricing-header { margin-bottom: 60px; }
  #pricing .pricing-header .section-label { color: var(--red); }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1000px; margin: 0 auto; }
  .pricing-card { position: relative; border-radius: 16px; overflow: visible; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.07); z-index: 0; }
  .pricing-card::before { content: ''; position: absolute; inset: -3px; border-radius: 18px; background: linear-gradient(135deg, #e8372c, #ff6b35, #ffb347, #e8372c, #8b0000); background-size: 300% 300%; z-index: -1; opacity: 0; transition: opacity 0.4s ease; animation: gradientSpin 3s ease infinite; }
  .pricing-card::after { content: ''; position: absolute; inset: 2px; border-radius: 14px; background: #ffffff; z-index: -1; }
  .pricing-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); }
  .pricing-card:hover::before { opacity: 1; }
  .pricing-card .card-img { height: 180px; background: #222; position: relative; overflow: hidden; border-radius: 14px 14px 0 0; }
  .pricing-card .card-img .img-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 0.75rem; letter-spacing: 1px; }
  .pricing-card .card-img .img-placeholder i { font-size: 2rem; margin-bottom: 8px; }
  .price-badge { position: absolute; bottom: -22px; left: 50%; transform: translateX(-50%); background: var(--red); color: var(--light); border-radius: 50%; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.6rem; letter-spacing: 0; line-height: 1; z-index: 2; }
  .price-badge small { font-size: 0.55rem; letter-spacing: 1px; font-family: var(--font-body); }
  .pricing-body { padding: 46px 30px 30px; text-align: center; }
  .pricing-body h3 { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
  .pricing-body ul { margin-bottom: 28px; }
  .pricing-body ul li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; color: #555; }
  .pricing-body ul li i { color: var(--red); font-size: 0.8rem; }

  /* TRAINERS */
  #trainers { background: var(--red); padding: 80px 60px; text-align: center; }
  #trainers .section-label { color: rgba(255,255,255,0.7); }
  #trainers .section-title { color: var(--light); margin-bottom: 60px; }
  .trainers-grid { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
  .trainer-card { position: relative; text-align: center; background: rgba(255,255,255,0.1); border-radius: 16px; padding: 30px 28px; width: 220px; z-index: 0; transition: transform 0.3s, box-shadow 0.3s; }
  .trainer-card::before { content: ''; position: absolute; inset: -3px; border-radius: 18px; background: linear-gradient(135deg, #ffffff, #ffb347, #ffffff, #ff6b35); background-size: 300% 300%; z-index: -1; opacity: 0; transition: opacity 0.4s ease; animation: gradientSpin 3s ease infinite; }
  .trainer-card::after { content: ''; position: absolute; inset: 2px; border-radius: 14px; background: rgba(180,30,20,0.85); z-index: -1; }
  .trainer-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
  .trainer-card:hover::before { opacity: 1; }
  .trainer-card .trainer-img { width: 160px; height: 160px; border-radius: 50%; background: rgba(0,0,0,0.25); border: 4px solid rgba(255,255,255,0.3); margin: 0 auto 16px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative; transition: border-color 0.3s; }
  .trainer-card:hover .trainer-img { border-color: var(--light); }
  .trainer-card .trainer-img .img-placeholder { color: rgba(255,255,255,0.3); font-size: 0.7rem; letter-spacing: 0.5px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .trainer-card .trainer-img .img-placeholder i { font-size: 2rem; }
  .trainer-card h4 { font-family: var(--font-display); font-size: 1.1rem; color: var(--light); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .trainer-card .role { color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 14px; }
  .trainer-social { display: flex; justify-content: center; gap: 10px; }
  .trainer-social a { width: 32px; height: 32px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--light); font-size: 0.75rem; transition: background 0.3s; }
  .trainer-social a:hover { background: var(--dark); }

  /* CONTACT */
  #contact { position: relative; min-height: 460px; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .contact-bg { position: absolute; inset: 0; background: url('images/contact-bg.png') center/cover no-repeat; opacity: 0.35; }
  .contact-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.88) 50%); }
  .contact-circle { width: 360px; height: 360px; left: 5%; top: 50%; transform: translateY(-50%); border-width: 20px; opacity: 0.6; pointer-events: none; }
  .contact-img-placeholder .img-box i { font-size: 2.5rem; margin-bottom: 10px; opacity: 0.3; }
  /* kept for mobile fallback */
  .contact-form-wrap { position: relative; z-index: 2; margin-left: auto; width: 50%; padding: 80px 60px; }
  .contact-form-wrap .section-label { color: var(--red); }
  .contact-form-wrap .section-title { color: var(--light); margin-bottom: 30px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-row.single { grid-template-columns: 1fr; }
  .contact-form input, .contact-form textarea { width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: var(--light); font-family: var(--font-body); font-size: 0.9rem; outline: none; transition: border-color 0.3s; }
  .contact-form input::placeholder, .contact-form textarea::placeholder { color: rgba(255,255,255,0.45); }
  .contact-form input:focus, .contact-form textarea:focus { border-color: var(--red); }
  .contact-form textarea { height: 110px; resize: none; }
  .form-submit { margin-top: 20px; }

  /* BLOG */
  #blog { padding: 90px 60px; background: var(--light); }
  #blog .blog-header { text-align: center; margin-bottom: 50px; }
  #blog .section-label { color: var(--red); }
  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; max-width: 1000px; margin: 0 auto; }
  .blog-card { position: relative; border-radius: 16px; overflow: visible; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.07); z-index: 0; }
  .blog-card::before { content: ''; position: absolute; inset: -3px; border-radius: 18px; background: linear-gradient(135deg, #e8372c, #ff6b35, #ffb347, #e8372c, #8b0000); background-size: 300% 300%; z-index: -1; opacity: 0; transition: opacity 0.4s ease; animation: gradientSpin 3s ease infinite; }
  .blog-card::after { content: ''; position: absolute; inset: 2px; border-radius: 14px; background: #ffffff; z-index: -1; }
  .blog-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); }
  .blog-card:hover::before { opacity: 1; }
  .blog-card .blog-img { height: 180px; background: #ddd; position: relative; overflow: hidden; border-radius: 14px 14px 0 0; }
  .blog-card .blog-img .img-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(0,0,0,0.2); font-size: 0.75rem; letter-spacing: 1px; }
  .blog-card .blog-img .img-placeholder i { font-size: 2rem; margin-bottom: 8px; }
  .date-badge { position: absolute; top: 12px; left: 12px; background: var(--red); color: var(--light); border-radius: 50%; width: 54px; height: 54px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.3rem; line-height: 1; }
  .date-badge small { font-size: 0.55rem; font-family: var(--font-body); letter-spacing: 1px; }
  .blog-body { padding: 24px 22px; }
  .blog-body h3 { font-family: var(--font-display); font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase; line-height: 1.3; margin-bottom: 12px; }
  .blog-card.featured h3 { color: var(--red); }
  .blog-body p { color: var(--gray); font-size: 0.85rem; line-height: 1.7; margin-bottom: 14px; }
  .blog-body .read-more { color: var(--red); font-weight: 700; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; }
  .blog-nav { display: flex; justify-content: center; gap: 12px; margin-top: 40px; }
  .blog-nav button { width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--dark); color: var(--light); cursor: pointer; font-size: 0.9rem; transition: background 0.3s; }
  .blog-nav button:hover { background: var(--red); }

  /* FOOTER */
  #footer { background: var(--dark); padding: 60px 60px 30px; color: #aaa; }
  .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.3fr; gap: 40px; margin-bottom: 40px; }
  .footer-brand .logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .footer-brand .logo .logo-icon { width: 36px; height: 36px; background: var(--red); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--light); font-size: 1rem; }
  .footer-brand .logo span { font-family: var(--font-display); font-size: 1.2rem; letter-spacing: 2px; color: var(--light); }
  .footer-brand p { font-size: 0.85rem; line-height: 1.8; margin-bottom: 20px; }
  .footer-social { display: flex; gap: 10px; }
  .footer-social a { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.75rem; transition: background 0.3s, color 0.3s; }
  .footer-social a:hover { background: var(--red); color: var(--light); }
  .footer-col h4 { font-family: var(--font-display); font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; color: var(--light); margin-bottom: 20px; }
  .footer-col ul li { margin-bottom: 10px; font-size: 0.85rem; }
  .footer-col ul li::before { content: '▶'; font-size: 0.5rem; color: var(--red); margin-right: 8px; vertical-align: middle; }
  .footer-col ul li a { color: #aaa; transition: color 0.3s; }
  .footer-col ul li a:hover { color: var(--red); }
  .footer-hours p, .footer-contact p { font-size: 0.85rem; margin-bottom: 6px; }
  .footer-contact .contact-item { display: flex; flex-direction: column; margin-bottom: 12px; }
  .footer-contact .contact-item strong { color: var(--light); font-size: 0.85rem; margin-bottom: 2px; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; text-align: center; font-size: 0.8rem; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    #navbar { padding: 16px 30px; }
    #navbar.scrolled { padding: 10px 30px; }
    .hero-content { padding: 0 30px; }
    #organisations, #why, #services, #pricing, #trainers, #blog, #footer { padding-left: 30px; padding-right: 30px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .pricing-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .hero-img-placeholder, .about-img-placeholder, .testi-img-placeholder, .contact-img-placeholder { display: none; }
    .about-content, .testimonial-content, .contact-form-wrap { width: 100%; margin: 0; }
    .pricing-grid { grid-template-columns: 1fr; }
    .trainers-grid { flex-direction: column; align-items: center; gap: 30px; }
    .blog-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── Data ─── */
const testimonials = [
  { quote: "STAIRS is God-sent for me. Absolutely awesome team and time at Stairs. Just can't wait for my next session every single time. You guys make it so interesting and work towards the need and goal of the client, that ensures I skip my work but not my workout. Keep rocking TEAM STAIRS!", name: "Sanjay Rajpal", role: "Businessman" },
  { quote: "I have personally grown to understand my body better because of Somya. There is a warm environment that the trainers and therapists foster that is conducive to progress. Every person working in Stairs is kind and helpful and I love the place! I highly recommend coming to Stairs.", name: "Rukmini Vilayakumar", role: "Actor, Dancer" },
  { quote: "I'm proud to have a coach like Somya Rout, the team he is building and someone to speak to and someone who listens to me especially when you are in a profession it's the other way around all the time. To coach and to be coached is a perfect balance of learning & teaching.", name: "Shreyas Karnad", role: "Running Coach" },
  { quote: "Stairs is like my second home. Entire team at Stairs is so diligent & proficient. They not only strengthen us but understand the needs of our sport and train us efficaciously such that we are able to pursue our goals.", name: "Pragathi Gupta", role: "Runner" },
  { quote: "Stairs isn't just a fitness space; it's a home. Grateful for dedicated trainers, physios, and supportive members ensuring peak performance. Thank you, Team Stairs, for fostering excellence and positivity.", name: "Janani Ananthakumar", role: "Athlete, Badminton (India)" },
];

const orgs = [
  { icon: "fas fa-shield-alt", name: "Bengaluru United" },
  { icon: "fas fa-circle", name: "Cricket For All" },
  { icon: "fas fa-crosshairs", name: "Gun For Glory" },
  { icon: "fas fa-futbol", name: "India Football" },
  { icon: "fas fa-fire", name: "Jamshedpur FC" },
  { icon: "fas fa-star", name: "Kerala Blasters" },
];

const features = [
  { icon: "fas fa-child", title: "Abdominal Sessions", text: "Ruis voluptas sit asper natur aut odit aut fugi sed quia consuntu ma gni dolores eos." },
  { icon: "fas fa-weight-hanging", title: "Weight Lifting", text: "Ruis voluptas sit asper natur aut odit aut fugi sed quia consuntu ma gni dolores eos." },
  { icon: "fas fa-fist-raised", title: "Flex Muscle", text: "Quia voluptas sit asper natur aut odit aut fugi sed quia consuntu ma gni dolores ea." },
  { icon: "fas fa-pills", title: "Powerful Vitamins", text: "Aula voluptas sit asper natur aut odit aut fugi sed quia consuntu ma gni dolores eos." },
];

const services = [
  { href: "/services/bio-mechanical-assessment", bg: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80')", vertical: "Bio Mechanical Assessment", icon: "fas fa-ruler-horizontal", title: "Bio Mechanical Assessment", desc: "Body assessment" },
  { href: "/services/physiotherapy", bg: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')", vertical: "Physiotherapy", icon: "fas fa-notes-medical", title: "Physiotherapy", desc: "Prehab / Rehab" },
  { href: "/services/strength-conditioning", bg: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80')", vertical: "Strength & Conditioning", icon: "fas fa-dumbbell", title: "Strength & Conditioning", desc: "Mobility / Strength" },
  { href: "/services/myofascial-release", bg: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80')", vertical: "Myofascial Release", icon: "fas fa-hand-holding-heart", title: "Myofascial Release", desc: "Treatment / Release" },
  { href: "/services/sports-specific-training", bg: "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80')", vertical: "Sports Specific Training", icon: "fas fa-basketball-ball", title: "Sports Specific Training", desc: "Training specific to sport" },
  { href: "/services/group-session", bg: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80')", vertical: "Group Session", icon: "fas fa-users", title: "Group Session", desc: "Runners, triathlete or any sport" },
];

const pricingPlans = [
  { img: "pricing-basic.png", price: "$45", title: "Basic Gym" },
  { img: "pricing-standard.png", price: "$50", title: "Standard Gym" },
  { img: "pricing-premium.png", price: "$60", title: "Premium Gym" },
];

const trainers = [
  { img: "coach1.png", name: "Marvin Joiner", role: "CrossFit Coach" },
  { img: "coach2.png", name: "Patricia Woodrum", role: "Cardio & Conditioning" },
  { img: "coach3.png", name: "Hannaz Stone", role: "Fitness Coach" },
];

const blogPosts = [
  { img: "blog1.png", date: "23", month: "Jan", title: "Soluta Nobis Qse Aligen Optio Cumue", featured: false },
  { img: "blog2.png", date: "07", month: "Feb", title: "Quis Autcm Vea Eum Iure Reprehenderit", featured: true },
  { img: "blog3.png", date: "12", month: "Apr", title: "Reprehenderit In Vouta Velit Esse Cillum", featured: false },
];

const pricingFeatures = ["Unlimited club access", "Group attendance", "Gym visits", "Visits to the bath complex", "Gym fight club"];

/* ─── useReveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    document.querySelectorAll("#hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

/* ─── useCountUp hook ─── */
function useCountUp() {
  useEffect(() => {
    const statEls = document.querySelectorAll(".stat-item h3");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const targetEl = entry.target as HTMLElement; if (entry.isIntersecting && !targetEl.dataset.counted) {
          targetEl.dataset.counted = "true";
          const target = parseInt(entry.target.textContent.replace(/\D/g, ""));
          const suffix = entry.target.textContent.replace(/[\d]/g, "");
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            entry.target.textContent = current.toLocaleString() + suffix;
            if (current >= target) clearInterval(timer);
          }, 25);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Navbar ─── */
function Navbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setActiveSection(window.location.pathname);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/trainers", label: "Trainers" },
    { href: "/pricing", label: "Pricing" },
    { href: "/coming-soon", label: "Coming Soon" },
  ];

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        <img src="logo.png" alt="Stairs" style={{ height: 60, width: "auto" }} />
      </div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={activeSection === l.href ? "active" : ""}>{l.label}</a>
        ))}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
        <span /><span /><span />
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const slides = [
    { label: "Fitness & Health", title: "BE\nSTRONG", desc: "Best GYM & Fitness Center Build Your Health." },
    { label: "Expert Coaching", title: "TRAIN\nSMARTER", desc: "Train with Expert Coaches & Certified Trainers." },
    { label: "Your Goals", title: "UNLOCK\nPOTENTIAL", desc: "Tailored Programs Designed Around You." },
    { label: "Community", title: "JOIN\n2500+", desc: "Trusted by Athletes & Fitness Enthusiasts Worldwide." },
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pause = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % slides.length);
        setVisible(true);
      }, 500);
    }, 3500);
    return () => clearTimeout(pause);
  }, [idx]);

  const s = slides[idx];

  return (
    <section id="hero">
      <div className="hero-bg-img" />
      <div className="circle-deco hero-circle" />
      <div className="hero-3d-scene">
        <svg width="520" height="520" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ambient glow rings */}
          <circle cx="260" cy="260" r="210" stroke="#e8372c" strokeWidth="1" strokeDasharray="8 14" opacity="0.18" style={{ animation: "spin-ring 18s linear infinite", transformOrigin: "260px 260px" }} />
          <circle cx="260" cy="260" r="175" stroke="#ff6a00" strokeWidth="1" strokeDasharray="4 20" opacity="0.12" style={{ animation: "spin-ring 28s linear infinite reverse", transformOrigin: "260px 260px" }} />
          <circle cx="260" cy="260" r="140" fill="none" stroke="rgba(232,55,44,0.08)" strokeWidth="60" style={{ animation: "pulse-ring 4s ease-in-out infinite", transformOrigin: "260px 260px" }} />

          {/* ── DUMBBELL 1 (top-left, floating) ── */}
          <g style={{ animation: "float1 4s ease-in-out infinite", transformOrigin: "130px 155px" }}>
            {/* left plate outer */}
            <rect x="72" y="138" width="22" height="34" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="76" y="133" width="14" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            {/* bar */}
            <rect x="90" y="151" width="80" height="8" rx="4" fill="url(#barGrad)"/>
            {/* right plate outer */}
            <rect x="170" y="138" width="22" height="34" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="174" y="133" width="14" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            {/* shine */}
            <rect x="90" y="151" width="80" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            {/* label */}
            <text x="130" y="172" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">20 KG</text>
          </g>

          {/* ── KETTLEBELL (top-right, floating) ── */}
          <g style={{ animation: "float2 5s ease-in-out infinite", transformOrigin: "370px 145px" }}>
            {/* handle */}
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#e8372c" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="#c0251b" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M345 118 Q345 95 370 95 Q395 95 395 118" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* body */}
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2.5"/>
            <ellipse cx="370" cy="148" rx="32" ry="30" fill="url(#kettleGrad)"/>
            {/* flat top connector */}
            <rect x="356" y="118" width="28" height="10" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
            {/* shine */}
            <ellipse cx="358" cy="138" rx="8" ry="6" fill="rgba(255,255,255,0.1)" transform="rotate(-20,358,138)"/>
            {/* weight label */}
            <text x="370" y="153" textAnchor="middle" fill="#e8372c" fontSize="8" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">16KG</text>
          </g>

          {/* ── BARBELL (center, horizontal, floating) ── */}
          <g style={{ animation: "float3 6s ease-in-out infinite", transformOrigin: "260px 265px" }}>
            {/* left big plates */}
            <rect x="82" y="246" width="28" height="52" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            <rect x="86" y="240" width="18" height="64" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            {/* left small plate */}
            <rect x="104" y="252" width="14" height="40" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            {/* bar */}
            <rect x="118" y="258" width="284" height="12" rx="6" fill="url(#barGrad2)"/>
            <rect x="118" y="258" width="284" height="5" rx="3" fill="rgba(255,255,255,0.1)"/>
            {/* right small plate */}
            <rect x="402" y="252" width="14" height="40" rx="4" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
            {/* right big plates */}
            <rect x="410" y="240" width="18" height="64" rx="5" fill="#222" stroke="#444" strokeWidth="1"/>
            <rect x="412" y="246" width="28" height="52" rx="6" fill="#1a1a1a" stroke="#e8372c" strokeWidth="3"/>
            {/* knurl marks */}
            {[170,190,210,230,250,270,290,310,330,350].map((x, i) => (
              <rect key={i} x={x} y="258" width="2" height="12" rx="1" fill="rgba(255,255,255,0.18)"/>
            ))}
            <text x="260" y="290" textAnchor="middle" fill="#e8372c" fontSize="9" fontFamily="Bebas Neue, sans-serif" letterSpacing="2">STAIRS GYM</text>
          </g>

          {/* ── DUMBBELL 2 (bottom-right, floating) ── */}
          <g style={{ animation: "float4 4.5s ease-in-out infinite", transformOrigin: "370px 380px" }}>
            <rect x="312" y="364" width="18" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="316" y="358" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="328" y="373" width="84" height="8" rx="4" fill="url(#barGrad)"/>
            <rect x="412" y="364" width="18" height="32" rx="5" fill="#2a2a2a" stroke="#e8372c" strokeWidth="2"/>
            <rect x="412" y="358" width="12" height="44" rx="4" fill="#1e1e1e" stroke="#555" strokeWidth="1"/>
            <rect x="328" y="373" width="84" height="3" rx="2" fill="rgba(255,255,255,0.12)"/>
            <text x="370" y="393" textAnchor="middle" fill="#e8372c" fontSize="7" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">12 KG</text>
          </g>

          {/* ── JUMP ROPE (bottom-left) ── */}
          <g style={{ animation: "float1 5.5s ease-in-out infinite 1s", transformOrigin: "140px 385px" }}>
            <circle cx="108" cy="375" r="10" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
            <circle cx="108" cy="375" r="5" fill="#e8372c"/>
            <path d="M118 375 Q150 345 180 375 Q210 405 240 375" stroke="#e8372c" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M118 375 Q150 345 180 375 Q210 405 240 375" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <circle cx="250" cy="375" r="10" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
            <circle cx="250" cy="375" r="5" fill="#e8372c"/>
          </g>

          {/* ── Floating particles / sparks ── */}
          {[
            { cx: 180, cy: 210, r: 3, delay: "0s" },
            { cx: 310, cy: 190, r: 2, delay: "0.8s" },
            { cx: 420, cy: 300, r: 3, delay: "1.4s" },
            { cx: 150, cy: 320, r: 2, delay: "2s" },
            { cx: 350, cy: 400, r: 2.5, delay: "0.4s" },
            { cx: 230, cy: 420, r: 2, delay: "1.8s" },
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#ff6a00"
              style={{ animation: `pulse-ring 3s ease-in-out infinite ${p.delay}`, transformOrigin: `${p.cx}px ${p.cy}px` }}
            />
          ))}

          {/* Gradient defs */}
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666"/>
              <stop offset="40%" stopColor="#999"/>
              <stop offset="100%" stopColor="#444"/>
            </linearGradient>
            <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#777"/>
              <stop offset="40%" stopColor="#aaa"/>
              <stop offset="100%" stopColor="#555"/>
            </linearGradient>
            <radialGradient id="kettleGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#444"/>
              <stop offset="100%" stopColor="#111"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="hero-content">
        <span
          className="sub"
          style={{ transition: "opacity 0.5s, transform 0.5s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          {s.label}
        </span>
        <h1
          style={{ transitionDelay: "0.08s", transition: "opacity 0.5s, transform 0.5s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", whiteSpace: "pre-line" }}
        >
          {s.title}
        </h1>
        <p
          style={{ transitionDelay: "0.16s", transition: "opacity 0.5s, transform 0.5s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", minHeight: "2rem" }}
        >
          {s.desc}
        </p>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true); }, 400); }}
              style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === idx ? "#e8372c" : "rgba(255,255,255,0.3)", transition: "all 0.4s", padding: 0 }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          <div className="glow-btn-wrap">
            <a href="#contact" className="glow-btn-inner">Join Us Now</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



/* ─── Organisations ─── */
function Organisations() {
  const doubled = [...orgs, ...orgs];
  return (
    <section id="organisations">
      <div className="org-glow-bg" />
      <div className="org-heading-wrap reveal">
        <span className="section-label">Partners</span>
        <div className="org-title-anim">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="section-title org-title-line1">Sports</h2>
            <h2 className="section-title org-title-line2">Organisations</h2>
            <h2 className="section-title org-title-line3">We Have Worked With</h2>
          </motion.div>
        </div>
      </div>
      <div className="org-track-wrapper reveal">
        <div className="org-track">
          {doubled.map((org, i) => (
            <div className="org-card" key={i}>
              <div className="org-img-box">
                <i className={org.icon} style={{ fontSize: "1.8rem", color: "#bbb" }} />
                <br />{org.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
function WhyChooseUs() {
  return (
    <section id="why">
      <div className="why-header">
        <span className="section-label reveal">Why Choose Us</span>
        <h2 className="section-title reveal">Build Your Best Body</h2>
      </div>
      <div className="features-grid stagger">
        {features.map((f, i) => (
          <div className="feature-card reveal" key={i}>
            <div className="icon-wrap"><i className={f.icon} /></div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <a href="#" className="read-more">Read more <i className="fas fa-arrow-right" /></a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Parallax hook ─── */
function useParallax(speed = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.closest('section')?.getBoundingClientRect();
      if (!rect) return;
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
}

/* ─── About ─── */
function About() {
  const parallaxRef = useParallax(0.07);
  return (
    <section id="about">
      <div className="about-bg" />
      <div className="circle-deco about-circle" />
      {/* ── ABOUT SVG: Athlete silhouette + orbit rings + stats ── */}
      <div className="about-scene">
        <div ref={parallaxRef}>
          <svg width="420" height="480" viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="aGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#e8372c" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#e8372c" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="aBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#555"/>
                <stop offset="100%" stopColor="#1a1a1a"/>
              </linearGradient>
            </defs>
            {/* glow blob */}
            <ellipse cx="210" cy="240" rx="160" ry="180" fill="url(#aGlow)"/>
            {/* orbit rings */}
            <circle cx="210" cy="240" r="160" stroke="#e8372c" strokeWidth="1" strokeDasharray="6 12" opacity="0.2" style={{animation:"spin-ring 22s linear infinite",transformOrigin:"210px 240px"}}/>
            <circle cx="210" cy="240" r="130" stroke="#ff6a00" strokeWidth="1" strokeDasharray="3 16" opacity="0.15" style={{animation:"spin-ring 32s linear infinite reverse",transformOrigin:"210px 240px"}}/>
            {/* orbiting dumbbell dot */}
            <g style={{animation:"orbit 8s linear infinite",transformOrigin:"210px 240px"}}>
              <circle cx="210" cy="240" r="10" fill="#e8372c"/>
              <rect x="204" y="237" width="12" height="6" rx="3" fill="#fff" opacity="0.6"/>
            </g>
            <g style={{animation:"orbit2 12s linear infinite",transformOrigin:"210px 240px"}}>
              <circle cx="210" cy="240" r="8" fill="#ff6a00"/>
            </g>
            <g style={{animation:"orbit3 16s linear infinite",transformOrigin:"210px 240px"}}>
              <circle cx="210" cy="240" r="6" fill="#fff" opacity="0.5"/>
            </g>
            {/* athlete silhouette */}
            <g style={{animation:"bob 4s ease-in-out infinite",transformOrigin:"210px 300px"}}>
              {/* head */}
              <circle cx="210" cy="130" r="32" fill="url(#aBody)" stroke="#e8372c" strokeWidth="2"/>
              <circle cx="210" cy="130" r="22" fill="#2a2a2a"/>
              {/* body */}
              <path d="M178 162 Q210 155 242 162 L252 260 Q210 275 168 260 Z" fill="url(#aBody)" stroke="#333" strokeWidth="1"/>
              {/* red chest stripe */}
              <path d="M190 170 Q210 165 230 170 L228 210 Q210 218 192 210 Z" fill="#e8372c" opacity="0.7"/>
              {/* left arm curling dumbbell */}
              <path d="M178 175 Q148 195 138 230" stroke="#555" strokeWidth="18" strokeLinecap="round" fill="none"/>
              <path d="M178 175 Q148 195 138 230" stroke="#e8372c" strokeWidth="2" fill="none"/>
              {/* dumbbell in left hand */}
              <rect x="118" y="224" width="10" height="18" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
              <rect x="122" y="220" width="6" height="26" rx="2" fill="#333"/>
              <rect x="132" y="224" width="10" height="18" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
              <rect x="128" y="230" width="4" height="6" rx="1" fill="url(#aBody)"/>
              {/* right arm raised */}
              <path d="M242 175 Q272 155 278 120" stroke="#555" strokeWidth="18" strokeLinecap="round" fill="none"/>
              <path d="M242 175 Q272 155 278 120" stroke="#e8372c" strokeWidth="2" fill="none"/>
              {/* dumbbell right hand */}
              <rect x="258" y="108" width="10" height="18" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
              <rect x="262" y="104" width="6" height="26" rx="2" fill="#333"/>
              <rect x="272" y="108" width="10" height="18" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
              {/* legs */}
              <path d="M192 258 L182 360 L200 362 L210 300 L220 362 L238 360 L228 258 Z" fill="url(#aBody)" stroke="#333" strokeWidth="1"/>
              {/* shoes */}
              <ellipse cx="190" cy="364" rx="18" ry="8" fill="#222" stroke="#e8372c" strokeWidth="1.5"/>
              <ellipse cx="230" cy="364" rx="18" ry="8" fill="#222" stroke="#e8372c" strokeWidth="1.5"/>
            </g>
            {/* spark particles */}
            {[{x:100,y:160,d:"0s"},{x:320,y:180,d:"1s"},{x:80,y:320,d:"1.8s"},{x:340,y:340,d:"0.5s"},{x:160,y:420,d:"2.2s"}].map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
            ))}
          </svg>
        </div>
      </div>
      <div className="about-content reveal-right">
        <span className="section-label">About Us</span>
        <h2 className="section-title">Welcome To The<br />Stairs</h2>
        <p>STAIRS helps people worldwide heal through physiotherapy. We identify imbalances with musculoskeletal assessment, plan injury prevention programs, and use corrective exercise plus myofascial care so clients can move better and reach their goals.</p>
        <div className="stats-grid stagger">
          <div className="stat-item reveal"><h3>100K+</h3><p>Working Hours</p></div>
          <div className="stat-item reveal"><h3>100+</h3><p>Success Program</p></div>
          <div className="stat-item reveal"><h3>1000+</h3><p>Happy Clients</p></div>
          <div className="stat-item reveal"><h3>400+</h3><p>Perfect Bodies</p></div>
        </div>
        <div className="glow-btn-wrap"><a href="#contact" className="glow-btn-inner">Read more <span className="play-icon"><i className="fas fa-play" /></span></a></div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const isHoveringRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIdxRef.current + 1) % services.length;
      activeIdxRef.current = next;
      setActiveIdx(next);
    }, 3000);
  };

  useEffect(() => {
    startCycle();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleMouseEnter = (i: number) => {
    isHoveringRef.current = true;
    // Pause auto-cycle while hovering
    if (intervalRef.current) clearInterval(intervalRef.current);
    activeIdxRef.current = i;
    setActiveIdx(i);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    // Resume auto-cycle from the currently hovered panel
    startCycle();
  };

  return (
    <section id="services">
      <div className="services-header reveal">
        <span className="section-label">Our Services</span>
        <h2 className="section-title">Solutions For Moving Better<br />&amp; Feeling A Healthier</h2>
      </div>
      <div className="services-book stagger" id="serviceDetails">
        {services.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className={`service-panel${activeIdx === i ? " is-active" : ""}`}
            style={{ "--service-bg": s.bg } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="vertical-title">{s.vertical}</span>
            <span className="service-detail">
              <span className="s-icon"><i className={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="read-more">View details <i className="fas fa-arrow-right" /></span>
            </span>
          </a>
        ))}
      </div>
      <div className="services-join reveal">
        <div className="glow-btn-wrap">
          <a href="#contact" className="glow-btn-inner">
            Join us now <span className="play-icon"><i className="fas fa-play" /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const changeTo = (newIdx: number) => {
    setFade(false);
    setTimeout(() => { setIdx(newIdx); setFade(true); }, 200);
  };
  const next = () => changeTo((idx + 1) % testimonials.length);
  const prev = () => changeTo((idx - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [idx]);

  const parallaxRef = useParallax(0.06);
  const t = testimonials[idx];
  return (
    <section id="testimonials">
      <div className="testimonials-bg" />
      <div className="circle-deco testi-circle" />
      {/* ── TESTIMONIALS SVG: speech bubbles + stars + quote marks ── */}
      <div className="testi-scene">
        <div ref={parallaxRef}>
          <svg width="420" height="400" viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="tGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#e8372c" stopOpacity="0.14"/>
                <stop offset="100%" stopColor="#e8372c" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="210" cy="200" rx="180" ry="170" fill="url(#tGlow)"/>
            <circle cx="210" cy="200" r="170" stroke="#e8372c" strokeWidth="1" strokeDasharray="5 12" opacity="0.15" style={{animation:"spin-ring 25s linear infinite",transformOrigin:"210px 200px"}}/>
            {/* main speech bubble */}
            <g style={{animation:"bob 5s ease-in-out infinite",transformOrigin:"210px 160px"}}>
              <rect x="60" y="60" width="300" height="160" rx="20" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
              <polygon points="120,220 100,260 150,220" fill="#1e1e1e" stroke="#e8372c" strokeWidth="2"/>
              {/* giant quote marks */}
              <text x="85" y="130" fill="#e8372c" fontSize="60" fontFamily="Georgia,serif" opacity="0.9">“</text>
              {/* star row */}
              {[0,1,2,3,4].map(s=>(
                <text key={s} x={108+s*28} y="110" fill="#ff6a00" fontSize="18">★</text>
              ))}
              {/* text lines */}
              <rect x="90" y="130" width="240" height="8" rx="4" fill="#333"/>
              <rect x="90" y="148" width="200" height="8" rx="4" fill="#2a2a2a"/>
              <rect x="90" y="166" width="220" height="8" rx="4" fill="#2a2a2a"/>
              {/* author line */}
              <rect x="90" y="186" width="80" height="6" rx="3" fill="#e8372c" opacity="0.7"/>
            </g>
            {/* small bubble top-right */}
            <g style={{animation:"bob 4s ease-in-out infinite 1.2s",transformOrigin:"330px 80px"}}>
              <rect x="270" y="40" width="120" height="70" rx="14" fill="#1a1a1a" stroke="#e8372c" strokeWidth="1.5" opacity="0.8"/>
              <polygon points="295,110 280,135 315,110" fill="#1a1a1a" stroke="#e8372c" strokeWidth="1.5"/>
              <text x="290" y="72" fill="#e8372c" fontSize="28" fontFamily="Georgia,serif" opacity="0.8">“</text>
              {[0,1,2].map(s=>(<text key={s} x={290+s*20} y="98" fill="#ff6a00" fontSize="14">★</text>))}
            </g>
            {/* small bubble bottom-right */}
            <g style={{animation:"bob 6s ease-in-out infinite 0.6s",transformOrigin:"330px 310px"}}>
              <rect x="250" y="290" width="140" height="75" rx="14" fill="#1a1a1a" stroke="#ff6a00" strokeWidth="1.5" opacity="0.8"/>
              <polygon points="265,290 248,265 290,290" fill="#1a1a1a" stroke="#ff6a00" strokeWidth="1.5"/>
              <text x="268" y="326" fill="#ff6a00" fontSize="28" fontFamily="Georgia,serif" opacity="0.8">“</text>
              {[0,1,2,3].map(s=>(<text key={s} x={266+s*20} y="350" fill="#e8372c" fontSize="13">★</text>))}
            </g>
            {/* sparkles */}
            {[{x:60,y:290,d:"0s"},{x:380,y:200,d:"1s"},{x:200,y:360,d:"1.5s"},{x:50,y:150,d:"2s"}].map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
            ))}
          </svg>
        </div>
      </div>
      <div className="testimonial-content reveal-left">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">What Our Clients<br />Say About Us</h2>
        <span className="quote-icon">"</span>
        <blockquote id="testi-quote" style={{ opacity: fade ? 1 : 0 }}>{t.quote}</blockquote>
        <div className="testi-author">
          <strong id="testi-name">{t.name}</strong>
          <span id="testi-role">{t.role}</span>
        </div>
        <div className="testi-nav">
          <button onClick={prev}><i className="fas fa-chevron-left" /></button>
          <button onClick={next}><i className="fas fa-chevron-right" /></button>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section id="pricing">
      <div className="pricing-header">
        <span className="section-label reveal">Pricing Tables</span>
        <h2 className="section-title reveal">Choose Your Pricing Plan</h2>
      </div>
      <div className="pricing-grid stagger">
        {pricingPlans.map((plan, i) => (
          <div className="pricing-card reveal" key={i}>
            <div className="card-img">
              <div className="img-placeholder"><i className="fas fa-image" />{plan.img}</div>
              <div className="price-badge">{plan.price}<small>Monthly</small></div>
            </div>
            <div className="pricing-body">
              <h3>{plan.title}</h3>
              <ul>
                {pricingFeatures.map((f, j) => (
                  <li key={j}><i className="fas fa-check" /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className="btn-outline">Join now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Trainers ─── */
function Trainers() {
  return (
    <section id="trainers" style={{position:"relative", overflow:"hidden"}}>
      {/* animated background SVG — purely decorative, behind all cards */}
      <svg aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="100" r="180" fill="rgba(255,255,255,0.04)" style={{animation:"pulse-ring 6s ease-in-out infinite",transformOrigin:"100px 100px"}}/>
        <circle cx="1100" cy="400" r="220" fill="rgba(255,255,255,0.04)" style={{animation:"pulse-ring 8s ease-in-out infinite 1s",transformOrigin:"1100px 400px"}}/>
        <circle cx="600" cy="500" r="150" fill="rgba(0,0,0,0.08)" style={{animation:"pulse-ring 7s ease-in-out infinite 0.5s",transformOrigin:"600px 500px"}}/>
        <circle cx="600" cy="250" r="400" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="10 20" fill="none" style={{animation:"spin-ring 40s linear infinite",transformOrigin:"600px 250px"}}/>
        <circle cx="600" cy="250" r="300" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="6 18" fill="none" style={{animation:"spin-ring 55s linear infinite reverse",transformOrigin:"600px 250px"}}/>
        {/* floating dumbbells in bg */}
        <g opacity="0.06" style={{animation:"float1 7s ease-in-out infinite",transformOrigin:"200px 350px"}}>
          <rect x="160" y="340" width="14" height="24" rx="3" fill="#fff"/>
          <rect x="174" y="346" width="60" height="12" rx="6" fill="#fff"/>
          <rect x="234" y="340" width="14" height="24" rx="3" fill="#fff"/>
        </g>
        <g opacity="0.06" style={{animation:"float3 9s ease-in-out infinite",transformOrigin:"1000px 150px"}}>
          <rect x="960" y="140" width="14" height="24" rx="3" fill="#fff"/>
          <rect x="974" y="146" width="60" height="12" rx="6" fill="#fff"/>
          <rect x="1034" y="140" width="14" height="24" rx="3" fill="#fff"/>
        </g>
      </svg>
      <span className="section-label reveal" style={{position:"relative",zIndex:1}}>Team Members</span>
      <h2 className="section-title reveal" style={{position:"relative",zIndex:1}}>Team Of Expert Coaches</h2>
      <br /><br />
      <div className="trainers-grid stagger" style={{position:"relative",zIndex:1}}>
        {trainers.map((t, i) => (
          <div className="trainer-card reveal" key={i}>
            <div className="trainer-img">
              <div className="img-placeholder"><i className="fas fa-user" />{t.img}</div>
            </div>
            <h4>{t.name}</h4>
            <p className="role">{t.role}</p>
            <div className="trainer-social">
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fas fa-envelope" /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const parallaxRef = useParallax(0.05);
  return (
    <section id="contact">
      <div className="contact-bg" />
      <div className="circle-deco contact-circle" />
      {/* SVG background illustration — sits behind all content */}
      <div className="contact-scene" aria-hidden="true">
        <div ref={parallaxRef}>
          <svg width="400" height="420" viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#e8372c" stopOpacity="0.13"/>
                <stop offset="100%" stopColor="#e8372c" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {/* glow */}
            <ellipse cx="200" cy="210" rx="170" ry="180" fill="url(#cGlow)"/>
            {/* spinning rings */}
            <circle cx="200" cy="210" r="165" stroke="#e8372c" strokeWidth="1" strokeDasharray="6 14" opacity="0.15" style={{animation:"spin-ring 20s linear infinite",transformOrigin:"200px 210px"}}/>
            <circle cx="200" cy="210" r="130" stroke="#ff6a00" strokeWidth="1" strokeDasharray="3 18" opacity="0.1" style={{animation:"spin-ring 30s linear infinite reverse",transformOrigin:"200px 210px"}}/>
            {/* envelope body */}
            <g style={{animation:"bob 5s ease-in-out infinite",transformOrigin:"200px 200px"}}>
              <rect x="60" y="130" width="280" height="190" rx="14" fill="#1a1a1a" stroke="#e8372c" strokeWidth="2"/>
              {/* envelope flap */}
              <path d="M60 130 L200 230 L340 130" fill="none" stroke="#e8372c" strokeWidth="2"/>
              {/* form lines inside envelope */}
              <rect x="90" y="200" width="220" height="8" rx="4" fill="#2a2a2a"/>
              <rect x="90" y="220" width="180" height="8" rx="4" fill="#242424"/>
              <rect x="90" y="240" width="200" height="8" rx="4" fill="#242424"/>
              <rect x="90" y="260" width="100" height="8" rx="4" fill="#e8372c" opacity="0.6"/>
              {/* send button hint */}
              <rect x="90" y="285" width="80" height="24" rx="12" fill="#e8372c" opacity="0.85"/>
              <rect x="100" y="293" width="50" height="6" rx="3" fill="#fff" opacity="0.7"/>
            </g>
            {/* floating phone icon */}
            <g style={{animation:"bob 4s ease-in-out infinite 1s",transformOrigin:"320px 110px"}}>
              <rect x="300" y="70" width="42" height="70" rx="8" fill="#1e1e1e" stroke="#ff6a00" strokeWidth="1.5"/>
              <rect x="310" y="80" width="22" height="40" rx="3" fill="#2a2a2a"/>
              <circle cx="321" cy="128" r="4" fill="#ff6a00" opacity="0.8"/>
            </g>
            {/* floating location pin */}
            <g style={{animation:"bob 6s ease-in-out infinite 0.5s",transformOrigin:"80px 100px"}}>
              <circle cx="80" cy="85" r="22" fill="#1e1e1e" stroke="#e8372c" strokeWidth="1.5"/>
              <circle cx="80" cy="85" r="10" fill="#e8372c" opacity="0.8"/>
              <path d="M80 107 L72 130 L80 122 L88 130 Z" fill="#e8372c" opacity="0.8"/>
            </g>
            {/* sparkles */}
            {[{x:50,y:300,d:"0s"},{x:360,y:280,d:"1s"},{x:200,y:380,d:"1.8s"},{x:340,y:80,d:"2.2s"}].map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
            ))}
          </svg>
        </div>
      </div>
      <div className="contact-form-wrap reveal-right">
        <span className="section-label">Contact Us</span>
        <h2 className="section-title">Send Us A Message<br />&amp; Join Our Team</h2>
        <div className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Name" />
            <input type="tel" placeholder="Phone" />
          </div>
          <div className="form-row">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-row single">
            <textarea placeholder="Message" />
          </div>
          <div className="form-submit">
            <button className="btn-primary" type="button">
              Send now <span className="play-icon"><i className="fas fa-play" /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Blog ─── */
function Blog() {
  return (
    <section id="blog">
      <div className="blog-header">
        <span className="section-label reveal">Our News</span>
        <h2 className="section-title reveal">Latest Blog Posts</h2>
      </div>
      <div className="blog-grid stagger">
        {blogPosts.map((post, i) => (
          <div className={`blog-card reveal${post.featured ? " featured" : ""}`} key={i}>
            <div className="blog-img">
              <div className="img-placeholder"><i className="fas fa-image" />{post.img}</div>
              <div className="date-badge">{post.date}<small>{post.month}</small></div>
            </div>
            <div className="blog-body">
              <h3>{post.title}</h3>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <a href="#" className="read-more">Read more</a>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-nav reveal">
        <button><i className="fas fa-chevron-left" /></button>
        <button><i className="fas fa-chevron-right" /></button>
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
          <div className="logo">
            <div className="logo-icon"><i className="fas fa-dumbbell" /></div>
            <span>Stairs</span>
          </div>
          <p>Fulatrumat est aun dolorem ipsum natus dolor sit amet...</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col footer-hours">
          <h4>Opening Hours</h4>
          <p><strong style={{ color: "#ccc" }}>Monday – Saturday</strong><br />12:00 – 14:45</p><br />
          <p><strong style={{ color: "#ccc" }}>Sunday – Thursday</strong><br />17:30 – 00:00</p><br />
          <p><strong style={{ color: "#ccc" }}>Friday – Saturday</strong><br />17:30 – 00:00</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {["about", "services", "trainers", "pricing", "contact"].map((l) => (
              <li key={l}><a href={`#${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne, 3000, Australia</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@xtremefitness.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2022 xtremefitness.com All Rights Reserved.</p></div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  useCountUp();

  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Organisations />
      <WhyChooseUs />
      <About />
      <Services />
      <Testimonials />
      <Pricing />
      <Trainers />
      <Contact />
      <Blog />
      <Footer />
    </>
  );
}
