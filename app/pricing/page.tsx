"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BranchesFooter from "@/components/BranchesFooter";
import Navbar from "@/components/SiteNav";

const APPLY_EMAIL = "info@stairsphysiotherapy.in";

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

  /* NAVBAR */
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

  /* PAGE HERO */
  #page-hero{position:relative;min-height:60vh;background:var(--darker);display:flex;align-items:center;overflow:hidden;padding-top:80px;}
  .page-hero-bg{position:absolute;inset:0;background:url('/images-optimized/2R5A9466.webp') center/cover no-repeat;opacity:.55;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,.85) 40%,rgba(10,10,10,.2) 100%);}
  .page-hero-content{position:relative;z-index:2;padding:0 60px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,6rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:14px;}
  .page-hero-content .tagline{font-family:var(--font-display);font-size:clamp(1.3rem,2.8vw,2rem);letter-spacing:3px;color:var(--red);text-transform:uppercase;margin-bottom:18px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  /* INTRO */
  #academy-intro{background:#fff;padding:90px 60px 80px;text-align:center;position:relative;}
  #academy-intro::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:80px;height:3px;background:var(--red);border-radius:2px;}
  #academy-intro .section-title{color:var(--dark);margin-bottom:24px;}
  #academy-intro p{color:#555;font-size:1.02rem;line-height:1.9;max-width:860px;margin:0 auto 18px;}
  #academy-intro p:last-child{margin-bottom:0;}
  #academy-intro p strong{color:var(--dark);}

  /* ACADEMY BLOCKS */
  .ac-block{display:grid;grid-template-columns:1fr 1fr;min-height:520px;position:relative;overflow:hidden;}
  .ac-block.reverse .ac-visual{order:2;}
  .ac-visual{position:relative;overflow:hidden;min-height:380px;background:linear-gradient(135deg,#1a0a08,#0a0a0a);display:flex;align-items:center;justify-content:center;}
  .ac-visual::before{content:'';position:absolute;top:-120px;left:-120px;width:420px;height:420px;border-radius:50%;border:40px solid rgba(232,55,44,.14);}
  .ac-visual::after{content:'';position:absolute;bottom:-140px;right:-100px;width:360px;height:360px;border-radius:50%;border:30px solid rgba(232,55,44,.1);}
  .ac-visual .ac-num{position:absolute;bottom:20px;left:30px;font-family:var(--font-display);font-size:8rem;line-height:1;color:rgba(232,55,44,.28);letter-spacing:-4px;user-select:none;}
  .ac-block.reverse .ac-visual .ac-num{left:auto;right:30px;}
  .ac-icon{position:relative;z-index:2;width:150px;height:150px;border-radius:50%;border:2px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;background:rgba(232,55,44,.12);}
  .ac-icon i{color:#fff;font-size:3.6rem;}
  .ac-slides{position:absolute;inset:0;z-index:1;}
  .ac-slides img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease;}
  .ac-slides img.active{opacity:1;}
  .ac-content{background:#fff;padding:64px 56px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
  .ac-block.alt .ac-content{background:var(--bg-light);}
  .ac-content::before{content:'';position:absolute;top:-60px;right:-60px;width:220px;height:220px;border-radius:50%;border:40px solid rgba(232,55,44,.05);pointer-events:none;}
  .ac-tag{font-weight:700;font-size:.78rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:inline-block;margin-bottom:14px;border-left:3px solid var(--red);padding-left:12px;align-self:flex-start;}
  .ac-content h2{font-family:var(--font-display);font-size:clamp(2rem,3.5vw,2.8rem);color:var(--dark);letter-spacing:2px;text-transform:uppercase;line-height:1.05;margin-bottom:10px;}
  .ac-tagline{color:var(--red);font-size:.9rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:22px;display:block;line-height:1.5;}
  .ac-content p{color:#555;font-size:.97rem;line-height:1.85;margin-bottom:26px;}
  .ac-features{margin:0 0 32px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px 22px;}
  .ac-features li{display:flex;align-items:flex-start;gap:10px;font-size:.92rem;color:#444;line-height:1.5;}
  .ac-features li i{color:var(--red);font-size:.8rem;margin-top:4px;flex-shrink:0;}
  .ac-apply{display:flex;flex-wrap:wrap;align-items:center;gap:18px;}
  .ac-apply .mail{color:#555;font-size:.92rem;}
  .ac-apply .mail a{color:var(--red);font-weight:700;border-bottom:1px solid rgba(232,55,44,.4);}
  .ac-divider{height:3px;background:linear-gradient(90deg,transparent,var(--red),transparent);opacity:.35;}

  @media(max-width:1024px){
    #navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}
    #academy-intro{padding:70px 30px 60px;}
    .ac-block{grid-template-columns:1fr;}
    .ac-block.reverse .ac-visual{order:0;}
    .ac-visual{min-height:260px;}
    .ac-content{padding:44px 30px;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    #academy-intro{padding:60px 20px 50px;}
    .ac-visual{min-height:200px;}
    .ac-icon{width:110px;height:110px;}.ac-icon i{font-size:2.6rem;}
    .ac-visual .ac-num{font-size:5.5rem;}
    .ac-content{padding:36px 20px;}
    .ac-features{grid-template-columns:1fr;}
  }
`;

const professional = [
  "Physiotherapy internship programmes",
  "Strength & Conditioning internships",
  "Sports rehabilitation workshops",
  "Clinical assessment and rehabilitation education",
];

const community = [
  "Understanding pain and injury",
  "Injury prevention and awareness",
  "Running and fitness education",
  "Strength training fundamentals",
  "Mobility and movement education",
  "Recovery, sleep and nutrition awareness",
  "Expert-led talks and interactive sessions",
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


function PageHero() {
  return (
    <section id="page-hero">
      <div className="page-hero-bg" />
      <div className="page-hero-content">
        <span className="sub reveal">Initiatives</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>STAIRS LEARNING<br />ACADEMY</h1>
        <div className="tagline reveal" style={{ transitionDelay: "0.15s" }}>Learn. Understand. Move Better.</div>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Initiatives</span>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="academy-intro">
      <span className="section-label reveal">An initiative by Stairs Physiotherapy &amp; Fitness</span>
      <h2 className="section-title reveal">Stairs Learning Academy</h2>
      <p className="reveal" style={{ transitionDelay: "0.1s" }}>
        Stairs Learning Academy is an initiative by <strong>Stairs Physiotherapy &amp; Fitness</strong> dedicated to making knowledge about movement, health, rehabilitation and performance accessible to everyone.
      </p>
      <p className="reveal" style={{ transitionDelay: "0.15s" }}>
        Through professional internships, practical workshops, educational sessions and community learning initiatives, we bring together experts, aspiring professionals, athletes and everyday individuals to learn, share knowledge and make informed decisions about their health and physical wellbeing.
      </p>
    </section>
  );
}

const professionalPhotos = [
  "2R5A9465.webp",
  "2R5A9470.webp",
  "2R5A9477.webp",
  "2R5A9469.webp",
].map((f) => `/images-optimized/${f}`);

/* Photos fade into each other automatically (default: every 2 seconds). */
function PhotoSlideshow({ images, interval = 2000 }: { images: string[]; interval?: number }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);
  return (
    <div className="ac-slides">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Stairs Learning Academy ${i + 1}`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          loading="eager"
          className={i === cur ? "active" : ""}
        />
      ))}
    </div>
  );
}

function ProfessionalLearning() {
  return (
    <div className="ac-block reveal">
      <div className="ac-visual">
        <PhotoSlideshow images={professionalPhotos} />
      </div>
      <div className="ac-content">
        <h2>Professional Learning &amp; Development</h2>
        <span className="ac-tagline">Build knowledge. Develop skills. Grow with experience.</span>
        <p>For aspiring and practising professionals looking to strengthen their understanding and practical skills.</p>
        <ul className="ac-features">
          {professional.map((f) => (
            <li key={f}><i className="fas fa-check-circle" />{f}</li>
          ))}
        </ul>
        <div className="ac-apply">
          <a href={`mailto:${APPLY_EMAIL}?subject=Stairs%20Learning%20Academy%20%E2%80%93%20Application`} className="btn-primary">
            Apply Now <span className="play-icon"><i className="fas fa-play" /></span>
          </a>
          <span className="mail">Write to us at <a href={`mailto:${APPLY_EMAIL}`}>{APPLY_EMAIL}</a></span>
        </div>
      </div>
    </div>
  );
}

const communityPhotos = [
  "IMG_3006.JPG.webp",
  "DSC01692.webp",
].map((f) => `/images-optimized/${f}`);

function CommunityLearning() {
  return (
    <div className="ac-block alt reverse reveal">
      <div className="ac-visual">
        <PhotoSlideshow images={communityPhotos} interval={3000} />
      </div>
      <div className="ac-content">
        <h2>Community Learning &amp; Awareness</h2>
        <span className="ac-tagline">Understand your body. Take charge of your health.</span>
        <p>We believe health education should not be limited to professionals. Our community learning initiatives help individuals understand their bodies, make informed choices and build healthier movement habits.</p>
        <ul className="ac-features">
          {community.map((f) => (
            <li key={f}><i className="fas fa-check-circle" />{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function InitiativesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <Intro />
      <ProfessionalLearning />
      <div className="ac-divider" />
      <CommunityLearning />
      <BranchesFooter />
    </>
  );
}
