"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BranchesFooter from "@/components/BranchesFooter";
import Navbar from "@/components/SiteNav";
import { SERVICES_BY_ID, REGISTRATION_KEY, inr, termLabel } from "@/lib/fit2run-plans";
import { startPayment } from "@/lib/fit2run-payment";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&display=swap');
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
  #pm{position:relative;padding:130px 24px 90px;background:var(--darker);overflow:hidden;}
  #pm::before{content:'';position:absolute;top:-160px;right:-160px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(232,55,44,.4),transparent 65%);filter:blur(12px);pointer-events:none;}
  .pm-wrap{position:relative;max-width:1080px;margin:0 auto;}
  .pm-steps{display:flex;align-items:center;gap:10px;margin-bottom:22px;font-size:.78rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.45);}
  .pm-steps .on{color:#fff;}
  .pm-steps .dot{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.12);margin-right:8px;font-size:.78rem;}
  .pm-steps .on .dot{background:var(--red);}
  .pm-steps .bar{flex:0 0 36px;height:2px;background:rgba(255,255,255,.18);}
  .pm-head h1{font-family:var(--font-display);font-size:clamp(2.4rem,5.5vw,4rem);letter-spacing:2px;line-height:1.02;text-transform:uppercase;margin-bottom:30px;}
  .pm-head h1 span{color:var(--red);}

  .pm-grid{display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:start;}
  .pm-block{background:#141414;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:28px;margin-bottom:22px;}
  .pm-block h2{font-family:var(--font-display);font-size:1.6rem;letter-spacing:1.5px;text-transform:uppercase;font-weight:400;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .pm-block h2 a{font-family:var(--font-body);font-size:.78rem;font-weight:700;letter-spacing:1.5px;color:var(--red);text-decoration:underline;}
  .pm-detail{display:grid;grid-template-columns:130px 1fr;gap:10px 16px;font-size:.98rem;}
  .pm-detail dt{color:rgba(255,255,255,.5);}
  .pm-detail dd{word-break:break-word;}

  .pm-terms{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;}
  .pm-term{display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;background:#1b1b1b;border:2px solid rgba(255,255,255,.08);border-radius:14px;padding:16px 18px;color:#fff;font-family:var(--font-body);cursor:pointer;transition:border-color .2s,background .2s,transform .2s;}
  .pm-term:hover{border-color:rgba(232,55,44,.6);transform:translateY(-2px);}
  .pm-term.on{border-color:var(--red);background:rgba(232,55,44,.12);}
  .pm-term b{font-size:1.05rem;}
  .pm-term span{font-weight:800;font-size:1.25rem;color:#ff5a4f;}

  /* summary */
  .pm-summary{position:sticky;top:96px;background:linear-gradient(160deg,#1a0a08,#121212);border:1px solid rgba(232,55,44,.35);border-radius:20px;padding:28px 26px;}
  .pm-brand{font-family:var(--font-body);font-style:italic;font-weight:700;font-size:2rem;color:#ff5a4f;line-height:1;}
  .pm-chip{display:inline-block;margin:14px 0 6px;background:rgba(232,55,44,.15);border:1px solid rgba(232,55,44,.45);font-weight:700;font-size:.74rem;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:30px;}
  .pm-name{font-weight:700;font-size:1.15rem;line-height:1.35;}
  .pm-length{color:rgba(255,255,255,.6);font-size:.92rem;margin-top:4px;}
  .pm-total{display:flex;justify-content:space-between;align-items:baseline;margin:22px 0 20px;padding-top:18px;border-top:1px solid rgba(255,255,255,.12);}
  .pm-total span{color:rgba(255,255,255,.65);font-size:.9rem;letter-spacing:1px;text-transform:uppercase;}
  .pm-total b{font-size:2rem;color:#ff5a4f;font-weight:800;}
  .pm-pay{width:100%;background:var(--red);color:#fff;border:2px solid var(--red);border-radius:50px;padding:15px 24px;font-family:var(--font-body);font-weight:800;font-size:.95rem;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:background .25s,transform .2s;}
  .pm-pay:hover:not(:disabled){background:#c0251b;border-color:#c0251b;transform:translateY(-2px);}
  .pm-pay:disabled{opacity:.5;cursor:not-allowed;}
  .pm-msg{margin-top:18px;padding:14px 16px;border-left:4px solid var(--red);background:rgba(232,55,44,.1);font-size:.92rem;line-height:1.6;}
  .pm-help{margin-top:18px;font-size:.85rem;color:rgba(255,255,255,.5);line-height:1.6;}
  .pm-help a{color:var(--red);font-weight:700;}

  .pm-empty{max-width:620px;margin:40px auto;text-align:center;background:#141414;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:50px 30px;}
  .pm-empty h1{font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;}
  .pm-empty p{color:rgba(255,255,255,.65);margin-bottom:26px;line-height:1.6;}
  .pm-empty a{display:inline-block;background:var(--red);color:#fff;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:.85rem;padding:13px 30px;border-radius:50px;}

  @media(max-width:1100px){#navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}}
  @media(max-width:980px){
    .pm-grid{grid-template-columns:1fr;}
    .pm-summary{position:static;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    #pm{padding:110px 14px 60px;}
    .pm-block{padding:22px 18px;}
  }
  @media(max-width:480px){
    .pm-detail{grid-template-columns:1fr;gap:2px;}
    .pm-detail dd{margin-bottom:10px;}
  }
`;

function Empty({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <div className="pm-empty">
      <h1>{title}</h1>
      <p>{text}</p>
      <a href={href}>{cta}</a>
    </div>
  );
}

function PaymentContent() {
  const params = useSearchParams();
  const service = SERVICES_BY_ID[params.get("service") ?? ""];
  const terms = service ? Object.keys(service.prices).map(Number).sort((a, b) => a - b) : [];
  const preTerm = Number(params.get("term"));

  const [term, setTerm] = useState<number | null>(terms.includes(preTerm) ? preTerm : (terms[0] ?? null));
  const [details, setDetails] = useState<Record<string, string> | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  // The details page keeps the form answers in this tab's sessionStorage (not in the URL).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(REGISTRATION_KEY);
      if (raw) setDetails(JSON.parse(raw));
    } catch {
      /* nothing saved */
    }
    setReady(true);
  }, []);

  if (!service) {
    return <Empty title="Choose a plan first" text='Pick the plan you want from the Fit2Run packages and press "Pay now".' href="/fit2run#f2r-packages" cta="View packages" />;
  }

  const editHref = `/fit2run/register?service=${service.id}${term ? `&term=${term}` : ""}`;

  if (ready && !details) {
    return <Empty title="Fill in your details first" text="We need a few details about you before you pay." href={editHref} cta="Enter your details" />;
  }
  if (!ready || !details || term === null) return null;

  const amount = service.prices[term];
  const fullName = `${details.firstName ?? ""} ${details.lastName ?? ""}`.trim();

  async function pay() {
    if (!service || !details || term === null) return;
    setBusy(true);
    setMessage("");
    try {
      await startPayment({ serviceId: service.id, serviceName: service.name, term, amount: service.prices[term], answers: details });
    } catch (err) {
      setMessage(
        err instanceof Error && err.message === "PAYMENT_NOT_CONFIGURED"
          ? "Online payment is not switched on yet. Please call +91 97384 77255 to complete your booking."
          : "Something went wrong while starting the payment. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pm-wrap">
      <div className="pm-steps" aria-label="Step 2 of 2">
        <span><span className="dot">1</span>Your details</span>
        <span className="bar" />
        <span className="on"><span className="dot">2</span>Payment</span>
      </div>
      <div className="pm-head"><h1>Complete your <span>payment</span></h1></div>

      <div className="pm-grid">
        <div>
          <section className="pm-block">
            <h2>Your details <a href={editHref}>Edit</a></h2>
            <dl className="pm-detail">
              <dt>Name</dt><dd>{fullName || "-"}</dd>
              <dt>Email</dt><dd>{details.email || "-"}</dd>
              <dt>Phone</dt><dd>{details.phone || "-"}</dd>
            </dl>
          </section>

          {terms.length > 1 ? (
            <section className="pm-block">
              <h2>Plan length</h2>
              <div className="pm-terms">
                {terms.map((t) => (
                  <button key={t} type="button" aria-pressed={t === term} className={`pm-term${t === term ? " on" : ""}`} onClick={() => setTerm(t)}>
                    <b>{termLabel(t)}</b>
                    <span>{inr(service.prices[t])}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="pm-summary">
          <div className="pm-brand">Fit to Run</div>
          <span className="pm-chip">{service.group}</span>
          <div className="pm-name">{service.name}</div>
          <div className="pm-length">{termLabel(term)}</div>
          <div className="pm-total"><span>Total</span><b>{inr(amount)}</b></div>
          <button type="button" className="pm-pay" disabled={busy} onClick={pay}>
            {busy ? "Please wait..." : `Pay ${inr(amount)}`}
          </button>
          {message ? <p className="pm-msg" role="alert">{message}</p> : null}
          <p className="pm-help">Need help? Call <a href="tel:+919738477255">+91 97384 77255</a>.</p>
        </aside>
      </div>
    </div>
  );
}

export default function Fit2RunPaymentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="pm">
        <Suspense fallback={null}>
          <PaymentContent />
        </Suspense>
      </main>
      <BranchesFooter />
    </>
  );
}
