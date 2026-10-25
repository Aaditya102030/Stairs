"use client";

import { useState, useEffect } from "react";
import BranchesFooter from "@/components/BranchesFooter";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
  :root{--red:#e8372c;--dark:#111111;--darker:#0a0a0a;--light:#ffffff;--gray:#888888;--line:#f28b82;--font-display:'Bebas Neue',sans-serif;--font-body:'Barlow',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:var(--dark);background:#000;overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}
  img{max-width:100%;display:block;}

  .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}

  /* NAVBAR */
  #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:18px 60px;transition:background .4s,padding .4s;}
  #navbar.scrolled{background:rgba(10,10,10,.95);padding:12px 60px;backdrop-filter:blur(8px);}
  .nav-logo{display:flex;align-items:center;gap:10px;color:var(--light);}
  .nav-links{display:flex;align-items:center;gap:32px;}
  .nav-links a{color:var(--light);font-size:.85rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;position:relative;transition:color .3s;}
  .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--red);transition:width .3s;}
  .nav-links a:hover::after{width:100%;}
  .nav-links a:hover{color:var(--red);}
  .nav-links .contact-btn{border:2px solid var(--red);padding:7px 20px;border-radius:30px;color:var(--light);transition:background .3s;}
  .nav-links .contact-btn:hover{background:var(--red);}
  .nav-links .contact-btn::after{display:none;}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;}
  .hamburger span{display:block;width:26px;height:2px;background:var(--light);}

  /* PAGE HERO */
  #page-hero{position:relative;min-height:46vh;background:var(--darker);display:flex;align-items:center;justify-content:center;overflow:hidden;padding-top:80px;text-align:center;}
  .page-hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80') center/cover no-repeat;opacity:.3;}
  .page-hero-bg::after{content:'';position:absolute;inset:0;background:rgba(10,10,10,.65);}
  .page-hero-content{position:relative;z-index:2;padding:0 40px;}
  .page-hero-content .sub{font-family:var(--font-body);font-weight:600;font-size:.9rem;letter-spacing:4px;color:var(--light);text-transform:uppercase;border-left:4px solid var(--red);padding-left:14px;margin-bottom:16px;display:inline-block;}
  .page-hero-content h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,5.5rem);color:var(--light);line-height:1;letter-spacing:2px;margin-bottom:16px;}
  .breadcrumb{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);font-size:.85rem;letter-spacing:1px;text-transform:uppercase;justify-content:center;}
  .breadcrumb a{color:var(--red);}.breadcrumb span{color:rgba(255,255,255,.4);}

  /* QUICK NAV */
  #pr-nav{position:sticky;top:68px;z-index:100;background:rgba(10,10,10,.94);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,.08);}
  .pr-nav-inner{display:flex;justify-content:center;gap:10px;max-width:1200px;margin:0 auto;padding:12px 24px;overflow-x:auto;scrollbar-width:none;}
  .pr-nav-inner::-webkit-scrollbar{display:none;}
  .pr-chip{flex-shrink:0;padding:8px 18px;border-radius:30px;border:1.5px solid rgba(232,55,44,.55);color:#fff;font-size:.74rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;transition:background .25s,border-color .25s;}
  .pr-chip:hover,.pr-chip.active{background:var(--red);border-color:var(--red);}

  /* PRICE SECTIONS */
  .pr-section{position:relative;background:#000;padding:70px 60px 64px;text-align:center;overflow:hidden;scroll-margin-top:120px;}
  .pr-section::before{content:'';position:absolute;top:-150px;right:-150px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(232,55,44,.5),transparent 65%);filter:blur(12px);pointer-events:none;}
  .pr-section::after{content:'';position:absolute;bottom:-190px;left:-160px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(190,10,25,.6),transparent 65%);filter:blur(12px);pointer-events:none;}
  .pr-section > *{position:relative;z-index:1;}
  .pr-title{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,3.8rem);line-height:1.05;letter-spacing:2px;text-transform:uppercase;color:#fff;}
  .pr-title span{color:var(--red);}
  .pr-sub{color:#fff;font-size:clamp(1rem,2vw,1.4rem);margin-top:10px;font-weight:400;}
  .pr-lead{color:#fff;font-size:clamp(.95rem,1.6vw,1.1rem);line-height:1.7;max-width:820px;margin:22px auto 0;font-weight:500;}
  .pr-body{margin:40px auto 0;max-width:1200px;}
  .pr-body.narrow{max-width:900px;}
  .pr-body.mid{max-width:1000px;}
  .pr-two{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;}

  /* TABLES */
  .pt-wrap{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:4px;}
  .pt{width:100%;border-collapse:collapse;background:#000;color:#fff;border:2px solid var(--line);}
  .pt th,.pt td{border:2px solid var(--line);padding:14px 12px;text-align:center;vertical-align:middle;}
  .pt thead th{background:var(--red);color:#fff;font-weight:800;font-size:.95rem;letter-spacing:.5px;}
  .pt.caps thead th{text-transform:uppercase;font-size:.82rem;}
  .pt tbody tr{transition:background .25s;}
  .pt tbody tr:hover{background:rgba(232,55,44,.14);}
  .pt td{font-size:1rem;}
  .pt td:first-child{font-weight:500;}
  .pt .pt-tag{font-size:.68rem;color:rgba(255,255,255,.75);margin-left:4px;}
  .pt .pt-fee{font-family:var(--font-body);font-weight:700;font-size:1.1rem;white-space:nowrap;}
  .pt .pt-fee.text{font-size:.82rem;white-space:normal;line-height:1.25;display:inline-block;}
  .pt .pt-note{display:block;font-size:.62rem;color:rgba(255,255,255,.75);margin-top:2px;}
  .pt .pt-small{display:block;font-size:.7rem;letter-spacing:.6px;font-style:italic;text-transform:uppercase;color:rgba(255,255,255,.8);margin-top:3px;}
  .pt.two td:first-child{width:64%;}
  .pt.pkg{min-width:680px;}
  .pt.pkg td{font-size:1.05rem;}
  .pt.pkg td:first-child{font-size:.95rem;text-transform:uppercase;line-height:1.35;}
  .pt.pkg .pt-fee{font-size:1.15rem;}
  .pt.inc td:first-child{width:50%;}
  .pt tr.total td{font-weight:800;text-transform:uppercase;}

  /* CTA */
  .pr-cta{background:var(--red);padding:56px 40px;text-align:center;}
  .pr-cta h2{font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.8rem);letter-spacing:2px;color:#fff;text-transform:uppercase;margin-bottom:8px;}
  .pr-cta p{color:rgba(255,255,255,.85);margin-bottom:22px;}
  .pr-cta a{display:inline-block;background:#fff;color:var(--red);font-weight:800;font-size:.85rem;letter-spacing:2px;text-transform:uppercase;padding:13px 34px;border-radius:50px;transition:transform .2s,background .2s;}
  .pr-cta a:hover{transform:translateY(-2px);background:#111;color:#fff;}

  @media(max-width:1024px){
    #navbar{padding:16px 30px;}#navbar.scrolled{padding:10px 30px;}
    .pr-section{padding-left:30px;padding-right:30px;}
    .pr-nav-inner{justify-content:flex-start;}
    .pr-two{grid-template-columns:1fr;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    .pr-section{padding:48px 14px 44px;}
    .pr-body{margin-top:28px;}
    .pt th,.pt td{padding:11px 8px;}
    .pt td{font-size:.9rem;}
    .pt thead th{font-size:.82rem;}
    .pt .pt-fee{font-size:1rem;}
    .pt.two td:first-child{width:58%;}
    .pr-cta{padding:44px 20px;}
  }
`;

/* ───────── DATA (from the official rate cards) ───────── */

type ServiceRow = { name: string; tag?: string; fee: string; note?: string; text?: boolean };

const servicesLeft: ServiceRow[] = [
  { name: "Physiotherapy (Basic)", fee: "₹1500 - ₹1800" },
  { name: "Physiotherapy (with Somya)", fee: "₹2200" },
  { name: "Myofascial Release (Full Body)", fee: "₹3000", note: "with Physio" },
  { name: "Myofascial Release (Half Body)", fee: "₹2000", note: "with Physio" },
  { name: "Sports / Deep Tissue Massage", tag: "Full Body", fee: "₹2500" },
  { name: "Sports / Deep Tissue Massage", tag: "Half Body", fee: "₹1800" },
];

const servicesRight: ServiceRow[] = [
  { name: "Assessment", fee: "₹1000" },
  { name: "Strength & Conditioning (1-on-1)", fee: "₹1500 - ₹1800" },
  { name: "Group Strength & Conditioning", fee: "₹750 - ₹1200" },
  { name: "MFR + Cupping (with Masseur)", fee: "₹2700" },
  { name: "Physiotherapy + Needling", fee: "₹1900" },
  { name: "Session Cancellation (last minute)", fee: "Full session charges", text: true },
];

type PackageRow = { pkg: string; sessions?: string; actual: string; discount: string; after: string; validity: string; perSession: string };

const juniorPackages: PackageRow[] = [
  { pkg: "1 Session", actual: "₹1500", discount: "0", after: "₹1500", validity: "1", perSession: "₹1500" },
  { pkg: "1 Month", sessions: "12 Sessions", actual: "₹18000", discount: "₹1200", after: "₹16800", validity: "45", perSession: "₹1400" },
  { pkg: "3 Months", sessions: "36 Sessions", actual: "₹54000", discount: "₹5400", after: "₹48600", validity: "120", perSession: "₹1350" },
  { pkg: "6 Months", sessions: "72 Sessions", actual: "₹108000", discount: "₹18000", after: "₹90000", validity: "200", perSession: "₹1250" },
];

const seniorPackages: PackageRow[] = [
  { pkg: "1 Session", actual: "₹1800", discount: "0", after: "₹1800", validity: "1", perSession: "₹1800" },
  { pkg: "1 Month", sessions: "12 Sessions", actual: "₹21600", discount: "₹2400", after: "₹19200", validity: "45", perSession: "₹1600" },
  { pkg: "3 Months", sessions: "36 Sessions", actual: "₹64800", discount: "₹10800", after: "₹54000", validity: "120", perSession: "₹1500" },
  { pkg: "6 Months", sessions: "72 Sessions", actual: "₹129600", discount: "₹28800", after: "₹100800", validity: "200", perSession: "₹1400" },
];

const nutritionPlans = [
  { plan: "1 month : 1 Nutrition plan + 2 consultations with weekly follow-ups", price: "₹7000" },
  { plan: "3 Months Plan : 3 Nutrition plans + 3 consultations with weekly follow-ups", price: "₹18000" },
  { plan: "6 Months Plan : 6 Nutrition plans + 6 consultations with weekly follow-ups", price: "₹38000" },
];

const fit2RunPlans = [
  { period: "3 months", price: "₹4200" },
  { period: "6 months", price: "₹8400" },
  { period: "12 months", price: "₹16800" },
];

const allInclusive = [
  { name: "Running Plan", note: "(Tuesday, Thursday, Saturday at Kanteerava - 06:30AM)", m3: "₹4200", m6: "₹8400" },
  { name: "Physiotherapy", note: "2 sessions / month at 20% off", m3: "₹7200", m6: "₹14400" },
  { name: "Deep Tissue Massage", note: "2 sessions / month at 20% off", m3: "₹12000", m6: "₹24000" },
  { name: "Nutrition Plan", note: "at 20% off", m3: "₹14400", m6: "₹30400" },
  { name: "Strength & Conditioning", note: "2 semi-personal sessions / month at 20% off", m3: "₹7200", m6: "₹14400" },
];

const sections = [
  { id: "services", label: "Services" },
  { id: "junior", label: "Junior Packages" },
  { id: "senior", label: "Senior Packages" },
  { id: "nutrition", label: "Nutrition" },
  { id: "fit2run", label: "Fit2Run" },
  { id: "all-inclusive", label: "All-Inclusive" },
];

/* ───────── helpers / components ───────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    document.querySelectorAll("#page-hero .reveal").forEach((el) => el.classList.add("visible"));
    return () => observer.disconnect();
  }, []);
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  const links = [
    { href: "/", label: "Home" }, { href: "/about", label: "About" },
    { href: "/services", label: "Services" }, { href: "/trainers", label: "Team" },
    { href: "/pricing", label: "Program" }, { href: "/coming-soon", label: "Initiatives" },
  ];
  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo"><img src="/logo.png" alt="Stairs" style={{ height: 45, width: "auto" }} /></div>
      <div className="nav-links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.97)", padding: 20, gap: 18, zIndex: 999 } : {}}>
        {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="/contact" className="contact-btn">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}><span /><span /><span /></div>
    </nav>
  );
}

function SectionHead({ first, second, sub, lead }: { first: string; second: string; sub?: string; lead?: React.ReactNode }) {
  return (
    <>
      <h2 className="pr-title reveal">{first} <span>{second}</span></h2>
      {sub && <p className="pr-sub reveal">{sub}</p>}
      {lead && <p className="pr-lead reveal">{lead}</p>}
    </>
  );
}

function ServiceTable({ rows }: { rows: ServiceRow[] }) {
  return (
    <div className="pt-wrap reveal">
      <table className="pt two">
        <thead><tr><th>Services</th><th>Fee</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name + (r.tag ?? "")}>
              <td>{r.name}{r.tag && <small className="pt-tag">({r.tag})</small>}</td>
              <td>
                <span className={`pt-fee${r.text ? " text" : ""}`}>{r.fee}</span>
                {r.note && <small className="pt-note">({r.note})</small>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PackageTable({ rows }: { rows: PackageRow[] }) {
  return (
    <div className="pt-wrap reveal">
      <table className="pt pkg caps">
        <thead>
          <tr>
            <th>Packages</th><th>Actual</th><th>Discount</th><th>After Discount</th><th>Validity (Days)</th><th>Per Session After Disc</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.pkg}>
              <td>{r.pkg}{r.sessions && <><br />{r.sessions}</>}</td>
              <td><span className="pt-fee">{r.actual}</span></td>
              <td><span className="pt-fee">{r.discount}</span></td>
              <td><span className="pt-fee">{r.after}</span></td>
              <td><span className="pt-fee">{r.validity}</span></td>
              <td><span className="pt-fee">{r.perSession}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function NewPricingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("services");
  useReveal();

  // highlight the chip of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* PAGE HERO */}
      <section id="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <span className="sub reveal">Stairs</span>
          <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>PRICING PLANS</h1>
          <div className="breadcrumb reveal" style={{ transitionDelay: "0.2s" }}>
            <a href="/">Home</a><span>/</span>
            <a href="/pricing">Program</a><span>/</span>
            <span style={{ color: "#fff" }}>Pricing Plans</span>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <div id="pr-nav">
        <div className="pr-nav-inner">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`pr-chip${activeId === s.id ? " active" : ""}`}>{s.label}</a>
          ))}
        </div>
      </div>

      {/* SERVICE CHARGES */}
      <section id="services" className="pr-section">
        <SectionHead first="Service" second="Charges" sub="(As per current rates)" />
        <div className="pr-body pr-two">
          <ServiceTable rows={servicesLeft} />
          <ServiceTable rows={servicesRight} />
        </div>
      </section>

      {/* JUNIOR PACKAGES */}
      <section id="junior" className="pr-section">
        <SectionHead first="Package" second="Charges for Junior Physio / S&C" sub="(As per current rates)" />
        <div className="pr-body">
          <PackageTable rows={juniorPackages} />
        </div>
      </section>

      {/* SENIOR PACKAGES */}
      <section id="senior" className="pr-section">
        <SectionHead first="Package" second="Charges for Senior Physio / S&C" sub="(As per current rates)" />
        <div className="pr-body">
          <PackageTable rows={seniorPackages} />
        </div>
      </section>

      {/* NUTRITION */}
      <section id="nutrition" className="pr-section">
        <SectionHead
          first="Nutrition"
          second="Charges"
          sub="(As per current rates)"
          lead="Customised 7-day nutrition plan with meal timings, portions and food options tailored to your lifestyle, food preferences and eating habits, plus travel-friendly nutrition guidelines to help you stay on track wherever you are."
        />
        <div className="pr-body narrow">
          <div className="pt-wrap reveal">
            <table className="pt two">
              <thead><tr><th>Nutrition Plan</th><th>Charges</th></tr></thead>
              <tbody>
                {nutritionPlans.map((n) => (
                  <tr key={n.plan}>
                    <td>{n.plan}</td>
                    <td><span className="pt-fee">{n.price}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FIT2RUN */}
      <section id="fit2run" className="pr-section">
        <SectionHead first="Fit2Run" second="Charges" sub="(As per current rates)" />
        <div className="pr-body narrow">
          <div className="pt-wrap reveal">
            <table className="pt two">
              <thead>
                <tr>
                  <th>Running Plan only<br />(Tuesday, Thursday, Saturday at Kanteerava - 6.30AM)</th>
                  <th>Charges</th>
                </tr>
              </thead>
              <tbody>
                {fit2RunPlans.map((f) => (
                  <tr key={f.period}>
                    <td>PRICE<br /><span style={{ fontSize: ".85em" }}>({f.period})</span></td>
                    <td><span className="pt-fee">{f.price}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FIT2RUN ALL-INCLUSIVE */}
      <section id="all-inclusive" className="pr-section">
        <SectionHead
          first="Fit2Run"
          second="All-Inclusive Program"
          lead="A holistic approach to building your run, with running, strength, recovery and nutrition working together"
        />
        <div className="pr-body mid">
          <div className="pt-wrap reveal">
            <table className="pt inc">
              <thead>
                <tr>
                  <th style={{ textTransform: "uppercase" }}>All inclusive for Fit2Run members</th>
                  <th>PRICE (3 months)</th>
                  <th>PRICE (6 months)</th>
                </tr>
              </thead>
              <tbody>
                {allInclusive.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}<span className="pt-small">{r.note}</span></td>
                    <td><span className="pt-fee">{r.m3}</span></td>
                    <td><span className="pt-fee">{r.m6}</span></td>
                  </tr>
                ))}
                <tr className="total">
                  <td>Total</td>
                  <td><span className="pt-fee">₹45000</span></td>
                  <td><span className="pt-fee">₹91600</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pr-cta">
        <h2 className="reveal">Ready to start?</h2>
        <p className="reveal">Book a session or ask us which plan fits your goals best.</p>
        <a href="/contact" className="reveal">Contact Us</a>
      </section>

      <BranchesFooter />
    </>
  );
}
