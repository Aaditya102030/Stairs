"use client";

import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import BranchesFooter, { branches } from "@/components/BranchesFooter";
import Navbar from "@/components/SiteNav";
import { CATEGORIES, PAY_ITEMS, ITEMS_BY_ID, inr } from "@/lib/pricing-plans";
import type { PayCategory } from "@/lib/pricing-plans";
import { startCheckout } from "@/lib/pay-checkout";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
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
  #pay{position:relative;padding:130px 24px 90px;background:var(--darker);overflow:hidden;}
  #pay::before{content:'';position:absolute;top:-160px;right:-160px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(232,55,44,.4),transparent 65%);filter:blur(12px);pointer-events:none;}
  .pay-wrap{position:relative;max-width:1180px;margin:0 auto;}
  .pay-head{margin-bottom:36px;}
  .pay-head .kicker{font-weight:600;font-size:.85rem;letter-spacing:3px;text-transform:uppercase;color:var(--red);display:block;margin-bottom:10px;}
  .pay-head h1{font-family:var(--font-display);font-size:clamp(2.4rem,5.5vw,4rem);letter-spacing:2px;line-height:1.02;text-transform:uppercase;}
  .pay-head h1 span{color:var(--red);}
  .pay-head p{color:rgba(255,255,255,.6);margin-top:12px;font-size:1rem;line-height:1.7;max-width:640px;}

  .pay-grid{display:grid;grid-template-columns:1fr 340px;gap:28px;align-items:start;}
  .pay-step{background:#141414;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:30px 28px;margin-bottom:22px;}
  .pay-step h2{font-family:var(--font-display);font-size:1.7rem;letter-spacing:1.5px;text-transform:uppercase;font-weight:400;margin-bottom:6px;display:flex;align-items:center;gap:12px;}
  .pay-step h2 .n{width:34px;height:34px;border-radius:50%;background:var(--red);display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-body);font-weight:800;font-size:.95rem;flex-shrink:0;}
  .pay-step .hint{color:rgba(255,255,255,.5);font-size:.92rem;margin:0 0 20px 46px;}

  .pay-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px;}
  .pay-tab{padding:9px 20px;border-radius:30px;border:1.5px solid rgba(232,55,44,.55);background:transparent;color:#fff;font-family:var(--font-body);font-size:.76rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:background .25s,border-color .25s;}
  .pay-tab:hover,.pay-tab.on{background:var(--red);border-color:var(--red);}

  .pay-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
  .pay-card{display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;background:#1b1b1b;border:2px solid rgba(255,255,255,.08);border-radius:14px;padding:16px 18px;color:#fff;font-family:var(--font-body);cursor:pointer;transition:border-color .2s,background .2s,transform .2s;}
  .pay-card:hover{border-color:rgba(232,55,44,.6);transform:translateY(-2px);}
  .pay-card.on{border-color:var(--red);background:rgba(232,55,44,.12);}
  .pay-card-name{font-weight:700;font-size:1rem;line-height:1.3;}
  .pay-card-detail{font-size:.82rem;color:rgba(255,255,255,.55);line-height:1.45;}
  .pay-card-price{margin-top:auto;padding-top:6px;font-weight:800;font-size:1.2rem;color:#ff5a4f;}

  .pay-row{display:grid;gap:18px;margin-bottom:18px;}
  .pay-row.c2{grid-template-columns:1fr 1fr;}
  .pay-row.c1{grid-template-columns:1fr;}
  .pay-field .lbl{display:block;font-size:.92rem;margin-bottom:8px;}
  .pay-field .opt{color:rgba(255,255,255,.4);font-size:.8rem;}
  .pay-field input[type=text],.pay-field input[type=tel],.pay-field input[type=email],.pay-field input[type=date],.pay-field select,.pay-field textarea{width:100%;background:#2b2b2b;border:none;border-bottom:1px solid rgba(255,255,255,.35);color:#fff;padding:13px 12px;font:inherit;font-size:1rem;border-radius:2px;outline:none;transition:border-color .2s;color-scheme:dark;}
  .pay-field input:focus,.pay-field select:focus,.pay-field textarea:focus{border-bottom-color:var(--red);}
  .pay-field ::placeholder{color:rgba(255,255,255,.4);}
  .pay-field textarea{min-height:80px;resize:vertical;}
  .pay-field select option{background:#2b2b2b;}
  .pay-check{display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:.95rem;line-height:1.5;}
  .pay-check input{-webkit-appearance:none;appearance:none;width:22px;height:22px;border:1px solid rgba(255,255,255,.5);background:#2b2b2b;border-radius:3px;display:grid;place-content:center;cursor:pointer;flex-shrink:0;margin:0;}
  .pay-check input::before{content:'';width:12px;height:12px;background:var(--red);border-radius:2px;transform:scale(0);transition:transform .15s;}
  .pay-check input:checked::before{transform:scale(1);}
  .pay-check a{color:var(--red);text-decoration:underline;}

  /* summary */
  .pay-summary{position:sticky;top:96px;background:linear-gradient(160deg,#1a0a08,#121212);border:1px solid rgba(232,55,44,.35);border-radius:20px;padding:28px 26px;}
  .pay-summary h3{font-family:var(--font-display);font-size:1.4rem;letter-spacing:2px;text-transform:uppercase;font-weight:400;color:rgba(255,255,255,.7);margin-bottom:16px;}
  .pay-sel-name{font-weight:700;font-size:1.15rem;line-height:1.35;}
  .pay-sel-detail{color:rgba(255,255,255,.55);font-size:.9rem;margin-top:4px;line-height:1.45;}
  .pay-sel-empty{color:rgba(255,255,255,.55);line-height:1.6;}
  .pay-total{display:flex;justify-content:space-between;align-items:baseline;margin:22px 0 20px;padding-top:18px;border-top:1px solid rgba(255,255,255,.12);}
  .pay-total span{color:rgba(255,255,255,.65);font-size:.9rem;letter-spacing:1px;text-transform:uppercase;}
  .pay-total b{font-size:2rem;color:#ff5a4f;font-weight:800;}
  .pay-btn{width:100%;background:var(--red);color:#fff;border:2px solid var(--red);border-radius:50px;padding:15px 24px;font-family:var(--font-body);font-weight:800;font-size:.95rem;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:background .25s,transform .2s;}
  .pay-btn:hover:not(:disabled){background:#c0251b;border-color:#c0251b;transform:translateY(-2px);}
  .pay-btn:disabled{opacity:.5;cursor:not-allowed;}
  .pay-msg{margin-top:18px;padding:14px 16px;border-left:4px solid var(--red);background:rgba(232,55,44,.1);font-size:.92rem;line-height:1.6;}
  .pay-help{margin-top:18px;font-size:.85rem;color:rgba(255,255,255,.5);line-height:1.6;}
  .pay-help a{color:var(--red);font-weight:700;}

  @media(max-width:1100px){#navbar{padding:18px 30px;}#navbar.scrolled{padding:12px 30px;}}
  @media(max-width:980px){
    .pay-grid{grid-template-columns:1fr;}
    .pay-summary{position:static;}
  }
  @media(max-width:768px){
    .nav-links{display:none;}.hamburger{display:flex;}
    #pay{padding:110px 14px 60px;}
    .pay-step{padding:24px 18px;}
    .pay-step .hint{margin-left:0;}
  }
  @media(max-width:560px){
    .pay-cards,.pay-row.c2{grid-template-columns:1fr;}
  }
`;

function PayContent() {
  const params = useSearchParams();
  const initial = ITEMS_BY_ID[params.get("item") ?? ""];
  const [category, setCategory] = useState<PayCategory>(initial?.category ?? CATEGORIES[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(initial?.id ?? null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const selected = selectedId ? ITEMS_BY_ID[selectedId] : null;
  const items = PAY_ITEMS.filter((i) => i.category === category);
  const activeCat = CATEGORIES.find((c) => c.id === category);

  async function pay() {
    const form = formRef.current;
    if (!form || !selected) return;
    if (!form.reportValidity()) return; // browser highlights the first missing field
    const answers = Object.fromEntries([...new FormData(form).entries()].map(([k, v]) => [k, String(v)]));
    setBusy(true);
    setMessage("");
    try {
      await startCheckout({ itemId: selected.id, itemName: selected.name, amount: selected.amount, answers });
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
    <div className="pay-wrap">
      <div className="pay-head">
        <span className="kicker">Stairs Physiotherapy &amp; Fitness</span>
        <h1>Choose your plan <span>&amp; pay</span></h1>
        <p>Pick the service or package you need, tell us a little about you, and pay securely online. Looking for Fit2Run? <a href="/fit2run#f2r-packages" style={{ color: "var(--red)", fontWeight: 700 }}>Use the Fit2Run packages</a>.</p>
      </div>

      <form ref={formRef} className="pay-grid" onSubmit={(e) => e.preventDefault()}>
        <div>
          {/* STEP 1 */}
          <section className="pay-step">
            <h2><span className="n">1</span> Choose your plan</h2>
            <p className="hint">{activeCat?.blurb}</p>
            <div className="pay-tabs" role="tablist">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={c.id === category}
                  className={`pay-tab${c.id === category ? " on" : ""}`}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="pay-cards">
              {items.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  aria-pressed={i.id === selectedId}
                  className={`pay-card${i.id === selectedId ? " on" : ""}`}
                  onClick={() => setSelectedId(i.id)}
                >
                  <span className="pay-card-name">{i.name}</span>
                  {i.detail ? <span className="pay-card-detail">{i.detail}</span> : null}
                  <span className="pay-card-price">{inr(i.amount)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2 */}
          <section className="pay-step">
            <h2><span className="n">2</span> Your details</h2>
            <p className="hint">So we can confirm your booking.</p>
            <div className="pay-row c2">
              <div className="pay-field"><label className="lbl" htmlFor="firstName">First name *</label><input id="firstName" name="firstName" type="text" required /></div>
              <div className="pay-field"><label className="lbl" htmlFor="lastName">Last name *</label><input id="lastName" name="lastName" type="text" required /></div>
            </div>
            <div className="pay-row c2">
              <div className="pay-field"><label className="lbl" htmlFor="phone">Phone *</label><input id="phone" name="phone" type="tel" required /></div>
              <div className="pay-field"><label className="lbl" htmlFor="email">Email address *</label><input id="email" name="email" type="email" required /></div>
            </div>
            <div className="pay-row c2">
              <div className="pay-field">
                <label className="lbl" htmlFor="branch">Preferred branch *</label>
                <select id="branch" name="branch" required defaultValue="">
                  <option value="" disabled>Select a branch</option>
                  {branches.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div className="pay-field"><label className="lbl" htmlFor="date">Preferred date <span className="opt">(optional)</span></label><input id="date" name="date" type="date" /></div>
            </div>
            <div className="pay-row c1">
              <div className="pay-field"><label className="lbl" htmlFor="notes">Anything we should know? <span className="opt">(optional)</span></label><textarea id="notes" name="notes" placeholder="Pain or injury, goals, preferred time of day..." /></div>
            </div>
            <label className="pay-check">
              <input type="checkbox" name="terms" value="accepted" required />
              <span>I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms &amp; conditions</a> and <a href="/cancellation-policy" target="_blank" rel="noopener noreferrer">cancellation policy</a></span>
            </label>
          </section>
        </div>

        {/* SUMMARY */}
        <aside className="pay-summary">
          <h3>Your selection</h3>
          {selected ? (
            <>
              <div className="pay-sel-name">{selected.name}</div>
              {selected.detail ? <div className="pay-sel-detail">{selected.detail}</div> : null}
            </>
          ) : (
            <p className="pay-sel-empty">Choose a plan on the left to see the amount.</p>
          )}
          <div className="pay-total"><span>Total</span><b>{selected ? inr(selected.amount) : "-"}</b></div>
          <button type="button" className="pay-btn" disabled={!selected || busy} onClick={pay}>
            {busy ? "Please wait..." : selected ? `Pay ${inr(selected.amount)}` : "Choose a plan"}
          </button>
          {message ? <p className="pay-msg" role="alert">{message}</p> : null}
          <p className="pay-help">Need help choosing? Call <a href="tel:+919738477255">+91 97384 77255</a> or <a href="/contact">contact us</a>.</p>
        </aside>
      </form>
    </div>
  );
}

export default function PayPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="pay">
        <Suspense fallback={null}>
          <PayContent />
        </Suspense>
      </main>
      <BranchesFooter />
    </>
  );
}
