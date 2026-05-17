"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { use } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  :root {
    --red: #e8372c; --dark: #111111; --darker: #0a0a0a; --light: #ffffff;
    --gray: #888888; --bg-light: #f5f5f5;
    --font-display: 'Bebas Neue', sans-serif; --font-body: 'Barlow', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); color: var(--dark); background: var(--darker); overflow-x: hidden; }
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
  .nav-links .contact-btn:hover { background: var(--red); }
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

  /* CONTENT */
  .service-content { padding: 80px 60px; background: var(--darker); }
  .service-content-inner { max-width: 1100px; margin: 0 auto; }
  .service-icon-badge { width: 64px; height: 64px; background: rgba(232,55,44,0.15); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 28px; border: 1px solid rgba(232,55,44,0.3); }
  .service-icon-badge i { font-size: 1.6rem; color: var(--red); }
  .service-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 30px; margin-top: 50px; align-items: start; }
  .service-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 36px; border-radius: 20px; }
  .service-card h2 { font-family: var(--font-display); font-size: 1.5rem; color: var(--light); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }
  .service-card p { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.85; }
  .service-card ul { padding-left: 0; list-style: none; margin-top: 4px; }
  .service-card ul li { display: flex; gap: 12px; align-items: flex-start; color: rgba(255,255,255,0.8); font-size: 0.92rem; line-height: 1.7; margin-bottom: 16px; }
  .service-card ul li::before { content: ''; display: block; flex-shrink: 0; width: 8px; height: 8px; margin-top: 7px; border-radius: 50%; background: var(--red); }
  .service-divider { width: 50px; height: 3px; background: var(--red); margin-bottom: 20px; border-radius: 2px; }

  /* OTHER SERVICES */
  .other-services { padding: 60px 60px 80px; background: #0d0d0d; }
  .other-services-inner { max-width: 1100px; margin: 0 auto; }
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
    .service-content, .other-services, .service-cta { padding-left: 30px; padding-right: 30px; }
    .service-grid { grid-template-columns: 1fr; }
    .other-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; } .hamburger { display: flex; }
    .service-hero-content { padding: 0 20px; }
    .other-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    #footer { padding: 40px 20px 20px; }
  }
`;

const serviceDetails: Record<string, {
  title: string; subtitle: string; description: string; bullets: string[];
  icon: string; longDesc: string;
}> = {
  "bio-mechanical-assessment": {
    title: "Bio Mechanical Assessment",
    subtitle: "Body Assessment",
    description: "Our biomechanical assessment identifies movement imbalances, postural issues, and joint limitations so we can create a precise plan for safer training and better long-term results.",
    longDesc: "Using a comprehensive screening approach, our experts evaluate how your body moves across multiple planes of motion. This gives us the data to build a training plan that works with your body, not against it — reducing injury risk and improving overall performance.",
    icon: "fas fa-ruler-horizontal",
    bullets: [
      "Detailed body movement screening and posture analysis",
      "Assessment of strength, flexibility, and joint function",
      "Personalized findings to support your next training phase",
      "Identify compensations and movement asymmetries",
    ],
  },
  physiotherapy: {
    title: "Physiotherapy",
    subtitle: "Prehab / Rehab",
    description: "Our physiotherapy service combines therapeutic techniques, corrective exercise, and expert guidance to help you recover from injury, improve movement, and protect against future problems.",
    longDesc: "Whether you're recovering from a sports injury or looking to prevent one, our physiotherapists provide evidence-based treatment tailored to your needs. We combine hands-on care with targeted exercise to get you back to full function as quickly and safely as possible.",
    icon: "fas fa-notes-medical",
    bullets: [
      "Injury assessment and personalised recovery planning",
      "Prehab strategies to enhance performance and reduce risk",
      "Hands-on care paired with movement education",
      "Progressive return-to-sport protocols",
    ],
  },
  "strength-conditioning": {
    title: "Strength & Conditioning",
    subtitle: "Mobility / Strength",
    description: "This service blends strength coaching with mobility training so you can lift stronger, move better, and perform at your best across sport or daily life.",
    longDesc: "Our strength and conditioning programs are built around your goals — whether that's adding muscle, improving athletic performance, or simply moving pain-free. Every session is purposeful, progressive, and guided by experienced coaches.",
    icon: "fas fa-dumbbell",
    bullets: [
      "Programmed strength sessions for consistent progress",
      "Mobility and stability work to support stronger movement",
      "Performance-driven coaching for measurable gains",
      "Periodised training plans tailored to your sport or goals",
    ],
  },
  "myofascial-release": {
    title: "Myofascial Release",
    subtitle: "Treatment / Release",
    description: "Our myofascial release sessions target tight tissues and restricted movement to help relieve pain, improve posture, and restore natural mobility.",
    longDesc: "Myofascial release is a specialist soft-tissue technique that addresses the connective tissue surrounding your muscles. By releasing restrictions in the fascia, we help reduce chronic tension, improve range of motion, and support faster recovery from training.",
    icon: "fas fa-hand-holding-heart",
    bullets: [
      "Targeted release for tight muscles and fascia",
      "Improved movement quality and reduced discomfort",
      "Recovery-focused care for training and daily life",
      "Complement to strength and physiotherapy programs",
    ],
  },
  "sports-specific-training": {
    title: "Sports Specific Training",
    subtitle: "Training Specific to Sport",
    description: "Whether you play football, basketball, tennis, or another sport, this service helps you move better, train smarter, and prepare your body for your specific athletic goals.",
    longDesc: "Sport-specific training bridges the gap between the gym and the field. We analyse the demands of your sport and design sessions that develop the exact qualities you need — speed, agility, power, endurance, or sport-specific strength.",
    icon: "fas fa-basketball-ball",
    bullets: [
      "Sport-specific movement and conditioning plans",
      "Power, agility, and endurance work for athletes",
      "Performance preparation that matches your game demands",
      "In-season maintenance and off-season development programs",
    ],
  },
  "group-session": {
    title: "Group Session",
    subtitle: "Runners, Triathlete or Any Sport",
    description: "Group sessions combine high-energy coaching with functional training, making it ideal for athletes and fitness lovers who want motivation, support, and variety.",
    longDesc: "Train alongside like-minded athletes in a structured, coach-led environment. Our group sessions are designed to push you, support you, and keep you accountable — whether you're training for a marathon, triathlon, or just want to get fitter with others.",
    icon: "fas fa-users",
    bullets: [
      "Group training for runners, triathletes, and all athletes",
      "Structured workouts that build strength, mobility, and endurance",
      "Motivation and camaraderie in every session",
      "Flexible scheduling for all fitness levels",
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
    { href: "/trainers", label: "Trainers" }, { href: "/pricing", label: "Pricing" }, { href: "/coming-soon", label: "Coming Soon" },
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

      {/* Main content */}
      <section className="service-content">
        <div className="service-content-inner">
          <div className="service-icon-badge"><i className={service.icon} /></div>
          <div className="service-divider" />
          <span style={{ display: "block", color: "var(--red)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Service Overview</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--light)", letterSpacing: 1, textTransform: "uppercase", maxWidth: 700 }}>{service.title}</h2>

          <div className="service-grid">
            <div className="service-card">
              <h2>About This Service</h2>
              <p>{service.description}</p>
              <p style={{ marginTop: 20 }}>{service.longDesc}</p>
            </div>
            <div className="service-card">
              <h2>What You Get</h2>
              <ul>
                {service.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--red)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "1.5px", textTransform: "uppercase", padding: "14px 32px", borderRadius: 50, border: "none", cursor: "pointer", transition: "background 0.3s" }}>Book a Session</a>
            <a href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "transparent", color: "var(--light)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "1.5px", textTransform: "uppercase", padding: "14px 32px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "border-color 0.3s" }}>← All Services</a>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="other-services">
        <div className="other-services-inner">
          <span className="label">Explore More</span>
          <h2>Other Services</h2>
          <div className="other-grid">
            {otherServices.map((s) => (
              <a href={`/services/${s.slug}`} key={s.slug} className="other-card">
                <div className="icon"><i className={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </a>
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
