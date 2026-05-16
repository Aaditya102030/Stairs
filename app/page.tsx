"use client";

import { useState, useEffect, useRef } from "react";



import { motion } from "motion/react";

import { NoiseBackground } from "@/components/ui/noise-background";

/* ─── Inline CSS (preserves all original styles) ─── */
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
  .btn-primary { display: inline-flex; align-items: center; gap: 12px; background: var(--red); color: var(--light); font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; padding: 12px 28px; border-radius: 30px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
  .btn-primary:hover { background: #c0251b; transform: translateY(-2px); }
  .btn-primary .play-icon { width: 32px; height: 32px; background: var(--light); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .btn-primary .play-icon i { color: var(--red); font-size: 0.7rem; margin-left: 2px; }
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
  .hero-bg-img { position: absolute; inset: 0; background: url('images/hero-bg.jpg') center/cover no-repeat; opacity: 0.55; }
  .hero-bg-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.2) 100%); }
  .hero-circle { width: 580px; height: 580px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 30px; pointer-events: none; animation: spin-slow 20s linear infinite; }
  @keyframes spin-slow { to { transform: translateY(-50%) rotate(360deg); } }
  .hero-content { position: relative; z-index: 2; padding: 0 60px; max-width: 700px; }
  .hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .hero-content h1 { font-family: var(--font-display); font-size: clamp(4rem, 10vw, 8rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 20px; }
  .hero-content p { color: #cccccc; font-size: 1.05rem; margin-bottom: 36px; font-weight: 400; }
  .hero-img-placeholder { position: absolute; right: 0; top: 0; bottom: 0; width: 55%; display: flex; align-items: center; justify-content: center; z-index: 1; }
  .hero-img-placeholder .img-box { width: 420px; height: 500px; background: rgba(255,255,255,0.05); border: 2px dashed rgba(255,255,255,0.15); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); font-size: 0.85rem; letter-spacing: 1px; }
  .hero-img-placeholder .img-box i { font-size: 3rem; margin-bottom: 12px; opacity: 0.4; }

  /* ORGANISATIONS */
  #organisations { padding: 80px 60px; background: var(--light); text-align: center; }
  #organisations .section-title { color: var(--dark); margin-bottom: 50px; }
  #organisations .section-title span { color: var(--red); font-style: italic; }
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
  .about-bg { position: absolute; inset: 0; background: url('images/about-bg.jpg') center/cover no-repeat; opacity: 0.4; }
  .about-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.92) 55%); }
  .about-circle { width: 460px; height: 460px; left: 2%; top: 50%; transform: translateY(-50%); border-width: 25px; pointer-events: none; opacity: 0.7; }
  .about-img-placeholder { position: absolute; left: 0; top: 0; bottom: 0; width: 48%; display: flex; align-items: center; justify-content: center; z-index: 1; }
  .about-img-placeholder .img-box { width: 380px; height: 420px; background: rgba(255,255,255,0.04); border: 2px dashed rgba(255,255,255,0.12); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.25); font-size: 0.8rem; letter-spacing: 1px; }
  .about-img-placeholder .img-box i { font-size: 2.5rem; margin-bottom: 10px; opacity: 0.4; }
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
  .service-panel.is-active, .service-panel:hover, .service-panel:focus-visible { flex: 2.7; transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.34); outline: none; }
  .service-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.82)), var(--service-bg); background-size: cover; background-position: center; filter: grayscale(1); transition: filter 0.55s ease, transform 0.55s ease; }
  .service-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(232,55,44,0.18), rgba(4,22,73,0.36)); opacity: 0.55; transition: opacity 0.55s ease; }
  .service-panel.is-active::before, .service-panel:hover::before, .service-panel:focus-visible::before { filter: grayscale(0.35); transform: scale(1.04); }
  .service-panel.is-active::after, .service-panel:hover::after, .service-panel:focus-visible::after { opacity: 0.15; }
  .service-panel .vertical-title { position: absolute; left: 50%; top: 50%; z-index: 2; transform: translate(-50%, -50%) rotate(-90deg); transform-origin: center; width: 260px; font-family: var(--font-display); font-size: 1.05rem; letter-spacing: 0.7px; line-height: 1; text-align: left; white-space: nowrap; text-shadow: 0 2px 10px rgba(0,0,0,0.7); transition: opacity 0.35s ease; }
  .service-panel .service-detail { position: absolute; inset: auto 22px 24px 22px; z-index: 3; color: var(--light); opacity: 0; transform: translateY(22px); transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s; text-align: left; }
  .service-panel .service-detail h3, .service-panel .service-detail p, .service-panel .service-detail .read-more { text-shadow: 0 2px 10px rgba(0,0,0,0.65); }
  .service-panel.is-active .service-detail, .service-panel:hover .service-detail, .service-panel:focus-visible .service-detail { opacity: 1; transform: translateY(0); }
  .service-panel.is-active .vertical-title, .service-panel:hover .vertical-title, .service-panel:focus-visible .vertical-title { opacity: 0; }
  .service-detail .s-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.16); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .service-detail h3 { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .service-detail p { color: rgba(255,255,255,0.78); font-size: 0.9rem; line-height: 1.6; max-width: 290px; margin-bottom: 14px; }
  .service-detail .read-more { color: var(--light); font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 7px; }
  .services-join { text-align: center; margin-top: 50px; }

  /* TESTIMONIALS */
  #testimonials { position: relative; min-height: 420px; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .testimonials-bg { position: absolute; inset: 0; background: url('images/testimonials-bg.jpg') center/cover no-repeat; opacity: 0.3; }
  .testi-circle { width: 400px; height: 400px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 20px; pointer-events: none; opacity: 0.65; }
  .testi-img-placeholder { position: absolute; right: 0; top: 0; bottom: 0; width: 50%; display: flex; align-items: center; justify-content: center; z-index: 1; }
  .testi-img-placeholder .img-box { width: 420px; height: 360px; background: rgba(255,255,255,0.03); border: 2px dashed rgba(255,255,255,0.1); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 0.8rem; letter-spacing: 1px; }
  .testi-img-placeholder .img-box i { font-size: 2.5rem; margin-bottom: 10px; opacity: 0.3; }
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
  .contact-bg { position: absolute; inset: 0; background: url('images/contact-bg.jpg') center/cover no-repeat; opacity: 0.35; }
  .contact-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.88) 50%); }
  .contact-circle { width: 360px; height: 360px; left: 5%; top: 50%; transform: translateY(-50%); border-width: 20px; opacity: 0.6; pointer-events: none; }
  .contact-img-placeholder { position: absolute; left: 0; top: 0; bottom: 0; width: 48%; display: flex; align-items: center; justify-content: center; z-index: 1; }
  .contact-img-placeholder .img-box { width: 380px; height: 360px; background: rgba(255,255,255,0.03); border: 2px dashed rgba(255,255,255,0.1); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 0.8rem; letter-spacing: 1px; }
  .contact-img-placeholder .img-box i { font-size: 2.5rem; margin-bottom: 10px; opacity: 0.3; }
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
  { quote: "Ruis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur exceuisint octaecat cupidata non proident, sunt in culpa aui officia deser mollit anim laborum.", name: "Kevin Andrew", role: "Happy Client" },
  { quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.", name: "Sarah Mitchell", role: "Fitness Enthusiast" },
  { quote: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.", name: "James Carter", role: "Regular Member" },
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
  { bg: "linear-gradient(135deg,#313131,#111),url('images/high-performance.jpg')", vertical: "High Performance Athletes", icon: "fas fa-bolt", title: "High Performance", desc: "Strength, conditioning, speed work, and measurable training plans for athletes chasing peak output.", active: false },
  { bg: "linear-gradient(135deg,#3b3b3b,#151515),url('images/youth-athletes.jpg')", vertical: "Youth Athletes", icon: "fas fa-child", title: "Youth Athletes", desc: "Age-aware coaching that builds movement quality, confidence, discipline, and athletic foundations.", active: false },
  { bg: "linear-gradient(135deg,#444,#101010),url('images/lifestyle-performance.jpg')", vertical: "Lifestyle Performance", icon: "fas fa-running", title: "Lifestyle Performance", desc: "Personal training, body recomposition, mobility, and lifestyle coaching for stronger everyday health.", active: true },
  { bg: "linear-gradient(135deg,#353535,#121212),url('images/recovery.jpg')", vertical: "Recovery", icon: "fas fa-redo-alt", title: "Recovery", desc: "Mobility sessions, rest planning, corrective work, and recovery support between demanding training days.", active: false },
  { bg: "linear-gradient(135deg,#2c2c2c,#101010),url('images/physiotherapy.jpg')", vertical: "Physiotherapy and Rehabilitation", icon: "fas fa-user-md", title: "Rehabilitation", desc: "Structured return-to-training support with movement screening, rehab progressions, and pain-aware plans.", active: false },
];

const pricingPlans = [
  { img: "pricing-basic.jpg", price: "$45", title: "Basic Gym" },
  { img: "pricing-standard.jpg", price: "$50", title: "Standard Gym" },
  { img: "pricing-premium.jpg", price: "$60", title: "Premium Gym" },
];

const trainers = [
  { img: "coach1.jpg", name: "Marvin Joiner", role: "CrossFit Coach" },
  { img: "coach2.jpg", name: "Patricia Woodrum", role: "Cardio & Conditioning" },
  { img: "coach3.jpg", name: "Hannaz Stone", role: "Fitness Coach" },
];

const blogPosts = [
  { img: "blog1.jpg", date: "23", month: "Jan", title: "Soluta Nobis Qse Aligen Optio Cumue", featured: false },
  { img: "blog2.jpg", date: "07", month: "Feb", title: "Quis Autcm Vea Eum Iure Reprehenderit", featured: true },
  { img: "blog3.jpg", date: "12", month: "Apr", title: "Reprehenderit In Vouta Velit Esse Cillum", featured: false },
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
      const sections = document.querySelectorAll("section[id]");
      let current = "";
     sections.forEach((sec) => {
  const section = sec as HTMLElement;

  if (window.scrollY >= section.offsetTop - 100) {
    current = section.id;
  }
});
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#trainers", label: "Trainers" },
    { href: "#pricing", label: "Pricing" },
    { href: "#blog", label: "Coming Soon" },
  ];

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        <img src="logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} />
      </div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={activeSection === l.href.slice(1) ? "active" : ""}>{l.label}</a>
        ))}
        <a href="#contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
        <span /><span /><span />
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-img" />
      <div className="circle-deco hero-circle" />
      <div className="hero-img-placeholder">
        <div className="img-box"><i className="fas fa-image" />Add hero-bg.jpg<br />to /images/ folder</div>
      </div>
      <div className="hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>BE<br />STRONG</h1>
        <p className="reveal" style={{ transitionDelay: "0.2s" }}>Best GYM &amp; Fitness Center Build Your Health.</p>
        <div className="reveal" style={{ transitionDelay: "0.3s" }}>

        


  
    <div className="flex justify-center">
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}>
        <button
          className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
          Start publishing &rarr;
        </button>
      </NoiseBackground>
    </div>
  


        </div>
      </div>
    </section>
  );
}

/* ─── Organisations ─── */
const LampContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-24 rounded-3xl">

      {/* LIGHT EFFECT WRAPPER */}
      <div className="absolute inset-0 flex items-center justify-center z-0">

        {/* LEFT LIGHT */}
        <div
          className="absolute right-1/2 h-80 w-[28rem] bg-gradient-to-b from-red-500 via-red-500/40 to-transparent opacity-30 blur-3xl"
          style={{
            clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
          }}
        />

        {/* RIGHT LIGHT */}
        <div
          className="absolute left-1/2 h-80 w-[28rem] bg-gradient-to-b from-orange-500 via-orange-500/40 to-transparent opacity-30 blur-3xl"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
          }}
        />

        {/* TOP GLOW */}
        <div className="absolute top-0 h-40 w-full bg-gradient-to-b from-red-900/20 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-5">
        {children}
      </div>
    </div>
  );
};

/* ─── Organisations ─── */
function Organisations() {
  const doubled = [...orgs, ...orgs];

  return (
    <section id="organisations">
      
      {/* Lamp Heading */}
      <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>

      {/* Organisation Cards */}
      <div className="org-track-wrapper reveal">
        <div className="org-track">
          {doubled.map((org, i) => (
            <div className="org-card" key={i}>
              <div className="org-img-box">
                <i
                  className={org.icon}
                  style={{ fontSize: "1.8rem", color: "#bbb" }}
                />
                <br />
                {org.name}
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

/* ─── About ─── */
function About() {
  return (
    <section id="about">
      <div className="about-bg" />
      <div className="circle-deco about-circle" />
      <div className="about-img-placeholder">
        <div className="img-box"><i className="fas fa-image" />Add about-bg.jpg<br />to /images/ folder</div>
      </div>
      <div className="about-content reveal-right">
        <span className="section-label">About Us</span>
        <h2 className="section-title">Welcome To The<br />Stairs</h2>
        <p>Euis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat cupidatat non proident, sunt in culpa aui officia deserunt mollit anim laborum.</p>
        <div className="stats-grid stagger">
          <div className="stat-item reveal"><h3>600K+</h3><p>Working Hours</p></div>
          <div className="stat-item reveal"><h3>790+</h3><p>Success Program</p></div>
          <div className="stat-item reveal"><h3>2560+</h3><p>Happy Clients</p></div>
          <div className="stat-item reveal"><h3>830+</h3><p>Perfect Bodies</p></div>
        </div>
        <a href="#" className="btn-primary">Read more <span className="play-icon"><i className="fas fa-play" /></span></a>
      </div>
    </section>
  );
}

/* ─── Services ─── */
function Services() {
  const [activeIdx, setActiveIdx] = useState(2);
  return (
    <section id="services">
      <div className="services-header reveal">
        <span className="section-label">Our Services</span>
        <h2 className="section-title">Solutions For Moving Better<br />&amp; Feeling A Healthier</h2>
      </div>
      <div className="services-book stagger" id="serviceDetails">
        {services.map((s, i) => (
          <button
            key={i}
            className={`service-panel reveal${activeIdx === i ? " is-active" : ""}`}
            style={{ "--service-bg": s.bg } as React.CSSProperties}
            type="button"
            onClick={() => setActiveIdx(i)}
          >
            <span className="vertical-title">{s.vertical}</span>
            <span className="service-detail">
              <span className="s-icon"><i className={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="read-more">View details <i className="fas fa-arrow-right" /></span>
            </span>
          </button>
        ))}
      </div>
      <div className="services-join reveal">
        <a href="#contact" className="btn-primary">
          Join us now <span className="play-icon"><i className="fas fa-play" /></span>
        </a>
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

  const t = testimonials[idx];
  return (
    <section id="testimonials">
      <div className="testimonials-bg" />
      <div className="circle-deco testi-circle" />
      <div className="testi-img-placeholder">
        <div className="img-box"><i className="fas fa-image" />Add testimonials-bg.jpg<br />to /images/ folder</div>
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
    <section id="trainers">
      <span className="section-label reveal">Team Members</span>
      <h2 className="section-title reveal">Team Of Expert Coaches</h2>
      <br /><br />
      <div className="trainers-grid stagger">
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
  return (
    <section id="contact">
      <div className="contact-bg" />
      <div className="circle-deco contact-circle" />
      <div className="contact-img-placeholder">
        <div className="img-box"><i className="fas fa-image" />Add contact-bg.jpg<br />to /images/ folder</div>
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