"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

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
  .btn-outline{display:inline-block;border:2px solid var(--red);color:var(--red);font-weight:700;font-size:.8rem;letter-spacing:1px;text-transform:uppercase;padding:10px 28px;border-radius:30px;transition:background .3s,color .3s;}
  .btn-outline:hover{background:var(--red);color:var(--light);}
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
  @keyframes spin-slow{to{transform:translateY(-50%) rotate(360deg);}}
  .page-hero-content{position:relative;z-index:2;padding:0 60px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,6rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  @keyframes gradientSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

  /* PRICING */
  #pricing-full{padding:90px 60px;background:var(--bg-light);text-align:center;}
  .pricing-header{margin-bottom:60px;}
  .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1000px;margin:0 auto;}
  .pricing-card{position:relative;border-radius:16px;overflow:visible;transition:transform .3s,box-shadow .3s;box-shadow:0 4px 16px rgba(0,0,0,.07);z-index:0;}
  .pricing-card.featured{transform:scale(1.04);}
  .pricing-card::before{content:'';position:absolute;inset:-3px;border-radius:18px;background:linear-gradient(135deg,#e8372c,#ff6b35,#ffb347,#e8372c,#8b0000);background-size:300% 300%;z-index:-1;opacity:0;transition:opacity .4s ease;animation:gradientSpin 3s ease infinite;}
  .pricing-card.featured::before{opacity:1;}
  .pricing-card::after{content:'';position:absolute;inset:2px;border-radius:14px;background:#fff;z-index:-1;}
  .pricing-card:hover{transform:translateY(-8px);box-shadow:0 16px 40px rgba(232,55,44,.25);}
  .pricing-card:hover::before{opacity:1;}
  .pricing-card.featured:hover{transform:scale(1.04) translateY(-8px);}
  .card-img{height:180px;background:#222;position:relative;overflow:hidden;border-radius:14px 14px 0 0;}
  .card-img .img-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:rgba(255,255,255,.2);font-size:.75rem;letter-spacing:1px;}
  .card-img .img-placeholder i{font-size:2rem;margin-bottom:8px;}
  .featured-badge{position:absolute;top:12px;right:12px;background:var(--red);color:var(--light);font-size:.65rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;}
  .price-badge{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);background:var(--red);color:var(--light);border-radius:50%;width:80px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1.6rem;letter-spacing:0;line-height:1;z-index:2;}
  .price-badge small{font-size:.55rem;letter-spacing:1px;font-family:var(--font-body);}
  .pricing-body{padding:46px 30px 30px;text-align:center;}
  .pricing-body h3{font-family:var(--font-display);font-size:1.4rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;}
  .pricing-body ul{margin-bottom:28px;}
  .pricing-body ul li{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;color:#555;}
  .pricing-body ul li i{color:var(--red);font-size:.8rem;}
  .pricing-body ul li.no i{color:#ccc;}
  .pricing-body ul li.no{color:#ccc;text-decoration:line-through;}

  /* FAQ */
  #faq{background:var(--darker);padding:90px 60px;}
  #faq .section-label{color:var(--red);display:block;margin-bottom:10px;}
  #faq .section-title{color:var(--light);margin-bottom:50px;}
  .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:0 auto;}
  .faq-item{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:24px 28px;transition:border-color .3s;}
  .faq-item:hover{border-color:var(--red);}
  .faq-item h4{font-family:var(--font-display);font-size:1rem;color:var(--light);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;}
  .faq-item p{color:rgba(255,255,255,.6);font-size:.88rem;line-height:1.7;}

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
  .footer-col ul li a{color:#aaa;transition:color .3s;}.footer-col ul li a:hover{color:var(--red);}
  .footer-contact .contact-item{display:flex;flex-direction:column;margin-bottom:12px;}
  .footer-contact .contact-item strong{color:var(--light);font-size:.85rem;margin-bottom:2px;}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:24px;text-align:center;font-size:.8rem;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    #pricing-full,#faq,#footer{padding-left:30px;padding-right:30px;}
    .pricing-grid{grid-template-columns:1fr 1fr;}
    .faq-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .page-hero-content{padding:0 20px;}
    .pricing-grid{grid-template-columns:1fr;}.pricing-card.featured{transform:none;}
    .footer-grid{grid-template-columns:1fr;}
  }
`;

const pricingPlans = [
  {
    price: "$45", title: "Basic Gym", featured: false,
    features: [
      { text: "Unlimited club access", ok: true },
      { text: "Group attendance", ok: true },
      { text: "Gym visits", ok: true },
      { text: "Bath complex access", ok: false },
      { text: "Personal trainer session", ok: false },
      { text: "Nutrition consultation", ok: false },
    ]
  },
  {
    price: "$50", title: "Standard Gym", featured: true,
    features: [
      { text: "Unlimited club access", ok: true },
      { text: "Group attendance", ok: true },
      { text: "Gym visits", ok: true },
      { text: "Bath complex access", ok: true },
      { text: "Personal trainer session", ok: false },
      { text: "Nutrition consultation", ok: false },
    ]
  },
  {
    price: "$60", title: "Premium Gym", featured: false,
    features: [
      { text: "Unlimited club access", ok: true },
      { text: "Group attendance", ok: true },
      { text: "Gym visits", ok: true },
      { text: "Bath complex access", ok: true },
      { text: "Personal trainer session", ok: true },
      { text: "Nutrition consultation", ok: true },
    ]
  },
];

const faqs = [
  { q: "Can I cancel my membership anytime?", a: "Yes — all memberships are month-to-month with no lock-in contract. Cancel with 7 days notice." },
  { q: "Is there a joining fee?", a: "No joining fee. You only pay the first month's membership when you sign up." },
  { q: "Do you offer family discounts?", a: "Yes — families of 3+ receive 15% off each membership when registered together." },
  { q: "What's included in Premium?", a: "Premium includes everything in Standard plus monthly personal trainer sessions and nutrition consultations." },
  { q: "Can I freeze my membership?", a: "Yes, memberships can be frozen for up to 3 months per year for medical or travel reasons." },
  { q: "Is there a student rate?", a: "We offer a 20% student discount on Basic and Standard plans with valid student ID." },
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

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const s = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
  const links = [
    { href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" },
    { href: "/trainers", label: "Trainers" }, { href: "/pricing", label: "Pricing" }, { href: "/coming-soon", label: "Coming Soon" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href} className={l.href === "/pricing" ? "active" : ""}>{l.label}</a>)}
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
      <div className="page-hero-content">
        <span className="sub reveal">Stairs</span>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>PRICING<br />PLANS</h1>
        <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
          <a href="/">Home</a><span>/</span><span style={{ color: "#fff" }}>Pricing</span>
        </div>
      </div>
    </section>
  );
}

function PricingFull() {
  return (
    <section id="pricing-full">
      <div className="pricing-header">
        <span className="section-label reveal">Pricing Tables</span>
        <h2 className="section-title reveal">Choose Your Plan</h2>
      </div>
      <div className="pricing-grid">
        {pricingPlans.map((plan, i) => (
          <div className={`pricing-card reveal${plan.featured ? " featured" : ""}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="card-img">
              <div className="img-placeholder"><i className="fas fa-image" />{plan.title}</div>
              {plan.featured && <span className="featured-badge">Most Popular</span>}
              <div className="price-badge">{plan.price}<small>Monthly</small></div>
            </div>
            <div className="pricing-body">
              <h3>{plan.title}</h3>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j} className={f.ok ? "" : "no"}>
                    <i className={f.ok ? "fas fa-check" : "fas fa-times"} /> {f.text}
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-outline">Join Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq">
      <span className="section-label reveal">FAQ</span>
      <h2 className="section-title reveal">Common Questions</h2>
      <br /><br />
      <div className="faq-grid">
        {faqs.map((f, i) => (
          <div className="faq-item reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
            <h4>{f.q}</h4><p>{f.a}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <motion.a href="/contact" whileTap={{ scale: 0.95 }} className="btn-primary reveal">
          Still have questions? <span className="play-icon"><i className="fas fa-play" /></span>
        </motion.a>
      </div>
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
          <div className="contact-item"><strong>Address:</strong><span>121 King Street Melbourne</span></div>
          <div className="contact-item"><strong>Email:</strong><span>info@stairs.com</span></div>
          <div className="contact-item"><strong>Phone:</strong><span>+61 3 8376 6284</span></div>
        </div>
      </div>
      <div className="footer-bottom"><p>Copyright 2024 Stairs. All Rights Reserved.</p></div>
    </footer>
  );
}

export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageHero />
      <PricingFull />
      <FAQ />
      <Footer />
    </>
  );
}
