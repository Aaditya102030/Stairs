"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── Global Styles ─── */
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');

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
  .btn-primary { display: inline-flex; align-items: center; gap: 14px; background: var(--red); color: var(--light); font-family: var(--font-body); font-weight: 700; font-size: 0.88rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 10px 10px 10px 32px; border-radius: 50px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
  .btn-primary:hover { background: #c0251b; transform: translateY(-2px); }
  .btn-primary .play-icon { width: 38px; height: 38px; background: var(--light); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .btn-primary .play-icon i { color: var(--red); font-size: 0.72rem; margin-left: 2px; }
  .btn-outline { display: inline-block; border: 2px solid var(--red); color: var(--red); font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; padding: 10px 28px; border-radius: 30px; transition: background 0.3s, color 0.3s; }
  .btn-outline:hover { background: var(--red); color: var(--light); }

  /* NAVBAR */
  #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; transition: background 0.4s, padding 0.4s; background: rgba(0,0,0,0.3); }
  #navbar.scrolled { background: rgba(10,10,10,0.95); padding: 12px 60px; backdrop-filter: blur(8px); }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--light); }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-links a { color: var(--light); font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; position: relative; transition: color 0.3s; }
  .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--red); transition: width 0.3s; }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
  .nav-links a.active, .nav-links a:hover { color: var(--red); }
  .nav-links .contact-btn { border: 2px solid var(--red); padding: 7px 20px; border-radius: 30px; color: var(--light) !important; transition: background 0.3s; }
  .nav-links .contact-btn:hover { background: var(--red); }
  .nav-links .contact-btn::after { display: none !important; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); transition: 0.3s; }

  /* PAGE HERO */
  .page-hero { position: relative; padding: 160px 60px 90px; background: var(--darker); overflow: hidden; text-align: center; }
  .page-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(232,55,44,0.1), transparent 60%); }
  .ph-circle { position: absolute; border-radius: 50%; border: 30px solid var(--red); opacity: 0.1; }
  .ph-circle-1 { width: 500px; height: 500px; top: -200px; right: -100px; }
  .ph-circle-2 { width: 300px; height: 300px; bottom: -100px; left: -60px; }
  .ph-label { font-family: var(--font-body); font-weight: 600; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: var(--red); display: block; margin-bottom: 12px; position: relative; z-index: 2; }
  .page-hero h1 { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6rem); color: var(--light); letter-spacing: 2px; text-transform: uppercase; position: relative; z-index: 2; line-height: 1; }
  .ph-line { width: 60px; height: 4px; background: var(--red); margin: 18px auto 0; border-radius: 2px; position: relative; z-index: 2; }

  /* PAGE SECTION */
  .page-section { padding: 80px 60px; }
  .page-section.dark { background: var(--darker); }
  .page-section.light { background: var(--bg-light); }
  .page-section.white { background: var(--light); }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .about-img-wrap { position: relative; }
  .about-img-box { height: 480px; background: #1a1a1a; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 0.8rem; letter-spacing: 1px; border: 2px dashed rgba(255,255,255,0.1); gap: 10px; }
  .about-img-box i { font-size: 2.5rem; opacity: 0.3; }
  .about-accent { position: absolute; bottom: -20px; right: -20px; width: 120px; height: 120px; background: var(--red); border-radius: 12px; z-index: -1; }
  .about-text .section-title { color: var(--light); margin-bottom: 20px; }
  .about-text p { color: #cccccc; font-size: 0.95rem; line-height: 1.8; margin-bottom: 24px; }
  .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 36px; }
  .stat-item h3 { font-family: var(--font-display); font-size: 2.2rem; color: var(--red); letter-spacing: 1px; }
  .stat-item p { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: #aaa; }
  .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .value-card { padding: 32px 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; transition: background 0.3s, border-color 0.3s; }
  .value-card:hover { background: rgba(232,55,44,0.08); border-color: rgba(232,55,44,0.3); }
  .value-card i { font-size: 1.8rem; color: var(--red); margin-bottom: 16px; display: block; }
  .value-card h4 { font-family: var(--font-display); font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase; color: var(--light); margin-bottom: 10px; }
  .value-card p { color: #aaa; font-size: 0.85rem; line-height: 1.7; }

  /* SERVICES */
  @keyframes gradientSpin { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  .services-book { display: flex; gap: 18px; height: 460px; align-items: stretch; justify-content: center; margin-bottom: 20px; }
  .service-panel { position: relative; flex: 0.52; min-width: 74px; overflow: hidden; border: 0; border-radius: 8px; padding: 0; font: inherit; text-align: left; color: var(--light); cursor: pointer; background: #1d1d1d; box-shadow: 0 18px 45px rgba(0,0,0,0.24); transition: flex 0.55s ease, transform 0.55s ease, box-shadow 0.55s ease; }
  .service-panel.is-active { flex: 2.7; transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.34); }
  .service-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.82)), var(--service-bg); background-size: cover; background-position: center; filter: grayscale(1); transition: filter 0.55s ease, transform 0.55s ease; }
  .service-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(232,55,44,0.18), rgba(4,22,73,0.36)); opacity: 0.55; transition: opacity 0.55s ease; }
  .service-panel.is-active::before { filter: grayscale(0.35); transform: scale(1.04); }
  .service-panel.is-active::after { opacity: 0.15; }
  .service-panel .vertical-title { position: absolute; left: 50%; top: 50%; z-index: 2; transform: translate(-50%, -50%) rotate(-90deg); width: 260px; font-family: var(--font-display); font-size: 1.05rem; letter-spacing: 0.7px; text-align: left; white-space: nowrap; text-shadow: 0 2px 10px rgba(0,0,0,0.7); transition: opacity 0.35s ease; }
  .service-panel .service-detail { position: absolute; inset: auto 22px 24px 22px; z-index: 3; color: var(--light); opacity: 0; transform: translateY(22px); transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s; }
  .service-panel.is-active .service-detail { opacity: 1; transform: translateY(0); }
  .service-panel.is-active .vertical-title { opacity: 0; }
  .service-detail .s-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.16); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .service-detail h3 { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; text-shadow: 0 2px 10px rgba(0,0,0,0.65); }
  .service-detail p { color: rgba(255,255,255,0.78); font-size: 0.9rem; line-height: 1.6; max-width: 290px; margin-bottom: 14px; text-shadow: 0 2px 10px rgba(0,0,0,0.65); }
  .service-detail .read-more { color: var(--light); font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 7px; }
  .services-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 50px; }
  .service-card-full { padding: 36px 28px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; transition: background 0.3s, border-color 0.3s, transform 0.3s; }
  .service-card-full:hover { background: rgba(232,55,44,0.08); border-color: rgba(232,55,44,0.3); transform: translateY(-4px); }
  .service-card-full .s-num { font-family: var(--font-display); font-size: 3rem; color: rgba(232,55,44,0.25); line-height: 1; margin-bottom: 8px; }
  .service-card-full h4 { font-family: var(--font-display); font-size: 1.15rem; letter-spacing: 1px; text-transform: uppercase; color: var(--light); margin-bottom: 12px; }
  .service-card-full p { color: #aaa; font-size: 0.88rem; line-height: 1.7; }

  /* TRAINERS */
  .trainers-grid-page { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
  .trainer-card-full { position: relative; border-radius: 16px; overflow: hidden; background: #1a1a1a; transition: transform 0.3s, box-shadow 0.3s; }
  .trainer-card-full:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
  .trainer-card-full .tc-img { height: 260px; background: #222; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 0.8rem; gap: 8px; position: relative; }
  .trainer-card-full .tc-img i { font-size: 3rem; opacity: 0.3; }
  .trainer-card-full .tc-body { padding: 24px; }
  .trainer-card-full h3 { font-family: var(--font-display); font-size: 1.3rem; letter-spacing: 2px; text-transform: uppercase; color: var(--light); margin-bottom: 4px; }
  .trainer-card-full .tc-role { color: var(--red); font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; }
  .trainer-card-full .tc-bio { color: #888; font-size: 0.85rem; line-height: 1.7; margin-bottom: 18px; }
  .trainer-card-full .tc-social { display: flex; gap: 10px; }
  .trainer-card-full .tc-social a { width: 34px; height: 34px; background: rgba(255,255,255,0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.75rem; transition: background 0.3s, color 0.3s; }
  .trainer-card-full .tc-social a:hover { background: var(--red); color: var(--light); }
  .tc-tag { position: absolute; top: 14px; left: 14px; background: var(--red); color: var(--light); font-size: 0.65rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; z-index: 2; }

  /* PRICING */
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1000px; margin: 0 auto; }
  .pricing-card { position: relative; border-radius: 16px; overflow: visible; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.07); z-index: 0; }
  .pricing-card::before { content: ''; position: absolute; inset: -3px; border-radius: 18px; background: linear-gradient(135deg, #e8372c, #ff6b35, #ffb347, #e8372c, #8b0000); background-size: 300% 300%; z-index: -1; opacity: 0; transition: opacity 0.4s ease; animation: gradientSpin 3s ease infinite; }
  .pricing-card::after { content: ''; position: absolute; inset: 2px; border-radius: 14px; background: #ffffff; z-index: -1; }
  .pricing-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); }
  .pricing-card:hover::before { opacity: 1; }
  .pricing-card .card-img { height: 180px; background: #222; position: relative; overflow: hidden; border-radius: 14px 14px 0 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 0.75rem; gap: 8px; }
  .pricing-card .card-img i { font-size: 2rem; }
  .price-badge { position: absolute; bottom: -22px; left: 50%; transform: translateX(-50%); background: var(--red); color: var(--light); border-radius: 50%; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.6rem; line-height: 1; z-index: 2; }
  .price-badge small { font-size: 0.55rem; letter-spacing: 1px; font-family: var(--font-body); }
  .pricing-body { padding: 46px 30px 30px; text-align: center; }
  .pricing-body h3 { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
  .pricing-body ul { margin-bottom: 28px; }
  .pricing-body ul li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; color: #555; }
  .pricing-body ul li i { color: var(--red); font-size: 0.8rem; }
  .pricing-faq { max-width: 720px; margin: 60px auto 0; }
  .pricing-faq h3 { font-family: var(--font-display); font-size: 1.8rem; letter-spacing: 1px; text-transform: uppercase; text-align: center; margin-bottom: 30px; }
  .faq-item { border-bottom: 1px solid #eee; padding: 18px 0; cursor: pointer; }
  .faq-item summary { font-weight: 600; font-size: 0.9rem; color: var(--dark); list-style: none; display: flex; justify-content: space-between; align-items: center; }
  .faq-item summary::after { content: '+'; color: var(--red); font-size: 1.2rem; }
  .faq-item[open] summary::after { content: '−'; }
  .faq-item p { color: var(--gray); font-size: 0.88rem; line-height: 1.7; padding-top: 12px; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; align-items: start; }
  .contact-info h3 { font-family: var(--font-display); font-size: 1.6rem; letter-spacing: 1px; text-transform: uppercase; color: var(--light); margin-bottom: 20px; }
  .contact-info p { color: #aaa; font-size: 0.9rem; line-height: 1.8; margin-bottom: 32px; }
  .contact-item-card { display: flex; gap: 18px; align-items: flex-start; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; margin-bottom: 14px; transition: border-color 0.3s; }
  .contact-item-card:hover { border-color: rgba(232,55,44,0.4); }
  .ci-icon { width: 42px; height: 42px; background: var(--red); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--light); font-size: 1rem; }
  .contact-item-card strong { display: block; color: var(--light); font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
  .contact-item-card span { color: #aaa; font-size: 0.88rem; }
  .contact-form-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px; }
  .contact-form-box h3 { font-family: var(--font-display); font-size: 1.6rem; letter-spacing: 1px; text-transform: uppercase; color: var(--light); margin-bottom: 28px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-row.single { grid-template-columns: 1fr; }
  .cf input, .cf textarea, .cf select { width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: var(--light); font-family: var(--font-body); font-size: 0.9rem; outline: none; transition: border-color 0.3s; }
  .cf input::placeholder, .cf textarea::placeholder { color: rgba(255,255,255,0.35); }
  .cf select option { background: #222; color: var(--light); }
  .cf input:focus, .cf textarea:focus, .cf select:focus { border-color: var(--red); }
  .cf textarea { height: 120px; resize: none; }

  /* BLOG / COMING SOON */
  .cs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
  .blog-card { position: relative; border-radius: 16px; overflow: visible; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.07); z-index: 0; background: #fff; }
  .blog-card::before { content: ''; position: absolute; inset: -3px; border-radius: 18px; background: linear-gradient(135deg, #e8372c, #ff6b35, #ffb347, #e8372c, #8b0000); background-size: 300% 300%; z-index: -1; opacity: 0; transition: opacity 0.4s ease; animation: gradientSpin 3s ease infinite; }
  .blog-card::after { content: ''; position: absolute; inset: 2px; border-radius: 14px; background: #ffffff; z-index: -1; }
  .blog-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); }
  .blog-card:hover::before { opacity: 1; }
  .blog-img { height: 200px; background: #e0e0e0; border-radius: 14px 14px 0 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(0,0,0,0.2); gap: 8px; position: relative; overflow: hidden; }
  .blog-img i { font-size: 2.2rem; }
  .date-badge { position: absolute; top: 12px; left: 12px; background: var(--red); color: var(--light); border-radius: 50%; width: 54px; height: 54px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.3rem; line-height: 1; z-index: 2; }
  .date-badge small { font-size: 0.55rem; font-family: var(--font-body); letter-spacing: 1px; }
  .blog-body { padding: 24px 22px; position: relative; z-index: 1; }
  .blog-body h3 { font-family: var(--font-display); font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase; line-height: 1.3; margin-bottom: 10px; }
  .blog-body p { color: var(--gray); font-size: 0.85rem; line-height: 1.7; margin-bottom: 14px; }
  .blog-body .read-more { color: var(--red); font-weight: 700; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; }
  .newsletter-box { background: var(--red); border-radius: 16px; padding: 50px; text-align: center; margin-top: 60px; }
  .newsletter-box h3 { font-family: var(--font-display); font-size: 2rem; letter-spacing: 1px; text-transform: uppercase; color: var(--light); margin-bottom: 10px; }
  .newsletter-box p { color: rgba(255,255,255,0.85); font-size: 0.9rem; margin-bottom: 28px; }
  .newsletter-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; }
  .newsletter-form input { flex: 1; padding: 14px 20px; border-radius: 50px; border: none; font-family: var(--font-body); font-size: 0.9rem; outline: none; }
  .newsletter-form button { padding: 14px 28px; background: var(--dark); color: var(--light); border: none; border-radius: 50px; font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: background 0.3s; white-space: nowrap; }
  .newsletter-form button:hover { background: #333; }

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
  .footer-contact .contact-item { display: flex; flex-direction: column; margin-bottom: 12px; }
  .footer-contact .contact-item strong { color: var(--light); font-size: 0.85rem; margin-bottom: 2px; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; text-align: center; font-size: 0.8rem; }

  @media (max-width: 1024px) {
    #navbar { padding: 16px 30px; }
    #navbar.scrolled { padding: 10px 30px; }
    .page-hero, .page-section { padding-left: 30px; padding-right: 30px; }
    .about-grid, .contact-grid { grid-template-columns: 1fr; }
    .trainers-grid-page, .services-cards { grid-template-columns: repeat(2, 1fr); }
    .pricing-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .values-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .trainers-grid-page, .services-cards, .cs-grid, .values-grid, .pricing-grid { grid-template-columns: 1fr; }
    .footer-grid, .form-row { grid-template-columns: 1fr; }
    .newsletter-form { flex-direction: column; }
    .services-book { height: auto; flex-direction: column; }
    .service-panel { min-width: unset; height: 70px; }
    .service-panel.is-active { height: 320px; }
  }
`;

/* ─── Data ─── */
export const servicesData = [
  { bg: "linear-gradient(135deg,#313131,#111)", vertical: "High Performance Athletes", icon: "fas fa-bolt", title: "High Performance", desc: "Strength, conditioning, speed work, and measurable training plans for athletes chasing peak output." },
  { bg: "linear-gradient(135deg,#3b3b3b,#151515)", vertical: "Youth Athletes", icon: "fas fa-child", title: "Youth Athletes", desc: "Age-aware coaching that builds movement quality, confidence, discipline, and athletic foundations." },
  { bg: "linear-gradient(135deg,#444,#101010)", vertical: "Lifestyle Performance", icon: "fas fa-running", title: "Lifestyle Performance", desc: "Personal training, body recomposition, mobility, and lifestyle coaching for stronger everyday health." },
  { bg: "linear-gradient(135deg,#353535,#121212)", vertical: "Recovery", icon: "fas fa-redo-alt", title: "Recovery", desc: "Mobility sessions, rest planning, corrective work, and recovery support between demanding training days." },
  { bg: "linear-gradient(135deg,#2c2c2c,#101010)", vertical: "Physiotherapy and Rehabilitation", icon: "fas fa-user-md", title: "Rehabilitation", desc: "Structured return-to-training support with movement screening, rehab progressions, and pain-aware plans." },
];

export const trainersData = [
  { name: "Marvin Joiner", role: "CrossFit Coach", bio: "10+ years transforming athletes through functional fitness, mobility work, and high-intensity programming.", tag: "Lead Coach" },
  { name: "Patricia Woodrum", role: "Cardio & Conditioning", bio: "Specialist in endurance, fat-loss, and cardiovascular programming for all fitness levels.", tag: "Lead Coach" },
  { name: "Hannaz Stone", role: "Fitness Coach", bio: "Holistic approach to fitness — strength, flexibility, and mindset all in one personalised plan.", tag: "Lead Coach" },
  { name: "Damien Cole", role: "Strength & Conditioning", bio: "Former national powerlifting champion with 12 years of elite S&C coaching across football, rugby, and track.", tag: "Specialist" },
  { name: "Sofia Reyes", role: "Yoga & Mobility", bio: "Certified yoga therapist and movement coach — she bridges flexibility, breath work, and athletic performance.", tag: "Specialist" },
  { name: "Luke Brennan", role: "Physiotherapist", bio: "Accredited physiotherapist specialising in sports injury rehab, return-to-play protocols, and pain management.", tag: "Specialist" },
];

export const pricingPlansData = [
  { price: "$45", title: "Basic Gym", features: ["Unlimited club access", "Group attendance", "Gym visits", "Visits to the bath complex", "Gym fight club"] },
  { price: "$50", title: "Standard Gym", features: ["Everything in Basic", "Personal training (2x/week)", "Nutrition guidance", "Progress tracking", "Priority booking"] },
  { price: "$60", title: "Premium Gym", features: ["Everything in Standard", "Unlimited personal training", "Full recovery suite", "Physiotherapy sessions", "VIP locker room"] },
];

export const blogPostsData = [
  { date: "23", month: "Jan", title: "Soluta Nobis Qse Aligen Optio Cumue", tag: "Training" },
  { date: "07", month: "Feb", title: "Quis Autcm Vea Eum Iure Reprehenderit", tag: "Nutrition" },
  { date: "12", month: "Apr", title: "Reprehenderit In Vouta Velit Esse Cillum", tag: "Recovery" },
  { date: "19", month: "May", title: "Enim Ad Minima Veniam Quis Nostrum", tag: "Mindset" },
  { date: "03", month: "Jun", title: "Corporis Suscipit Laboriosam Nisi Aliquid", tag: "Training" },
  { date: "28", month: "Jun", title: "Voluptate Velit Esse Quam Nihil Molestiae", tag: "Lifestyle" },
];

/* ─── useReveal ─── */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    // Make hero-level elements visible immediately
    document.querySelectorAll(".page-hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

/* ─── SiteNavbar ─── */
export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        <img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} />
      </div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>{l.label}</Link>
        ))}
        <Link href="/contact" className="contact-btn">Contact</Link>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
        <span /><span /><span />
      </div>
    </nav>
  );
}

/* ─── PageHero ─── */
export function PageHero({ label, title }: { label: string; title: string }) {
  return (
    <div className="page-hero">
      <div className="ph-circle ph-circle-1" />
      <div className="ph-circle ph-circle-2" />
      <span className="ph-label">{label}</span>
      <h1>{title}</h1>
      <div className="ph-line" />
    </div>
  );
}

/* ─── SiteFooter ─── */
export function SiteFooter() {
  return (
    <footer id="footer">
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon"><i className="fas fa-dumbbell" /></div>
            <span>Stairs</span>
          </div>
          <p>Your performance starts here. Training, recovery, and rehabilitation all under one roof.</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col" style={{ color: "#aaa" }}>
          <h4>Opening Hours</h4>
          <p style={{ fontSize: "0.85rem", marginBottom: 6 }}><strong style={{ color: "#ccc" }}>Mon – Sat</strong><br />6:00am – 10:00pm</p>
          <p style={{ fontSize: "0.85rem" }}><strong style={{ color: "#ccc" }}>Sunday</strong><br />8:00am – 6:00pm</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {[["about","About"],["services","Services"],["trainers","Trainers"],["pricing","Pricing"],["contact","Contact"]].map(([slug, label]) => (
              <li key={slug}><Link href={`/${slug}`}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Instagram:</strong><span><a href="https://instagram.com/stairs.physio" target="_blank" rel="noreferrer" style={{color:"#aaa"}}>@stairs.physio</a></span></div>
          <div className="contact-item"><strong>Phone:</strong><span><a href="tel:08310331077" style={{color:"#aaa"}}>083103 31077</a></span></div>
          <div className="contact-item"><strong>Email:</strong><span><a href="mailto:connect.stairsphysiotherapy@gmail.com" style={{color:"#aaa"}}>connect.stairsphysiotherapy@gmail.com</a></span></div>
          <div className="contact-item"><strong>Messenger:</strong><span>Stairs - Physiotherapy &amp; Fitness</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}
