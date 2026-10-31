"use client";

import { useState, useEffect, useRef, createElement } from "react";
import Image from "next/image";

import { motion } from "motion/react";

import { NoiseBackground } from "@/components/ui/noise-background";
import blogPosts from "@/lib/blogPosts";
import type { BlogPost } from "@/lib/blogPosts";
import BranchesFooter from "@/components/BranchesFooter";

/* ─── Inline CSS ─── */
const globalStyles = `
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  :root {
    --red: #e8372c;
    --dark: #111111;
    --darker: #0a0a0a;
    --light: #ffffff;
    --gray: #888888;
    --bg-light: #f5f5f5;
    --font-display: var(--font-bebas), 'Bebas Neue', sans-serif;
    --font-body: var(--font-barlow), 'Barlow', sans-serif;
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

  .btn-primary { display: inline-flex; align-items: center; gap: 12px; background: var(--red); color: var(--light); font-family: var(--font-body); font-weight: 700; font-size: 0.88rem; letter-spacing: 2px; text-transform: uppercase; padding: 14px 36px; border-radius: 50px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
  .btn-primary:hover { background: #c0251b; transform: translateY(-2px); }
  .btn-primary .play-icon { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.25); display: inline-flex; align-items: center; justify-content: center; font-size: 0.7rem; }
  .circle-deco { position: absolute; border-radius: 50%; border: 20px solid var(--red); opacity: 0.85; }

  /* NAVBAR */
  #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 22px 72px; transition: background 0.4s, padding 0.4s, box-shadow 0.4s; }
  #navbar.scrolled { background: rgba(10,10,10,0.96); padding: 14px 72px; backdrop-filter: blur(12px); box-shadow: 0 2px 40px rgba(0,0,0,0.4); }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--light); }
  .nav-logo .logo-icon { width: 40px; height: 40px; background: var(--red); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: var(--light); }
  .nav-logo span { font-family: var(--font-display); font-size: 1.3rem; letter-spacing: 2px; }
  .nav-links { display: flex; align-items: center; gap: 38px; }
  .nav-links a { color: var(--light); font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; position: relative; transition: color 0.3s; }
  .nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: var(--red); transition: width 0.3s; }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
  .nav-links a.active, .nav-links a:hover { color: var(--red); }
  .nav-links .contact-btn { border: 2px solid var(--red); padding: 9px 26px; border-radius: 30px; color: var(--light); font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; transition: background 0.3s, color 0.3s; }
  .nav-links .contact-btn:hover { background: var(--red); color: #fff; }
  .nav-links .contact-btn::after { display: none; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); transition: 0.3s; }

  /* HERO */
  #hero { position: relative; min-height: 100vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; padding: 120px 0 70px; }
  .hero-bg-img { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80') center/cover no-repeat; opacity: 0.55; }
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
  .hero-content h1 { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 5.5rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 20px; }
  .hero-content p { color: #cccccc; font-size: 1.05rem; margin-bottom: 36px; font-weight: 400; max-width: 520px; line-height: 1.6; min-height: 4.9em; }
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
  .org-carousel { position: relative; z-index: 1; }
  .org-track-wrapper { overflow: hidden; position: relative; padding: 10px 0 44px; }
  .org-arrow { position: absolute; top: 40%; transform: translateY(-50%); z-index: 2; width: 36px; height: 36px; border-radius: 50%; border: none; background: rgba(0,0,0,0.55); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.25s; }
  .org-arrow:hover { background: var(--red); }
  .org-arrow.left { left: 8px; }
  .org-arrow.right { right: 8px; }
  .org-dots { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: -8px; }
  .org-dot { width: 8px; height: 8px; border-radius: 50%; border: none; padding: 0; background: #d0d0d0; cursor: pointer; transition: background 0.3s, transform 0.3s; }
  .org-dot.active { background: #111; transform: scale(1.25); }
  .org-track { display: flex; gap: 40px; width: max-content; padding: 0 24px; }
  @keyframes scroll-logos { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .org-card { width: 190px; height: 130px; padding: 10px; background: transparent; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s, filter 0.3s; }
  .org-card:hover { transform: scale(1.1); filter: drop-shadow(0 0 14px rgba(232,55,44,0.45)); }
  .org-card .org-img-box { width: 90px; height: 90px; background: rgba(0,0,0,0.06); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gray); font-size: 0.65rem; letter-spacing: 0.5px; text-align: center; padding: 8px; }

  /* WHY */
  #why { padding: 90px 60px; background: var(--bg-light); }
  #why .why-header { text-align: center; margin-bottom: 60px; }
  #why .why-header .accent { color: var(--red); }
  #why .why-sub { color: #555; font-size: 1.05rem; margin-top: 14px; }
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }

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
  .about-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80') center/cover no-repeat; opacity: 0.4; }
  .about-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.92) 55%); }
  .about-circle { width: 460px; height: 460px; left: 2%; top: 50%; transform: translateY(-50%); border-width: 25px; pointer-events: none; opacity: 0.7; }
  /* SECTION ILLUSTRATIONS */
  .about-img-placeholder { display: none; }
  .about-scene { position: absolute; left: 0; top: 0; bottom: 0; width: 48%; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; overflow: hidden; }
  .testi-img-placeholder { display: none; }
  .insta-scene { pointer-events: auto !important; overflow: visible !important; }
  .insta-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; max-width: 100%; padding: 0 24px; }
  .insta-label { color: var(--light); font-size: 0.8rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; }
  .insta-label i { color: var(--red); margin-right: 8px; }
  .insta-row { display: flex; gap: 20px; max-width: 100%; overflow-x: auto; padding: 4px 4px 10px; scroll-snap-type: x mandatory; scrollbar-width: thin; }
  .insta-frame { flex: 0 0 auto; width: 250px; height: 450px; border-radius: 18px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 18px 40px rgba(0,0,0,0.5); scroll-snap-align: start; }
  .insta-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
  .insta-frame.profile { width: 340px; background: #fff; }
  .insta-slider { position: relative; max-width: 100%; }
  .insta-widget { width: min(560px, 100%); max-height: 500px; overflow: auto; border-radius: 18px; }
  .insta-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 3; width: 38px; height: 38px; border-radius: 50%; border: none; background: rgba(0,0,0,0.65); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.25s; }
  .insta-arrow:hover { background: var(--red); }
  .insta-arrow.left { left: -14px; }
  .insta-arrow.right { right: -14px; }
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
  .services-book { display: flex; gap: 12px; max-width: 1300px; height: 440px; margin: 0 auto; align-items: stretch; justify-content: center; }
  .service-panel { position: relative; flex: 0.52; min-width: 52px; overflow: hidden; border: 0; border-radius: 8px; padding: 0; font: inherit; text-align: left; color: var(--light); cursor: pointer; background: #1d1d1d; box-shadow: 0 18px 45px rgba(0,0,0,0.24); transition: flex 0.55s ease, transform 0.55s ease, box-shadow 0.55s ease; }
  .service-panel.is-active { flex: 2.7; transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.34); outline: none; }
  .service-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.75)), var(--service-bg); background-size: cover; background-position: center; filter: grayscale(0.6); transition: filter 0.55s ease, transform 0.55s ease; }
  .service-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(232,55,44,0.18), rgba(4,22,73,0.36)); opacity: 0.55; transition: opacity 0.55s ease; }
  .service-panel.is-active::before { filter: grayscale(0); transform: scale(1.04); }
  .service-panel.is-active::after { opacity: 0.15; }
  .service-panel .vertical-title { position: absolute; left: 50%; top: 50%; z-index: 2; transform: translate(-50%, -50%) rotate(-90deg); transform-origin: center; width: 360px; font-family: var(--font-display); font-size: 1.05rem; letter-spacing: 0.7px; line-height: 1; text-align: center; white-space: nowrap; text-shadow: 0 2px 10px rgba(0,0,0,0.7); transition: opacity 0.35s ease; }
  .service-panel .service-detail { position: absolute; inset: auto 22px 24px 22px; z-index: 3; color: var(--light); opacity: 0; transform: translateY(22px); transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s; text-align: left; }
  .service-panel .service-detail h3, .service-panel .service-detail p, .service-panel .service-detail .read-more { text-shadow: 0 2px 10px rgba(0,0,0,0.65); }
  .service-panel.is-active .service-detail { opacity: 1; transform: translateY(0); }
  .service-panel.is-active .vertical-title { opacity: 0; }
  .service-detail .s-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.16); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .service-detail h3 { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .service-detail p { color: rgba(255,255,255,0.78); font-size: 0.9rem; line-height: 1.6; max-width: 290px; margin-bottom: 14px; }
  .service-detail .read-more { color: var(--light); font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 7px; }
  .services-join { text-align: center; margin-top: 50px; }
  .blog-card.off-page { display: none; }

  /* TESTIMONIALS */
  #testimonials { position: relative; min-height: 420px; background: var(--darker); display: flex; align-items: center; overflow: hidden; }
  .testimonials-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80') center/cover no-repeat; opacity: 0.3; }
  .testi-circle { width: 400px; height: 400px; right: 5%; top: 50%; transform: translateY(-50%); border-width: 20px; pointer-events: none; opacity: 0.65; }
  .testi-img-placeholder .img-box i { font-size: 2.5rem; margin-bottom: 10px; opacity: 0.3; }
  /* kept for mobile fallback */
  .testimonial-content { position: relative; z-index: 2; padding: 80px 60px; max-width: 52%; }
  .testimonial-content .section-label { color: var(--red); }
  .testimonial-content .section-title { color: var(--light); margin-bottom: 32px; }
  .testimonial-content .quote-icon { font-size: 3rem; color: var(--red); line-height: 1; margin-bottom: 10px; display: block; }
  .testimonial-content blockquote { color: #ccc; font-size: 0.95rem; line-height: 1.8; font-style: italic; margin-bottom: 24px; border: none; transition: opacity 0.5s; }
  .testi-profile-wrap { display: flex; align-items: center; gap: 30px; margin-bottom: 28px; }
  .testi-profile-img { width: 170px; height: 170px; border-radius: 50%; border: 4px solid var(--red); object-fit: cover; flex-shrink: 0; box-shadow: 0 0 0 6px rgba(232,55,44,0.2); transition: opacity 0.4s, transform 0.4s; }
  .testi-profile-img.faded { opacity: 0; transform: scale(0.85); }
  .testi-heading-text .section-label { color: var(--red); }
  .testi-heading-text .section-title { color: var(--light); }
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

  /* PROGRAMME CARD (home) */
  .prog-card{position:relative;border-radius:16px;overflow:visible;transition:transform .3s,box-shadow .3s;box-shadow:0 4px 16px rgba(0,0,0,.07);z-index:0;background:#fff;}
  .prog-card::before{content:'';position:absolute;inset:-3px;border-radius:18px;background:linear-gradient(135deg,#e8372c,#ff6b35,#ffb347,#e8372c,#8b0000);background-size:300% 300%;z-index:-1;opacity:0;transition:opacity .4s ease;animation:gradientSpin 3s ease infinite;}
  .prog-card:hover::before{opacity:1;}
  .prog-card::after{content:'';position:absolute;inset:2px;border-radius:14px;background:#fff;z-index:-1;}
  .prog-card:hover{transform:translateY(-8px);box-shadow:0 16px 40px rgba(232,55,44,.35);}
  .prog-slider{position:relative;height:180px;overflow:hidden;border-radius:14px 14px 0 0;background:#000;}
  .prog-slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .6s ease;}
  .prog-slide.active{opacity:1;}
  .prog-slide-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(.4);}
  .prog-slide-content{position:relative;z-index:2;text-align:center;padding:0 16px;}
  .prog-slide-content h4{font-family:var(--font-display);font-size:1.5rem;letter-spacing:3px;color:#fff;text-transform:uppercase;line-height:1.1;text-shadow:0 2px 12px rgba(0,0,0,.8);}
  .prog-slide-content h4 span{color:var(--red);display:block;}
  .prog-slide-content p{color:rgba(255,255,255,.65);font-size:.72rem;margin-top:5px;}
  .prog-nav{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:3;}
  .prog-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.35);border:none;cursor:pointer;padding:0;transition:background .3s;}
  .prog-dot.active{background:var(--red);}
  .prog-arr{position:absolute;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.6rem;cursor:pointer;z-index:3;transition:background .2s;}
  .prog-arr:hover{background:var(--red);border-color:var(--red);}
  .prog-arr.left{left:8px;}.prog-arr.right{right:8px;}
  .prog-body{padding:46px 24px 28px;text-align:center;position:relative;z-index:1;}
  .prog-body h3{font-family:var(--font-display);font-size:1.4rem;letter-spacing:2px;text-transform:uppercase;color:#111;margin-bottom:6px;}
  .prog-body .prog-sub{color:var(--red);font-size:.72rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;display:block;margin-bottom:18px;}
  .prog-body ul{margin-bottom:24px;}
  .prog-body ul li{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #f0f0f0;font-size:.88rem;color:#555;}
  .prog-body ul li i{color:var(--red);font-size:.78rem;flex-shrink:0;}
  .prog-enroll{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--red);color:#fff;font-family:var(--font-body);font-weight:700;font-size:.8rem;letter-spacing:1.5px;text-transform:uppercase;padding:10px 28px;border-radius:50px;cursor:pointer;transition:background .2s;text-decoration:none;border:none;width:100%;}
  .prog-enroll:hover{background:#c0251b;}
  a.prog-body{display:block;color:inherit;cursor:pointer;padding-bottom:30px;}
  .prog-card:hover .prog-body h3{color:var(--red);transition:color .3s;}

  /* CLIENT GALLERY */
  #gallery { position: relative; background: #000; padding: 56px 60px 44px; text-align: center; overflow: hidden; }
  .gallery-layout { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 70px; max-width: 1050px; margin: 0 auto; }
  .gallery-text { text-align: left; }
  .gallery-visual { display: flex; flex-direction: column; align-items: center; }
  #gallery::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #e8372c, #ff6a00, #ffb347); }
  #gallery::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 600px 340px at 15% 0%, rgba(232,55,44,0.22), transparent 70%), radial-gradient(ellipse 600px 340px at 85% 100%, rgba(255,106,0,0.16), transparent 70%); }
  #gallery .section-label, #gallery .section-title, .gallery-intro { position: relative; z-index: 1; }
  #gallery .section-title { color: var(--light); margin-bottom: 14px; }
  .gallery-intro { max-width: 520px; margin: 0; color: #e6e6e6; font-size: clamp(1rem, 1.6vw, 1.25rem); line-height: 1.6; font-weight: 300; }
  /* stacked card deck */
  .gallery-stage { position: relative; z-index: 1; display: flex; justify-content: center; margin-top: 48px; padding: 0 44px; touch-action: pan-y; }
  .gallery-stage::before { content: ''; position: absolute; inset: 0; margin: auto; width: 390px; height: 390px; border-radius: 50%; border: 2px dashed rgba(232,55,44,0.55); animation: spin-ring 28s linear infinite; pointer-events: none; z-index: 0; }
  .gallery-stage::after { content: ''; position: absolute; inset: 0; margin: auto; width: 330px; height: 330px; border-radius: 50%; border: 18px solid rgba(232,55,44,0.2); pointer-events: none; z-index: 0; }
  .gallery-deck { position: relative; z-index: 1; width: min(280px, 72vw); aspect-ratio: 4 / 4.8; }
  .deck-card { position: absolute; inset: 0; border-radius: 26px; overflow: hidden; background: #151515; cursor: pointer; transform-origin: 50% 92%; box-shadow: 0 0 0 2px rgba(255,255,255,0.22), 0 22px 44px rgba(0,0,0,0.65); transition: transform 0.7s cubic-bezier(0.22, 0.9, 0.3, 1), opacity 0.6s ease, filter 0.6s ease; will-change: transform, opacity; }
  .deck-card[data-pos="0"] { transform: translate(0, 0) scale(1); opacity: 1; z-index: 5; box-shadow: 0 0 0 2px rgba(232,55,44,0.85), 0 28px 60px rgba(232,55,44,0.28); }
  .deck-card[data-pos="1"] { transform: translate(14px, -10px) rotate(6deg) scale(0.97); opacity: 1; z-index: 4; filter: brightness(0.85); }
  .deck-card[data-pos="2"] { transform: translate(-14px, -16px) rotate(-7deg) scale(0.94); opacity: 1; z-index: 3; filter: brightness(0.7); }
  .deck-card[data-pos="3"] { transform: translate(22px, -24px) rotate(12deg) scale(0.9); opacity: 0.9; z-index: 2; filter: brightness(0.55); }
  .deck-card[data-pos="gone"] { transform: translate(-130%, 20px) rotate(-22deg) scale(0.95); opacity: 0; z-index: 6; pointer-events: none; }
  .deck-card[data-pos="hidden"] { transform: translate(0, -30px) rotate(0deg) scale(0.86); opacity: 0; z-index: 1; pointer-events: none; }
  .deck-card .g-photo { object-fit: cover; object-position: center top; }
  .g-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 40%, transparent 65%); }
  .g-caption { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: 16px 18px 18px; color: var(--light); text-align: left; }
  .g-caption::before { content: ''; display: block; width: 44px; height: 3px; border-radius: 2px; background: var(--red); margin-bottom: 12px; }
  .g-caption h4 { font-family: var(--font-display); font-size: 1.3rem; letter-spacing: 1.5px; text-transform: uppercase; line-height: 1.05; margin-bottom: 4px; }
  .g-caption p { font-size: 0.82rem; line-height: 1.35; color: rgba(255,255,255,0.8); }
  .deck-count { position: absolute; top: 16px; left: 16px; z-index: 2; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); color: var(--light); font-size: 0.72rem; font-weight: 600; letter-spacing: 2px; padding: 6px 12px; border-radius: 20px; }
  .g-fallback { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 30% 20%, rgba(232,55,44,0.45), transparent 55%), linear-gradient(145deg, #3d1511, #140a09 60%, #4a2108); }
  .g-fallback span { width: 34%; aspect-ratio: 1; min-width: 70px; border-radius: 50%; border: 2px solid var(--red); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 2.6rem; letter-spacing: 2px; color: var(--light); background: rgba(232,55,44,0.12); }
  .gallery-controls { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 22px; }
  .gallery-arrow { width: 44px; height: 44px; border-radius: 50%; border: none; background: rgba(255,255,255,0.12); color: var(--light); cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.25s; }
  .gallery-arrow:hover { background: var(--red); }
  .gallery-dots { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; max-width: 260px; }
  .gallery-dot { width: 8px; height: 8px; border-radius: 50%; border: none; padding: 0; background: rgba(255,255,255,0.3); cursor: pointer; transition: width 0.3s, background 0.3s; }
  .gallery-dot.active { width: 26px; border-radius: 4px; background: var(--red); }
  .deck-progress { position: relative; z-index: 1; width: min(280px, 72vw); height: 3px; margin: 14px auto 0; background: rgba(255,255,255,0.12); border-radius: 2px; overflow: hidden; }
  .deck-progress span { display: block; width: 100%; height: 100%; background: linear-gradient(90deg, #e8372c, #ff6a00); transform-origin: left; animation: deck-progress 3.5s linear forwards; }
  .deck-progress span.paused { animation: none; transform: scaleX(0); }
  @keyframes deck-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

  @media (max-width: 1024px) {
    #gallery { padding-left: 30px; padding-right: 30px; }
  }
  @media (max-width: 768px) {
    #gallery { padding: 40px 16px 36px; }
    .gallery-layout { grid-template-columns: 1fr; gap: 0; justify-items: center; }
    .gallery-text { text-align: center; }
    .gallery-intro { margin: 0 auto; font-size: 0.95rem; }
    .gallery-stage { margin-top: 44px; }
    .deck-card { border-radius: 20px; }
    .gallery-stage { padding: 0 30px; }
    .gallery-stage::before { width: 320px; height: 320px; }
    .gallery-stage::after { width: 270px; height: 270px; border-width: 14px; }
    .g-caption { padding: 16px 16px 20px; }
    .g-caption h4 { font-size: 1.3rem; }
    .g-caption p { font-size: 0.82rem; }
  }

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
  .contact-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80') center/cover no-repeat; opacity: 0.35; }
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

  /* BLOG MODAL */
  .blog-modal-backdrop {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: modal-fade-in 0.3s ease;
  }
  @keyframes modal-fade-in { from { opacity: 0; } to { opacity: 1; } }
  .blog-modal {
    background: #fff;
    border-radius: 20px;
    width: 100%; max-width: 720px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: modal-slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 32px 80px rgba(0,0,0,0.35);
  }
  @keyframes modal-slide-up { from { opacity: 0; transform: translateY(40px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .blog-modal-header {
    position: relative;
    height: 220px;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    display: flex; align-items: flex-end;
    padding: 24px 32px;
  }
  .blog-modal-header-bg {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #1a0a08, #111);
    display: flex; align-items: center; justify-content: center;
    color: rgba(232,55,44,0.08); font-size: 9rem;
    font-family: var(--font-display); letter-spacing: -4px;
    pointer-events: none; user-select: none;
  }
  .blog-modal-header::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%);
  }
  .blog-modal-meta {
    position: relative; z-index: 1;
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  }
  .blog-modal-cat {
    background: var(--red); color: #fff;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 14px; border-radius: 20px;
  }
  .blog-modal-date-badge {
    background: rgba(255,255,255,0.15); color: #fff;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 1px;
    padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(4px);
  }
  .blog-modal-readtime {
    color: rgba(255,255,255,0.6); font-size: 0.78rem; letter-spacing: 1px;
  }
  .blog-modal-close {
    position: absolute; top: 16px; right: 16px; z-index: 10;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: none; cursor: pointer;
    color: #fff; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
    backdrop-filter: blur(4px);
  }
  .blog-modal-close:hover { background: var(--red); }
  .blog-modal-body { padding: 32px 36px 40px; }
  .blog-modal-title {
    font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.2rem);
    letter-spacing: 1px; text-transform: uppercase;
    color: var(--dark); line-height: 1.1; margin-bottom: 10px;
  }
  .blog-modal-title.featured { color: var(--red); }
  .blog-modal-author {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 24px; padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
  }
  .blog-modal-author-icon {
    width: 36px; height: 36px; border-radius: 50%;
    background: #fef0ef; display: flex; align-items: center; justify-content: center;
  }
  .blog-modal-author-icon i { color: var(--red); font-size: 0.85rem; }
  .blog-modal-author span { font-size: 0.85rem; font-weight: 700; color: #555; letter-spacing: 0.5px; }
  .blog-modal-content {
    color: #444; font-size: 0.95rem; line-height: 1.9;
    white-space: pre-line;
  }
  .blog-modal-footer {
    margin-top: 32px; padding-top: 24px;
    border-top: 1px solid #f0f0f0;
    display: flex; gap: 12px; flex-wrap: wrap;
  }
  .blog-modal-cta {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--red); color: #fff;
    font-family: var(--font-body); font-weight: 700; font-size: 0.82rem;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 10px 24px; border-radius: 50px;
    text-decoration: none; transition: background 0.2s;
  }
  .blog-modal-cta:hover { background: #c0251b; }
  .blog-modal-back {
    display: inline-flex; align-items: center; gap: 8px;
    border: 2px solid #ddd; color: #555;
    font-family: var(--font-body); font-weight: 700; font-size: 0.82rem;
    letter-spacing: 1px; text-transform: uppercase;
    padding: 10px 22px; border-radius: 50px;
    cursor: pointer; background: none; transition: border-color 0.2s, color 0.2s;
  }
  .blog-modal-back:hover { border-color: var(--red); color: var(--red); }

  /* BLOG */
  #blog { padding: 90px 60px; background: #f5f5f5; }
  #blog .blog-header { text-align: center; margin-bottom: 50px; }
  #blog .section-label { color: var(--red); }
  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; max-width: 1000px; margin: 0 auto; }
  .blog-card { position: relative; border-radius: 16px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 16px rgba(0,0,0,0.07); background: #ffffff; }
  .blog-card::before { display: none; }
  .blog-card::after { display: none; }
  .blog-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(232,55,44,0.25); }
  .blog-card .blog-img { height: 180px; background: #ddd; position: relative; overflow: hidden; border-radius: 0; flex-shrink: 0; }
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
  @media (min-width: 769px) and (max-width: 1100px) {
    .services-book { gap: 10px; }
    .service-panel { min-width: 44px; }
  }

  @media (max-width: 1024px) {
    #navbar { padding: 18px 30px; }
    #navbar.scrolled { padding: 12px 30px; }
    .hero-content { padding: 0 30px; }
    #organisations, #why, #services, #pricing, #trainers, #blog, #footer { padding-left: 30px; padding-right: 30px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .pricing-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    #services .services-header { margin: -90px -30px 50px -30px; padding-left: 30px; padding-right: 30px; }
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

  /* ═══ MOBILE (≤768px): compact sizes, no overlaps, horizontal services slider ═══ */
  @media (max-width: 768px) {
    html, body { overflow-x: hidden; max-width: 100%; }
    .section-title { font-size: clamp(1.6rem, 7vw, 2.1rem); line-height: 1.1; }
    .section-label { font-size: 0.72rem; letter-spacing: 2.5px; margin-bottom: 8px; }

    /* section spacing */
    #organisations, #why, #services, #pricing, #trainers, #blog { padding-left: 18px; padding-right: 18px; }
    #why, #services, #pricing, #blog, #trainers { padding-top: 56px; padding-bottom: 56px; }
    #organisations { padding-top: 32px; padding-bottom: 28px; }
    #footer { padding: 44px 18px 24px; }

    /* navbar */
    #navbar { padding: 12px 18px; }
    #navbar.scrolled { padding: 8px 18px; }
    .nav-logo img { height: 42px !important; width: auto !important; }
    .nav-links a { font-size: 0.85rem; }

    /* hero: shrink decorations so they sit behind the text, not on it */
    #hero { min-height: 100svh; }
    .hero-bg-img { opacity: 0.5; }
    .hero-bg-img::after { background: linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 100%); }
    .hero-circle { width: 250px; height: 250px; right: -90px; border-width: 16px; opacity: 0.35; }
    .hero-3d-scene { width: 100%; opacity: 0.18; }
    .hero-3d-scene svg { width: 300px; height: 300px; }
    .hero-content { padding: 96px 20px 48px; max-width: 100%; }
    .hero-content .sub { font-size: 0.72rem; letter-spacing: 3px; padding-left: 10px; border-left-width: 3px; margin-bottom: 12px; }
    .hero-content h1 { font-size: clamp(2rem, 10vw, 3rem); line-height: 1.05; margin-bottom: 12px; letter-spacing: 1px; }
    .hero-content p { font-size: 0.92rem; line-height: 1.5; margin-bottom: 22px; max-width: 360px; min-height: 6em; }
    .glow-btn-wrap { margin-top: 1.25rem; }
    .glow-btn-inner { font-size: 0.78rem; padding: 10px 26px; gap: 10px; letter-spacing: 1.2px; }

    /* partners */
    .org-glow-bg { width: 100%; height: 220px; }
    .org-heading-wrap { margin-bottom: 20px; }
    .org-title-line1, .org-title-line2 { font-size: clamp(1.7rem, 8vw, 2.2rem); }
    .org-title-line3 { font-size: clamp(1.2rem, 5.5vw, 1.6rem); }
    .org-track { gap: 14px; }
    .org-card { width: 140px; height: 90px; padding: 8px; }
    .org-card .org-img-box { width: 70px; height: 70px; font-size: 0.55rem; padding: 4px; }
    .org-card .org-img-box i { font-size: 1.3rem !important; }

    /* why choose us */
    #why .why-header { margin-bottom: 32px; }
    #why .why-sub { font-size: 0.92rem; margin-top: 10px; }
    .features-grid { gap: 16px; }
    .feature-card { padding: 22px 18px; }
    .feature-card .icon-wrap { width: 52px; height: 52px; margin-bottom: 14px; }
    .feature-card .icon-wrap i { font-size: 1.3rem; }
    .feature-card h3 { font-size: 1.1rem; margin-bottom: 8px; }
    .feature-card p { font-size: 0.86rem; line-height: 1.6; margin-bottom: 0; }

    /* about: drop the overlapping illustration, stack text */
    #about { min-height: 0; }
    .about-bg::after { background: linear-gradient(to bottom, rgba(10,10,10,0.85), rgba(10,10,10,0.92)); }
    .about-scene, .about-circle { display: none; }
    .about-content { padding: 56px 20px; }
    .about-content p { font-size: 0.9rem; line-height: 1.7; margin-bottom: 24px; }
    .stats-grid { gap: 16px; margin-bottom: 24px; }
    .stat-item h3 { font-size: 1.8rem; }
    .stat-item p { font-size: 0.68rem; letter-spacing: 1.5px; }

    /* services: horizontal swipe slider */
    #services .services-header { margin: -56px -18px 28px -18px; padding: 40px 18px 34px; }
    #services .services-header::before { width: 160px; height: 160px; border-width: 30px; top: -40px; right: -40px; }
    #services .services-header::after { width: 120px; height: 120px; border-width: 22px; bottom: -50px; left: -30px; }
    .services-book { display: flex; flex-direction: row; justify-content: flex-start; align-items: stretch; gap: 14px; height: auto; max-width: none; margin: 0 -18px; padding: 10px 18px 22px; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scroll-padding: 0 18px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .services-book::-webkit-scrollbar { display: none; }
    .service-panel, .service-panel.is-active { flex: 0 0 78%; max-width: 300px; min-width: 0; height: 320px; border-radius: 14px; transform: none; scroll-snap-align: start; box-shadow: 0 12px 30px rgba(0,0,0,0.22); }
    .service-panel::before, .service-panel.is-active::before { filter: grayscale(0); transform: none; }
    .service-panel::after, .service-panel.is-active::after { opacity: 0.15; }
    .service-panel .vertical-title, .service-panel.is-active .vertical-title { display: none; }
    .service-panel .service-detail { opacity: 1; transform: none; inset: auto 18px 20px 18px; }
    .service-detail .s-icon { width: 36px; height: 36px; margin-bottom: 10px; }
    .service-detail h3 { font-size: 1.3rem; }
    .service-detail p { font-size: 0.86rem; line-height: 1.5; max-width: none; margin-bottom: 10px; }
    .services-join { margin-top: 18px; }

    /* testimonials: drop the overlapping illustration */
    #testimonials { min-height: 0; }
    .testi-scene, .testi-circle { display: none; }
    .testimonial-content { max-width: 100%; width: 100%; padding: 56px 20px; }
    .testi-profile-wrap { gap: 14px; margin-bottom: 18px; }
    .testi-heading-text { flex: 1; min-width: 0; }
    .testi-heading-text .section-title { font-size: clamp(1.4rem, 6vw, 1.8rem); }
    .testi-profile-img { width: 84px; height: 84px; border-width: 3px; box-shadow: 0 0 0 4px rgba(232,55,44,0.2); }
    .testimonial-content .quote-icon { font-size: 2.2rem; margin-bottom: 6px; }
    .testimonial-content blockquote { font-size: 0.88rem; line-height: 1.65; margin-bottom: 16px; }
    .testi-author strong { font-size: 0.85rem; }
    .testi-nav { margin-top: 18px; }

    /* programs */
    #pricing .pricing-header { margin-bottom: 32px; }
    .pricing-grid { gap: 22px; }
    .prog-slider { height: 160px; }
    .prog-slide-content h4 { font-size: 1.3rem; letter-spacing: 2px; }
    .prog-body { padding: 28px 18px 22px; }
    .prog-body h3 { font-size: 1.25rem; letter-spacing: 1.5px; }
    .prog-body ul li { font-size: 0.84rem; padding: 6px 0; }

    /* trainers: horizontal swipe slider */
    #trainers .section-title { margin-bottom: 0; }
    #trainers br { display: none; }
    .trainers-grid { flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; align-items: stretch; gap: 14px; margin: 24px -18px 0; padding: 8px 18px 18px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 18px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .trainers-grid::-webkit-scrollbar { display: none; }
    .trainer-card, .trainer-card.reveal { flex: 0 0 62%; max-width: 230px; width: auto; padding: 22px 18px; scroll-snap-align: start; opacity: 1; transform: none; }
    .trainer-card:hover { transform: none; }
    .trainer-card .trainer-img { width: 120px; height: 120px; margin-bottom: 12px; }

    /* contact: drop the overlapping illustration */
    #contact { min-height: 0; }
    .contact-scene, .contact-circle { display: none; }
    .contact-bg::after { background: linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.9)); }
    .contact-form-wrap { padding: 56px 20px; }
    .contact-form-wrap .section-title { margin-bottom: 20px; }
    .form-row { gap: 12px; margin-bottom: 12px; }
    .contact-form input, .contact-form textarea { padding: 12px 14px; font-size: 1rem; }
    .contact-form textarea { height: 96px; }
    .form-submit { margin-top: 14px; }
    .btn-primary { padding: 12px 28px; font-size: 0.8rem; }

    /* blog + modal */
    #blog .blog-header { margin-bottom: 28px; }
    .blog-grid { gap: 18px; }
    .blog-card .blog-img { height: 160px; }
    .blog-body { padding: 18px; }
    .blog-body h3 { font-size: 1rem; }
    .blog-grid { display: flex; flex-direction: row; align-items: stretch; gap: 14px; max-width: none; margin: 0 -18px; padding: 6px 18px 18px; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scroll-padding: 0 18px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .blog-grid::-webkit-scrollbar { display: none; }
    .blog-card, .blog-card.off-page { display: block; flex: 0 0 80%; max-width: 320px; scroll-snap-align: start; }
    .blog-card:hover { transform: none; }
    .blog-nav { display: none; }
    .blog-modal-backdrop { padding: 12px; }
    .blog-modal-header { height: 170px; padding: 16px 18px; }
    .blog-modal-body { padding: 22px 20px 28px; }
    .blog-modal-content { font-size: 0.9rem; line-height: 1.75; }
    .blog-modal-footer { flex-direction: column; }
    .blog-modal-cta, .blog-modal-back { justify-content: center; }

    /* footer */
    .footer-grid { gap: 28px; margin-bottom: 28px; }
    .footer-col h4 { margin-bottom: 14px; }
    .footer-contact .contact-item span, .footer-contact .contact-item a { overflow-wrap: anywhere; }
  }
`;

/* ─── Data ─── */
const testimonials = [
  { img: "/images/SANJAY RAJPAL.avif", quote: "STAIRS is God-sent for me. Absolutely awesome team and time at Stairs. Just can't wait for my next session every single time. You guys make it so interesting and work towards the need and goal of the client, that ensures I skip my work but not my workout. Keep rocking TEAM STAIRS!", name: "Sanjay Rajpal", role: "Businessman & Squash Champ" },
  { img: "/images/RUKMINI VIJAYAKUMAR.avif", quote: "I have personally grown to understand my body better because of Somya. There is a warm environment that the trainers and therapists foster that is conducive to progress. Every person working in Stairs is kind and helpful and I love the place! I highly recommend coming to Stairs.", name: "Rukmini Vijaykumar", role: "Actress & Dancer" },
  { img: "/images/SHREYAS KARNAD.avif", quote: "I'm proud to have a coach like Somya Rout, the team he is building and someone to speak to and someone who listens to me especially when you are in a profession it's the other way around all the time. To coach and to be coached is a perfect balance of learning & teaching.", name: "Shreyas Karnad", role: "Marathoner & Running Coach" },
  { img: "/images/Stairs Corporate Deck.png", quote: "Stairs Physiotherapy & Fitness has been a game-changer in my recovery and performance. Their expert care helped me stay injury-free, improve mobility, and build strength for peak performance. Thanks to their support, I feel stronger, more agile, and ready for every match!", name: "Yasmeen Shaikh", role: "Indian badminton player" },
  { img: "/images/Stairs Corporate Deck (1).png", quote: "Completing Ironman Goa was a huge challenge, and Stairs Physiotherapy & Fitness played a crucial role in my journey. Their expert rehab, strength training, and recovery sessions helped me stay injury-free and perform at my best. Their support made all the difference in crossing that finish line strong!", name: "Tejasvi Surya", role: "MP, Bengaluru South & Ironman triathlete" },
  { img: "/images/Stairs Corporate Deck (2).png", quote: "Stairs Physiotherapy & Fitness has been a game-changer for me! Their expert team lead by Somya Rout and Harinag helped me recover from fatigue, improve mobility, and stay injury-free through personalized care. Thanks to them, I feel stronger, pain-free, and always ready to perform!", name: "Jacqueline Fernandez", role: "Indian Actress" },
  { img: "/images/Stairs Corporate Deck (3).png", quote: "Stairs Physiotherapy & Fitness has been instrumental in keeping me pain-free and improving mobility. Their expert rehab and recovery programs help athletes stay strong, prevent injuries, and perform at their best. Highly recommended!", name: "Prakash Padukone", role: "Former Indian badminton player" },
  { img: "/images/Stairs Corporate Deck (4).png", quote: "Competing in Ironman, Bergman, and multiple triathlons demands intense training and quick recovery. Stairs Physiotherapy & Fitness has been a key part of my journey, helping me stay injury-free, recover faster, and perform at my best. Their expert care has truly elevated my endurance and performance!", name: "Anish Sood", role: "Businessman & Ironman, Bergman Triathlete" },
  { img: "/images/Stairs Corporate Deck (5).png", quote: "Stairs Physiotherapy and Fitness has truly transformed my recovery journey. Their expert team, personalized care, and attention to detail helped me bounce back stronger and pain-free. Grateful for their dedication and support!", name: "Yash Gowda", role: "Indian Actor" },
  { img: "/images/Stairs Corporate Deck (6).png", quote: "My dad, Prakash Padukone, continues to stay strong with the help of Stairs Physiotherapy and Fitness. Somya has been a huge part of his journey — and mine too. Every time I'm in Bangalore, Somya has been there to support my recovery journey.", name: "Deepika Padukone", role: "Indian Actress" },
  { img: "/images/Stairs Corporate Deck (7).png", quote: "As a professional billiards and snooker champion, precision and physical well-being are everything. For the past 6 years, Stairs Physiotherapy and Fitness — especially Somya has been key to my recovery and performance. Their consistent care keeps me tournament-ready, always.", name: "Pankaj Advani", role: "Indian Billiards Champion" },
  { img: "/images/Stairs Corporate Deck (8).png", quote: "Being in the film and fitness space, my body goes through a lot — and Stairs Physiotherapy and Fitness has been a game-changer. Somya's guidance has helped me recover faster and perform better, both on-screen and off. Grateful for the care and commitment they bring every single time.", name: "Rakul Preet", role: "Indian Actress" },
  { img: "/images/PRAGATHI GUPTA.png", quote: "Stairs is like my second home. Entire team at Stairs is so diligent & proficient. They not only strengthen us but understand the needs of our sport and train us efficaciously such that we are able to pursue our goals.", name: "Pragathi Gupta", role: "Runner" },
  { img: "/images/JANANI ANANTHAKUMAR.jpg", quote: "Stairs isn't just a fitness space; it's a home. Grateful for dedicated trainers, physios, and supportive members ensuring peak performance. Thank you, Team Stairs, for fostering excellence and positivity.", name: "Janani Ananthakumar", role: "Athlete, Badminton (India)" },
];

/* Paste Instagram reel / post links here (e.g. "https://www.instagram.com/reel/XXXXXXXXXXX/"). They appear on the right of the testimonials section. */
const instagramReels: string[] = [
  "https://www.instagram.com/stairs.physio/reel/DfFDTZ_y492/",
  "https://www.instagram.com/anubhavxsaikia/reel/DfEL2YcPSK7/",
  "https://www.instagram.com/prags_fit/p/De6OY5JGfrk/",
  "https://www.instagram.com/stairs.physio/reel/De9RusTBdE1/",
  "https://www.instagram.com/stairs.physio/reel/DewW1E6yFgQ/",
  "https://www.instagram.com/stairs.physio/p/DeT16g2yuMf/",
];
const instagramHandle = "stairs.physio";

/* Live Instagram feed (always shows the newest videos). Connect @stairs.physio in Behold (behold.so) or Elfsight,
   then set e.g. { provider: "behold", id: "YOUR_FEED_ID" } or { provider: "elfsight", id: "YOUR_APP_ID" }.
   While this is null, the manual links in `instagramReels` are used. */
const instagramWidget = null as { provider: "behold" | "elfsight"; id: string } | null;

const instaEmbedUrl = (link: string): string | null => {
  const m = link.match(/instagram\.com\/(?:[^/?#]+\/)?(reels?|p|tv)\/([^/?#]+)/);
  if (!m) return null;
  return `https://www.instagram.com/${m[1] === "reels" ? "reel" : m[1]}/${m[2]}/embed`;
};

/* Partner logos live in /public/images/partners */
const partnerLogos = [
  "hcl.png",
  "goa super cup.png",
  "yenepoya.png",
  "GIVING-BACK-LOGO.png",
  "Stairs Corporate Deck (1).png",
  "Stairs Corporate Deck (2).png",
  "gosports_foundation_logo.png",
  "Stairs Corporate Deck (4).png",
  "bangaluru united.png",
  "CABILOGO.png",
  "Stairs Corporate Deck (5).png",
  "football school of india.png",
  "Stairs Corporate Deck (7).png",
  "Stairs Corporate Deck (8).png",
  "WeWork.png",
  "iBUS.png",
  "beyond.png",
].map((file) => `/images/partners/${encodeURIComponent(file)}`);

const features = [
  { icon: "fas fa-medal", title: "Ironman & World Major Marathon Runners", text: "Enhance endurance, prevent injuries, and optimize performance" },
  { icon: "fas fa-running", title: "Runners & Endurance Athletes", text: "Improve mobility, speed recovery, and build strength" },
  { icon: "fas fa-dumbbell", title: "Athletes & Fitness Enthusiasts", text: "Stay injury-free and perform better" },
  { icon: "fas fa-film", title: "Film Industry Professionals", text: "Recover, move better, and prevent injuries" },
  { icon: "fas fa-briefcase", title: "Corporate Leaders & Professionals", text: "Beat posture-related pain and stress" },
  { icon: "fas fa-landmark", title: "Politicians & Public Figures", text: "Stay active and energized for demanding schedules" },
];

const services = [
  { href: "/services/advanced-physiotherapy", bg: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')", vertical: "Physiotherapy & Rehabilitation", icon: "fas fa-notes-medical", title: "Physiotherapy & Rehabilitation", desc: "Pain Management, Prehab & Rehab, Post-Surgical Rehabilitation" },
  { href: "/services/sports-rehab-injury-prevention", bg: "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80')", vertical: "Sports Rehab & Injury Prevention", icon: "fas fa-shield-alt", title: "Sports Rehab & Injury Prevention", desc: "Get back to peak performance safely" },
  { href: "/services/strength-conditioning", bg: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80')", vertical: "Strength & Conditioning", icon: "fas fa-dumbbell", title: "Strength & Conditioning", desc: "Custom fitness programs for endurance and strength" },
  
  { href: "/services/manual-therapy-dry-needling", bg: "url('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80')", vertical: "Manual Therapy, Dry Needling, Cupping", icon: "fas fa-hands", title: "Manual Therapy, Dry Needling, Cupping", desc: "Hands-on techniques for faster healing" },
  { href: "/services/myofascial-release", bg: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80')", vertical: "Myofascial Release Therapy (MFR)", icon: "fas fa-hand-holding-heart", title: "Myofascial Release Therapy (MFR)", desc: "Relieving muscle tightness and improving mobility" },
  { href: "/services/prehab-wellness-programs", bg: "url('https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&q=80')", vertical: "Massage Therapy", icon: "fas fa-spa", title: "Massage Therapy", desc: "Deep tissue and sports massage for recovery" },
  
  { href: "/services/nutrition-support", bg: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80')", vertical: "Nutrition Support", icon: "fas fa-apple-alt", title: "Nutrition Support", desc: "Personalized guidance to fuel recovery and performance" },
  { href: "/services/running-rehab-performance-training", bg: "url('https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80')", vertical: "Running Rehab & Performance Training", icon: "fas fa-running", title: "Running Rehab & Performance Training", desc: "Injury prevention and strength sessions for all levels, from beginners to Ironman & World Major Marathon athletes." },
];

type ProgramSlide = { title: string; sub: string; detail: string; bg: string };
type ProgramCardData = { title: string; subtitle?: string; icon: string; features: string[]; slides: ProgramSlide[] };

/* Programme cards on the home page. A card with a single slide renders with no slider. */
const programCards: ProgramCardData[] = [
  {
    title: "Online Strength Training",
    subtitle: "What's Included",
    icon: "fas fa-dumbbell",
    features: ["Personalized training plan", "One-to-one online coaching sessions", "Exercise technique and movement guidance", "Progressive strength and conditioning", "Training adjustments based on your progress"],
    slides: [{ title: "ONLINE", sub: "STRENGTH TRAINING", detail: "One-to-one online coaching", bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" }],
  },
  {
    title: "Online Group Sessions",
    subtitle: "What's Included",
    icon: "fas fa-users",
    features: ["Live coach-led group sessions", "Structured strength and conditioning workouts", "Exercise demonstrations and coaching cues", "A supportive group training environment", "Consistent training with a shared goal"],
    slides: [{ title: "ONLINE", sub: "GROUP SESSIONS", detail: "Live coach-led sessions", bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" }],
  },
  {
    title: "Massage Therapy",
    subtitle: "Feel Better, Move Better",
    icon: "fas fa-spa",
    features: ["Personalised Massage Therapy", "Sports and deep tissue massage", "Full-body relaxation massage", "Muscle tension relief", "Post-exercise recovery massage"],
    slides: [{ title: "MASSAGE", sub: "THERAPY", detail: "Feel Better, Move Better", bg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80" }],
  },
  {
    title: "Fit2Run",
    subtitle: "Step Into A New You",
    icon: "fas fa-running",
    features: ["Structured running Training", "Strength & conditioning for runners", "Running movement assessment", "Injury prevention & load management", "Nutrition and Recovery"],
    slides: [
      { title: "EXPERIENCE", sub: "TRAIL & ROAD RUNNING", detail: "Build endurance, conquer every terrain", bg: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80" },
      { title: "RUNNING", sub: "COACHED SESSIONS", detail: "Structured running training", bg: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80" },
      { title: "LEVELS", sub: "ALL ABILITIES WELCOME", detail: "Beginner to advanced programs", bg: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80" },
      { title: "BEST TEAM", sub: "EXPERT COACHES", detail: "Physiotherapists & conditioning coaches", bg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80" },
    ],
  },
  {
    title: "Hybrid Training",
    icon: "fas fa-dumbbell",
    features: ["Hyrox specific training", "Running & functional fitness", "Strength & conditioning", "Endurance & work capacity", "Race simulations & performance preparation"],
    slides: [
      { title: "HYROX", sub: "SPECIFIC TRAINING", detail: "Race simulations & performance preparation", bg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" },
      { title: "RUNNING", sub: "& FUNCTIONAL FITNESS", detail: "Endurance & work capacity", bg: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80" },
      { title: "STRENGTH", sub: "& CONDITIONING", detail: "Build strength for race day", bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" },
    ],
  },
];

const pricingPlans = [
  {
    price: "$50", title: "Standard Gym", featured: true,
    features: ["Unlimited club access", "Group attendance", "Gym visits", "Visits to the bath complex", "Gym fight club"]
  },
  {
    price: "$60", title: "Premium Gym", featured: false,
    features: ["Unlimited club access", "Group attendance", "Gym visits", "Visits to the bath complex", "Gym fight club"]
  },
];


/* Client gallery. Photos not yet in /public/images/gallery/ fall back to an initials tile. */
const galleryClients = [
  { name: "Yasmeen Shaikh", role: "Indian badminton player", img: "/images/clients/Stairs Corporate Deck.png" },
  { name: "Yash Gowda", role: "Indian Actor", img: "/images/clients/Stairs Corporate Deck (5).png" },
  { name: "Deepika Padukone", role: "Indian Actress", img: "/images/clients/Stairs Corporate Deck (6).png" },
  { name: "Bhavish Aggarwal", role: "OLA Co-Founder", img: "/images/clients/bhavesh agarwal.png" },
  { name: "Anand Dayal Dadu", role: "Anand Sweets Founder", img: "/images/clients/Anand.png" },
  { name: "Tejasvi Surya", role: "MP, Bengaluru South & Ironman triathlete", img: "/images/clients/Stairs Corporate Deck (1).png" },
  { name: "Jacqueline Fernandez", role: "Indian Actress", img: "/images/clients/Stairs Corporate Deck (2).png" },
  { name: "Prakash Padukone", role: "Former Indian badminton player", img: "/images/clients/Prakash.png" },
  { name: "Anish Sood", role: "Businessman & Ironman, Bergman Triathlete", img: "/images/clients/Stairs Corporate Deck (4).png" },
  { name: "Pankaj Advani", role: "Indian Billiards Champion", img: "/images/clients/Stairs Corporate Deck (7).png" },
  { name: "Rakul Preet", role: "Indian Actress", img: "/images/clients/Stairs Corporate Deck (8).png" },
  { name: "Neha Shetty", role: "Indian Actress", img: "/images/Neha.png" },
  { name: "Allu Sirish", role: "Indian Actor", img: "/images/Allu.png" },
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
        const targetEl = entry.target as HTMLElement; if (entry.isIntersecting && !targetEl.dataset.counted && !targetEl.dataset.static) {
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
    { href: "/trainers", label: "Team" },
    { href: "/pricing", label: "Program" },
    { href: "/coming-soon", label: "Initiatives" },
  ];

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        <Image src="/logo.png" alt="Stairs" width={140} height={70} style={{ height: 70, width: "auto" }} priority />
      </div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
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
    { label: "Physiotherapy and Fitness", title: "MOVE BETTER,\nRECOVER\nSTRONGER", desc: "Physiotherapy, rehabilitation and strength training to help you recover from injuries, move with confidence, and get back to what you love." },
    { label: "Strength & Conditioning", title: "BUILD STRENGTH,\nIMPROVED\nPERFORMANCE", desc: "Structured training to build strength, improve fitness, and prepare your body for the demands of everyday life and sport." },
    { label: "Movement & Rebuild", title: "RECOVERY &\nRESTORE", desc: "Structured training to build strength, improve fitness, and prepare your body for the demands of everyday life and sport." },
    { label: "Community & Movement", title: "MORE THAN\nMOVEMENT", desc: "From running communities to fitness initiatives and educational workshops, we bring people together through movement, learning, and a shared commitment to better health." },
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let innerTimer: ReturnType<typeof setTimeout>;
    const pause = setTimeout(() => {
      setVisible(false);
      innerTimer = setTimeout(() => {
        setIdx((i) => (i + 1) % slides.length);
        setVisible(true);
      }, 500);
    }, 5500);
    return () => {
      clearTimeout(pause);
      clearTimeout(innerTimer);
    };
  }, [idx]);

  const s = slides[idx];

  return (
    <section id="hero">
      <div className="hero-bg-img" />
      <div className="circle-deco hero-circle" />
      <div className="hero-3d-scene">
        <svg width="520" height="520" viewBox="-40 -40 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          style={{ transitionDelay: "0.16s", transition: "opacity 0.5s, transform 0.5s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          {s.desc}
        </p>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              suppressHydrationWarning
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
            <a href="#services" className="glow-btn-inner">Join Us Now</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



/* ─── Partner logo (sits directly on the black section background) ─── */
function PartnerLogo({ src }: { src: string }) {
  return (
    <div className="org-card">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image src={src} alt="Partner logo" fill sizes="190px" style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
}

/* ─── Organisations ─── */
function Organisations() {
  // `steps` = how many slider positions are actually reachable (the row can't scroll past its end)
  const [steps, setSteps] = useState(partnerLogos.length);
  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const n = (i + steps) % steps;
    setIdx(n);
    const el = wrapRef.current;
    const card = el?.firstElementChild?.children[n] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const t = setTimeout(() => goTo(idx + 1), 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, steps]);

  useEffect(() => {
    const calc = () => {
      const el = wrapRef.current;
      const cards = el?.firstElementChild?.children;
      if (!el || !cards) return;
      const max = el.scrollWidth - el.clientWidth;
      let n = 0;
      for (let i = 0; i < cards.length; i++) {
        n = i + 1;
        if ((cards[i] as HTMLElement).offsetLeft >= max) break;
      }
      const next = Math.max(1, n);
      setSteps(next);
      setIdx((i) => (i >= next ? 0 : i));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
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
            <h2 className="section-title org-title-line1">
              
            </h2>
            <h2 className="section-title org-title-line2">Organisations</h2>
            <h2 className="section-title org-title-line3">We Have Worked With</h2>
          </motion.div>
        </div>
      </div>
      <div className="org-carousel reveal">
      <button type="button" className="org-arrow left" aria-label="Previous" onClick={() => goTo(idx - 1)}><i className="fas fa-chevron-left" /></button>
      <button type="button" className="org-arrow right" aria-label="Next" onClick={() => goTo(idx + 1)}><i className="fas fa-chevron-right" /></button>
      <div className="org-track-wrapper" ref={wrapRef}>
        <div className="org-track">
          {partnerLogos.map((src, i) => (
            <PartnerLogo key={i} src={src} />
          ))}
        </div>
      </div>
      <div className="org-dots">
        {Array.from({ length: steps }, (_, i) => (
          <button key={i} type="button" aria-label={`Show logo ${i + 1}`} className={`org-dot${i === idx ? " active" : ""}`} onClick={() => goTo(i)} />
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
        <h2 className="section-title reveal">Transforming Lives <span className="accent">Across Industries</span></h2>
        <p className="why-sub reveal">With 10,000+ success stories over 8+ years, we’ve helped:</p>
      </div>
      <div className="features-grid stagger">
        {features.map((f, i) => (
          <div className="feature-card reveal" key={i}>
            <div className="icon-wrap"><i className={f.icon} /></div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>

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
            {/* Center everything at 210,240 */}
            <g transform="translate(210,240)">
              {/* glow blob */}
              <ellipse cx="0" cy="0" rx="160" ry="170" fill="url(#aGlow)"/>
              {/* orbit rings */}
              <circle cx="0" cy="0" r="155" stroke="#e8372c" strokeWidth="1" strokeDasharray="6 12" opacity="0.2" style={{animation:"spin-ring 22s linear infinite",transformOrigin:"0px 0px"}}/>
              <circle cx="0" cy="0" r="125" stroke="#ff6a00" strokeWidth="1" strokeDasharray="3 16" opacity="0.15" style={{animation:"spin-ring 32s linear infinite reverse",transformOrigin:"0px 0px"}}/>
              {/* orbiting dots */}
              <g style={{animation:"orbit 8s linear infinite",transformOrigin:"0px 0px"}}>
                <circle cx="0" cy="-155" r="9" fill="#e8372c"/>
                <rect x="-6" y="-158" width="12" height="6" rx="3" fill="#fff" opacity="0.6"/>
              </g>
              <g style={{animation:"orbit2 12s linear infinite",transformOrigin:"0px 0px"}}>
                <circle cx="0" cy="-125" r="7" fill="#ff6a00"/>
              </g>
              <g style={{animation:"orbit3 16s linear infinite",transformOrigin:"0px 0px"}}>
                <circle cx="0" cy="-95" r="5" fill="#fff" opacity="0.5"/>
              </g>
              {/* athlete silhouette — translated so it sits centred at 0,0 */}
              <g style={{animation:"bob 4s ease-in-out infinite",transformOrigin:"0px 60px"}}>
                {/* head (was at cx=210,cy=130 → shift by -210,-240 → cx=0,cy=-110) */}
                <circle cx="0" cy="-110" r="30" fill="url(#aBody)" stroke="#e8372c" strokeWidth="2"/>
                <circle cx="0" cy="-110" r="20" fill="#2a2a2a"/>
                {/* body */}
                <path d="M-32 -78 Q0 -85 32 -78 L42 20 Q0 35 -42 20 Z" fill="url(#aBody)" stroke="#333" strokeWidth="1"/>
                {/* red chest stripe */}
                <path d="M-20 -70 Q0 -75 20 -70 L18 -30 Q0 -22 -18 -30 Z" fill="#e8372c" opacity="0.7"/>
                {/* left arm curling dumbbell */}
                <path d="M-32 -65 Q-62 -45 -72 -10" stroke="#555" strokeWidth="16" strokeLinecap="round" fill="none"/>
                <path d="M-32 -65 Q-62 -45 -72 -10" stroke="#e8372c" strokeWidth="2" fill="none"/>
                {/* dumbbell left hand */}
                <rect x="-87" y="-16" width="9" height="16" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
                <rect x="-83" y="-20" width="5" height="24" rx="2" fill="#333"/>
                <rect x="-78" y="-16" width="9" height="16" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
                {/* right arm raised */}
                <path d="M32 -65 Q62 -85 68 -120" stroke="#555" strokeWidth="16" strokeLinecap="round" fill="none"/>
                <path d="M32 -65 Q62 -85 68 -120" stroke="#e8372c" strokeWidth="2" fill="none"/>
                {/* dumbbell right hand */}
                <rect x="58" y="-132" width="9" height="16" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
                <rect x="62" y="-136" width="5" height="24" rx="2" fill="#333"/>
                <rect x="71" y="-132" width="9" height="16" rx="3" fill="#444" stroke="#e8372c" strokeWidth="1.5"/>
                {/* legs */}
                <path d="M-18 18 L-28 120 L-10 122 L0 60 L10 122 L28 120 L18 18 Z" fill="url(#aBody)" stroke="#333" strokeWidth="1"/>
                {/* shoes */}
                <ellipse cx="-20" cy="124" rx="16" ry="7" fill="#222" stroke="#e8372c" strokeWidth="1.5"/>
                <ellipse cx="20" cy="124" rx="16" ry="7" fill="#222" stroke="#e8372c" strokeWidth="1.5"/>
              </g>
              {/* spark particles */}
              {[{x:-110,y:-80,d:"0s"},{x:110,y:-60,d:"1s"},{x:-130,y:80,d:"1.8s"},{x:130,y:100,d:"0.5s"},{x:-50,y:160,d:"2.2s"}].map((p,i)=>(
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ff6a00" style={{animation:`pulse-ring 3s ease-in-out infinite ${p.d}`,transformOrigin:`${p.x}px ${p.y}px`}}/>
              ))}
            </g>
          </svg>
        </div>
      </div>
      <div className="about-content reveal-right">
        <span className="section-label">About Us</span>
        <h2 className="section-title">Welcome To The<br />Stairs</h2>
        <p>
              At Stairs Physiotherapy & Fitness, we’ve helped 10,000+ clients over the last 8+ years live pain-free, move better, and enhance their performance. From athletes to working professionals, we have transformed lives by focusing on injury recovery, movement correction, strength building, and long-term wellness.
              With 5 branches across Bengaluru – Ulsoor, Koramangala, Indiranagar, Whitefield and New BEL Road – we are committed to making quality physiotherapy and fitness accessible to everyone. Whether you want to recover from pain, prevent injuries, or improve performance, we are here to support your journey toward a stronger, healthier lifestyle.
        </p>
        <div className="stats-grid stagger">
          <div className="stat-item reveal"><h3>10000+</h3><p>Clients Supported</p></div>
          <div className="stat-item reveal"><h3>500+</h3><p>Amateur Athletes Across Sports</p></div>
          <div className="stat-item reveal"><h3>5</h3><p>Centres Across Bengaluru</p></div>
          <div className="stat-item reveal"><h3 data-static="true">2018</h3><p>Our Journey Began</p></div>
        </div>
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
  const bookRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On phones the services are a horizontal row: bring card `i` into view
  const scrollToCard = (i: number) => {
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 768px)").matches) return;
    const el = bookRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const left = el.scrollLeft + card.getBoundingClientRect().left - el.getBoundingClientRect().left - 18;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIdxRef.current + 1) % services.length;
      activeIdxRef.current = next;
      setActiveIdx(next);
      scrollToCard(next);
    }, 3000);
  };

  // Pause auto-scroll while the visitor is touching/swiping, resume a moment after
  const pauseForTouch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
  };
  const resumeAfterTouch = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => {
      const el = bookRef.current;
      if (el) {
        const elLeft = el.getBoundingClientRect().left;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const d = Math.abs(c.getBoundingClientRect().left - elLeft - 18);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        activeIdxRef.current = best;
        setActiveIdx(best);
      }
      startCycle();
    }, 3500);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
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
        <h2 className="section-title">Move Better. Feel Stronger. Perform Better.</h2>
      </div>
      <div className="services-book stagger" id="serviceDetails" ref={bookRef} onTouchStart={pauseForTouch} onTouchEnd={resumeAfterTouch} onTouchCancel={resumeAfterTouch}>
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
            </span>
          </a>
        ))}
      </div>
      <div className="services-join reveal">
        <div className="glow-btn-wrap">
          <a href="/services" className="glow-btn-inner">
            Go To Services <span className="play-icon"><i className="fas fa-arrow-right" /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Instagram reels shown beside the testimonials ─── */
function InstagramReels() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!instagramWidget) return;
    const src = instagramWidget.provider === "behold" ? "https://w.behold.so/widget.js" : "https://elfsightcdn.com/platform.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    if (instagramWidget.provider === "behold") s.type = "module";
    document.body.appendChild(s);
  }, []);

  if (instagramWidget) {
    return (
      <div className="insta-wrap">
        <span className="insta-label"><i className="fab fa-instagram" /> Follow us on Instagram</span>
        <div className="insta-widget">
          {instagramWidget.provider === "behold"
            ? createElement("behold-widget", { "feed-id": instagramWidget.id })
            : <div className={`elfsight-app-${instagramWidget.id}`} data-elfsight-app-lazy />}
        </div>
      </div>
    );
  }

  const embeds = instagramReels.map(instaEmbedUrl).filter((u): u is string => !!u);
  const scrollRow = (dir: number) => rowRef.current?.scrollBy({ left: dir * 270, behavior: "smooth" });
  return (
    <div className="insta-wrap">
      <span className="insta-label"><i className="fab fa-instagram" /> Follow us on Instagram</span>
      <div className="insta-slider">
        <button type="button" className="insta-arrow left" aria-label="Scroll left" onClick={() => scrollRow(-1)}><i className="fas fa-chevron-left" /></button>
        <div className="insta-row" ref={rowRef}>
          {embeds.length > 0 ? (
            embeds.map((src) => (
              <div className="insta-frame" key={src}>
                <iframe src={src} title="Instagram reel" loading="lazy" allow="encrypted-media; autoplay; clipboard-write" allowFullScreen scrolling="no" />
              </div>
            ))
          ) : (
            /* No reel links added yet: show the live Instagram profile feed instead */
            <div className="insta-frame profile">
              <iframe src={`https://www.instagram.com/${instagramHandle}/embed`} title="Stairs on Instagram" loading="lazy" scrolling="yes" />
            </div>
          )}
        </div>
        <button type="button" className="insta-arrow right" aria-label="Scroll right" onClick={() => scrollRow(1)}><i className="fas fa-chevron-right" /></button>
      </div>
    </div>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [imgFade, setImgFade] = useState(true);
  const changeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeTo = (newIdx: number) => {
    setFade(false);
    setImgFade(false);
    if (changeTimerRef.current) clearTimeout(changeTimerRef.current);
    changeTimerRef.current = setTimeout(() => {
      setIdx(newIdx);
      setFade(true);
      setImgFade(true);
    }, 300);
  };

  const next = () => changeTo((idx + 1) % testimonials.length);
  const prev = () => changeTo((idx - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => {
      clearInterval(timer);
      if (changeTimerRef.current) clearTimeout(changeTimerRef.current);
    };
  }, [idx]);

  const t = testimonials[idx];
  return (
    <section id="testimonials">
      <div className="testimonials-bg" />
      {/* ── Instagram reels (right side). Add links to `instagramReels` at the top of the file ── */}
      <div className="testi-scene insta-scene">
        <InstagramReels />
      </div>
      <div className="testimonial-content reveal-left">
        <div className="testi-profile-wrap">
          <div className="testi-heading-text">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Clients<br />Say About Us</h2>
          </div>
          <Image
            src={t.img}
            alt={t.name}
            width={170}
            height={170}
            className={`testi-profile-img${imgFade ? "" : " faded"}`}
          />
        </div>
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

/* ─── Programme Card (home) ─── */
function ProgramCard({ data }: { data: ProgramCardData }) {
  const { slides } = data;
  const multi = slides.length > 1;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!multi) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3200);
    return () => clearInterval(t);
  }, [multi, slides.length]);

  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx((i) => (i + 1) % slides.length);

  return (
    <div className="prog-card reveal">
      <div className="prog-slider">
        {slides.map((s, i) => (
          <div key={i} className={`prog-slide${idx === i ? " active" : ""}`}>
            <div className="prog-slide-bg" style={{ backgroundImage: `url('${s.bg}')` }} />
            <div className="prog-slide-content">
              <h4>{s.title}<span>{s.sub}</span></h4>
              <p><i className={data.icon} style={{ marginRight: 5, color: "#e8372c" }} />{s.detail}</p>
            </div>
          </div>
        ))}
        {multi && (
          <>
            <button className="prog-arr left" onClick={prev}><i className="fas fa-chevron-left" /></button>
            <button className="prog-arr right" onClick={next}><i className="fas fa-chevron-right" /></button>
            <div className="prog-nav">
              {slides.map((_, i) => (
                <button key={i} className={`prog-dot${idx === i ? " active" : ""}`} onClick={() => setIdx(i)} />
              ))}
            </div>
          </>
        )}
      </div>
      <a href="/pricing" className="prog-body">
        <h3>{data.title}</h3>
        {data.subtitle && <span className="prog-sub">{data.subtitle}</span>}
        <ul>
          {data.features.map((f, i) => (
            <li key={i}><i className="fas fa-check" />{f}</li>
          ))}
        </ul>
      </a>
    </div>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section id="pricing">
      <div className="pricing-header">
        <span className="section-label reveal">Program Tables</span>
        <h2 className="section-title reveal">our programs</h2>
      </div>
      <div className="pricing-grid stagger">
        {programCards.map((c) => (
          <ProgramCard key={c.title} data={c} />
        ))}
        {/* hidden – kept for data ref */}
        {pricingPlans.slice(2).map((plan, i) => (
          <div className="pricing-card reveal" key={i}>
            <div className="card-img">
              <div className="img-placeholder"><i className="fas fa-image" />{plan.title}</div>
              <div className="price-badge">{plan.price}<small>Monthly</small></div>
            </div>
            <div className="pricing-body">
              <h3>{plan.title}</h3>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j}><i className="fas fa-check" /> {f}</li>
                ))}
              </ul>
              <a href="/contact" className="btn-outline">Join now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Client Gallery ─── */
function ClientGallery() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const touchX = useRef<number | null>(null);
  const total = galleryClients.length;
  const go = (d: number) => setCurrent((c) => (c + d + total) % total);

  // auto-advance every 3.5s (matches the progress bar animation); paused while hovering
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % total), 3500);
    return () => clearTimeout(t);
  }, [current, paused, total]);

  const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

  const renderPhoto = (c: (typeof galleryClients)[number], sizes: string) =>
    failed[c.img] ? (
      <div className="g-fallback"><span>{initials(c.name)}</span></div>
    ) : (
      <Image
        src={c.img}
        alt={c.name}
        fill
        sizes={sizes}
        className="g-photo"
        onError={() => setFailed((f) => ({ ...f, [c.img]: true }))}
      />
    );

  return (
    <section id="gallery">
      <div className="gallery-layout">
      <div className="gallery-text">
      <span className="section-label reveal">Our Clients</span>
      <h2 className="section-title reveal">Who We&apos;ve Worked With</h2>
      <p className="gallery-intro reveal">
        At Stairs Physiotherapy &amp; Fitness, we take pride in helping people from all walks of life move pain-free, recover faster, and perform at their best. Over the past 8+ years, we&apos;ve worked with:
      </p>
      </div>
      <div className="gallery-visual">
      <div
        className="gallery-stage reveal"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
        onTouchEnd={(e) => {
          if (touchX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }
          touchX.current = null;
          setPaused(false);
        }}
      >
        <div className="gallery-deck">
          {galleryClients.map((c, i) => {
            const pos = (i - current + total) % total;
            const state = pos <= 3 ? String(pos) : pos === total - 1 ? "gone" : "hidden";
            return (
              <div
                key={c.name}
                className="deck-card"
                data-pos={state}
                aria-hidden={pos !== 0}
                onClick={() => (pos === 0 ? go(1) : pos <= 3 ? setCurrent(i) : undefined)}
              >
                {renderPhoto(c, "(max-width: 768px) 78vw, 380px")}
                <span className="g-overlay" />
                <span className="deck-count">{String(i + 1).padStart(2, "0")} / {total}</span>
                <span className="g-caption">
                  <h4>{c.name}</h4>
                  <p>{c.role}</p>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="gallery-controls">
        <button type="button" className="gallery-arrow" aria-label="Previous" onClick={() => go(-1)}>
          <i className="fas fa-chevron-left" />
        </button>
        <div className="gallery-dots">
          {galleryClients.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-label={`Show ${c.name}`}
              className={`gallery-dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button type="button" className="gallery-arrow" aria-label="Next" onClick={() => go(1)}>
          <i className="fas fa-chevron-right" />
        </button>
      </div>
      <div className="deck-progress"><span key={`${current}-${paused}`} className={paused ? "paused" : ""} /></div>
      </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const parallaxRef = useParallax(0.05);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
          </div>
          <div className="form-row single">
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
          </div>
          {status === "error" && (
            <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginBottom: 8 }}>
              {!form.name || !form.email || !form.message
                ? "Please fill in Name, Email and Message."
                : "Something went wrong. Please try again."}
            </p>
          )}
          {status === "success" && (
            <p style={{ color: "#4caf50", fontSize: "0.85rem", marginBottom: 8 }}>
              ✓ Message sent! We&apos;ll get back to you soon.
            </p>
          )}
          <div className="form-submit">
            <button className="btn-primary" type="button" onClick={handleSubmit} disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send"}
              {status !== "loading" && <span className="play-icon"><i className="fas fa-play" /></span>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Blog Modal ─── */
function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="blog-modal-backdrop" onClick={onClose}>
      <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="blog-modal-header" style={{ backgroundImage: `url('${post.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="blog-modal-header-bg" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)' }}>STAIRS</div>
          <button className="blog-modal-close" onClick={onClose}>
            <i className="fas fa-times" />
          </button>
          <div className="blog-modal-meta">
            <span className="blog-modal-cat">{post.category}</span>
            <span className="blog-modal-date-badge">{post.date} {post.month}</span>
            <span className="blog-modal-readtime"><i className="fas fa-clock" style={{ marginRight: 5 }} />{post.readTime}</span>
          </div>
        </div>

        {/* Body */}
        <div className="blog-modal-body">
          <h2 className={`blog-modal-title${post.featured ? " featured" : ""}`}>{post.title}</h2>
          <div className="blog-modal-author">
            <div className="blog-modal-author-icon"><i className="fas fa-user" /></div>
            <span>By {post.author}</span>
          </div>
          <p className="blog-modal-content">{post.content}</p>
          <div className="blog-modal-footer">
            <a href="/contact" className="blog-modal-cta">
              Book a Session <i className="fas fa-arrow-right" />
            </a>
            <button className="blog-modal-back" onClick={onClose}>
              <i className="fas fa-arrow-left" /> Back to Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Blog ─── */
function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(blogPosts.length / perPage);

  return (
    <section id="blog">
      {activePost && <BlogModal post={activePost} onClose={() => setActivePost(null)} />}
      <div className="blog-header">
        <span className="section-label">Our News</span>
        <h2 className="section-title">Latest Blog Posts</h2>
      </div>
      <div className="blog-grid stagger">
        {blogPosts.map((post, i) => (
          <div
            className={`blog-card${post.featured ? " featured" : ""}${Math.floor(i / perPage) === page ? "" : " off-page"}`}
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => setActivePost(post)}
          >
            <div className="blog-img" style={{ backgroundImage: `url('${post.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="date-badge">{post.date}<small>{post.month}</small></div>
            </div>
            <div className="blog-body">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-nav">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={{ opacity: page === 0 ? 0.35 : 1, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <i className="fas fa-chevron-left" />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            style={{
              background: i === page ? 'var(--red)' : 'var(--dark)',
              width: 40, height: 40,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700, color: 'var(--light)'
            }}
          >{i + 1}</button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          style={{ opacity: page === totalPages - 1 ? 0.35 : 1, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </section>
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
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Organisations />
      <WhyChooseUs />
      <About />
      <Services />
      <Testimonials />
      <Pricing />
      <ClientGallery />
      <Contact />
      <Blog />
      <BranchesFooter />
    </>
  );
}
