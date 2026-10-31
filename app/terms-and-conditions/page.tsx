import type { Metadata } from "next";
import Image from "next/image";
import BranchesFooter from "@/components/BranchesFooter";

export const metadata: Metadata = {
  title: "Terms and Conditions | STAIRS Physiotherapy & Fitness",
  description: "Terms and conditions for services and programmes at STAIRS Physiotherapy and Fitness.",
};

const css = `
  .pp-page { background: #0a0a0a; color: #cfcfcf; min-height: 100vh; font-family: var(--font-barlow), 'Barlow', sans-serif; }
  .pp-nav { position: absolute; top: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; }
  .pp-nav a.back { color: #fff; font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; border: 2px solid #e8372c; border-radius: 30px; padding: 9px 24px; transition: background 0.3s; text-decoration: none; }
  .pp-nav a.back:hover { background: #e8372c; }
  .pp-hero { padding: 150px 24px 50px; text-align: center; background: radial-gradient(ellipse 600px 260px at 50% 0%, rgba(232,55,44,0.28), transparent 70%), #0a0a0a; }
  .pp-label { display: block; font-weight: 600; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: #e8372c; margin-bottom: 10px; }
  .pp-hero h1 { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-weight: 400; font-size: clamp(2.6rem, 6vw, 4.6rem); letter-spacing: 2px; text-transform: uppercase; color: #fff; line-height: 1.05; margin: 0; }
  .pp-hero h1 span { color: #e8372c; }
  .pp-body { max-width: 880px; margin: 0 auto; padding: 10px 24px 90px; font-size: 1.05rem; line-height: 1.85; }
  .pp-body strong { color: #fff; font-weight: 700; }
  .cp-list { list-style: none; counter-reset: cp; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 16px; }
  .cp-list li { counter-increment: cp; position: relative; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 22px 20px 74px; }
  .cp-list li::before { content: counter(cp); position: absolute; left: 20px; top: 18px; width: 38px; height: 38px; border-radius: 50%; background: #e8372c; color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 1px; }
  @media (max-width: 768px) {
    .pp-nav { padding: 12px 18px; }
    .pp-hero { padding: 120px 18px 36px; }
    .pp-body { padding: 6px 18px 64px; font-size: 0.98rem; }
    .cp-list li { padding: 18px 16px 18px 62px; }
    .cp-list li::before { left: 14px; width: 34px; height: 34px; }
  }
`;

const terms = [
  "100% advance payment to be made before commencement of a service/programme.",
  "If the number of sessions of a package are used up before the duration of package ends, the services will have to be renewed with a new package.",
  "Fees once paid will not be refunded if the client fails to attend sessions scheduled in advance.",
  <>Client <strong>MUST</strong> sign the consent form and provide their correct medical history records.</>,
  "All disputes are subject to KARNATAKA jurisdiction only.",
  "STAIRS Physiotherapy and Fitness will not be responsible for any injuries occurring during the Strength & Conditioning programme. However, based on the assessment of our Sports Physician, we can relax the duration of the programme by two weeks.",
  "Any programme cannot be transferred from one person to another, in part, or as a whole.",
  "Any session provided under a service will be counted as a separate session.",
  "Compliance with STAIRS Physiotherapy and Fitness recommendations on recovery and workload is important for the efficacy of the programme.",
];

export default function TermsPage() {
  return (
    <>
      <style>{css}</style>
      <div className="pp-page">
        <nav className="pp-nav">
          <a href="/">
            <Image src="/logo.png" alt="Stairs" width={140} height={70} style={{ height: 56, width: "auto" }} priority />
          </a>
          <a href="/" className="back">Back to Home</a>
        </nav>

        <header className="pp-hero">
          <span className="pp-label">Stairs Physiotherapy &amp; Fitness</span>
          <h1>Terms <span>and</span> Conditions</h1>
        </header>

        <main className="pp-body">
          <ol className="cp-list">
            {terms.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </main>

        <BranchesFooter />
      </div>
    </>
  );
}
