"use client";

import { Suspense, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BranchesFooter from "@/components/BranchesFooter";
import Navbar from "@/components/SiteNav";
import { SERVICES_BY_ID, REGISTRATION_KEY, inr, termLabel } from "@/lib/fit2run-plans";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');
  :root { --red:#e8372c; --dark:#111111; --darker:#0a0a0a; --light:#ffffff; --font-display:'Bebas Neue',sans-serif; --font-body:'Barlow',sans-serif; }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-body);color:#fff;background:var(--darker);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}ul{list-style:none;}

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

  /* PAGE */
  #reg{padding:130px 24px 90px;background:var(--darker);}
  .reg-shell{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;border-radius:24px;overflow:hidden;border:1px solid rgba(232,55,44,.3);background:#161616;}

  /* left: what you're signing up for */
  .reg-info{position:relative;padding:56px 48px;display:flex;flex-direction:column;justify-content:center;overflow:hidden;background:#120808;}
  .reg-info-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:.35;}
  .reg-info::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,.5),rgba(10,10,10,.88));}
  .reg-info>*{position:relative;z-index:1;}
  .reg-service{align-self:flex-start;background:rgba(232,55,44,.15);border:1px solid rgba(232,55,44,.45);color:#fff;font-weight:700;font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:30px;margin-bottom:22px;}
  .reg-brand{font-family:var(--font-body);font-style:italic;font-weight:700;font-size:clamp(2rem,4.2vw,3.4rem);color:#ff5a4f;line-height:1.05;text-align:center;}
  .reg-group{text-align:center;font-weight:700;font-size:.8rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-top:10px;}
  .reg-tag{font-weight:700;font-size:1.35rem;text-align:center;margin:14px 0 22px;}
  .reg-price{font-weight:700;font-size:clamp(2.2rem,4.4vw,3.2rem);color:#ff5a4f;text-align:center;line-height:1;}
  .reg-for{display:block;text-align:center;font-weight:700;font-size:.78rem;letter-spacing:.5px;margin:6px 0 30px;}
  .reg-points li{position:relative;padding-left:26px;margin-bottom:18px;font-style:italic;font-size:1.05rem;line-height:1.5;}
  .reg-points li::before{content:'';position:absolute;left:4px;top:.6em;width:8px;height:8px;border-radius:50%;background:#fff;}

  /* right: the form */
  .reg-form{padding:48px 44px;background:#1c1c1c;}
  .reg-steps{display:flex;align-items:center;gap:10px;margin-bottom:28px;font-size:.78rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.45);}
  .reg-steps .on{color:#fff;}
  .reg-steps .dot{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.12);margin-right:8px;font-size:.78rem;}
  .reg-steps .on .dot{background:var(--red);}
  .reg-steps .bar{flex:0 0 36px;height:2px;background:rgba(255,255,255,.18);}
  .reg-row{display:grid;gap:22px;margin-bottom:26px;}
  .reg-row.c3{grid-template-columns:repeat(3,1fr);}
  .reg-row.c1{grid-template-columns:1fr;}
  .reg-field .lbl{display:block;font-size:.95rem;margin-bottom:10px;line-height:1.35;}
  .reg-field input[type=text],.reg-field input[type=tel],.reg-field input[type=email],.reg-field input[type=number],.reg-field select,.reg-field textarea{width:100%;background:#2b2b2b;border:none;border-bottom:1px solid rgba(255,255,255,.35);color:#fff;padding:14px 12px;font:inherit;font-size:1rem;border-radius:2px;outline:none;transition:border-color .2s;}
  .reg-field input:focus,.reg-field select:focus,.reg-field textarea:focus{border-bottom-color:var(--red);}
  .reg-field ::placeholder{color:rgba(255,255,255,.4);}
  .reg-field textarea{min-height:74px;resize:vertical;}
  .reg-field select option{background:#2b2b2b;}
  .reg-opts{display:flex;flex-direction:column;gap:8px;}
  .reg-opt{display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.98rem;}
  .reg-opt input{-webkit-appearance:none;appearance:none;width:22px;height:22px;border:1px solid rgba(255,255,255,.5);background:#2b2b2b;border-radius:3px;display:grid;place-content:center;cursor:pointer;flex-shrink:0;margin:0;}
  .reg-opt input::before{content:'';width:12px;height:12px;background:var(--red);border-radius:2px;transform:scale(0);transition:transform .15s;}
  .reg-opt input:checked::before{transform:scale(1);}
  .reg-opt a{color:var(--red);text-decoration:underline;}

  .reg-next{margin-top:8px;}
  .reg-btn{background:var(--red);color:#fff;border:2px solid var(--red);border-radius:50px;padding:15px 36px;font-family:var(--font-body);font-weight:800;font-size:.95rem;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:background .25s,transform .2s;}
  .reg-btn:hover{background:#c0251b;border-color:#c0251b;transform:translateY(-2px);}
  .reg-note{margin-top:14px;color:rgba(255,255,255,.5);font-size:.88rem;line-height:1.6;}

  .reg-empty{grid-column:1/-1;padding:70px 40px;text-align:center;}
  .reg-empty h1{font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;}
  .reg-empty p{color:rgba(255,255,255,.65);margin-bottom:26px;}
  .reg-empty a{display:inline-block;background:var(--red);color:#fff;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:.85rem;padding:13px 30px;border-radius:50px;}

  @media(max-width:1100px){#navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}}
  @media(max-width:980px){
    .reg-shell{grid-template-columns:1fr;}
    .reg-info{padding:44px 28px;}
    .reg-form{padding:36px 24px;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    #reg{padding:110px 12px 60px;}
  }
  @media(max-width:640px){
    .reg-row.c3{grid-template-columns:1fr;}
    .reg-btn{width:100%;}
  }
`;

const POINTS = [
  "This program is designed for individuals at all running proficiency levels and those looking to embark on their fitness journey as well.",
  "Run at your convenience with our running plans on Tuesday, Thursday, and Saturday or join us at Kanteerava Stadium at 6.30 AM to run with our community.",
  "Enhance Performance Holistically.",
  "Increase Muscular Strength, Power & Endurance.",
  "Injury prevention and enhanced recovery.",
  "An Athletic Performance Training Platform.",
  "Enhance Mobility, Boost Stability.",
  "This program is structured to include warm-up routines, run preparation, injury prevention techniques, running-specific strength exercises, pain management strategies, and concludes with a community run.",
];

const LEVELS = ["Beginner", "Intermediate", "Advance"];

function LevelGroup({ label, name }: { label: string; name: string }) {
  return (
    <div className="reg-field">
      <span className="lbl">{label}</span>
      <div className="reg-opts">
        {LEVELS.map((l) => (
          <label key={l} className="reg-opt">
            <input type="radio" name={name} value={l} /> {l}
          </label>
        ))}
      </div>
    </div>
  );
}

/* Only the fields marked `required` must be filled in - everything else is optional. */
function Text({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="reg-field">
      <label className="lbl" htmlFor={name}>{label}{required ? " *" : ""}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} />
    </div>
  );
}

function Area({ label, name, placeholder, required = false }: { label: string; name: string; placeholder: string; required?: boolean }) {
  return (
    <div className="reg-field">
      <label className="lbl" htmlFor={name}>{label}{required ? " *" : ""}</label>
      <textarea id={name} name={name} required={required} placeholder={placeholder} />
    </div>
  );
}

function RegisterContent() {
  const params = useSearchParams();
  const router = useRouter();
  const service = SERVICES_BY_ID[params.get("service") ?? ""];
  const formRef = useRef<HTMLFormElement>(null);

  if (!service) {
    return (
      <div className="reg-shell">
        <div className="reg-empty">
          <h1>Choose a plan first</h1>
          <p>Pick the plan you want from the Fit2Run packages and press &quot;Pay now&quot; to come back here.</p>
          <a href="/fit2run#f2r-packages">View packages</a>
        </div>
      </div>
    );
  }

  const terms = Object.keys(service.prices).map(Number).sort((a, b) => a - b);
  const preTerm = Number(params.get("term"));
  const shownTerm = terms.includes(preTerm) ? preTerm : terms[0];

  function next() {
    const form = formRef.current;
    if (!form || !service) return;
    if (!form.reportValidity()) return; // browser highlights the first missing field
    const answers = Object.fromEntries([...new FormData(form).entries()].map(([k, v]) => [k, String(v)]));
    try {
      // Kept in this browser tab only (not in the URL) and read by the payment page.
      sessionStorage.setItem(REGISTRATION_KEY, JSON.stringify(answers));
    } catch {
      /* storage blocked - the payment page will ask them to fill the form again */
    }
    router.push(`/fit2run/payment?service=${service.id}${terms.includes(preTerm) ? `&term=${preTerm}` : ""}`);
  }

  return (
    <div className="reg-shell">
      <aside className="reg-info">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="reg-info-bg" src="/images/team/fit2run/runner-particles.webp" alt="" aria-hidden="true" />
        <span className="reg-service">Fit to Run</span>
        <div className="reg-brand">{service.name}</div>
        {service.group !== service.name ? <div className="reg-group">{service.group}</div> : null}
        <p className="reg-tag">Everything a RUNNER needs</p>
        <div className="reg-price">{inr(service.prices[shownTerm])}</div>
        <small className="reg-for">FOR {termLabel(shownTerm).toUpperCase()}</small>
        <ul className="reg-points">
          {POINTS.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </aside>

      <section className="reg-form">
        <div className="reg-steps" aria-label="Step 1 of 2">
          <span className="on"><span className="dot">1</span>Your details</span>
          <span className="bar" />
          <span><span className="dot">2</span>Payment</span>
        </div>

        <form ref={formRef} onSubmit={(e) => { e.preventDefault(); next(); }}>
          <div className="reg-row c3">
            <Text label="First Name" name="firstName" required />
            <Text label="Last Name" name="lastName" />
            <Text label="Phone" name="phone" type="tel" required />
          </div>

          <div className="reg-row c3">
            <Text label="Email Address" name="email" type="email" required />
            <div className="reg-field">
              <label className="lbl" htmlFor="gender">Gender</label>
              <select id="gender" name="gender" defaultValue="">
                <option value="" />
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="reg-field">
              <label className="lbl" htmlFor="age">Age</label>
              <input id="age" name="age" type="number" min={10} max={100} />
            </div>
          </div>

          <div className="reg-row c3">
            <LevelGroup label="Level of Running" name="runningLevel" />
            <LevelGroup label="Level of Fitness training" name="fitnessLevel" />
            <Area label="Brief description about fitness & running history?" name="history" placeholder="Type here" />
          </div>

          <div className="reg-row c1"><Area label="If into running, please mention your best 5K /10K /HM /FM timings?" name="bestTimings" placeholder="Type here" /></div>
          <div className="reg-row c1"><Area label="Last long run distance and timings?" name="lastLongRun" placeholder="Type here" /></div>
          <div className="reg-row c1"><Area label="Any health conditions / Operations?" name="health" placeholder="Please mention" /></div>
          <div className="reg-row c1"><Area label="Any injuries / niggles (previous or current)" name="injuries" placeholder="Please mention" /></div>
          <div className="reg-row c1"><Area label="Any races planned?" name="races" placeholder="Please mention" /></div>
          <div className="reg-row c1"><Area label="Goals?" name="goals" placeholder="Please mention" /></div>

          <div className="reg-row c1">
            <label className="reg-opt">
              <input type="checkbox" name="terms" value="accepted" required />
              <span>I accept <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms &amp; conditions</a></span>
            </label>
          </div>

          <div className="reg-next">
            <button type="submit" className="reg-btn">Continue to payment &rarr;</button>
            <p className="reg-note">Next, you&apos;ll confirm your plan length and pay on a separate page.</p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function Fit2RunRegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="reg">
        <Suspense fallback={null}>
          <RegisterContent />
        </Suspense>
      </main>
      <BranchesFooter />
    </>
  );
}
