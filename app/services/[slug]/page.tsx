"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import React from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  :root {
    --red: #e8372c; --dark: #111111; --darker: #0a0a0a; --light: #ffffff;
    --gray: #888888; --bg-light: #f5f5f5;
    --font-display: 'Bebas Neue', sans-serif; --font-body: 'Barlow', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); color: var(--dark); background: #ffffff; overflow-x: hidden; }
  a { text-decoration: none; color: inherit; }

  /* NAVBAR */
  #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; transition: background 0.4s, padding 0.4s; }
  #navbar.scrolled { background: rgba(10,10,10,0.95); padding: 12px 60px; backdrop-filter: blur(8px); }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--light); }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-links a { color: var(--light); font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; position: relative; transition: color 0.3s; }
  .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--red); transition: width 0.3s; }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
  .nav-links a.active, .nav-links a:hover { color: var(--red); }
  .nav-links .contact-btn { border: 2px solid var(--red); padding: 7px 20px; border-radius: 30px; color: var(--light); transition: background 0.3s; }
  .nav-links .contact-btn:hover { background: var(--red); color: #111; }
  .nav-links .contact-btn::after { display: none; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { display: block; width: 26px; height: 2px; background: var(--light); }

  /* PAGE HERO */
  .service-hero { position: relative; min-height: 55vh; background: var(--darker); display: flex; align-items: center; overflow: hidden; padding-top: 80px; }
  .service-hero-bg { position: absolute; inset: 0; background: url('/images/hero-bg.png') center/cover no-repeat; opacity: 0.3; }
  .service-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.95) 50%, rgba(10,10,10,0.4) 100%); }
  .service-hero-circle { position: absolute; border-radius: 50%; border: 20px solid var(--red); opacity: 0.6; width: 380px; height: 380px; right: 5%; top: 50%; transform: translateY(-50%); animation: spin-slow 20s linear infinite; }
  @keyframes spin-slow { to { transform: translateY(-50%) rotate(360deg); } }
  .service-hero-content { position: relative; z-index: 2; padding: 0 60px; }
  .service-hero-content .sub { font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 4px; color: var(--light); text-transform: uppercase; border-left: 4px solid var(--red); padding-left: 14px; margin-bottom: 16px; display: block; }
  .service-hero-content h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 5rem); color: var(--light); line-height: 1; letter-spacing: 2px; margin-bottom: 16px; }
  .service-hero-content .hero-desc { color: rgba(255,255,255,0.65); font-size: 1rem; max-width: 480px; line-height: 1.7; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.55); font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; margin-top: 16px; }
  .breadcrumb a { color: var(--red); }
  .breadcrumb span { color: rgba(255,255,255,0.4); }

  /* CONTENT — WHITE BACKGROUND */
  .service-content { padding: 80px 60px; background: #ffffff; }
  .service-content-inner { max-width: 1140px; margin: 0 auto; }

  /* INTRO BLOCK */
  .intro-block { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 80px; }
  .intro-block.reverse { direction: rtl; }
  .intro-block.reverse > * { direction: ltr; }
  .intro-text .tag { font-family: var(--font-body); font-weight: 700; font-size: 0.82rem; letter-spacing: 3px; text-transform: uppercase; color: var(--red); display: block; margin-bottom: 12px; }
  .intro-text h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.6rem); color: var(--dark); letter-spacing: 1px; text-transform: uppercase; line-height: 1.1; margin-bottom: 18px; }
  .intro-text .divider { width: 48px; height: 3px; background: var(--red); border-radius: 2px; margin-bottom: 20px; }
  .intro-text p { color: #444; font-size: 0.97rem; line-height: 1.85; margin-bottom: 14px; }
  .intro-img { border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
  .intro-img img { width: 100%; height: 380px; object-fit: cover; display: block; }

  /* FEATURE ROWS */
  .feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; padding: 60px 0; border-top: 1px solid #f0f0f0; }
  .feature-row.reverse { direction: rtl; }
  .feature-row.reverse > * { direction: ltr; }
  .feature-text h3 { font-family: var(--font-display); font-size: 1.7rem; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
  .feature-text p { color: #555; font-size: 0.95rem; line-height: 1.85; margin-bottom: 12px; }
  .feature-text ul { list-style: none; padding: 0; margin-top: 8px; }
  .feature-text ul li { display: flex; gap: 12px; align-items: flex-start; color: #444; font-size: 0.92rem; line-height: 1.7; margin-bottom: 12px; }
  .feature-text ul li::before { content: ''; display: block; flex-shrink: 0; width: 8px; height: 8px; margin-top: 7px; border-radius: 50%; background: var(--red); }
  .feature-img { border-radius: 14px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
  .feature-img img { width: 100%; height: 300px; object-fit: cover; display: block; }

  /* HIGHLIGHT STRIP */
  .highlight-strip { background: #f7f7f7; border-left: 5px solid var(--red); border-radius: 12px; padding: 28px 32px; margin: 40px 0; }
  .highlight-strip p { color: #333; font-size: 1rem; line-height: 1.8; font-style: italic; }

  /* BULLETS GRID */
  .bullets-section { background: #ffffff; padding: 70px 60px; }
  .bullets-section-inner { max-width: 1140px; margin: 0 auto; }
  .bullets-section .tag { color: var(--red); font-weight: 700; font-size: 0.82rem; letter-spacing: 3px; text-transform: uppercase; display: block; margin-bottom: 10px; }
  .bullets-section h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.4rem); color: var(--dark); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 40px; }
  .bullets-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .bullet-card { background: #f7f7f7; border: 1px solid #e8e8e8; border-radius: 14px; padding: 28px 24px; transition: border-color 0.3s, transform 0.3s; }
  .bullet-card:hover { border-color: var(--red); transform: translateY(-4px); }
  .bullet-card .b-icon { width: 46px; height: 46px; background: rgba(232,55,44,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .bullet-card .b-icon i { color: var(--red); font-size: 1.2rem; }
  .bullet-card h4 { font-family: var(--font-display); font-size: 1rem; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .bullet-card p { color: #555; font-size: 0.87rem; line-height: 1.7; }

  /* ACTION BAR */
  .action-bar { background: #ffffff; padding: 40px 60px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #eee; flex-wrap: wrap; gap: 16px; }
  .action-bar-text h3 { font-family: var(--font-display); font-size: 1.5rem; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; }
  .action-bar-text p { color: #666; font-size: 0.9rem; margin-top: 4px; }
  .action-bar-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-red { display: inline-flex; align-items: center; gap: 10px; background: var(--red); color: #fff; font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 13px 28px; border-radius: 50px; transition: background 0.3s, transform 0.2s; }
  .btn-red:hover { background: #c0251b; transform: translateY(-2px); }
  .btn-outline-dark { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: var(--dark); font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 13px 28px; border-radius: 50px; border: 2px solid #ccc; transition: border-color 0.3s, transform 0.2s; }
  .btn-outline-dark:hover { border-color: var(--dark); transform: translateY(-2px); }

  /* OTHER SERVICES */
  .other-services { padding: 60px 60px 80px; background: #0d0d0d; }
  .other-services-inner { max-width: 1140px; margin: 0 auto; }
  .other-services h2 { font-family: var(--font-display); font-size: 2rem; color: var(--light); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .other-services .label { color: var(--red); font-size: 0.85rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; display: block; margin-bottom: 10px; }
  .other-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; }
  .other-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px 22px; transition: border-color 0.3s, transform 0.3s; cursor: pointer; }
  .other-card:hover { border-color: var(--red); transform: translateY(-4px); }
  .other-card .icon { width: 44px; height: 44px; background: rgba(232,55,44,0.12); border-radius: 9px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
  .other-card .icon i { color: var(--red); font-size: 1.1rem; }
  .other-card h3 { font-family: var(--font-display); font-size: 1rem; color: var(--light); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  .other-card p { color: rgba(255,255,255,0.55); font-size: 0.82rem; }

  /* CTA */
  .service-cta { background: var(--red); padding: 70px 60px; text-align: center; }
  .service-cta h2 { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); color: var(--light); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }
  .service-cta p { color: rgba(255,255,255,0.85); font-size: 1rem; margin-bottom: 32px; }
  .service-cta .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-white { display: inline-flex; align-items: center; gap: 12px; background: #fff; color: var(--red); font-family: var(--font-body); font-weight: 700; font-size: 0.88rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 14px 32px; border-radius: 50px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
  .btn-white:hover { background: #f0f0f0; transform: translateY(-2px); }
  .btn-outline-white { display: inline-flex; align-items: center; gap: 12px; background: transparent; color: #fff; font-family: var(--font-body); font-weight: 700; font-size: 0.88rem; letter-spacing: 1.5px; text-transform: uppercase; padding: 14px 32px; border-radius: 50px; border: 2px solid rgba(255,255,255,0.7); cursor: pointer; transition: border-color 0.3s, transform 0.2s; }
  .btn-outline-white:hover { border-color: #fff; transform: translateY(-2px); }

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
  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 10px; font-size: 0.85rem; }
  .footer-col ul li::before { content: '▶'; font-size: 0.5rem; color: var(--red); margin-right: 8px; vertical-align: middle; }
  .footer-col ul li a { color: #aaa; transition: color 0.3s; }
  .footer-col ul li a:hover { color: var(--red); }
  .footer-contact .contact-item { display: flex; flex-direction: column; margin-bottom: 12px; }
  .footer-contact .contact-item strong { color: var(--light); font-size: 0.85rem; margin-bottom: 2px; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; text-align: center; font-size: 0.8rem; }

  @media (max-width: 1024px) {
    #navbar { padding: 16px 30px; } #navbar.scrolled { padding: 10px 30px; }
    .service-content, .other-services, .service-cta, .bullets-section, .action-bar { padding-left: 30px; padding-right: 30px; }
    .intro-block, .feature-row { grid-template-columns: 1fr; direction: ltr !important; }
    .intro-block.reverse, .feature-row.reverse { direction: ltr; }
    .bullets-grid { grid-template-columns: repeat(2, 1fr); }
    .other-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .action-bar { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; } .hamburger { display: flex; }
    .service-hero-content { padding: 0 20px; }
    .bullets-grid { grid-template-columns: 1fr; }
    .other-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    #footer { padding: 40px 20px 20px; }
    .service-content { padding: 50px 20px; }
  }
`;

interface ServiceSection {
  tag: string;
  heading: string;
  body: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  bullets?: string[];
}

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  heroImage: string;
  sections: ServiceSection[];
  keyPoints: { icon: string; title: string; desc: string }[];
}

const serviceDetails: Record<string, ServiceData> = {
  "bio-mechanical-assessment": {
    title: "Bio Mechanical Assessment",
    subtitle: "Body Assessment",
    description: "Biomechanics is a fancy term for the science of how and why your body moves the way that it does. We use biomechanics to determine the best way to complete movements and identify imbalances before they become bigger problems.",
    icon: "fas fa-ruler-horizontal",
    heroImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    sections: [
      {
        tag: "What Is It",
        heading: "Understanding Biomechanics",
        body: [
          "Biomechanics is a word you've probably heard if you have visited a physiotherapist before, but may not have understood what role it plays in your rehab and everyday life. Biomechanics is a fancy term for the science of how and why your body moves the way that it does.",
          "In a real life setting, we use biomechanics to determine the best way to complete movements and to understand the forces acting on your body during exercise and daily activities.",
        ],
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
        imageAlt: "Physiotherapist performing body assessment",
      },
      {
        tag: "The Examination",
        heading: "Biomechanical Examination",
        body: [
          "A physiotherapist would use an observation test to analyze and take their best understanding regarding differences in motion and imbalances which might be present. We measure your movements and imbalances to exact degrees.",
          "This allows us to spot even minor imbalances before they lead to larger problems — giving you the most complete picture of how your body currently moves.",
        ],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        imageAlt: "Assessment in progress",
        reverse: true,
      },
      {
        tag: "What to Expect",
        heading: "Your Assessment Session",
        body: [
          "Expect to move! The only way for a physio to know how you move is to watch and measure it. This means you should wear comfortable clothes and your favourite workout shoes.",
          "Also be prepared to answer questions about your life and potential problem areas — your work setup, how often you exercise, any concerns, past injuries, and areas of recurring pain.",
        ],
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        imageAlt: "Patient during physiotherapy session",
      },
    ],
    keyPoints: [
      { icon: "fas fa-search", title: "Motion Analysis", desc: "Detailed observation of movement patterns across all planes of motion" },
      { icon: "fas fa-ruler-combined", title: "Precise Measurement", desc: "We measure imbalances to exact degrees for accurate diagnosis" },
      { icon: "fas fa-shield-alt", title: "Injury Prevention", desc: "Spot minor issues before they escalate into serious problems" },
      { icon: "fas fa-clipboard-list", title: "Full History Review", desc: "Work setup, exercise habits, injury history, and recurring pain areas" },
      { icon: "fas fa-chart-line", title: "Personalised Plan", desc: "Findings used to build a training and recovery plan tailored to you" },
      { icon: "fas fa-user-md", title: "Expert Physio", desc: "Conducted by skilled physiotherapists with hands-on expertise" },
    ],
  },
  physiotherapy: {
    title: "Physiotherapy",
    subtitle: "Prehab / Rehab",
    description: "At Stairs, we are committed to bringing access to quality physio care through manual therapies and high-skilled practitioners. Our world-class therapists keep a strong focus on patient needs and deliver the highest level of care.",
    icon: "fas fa-notes-medical",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    sections: [
      {
        tag: "Rehabilitation",
        heading: "Rehabilitation & Recovery",
        body: [
          "Rehabilitation can reduce the impact of a broad range of health conditions, including diseases (acute or chronic), illnesses or injuries. It can also complement other health interventions, such as medical and surgical interventions, helping to achieve the best outcome possible.",
          "Common conditions include injuries and trauma, burns and fractures, spinal cord injuries, soft tissue injuries, birth defects, developmental disabilities, and chronic pain including back and neck pain.",
        ],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
        imageAlt: "Rehabilitation session",
      },
      {
        tag: "Prehabilitation",
        heading: "Prehabilitation Before Surgery",
        body: [
          "When most people think of Physical Therapy, they think of rehabilitation or rehab. Now many people are discovering the value of prehabilitation — visiting a Physical Therapist before a surgery or injury.",
          "Prehabilitation has been shown to reduce the recovery time period and complications after surgery. The general conditioning that can be incorporated into a Prehab program can offset some of the detrimental side effects of surgery so the patient is better prepared and can handle it.",
        ],
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        imageAlt: "Prehabilitation exercise",
        reverse: true,
      },
      {
        tag: "Kids & Sports",
        heading: "Kids' Programs & Sports Injury",
        body: [
          "Our physiotherapists are experienced at helping children remain motivated and positive towards their physiotherapy, believing children respond best to structured therapy in a play-based environment. In every program, we target balance skills, muscle strength, and functional motor performance.",
          "For sports injuries, athletes of all levels can rely on us to recover quickly. Some sports injuries can be prevented — poor training methods, lack of preparation, and inadequate warmup are common causes.",
        ],
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80",
        imageAlt: "Kids physiotherapy program",
      },
    ],
    keyPoints: [
      { icon: "fas fa-user-friends", title: "Geriatric Physiotherapy", desc: "For arthritis, osteoporosis, balance disorders, and hip or knee replacements" },
      { icon: "fas fa-running", title: "Rehabilitation", desc: "Injuries, trauma, spinal cord injuries, burns, fractures, and chronic pain" },
      { icon: "fas fa-dumbbell", title: "Prehabilitation", desc: "Reduce recovery time and complications before and after surgery" },
      { icon: "fas fa-child", title: "Kids' Programs", desc: "Balance, gross motor skills, functional mobility for children" },
      { icon: "fas fa-football-ball", title: "Sports Injury", desc: "Fractures, dislocations, sprains, strains, and overuse injuries" },
      { icon: "fas fa-hands", title: "Manual Therapy", desc: "Hands-on treatment to decrease pain and improve joint mobility" },
    ],
  },
  "strength-conditioning": {
    title: "Strength & Conditioning",
    subtitle: "Mobility / Strength",
    description: "Strength and Conditioning (S&C) is the selection and development of dynamic and static exercises used to improve physical performance. Whilst it originally benefited athletes, it is now widely used in both the sporting world and more generally.",
    icon: "fas fa-dumbbell",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    sections: [
      {
        tag: "Strength Training",
        heading: "Build Strength That Performs",
        body: [
          "S&C is used to develop every area of the body and improve the way a person moves, with the intention of enhancing sporting or physical performance.",
          "S&C means engaging in activity to improve performance and/or fitness; this is best accomplished by understanding the seven sports training principles: overload, reversibility, progression, individualisation, periodisation, and specificity.",
        ],
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80",
        imageAlt: "Strength training session",
      },
      {
        tag: "General Fitness",
        heading: "General Fitness for Everyone",
        body: [
          "General fitness training works towards broad goals of overall health and well-being, rather than narrow goals of sport competition, larger muscles or concerns over appearance.",
          "A regular moderate workout regimen and healthy diet can improve general appearance markers of good health such as muscle tone, healthy skin, hair and nails, while preventing age or lifestyle-related reductions in health and reducing the likelihood of cardiovascular diseases.",
        ],
        image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&q=80",
        imageAlt: "General fitness workout",
        reverse: true,
      },
      {
        tag: "Group Training",
        heading: "Train Together, Grow Stronger",
        body: [
          "Resistance training forms an essential component of any fitness program because it helps build lean muscle mass and bone density. Group strength-training classes offer guidance at a minimal cost to participants.",
          "Many people don't know where to begin when it comes to strength training and can't afford a personal trainer. Our group classes are fun, motivating and effective — designed for all fitness levels.",
        ],
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        imageAlt: "Group training class",
      },
    ],
    keyPoints: [
      { icon: "fas fa-dumbbell", title: "Strength Training", desc: "Develop every area of the body and enhance sporting performance" },
      { icon: "fas fa-heart", title: "General Fitness", desc: "Overall health, well-being, muscle tone, and cardiovascular fitness" },
      { icon: "fas fa-users", title: "Group Classes", desc: "Structured resistance sessions for all levels in a motivating environment" },
      { icon: "fas fa-chart-bar", title: "Periodised Programs", desc: "Built on overload, progression, individualisation, and specificity" },
      { icon: "fas fa-sync-alt", title: "Mobility Work", desc: "Flexibility and joint mobility integrated into every program" },
      { icon: "fas fa-trophy", title: "Performance Goals", desc: "Sport-specific conditioning tailored to your athletic goals" },
    ],
  },
  "myofascial-release": {
    title: "Myofascial Release",
    subtitle: "Treatment / Release",
    description: "Myofascial release is a soft tissue massage treatment to help increase myofascial mobility and reduce pain within the musculoskeletal system. Massage therapists working at STAIRS use MFR to treat many conditions.",
    icon: "fas fa-hand-holding-heart",
    heroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    sections: [
      {
        tag: "What Is MFR",
        heading: "Understanding Myofascial Release",
        body: [
          "Myofascial is connective tissue that is situated under the skin and surrounds muscle, bone, ligaments and tendons. Soft tissues in the body can become restricted due to injury, overuse, inactivity and result in pain, tension and reduced blood flow.",
          "Myofascial release is a slow, effective technique to relieve symptoms of fascia restrictions. MFR is used to treat symptoms with muscles, tendons, ligaments, fascia and nerves.",
        ],
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
        imageAlt: "Myofascial release treatment",
      },
      {
        tag: "Pain Relief",
        heading: "How MFR Reduces Pain",
        body: [
          "Myofascial release helps decrease pain by breaking through restrictions and relieving tightness. It increases blood flow and temperature of soft tissues which can also help reduce pain.",
          "MFR helps release restrictive tissues such as scar tissue. After injury, scar tissue can restrict the movement of fascia and cause pain — MFR helps loosen scar tissue and restore normal function of the tissue.",
        ],
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
        imageAlt: "Soft tissue massage treatment",
        reverse: true,
      },
      {
        tag: "Relaxation",
        heading: "MFR as a Relaxation Technique",
        body: [
          "Myofascial release is commonly used as a relaxation technique. It is performed in a slow and precise way. The slow movements of myofascial release across the skin can stimulate the parasympathetic nervous system.",
          "The nervous system controls emotions and produces feelings of calmness, making MFR beneficial not just physically but also for mental well-being and recovery.",
        ],
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        imageAlt: "Relaxation and wellness",
      },
    ],
    keyPoints: [
      { icon: "fas fa-wind", title: "Restore Soft Tissue Motion", desc: "Free and unimpeded motion of all soft tissues restored" },
      { icon: "fas fa-bolt", title: "Release Nerves & Lymphatics", desc: "Release of entrapped nerves, vasculature and lymphatics" },
      { icon: "fas fa-band-aid", title: "Scar Tissue Treatment", desc: "Break down scar tissue to restore normal fascia function" },
      { icon: "fas fa-tint", title: "Improve Blood Flow", desc: "Increases blood flow and temperature in soft tissues" },
      { icon: "fas fa-spa", title: "Deep Relaxation", desc: "Stimulates the parasympathetic nervous system for calm" },
      { icon: "fas fa-check-circle", title: "Treat Acute & Post-Surgery", desc: "Effective for acute pain, post injury, and post surgery care" },
    ],
  },
  "sports-specific-training": {
    title: "Sports Specific Training",
    subtitle: "Training Specific to Sport",
    description: "We've made sure that our sports health modules cover the whole spectrum, from the specific needs of athletes who represent their countries on the global stage, all the way to those seeking an active lifestyle.",
    icon: "fas fa-basketball-ball",
    heroImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
    sections: [
      {
        tag: "Athletics Program",
        heading: "Athletics Training Program",
        body: [
          "Stairs is one of the top athletic training centres that offers professional fitness training, sports injury management and athlete development programs. We have a dedicated team to offer end-to-end fitness and injury management.",
          "We've made sure that our sports health modules cover the whole spectrum, from the specific needs of athletes who represent their countries on the global stage, all the way to those seeking an active lifestyle.",
        ],
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
        imageAlt: "Athletics training program",
      },
      {
        tag: "Injury Management",
        heading: "Injury Management & Sports Fitness",
        body: [
          "If you are a sports enthusiast, or would like to take up a sport, we can help you step up your game and prevent injuries that can hold you back. If you've been unlucky enough to pick up an injury, we have the platinum standard evidence-based protocols to get you back in the park as soon as possible.",
          "Through our individualized programs based on thorough testing and scientific progression, you will have all the tools you need to improve your sports specific fitness.",
        ],
        image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&q=80",
        imageAlt: "Sports injury management",
        reverse: true,
      },
      {
        tag: "Elite Athletes",
        heading: "High-Performance Centre",
        body: [
          "Full time athletes are always pushing the envelope in the search for a competitive edge, which often leads to injuries. Our specialized programs are focused on injury-treatment and prevention, going all the way through to post-recovery performance enhancement.",
          "We continue to look after athletes through their entire season, off season and pre season, monitoring their workloads, adapting their training methods and programs to suit the requirement of the sport.",
        ],
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
        imageAlt: "High performance athlete training",
      },
    ],
    keyPoints: [
      { icon: "fas fa-medal", title: "Athletics Training", desc: "Professional fitness training and athlete development programs" },
      { icon: "fas fa-shield-alt", title: "Injury Prevention", desc: "Platinum standard evidence-based protocols to keep you safe" },
      { icon: "fas fa-chart-line", title: "Scientific Progression", desc: "Individualized programs based on thorough testing and data" },
      { icon: "fas fa-bolt", title: "High Performance", desc: "Specialized programs for full-time and elite-level athletes" },
      { icon: "fas fa-calendar-alt", title: "Season Monitoring", desc: "In-season, off-season, and pre-season workload management" },
      { icon: "fas fa-redo", title: "Post-Recovery", desc: "Performance enhancement after injury treatment and recovery" },
    ],
  },
  "group-session": {
    title: "Group Session",
    subtitle: "Runners, Triathlete or Any Sport",
    description: "Our group sessions bring together like-minded athletes in a high-energy, coach-led environment. Whether you're training for a marathon, triathlon, or simply want to get fitter with others — there's a place for you here.",
    icon: "fas fa-users",
    heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    sections: [
      {
        tag: "Why Group Training",
        heading: "Better Together",
        body: [
          "Training with others creates accountability, energy, and a sense of community that solo sessions simply can't replicate. Our group sessions are structured by experienced coaches who keep every workout purposeful, safe, and engaging.",
          "Whether you're a complete beginner or a seasoned competitor, our coaches scale the intensity to suit your level — so nobody gets left behind, and nobody holds back.",
        ],
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        imageAlt: "Group fitness session",
      },
      {
        tag: "What We Cover",
        heading: "Strength, Endurance & Mobility",
        body: [
          "Each session blends functional strength, cardiovascular conditioning, and mobility work — giving you a complete training stimulus in a single hour. Sessions are periodised across the week so you're always progressing, not just sweating.",
          "We cater to runners looking to build speed and resilience, triathletes preparing for multi-discipline events, and general fitness enthusiasts who want structure and variety in their weekly routine.",
        ],
        image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&q=80",
        imageAlt: "Endurance group training",
        reverse: true,
      },
      {
        tag: "Community",
        heading: "A Community That Pushes You",
        body: [
          "Some of the best gains come not from sets and reps, but from having people around you who push you further than you'd push yourself. Our group sessions foster a culture of encouragement, discipline, and mutual respect.",
          "Regular group training has been shown to improve adherence, boost motivation, and make exercise genuinely enjoyable — which is ultimately the foundation of long-term progress.",
        ],
        image: "https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=800&q=80",
        imageAlt: "Fitness community group",
      },
    ],
    keyPoints: [
      { icon: "fas fa-users", title: "All Levels Welcome", desc: "Sessions scaled for beginners through to competitive athletes" },
      { icon: "fas fa-running", title: "Runners & Triathletes", desc: "Structured endurance and strength work for multi-sport athletes" },
      { icon: "fas fa-dumbbell", title: "Functional Strength", desc: "Resistance and conditioning work in every session" },
      { icon: "fas fa-heartbeat", title: "Cardio Conditioning", desc: "Build aerobic capacity and stamina alongside your peers" },
      { icon: "fas fa-calendar-check", title: "Flexible Schedule", desc: "Multiple time slots throughout the week to suit your routine" },
      { icon: "fas fa-fire", title: "High Energy Coaching", desc: "Expert coaches who bring intensity, fun, and accountability" },
    ],
  },
};

const allServices = [
  { slug: "bio-mechanical-assessment", icon: "fas fa-ruler-horizontal", title: "Bio Mechanical Assessment", desc: "Body assessment" },
  { slug: "physiotherapy", icon: "fas fa-notes-medical", title: "Physiotherapy", desc: "Prehab / Rehab" },
  { slug: "strength-conditioning", icon: "fas fa-dumbbell", title: "Strength & Conditioning", desc: "Mobility / Strength" },
  { slug: "myofascial-release", icon: "fas fa-hand-holding-heart", title: "Myofascial Release", desc: "Treatment / Release" },
  { slug: "sports-specific-training", icon: "fas fa-basketball-ball", title: "Sports Specific Training", desc: "Training specific to sport" },
  { slug: "group-session", icon: "fas fa-users", title: "Group Session", desc: "Runners, triathlete or any sport" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" },
    { href: "/trainers", label: "Team" }, { href: "/pricing", label: "Program" }, { href: "/coming-soon", label: "Initiatives" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/services" ? "active" : ""}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <div className="logo"><div className="logo-icon"><i className="fas fa-dumbbell" /></div><span>Stairs</span></div>
          <p>Your trusted partner for biomechanical excellence, rehabilitation, and performance training.</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f" /></a><a href="#"><i className="fab fa-twitter" /></a><a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-col footer-hours">
          <h4>Opening Hours</h4>
          <p><strong style={{ color: "#ccc" }}>Monday – Saturday</strong><br />12:00 – 14:45</p><br />
          <p><strong style={{ color: "#ccc" }}>Sunday – Thursday</strong><br />17:30 – 00:00</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>{["about", "services", "trainers", "pricing", "contact"].map((l) => (<li key={l}><a href={`/${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>))}</ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne, 3000, Australia</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = serviceDetails[slug];
  if (!service) return notFound();

  const otherServices = allServices.filter((s) => s.slug !== slug);

  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar />

      {/* Hero */}
      <section className="service-hero">
        <div className="service-hero-bg" />
        <div className="service-hero-circle" />
        <div className="service-hero-content">
          <span className="sub">{service.subtitle}</span>
          <h1>{service.title.toUpperCase()}</h1>
          <p className="hero-desc">{service.description}</p>
          <div className="breadcrumb">
            <a href="/">Home</a><span>/</span>
            <a href="/services">Services</a><span>/</span>
            <span style={{ color: "#fff" }}>{service.title}</span>
          </div>
        </div>
      </section>

      {/* Main content — WHITE BACKGROUND */}
      <section className="service-content">
        <div className="service-content-inner">

          {/* Intro block with hero image */}
          <div className="intro-block">
            <div className="intro-text">
              <span className="tag">— {service.subtitle}</span>
              <h2>{service.title}</h2>
              <div className="divider" />
              <p>{service.description}</p>
            </div>
            <div className="intro-img">
              <img src={service.heroImage} alt={service.title} />
            </div>
          </div>

          {/* Feature rows with images */}
          {service.sections.map((sec, i) => (
            <div key={i} className={`feature-row${sec.reverse ? " reverse" : ""}`}>
              <div className="feature-text">
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--red)", display: "block", marginBottom: 8 }}>{sec.tag}</span>
                <h3>{sec.heading}</h3>
                {sec.body.map((para, j) => <p key={j}>{para}</p>)}
                {sec.bullets && (
                  <ul>
                    {sec.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
              </div>
              <div className="feature-img">
                <img src={sec.image} alt={sec.imageAlt} />
              </div>
            </div>
          ))}

          {/* Action bar */}
          <div className="action-bar" style={{ padding: "40px 0 0 0", borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 20 }}>
            <div className="action-bar-text">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--dark)", letterSpacing: 1, textTransform: "uppercase" }}>Ready to Get Started?</h3>
              <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 4 }}>Book a session today and take the first step.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/contact" className="btn-red">Book a Session</a>
              <a href="/services" className="btn-outline-dark">← All Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Points — dark strip */}
      <section className="bullets-section">
        <div className="bullets-section-inner">
          <span className="tag">What You Get</span>
          <h2>Key Benefits of {service.title}</h2>
          <div className="bullets-grid">
            {service.keyPoints.map((kp, i) => (
              <div key={i} className="bullet-card">
                <div className="b-icon"><i className={kp.icon} /></div>
                <h4>{kp.title}</h4>
                <p>{kp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <h2>Ready to Get Started?</h2>
        <p>Book a session today and take the first step toward moving better and feeling stronger.</p>
        <div className="cta-btns">
          <a href="/contact" className="btn-white">Book a Session</a>
          <a href="/services" className="btn-outline-white">View All Services</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
