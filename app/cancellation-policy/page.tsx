import type { Metadata } from "next";
import Image from "next/image";
import BranchesFooter from "@/components/BranchesFooter";

export const metadata: Metadata = {
  title: "Cancellation & Late Arrival Policy | STAIRS Physiotherapy & Fitness",
  description: "Our cancellation and late arrival policy for physiotherapy and fitness sessions at STAIRS.",
};

const css = `
  .pp-page { background: #0a0a0a; color: #cfcfcf; min-height: 100vh; font-family: var(--font-barlow), 'Barlow', sans-serif; }
  .pp-nav { position: absolute; top: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; }
  .pp-nav a.back { color: #fff; font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; border: 2px solid #e8372c; border-radius: 30px; padding: 9px 24px; transition: background 0.3s; text-decoration: none; }
  .pp-nav a.back:hover { background: #e8372c; }
  .pp-hero { padding: 150px 24px 50px; text-align: center; background: radial-gradient(ellipse 600px 260px at 50% 0%, rgba(232,55,44,0.28), transparent 70%), #0a0a0a; }
  .pp-label { display: block; font-weight: 600; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: #e8372c; margin-bottom: 10px; }
  .pp-hero h1 { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-weight: 400; font-size: clamp(2.4rem, 5.5vw, 4.2rem); letter-spacing: 2px; text-transform: uppercase; color: #fff; line-height: 1.05; margin: 0; }
  .pp-hero h1 span { color: #e8372c; }
  .pp-body { max-width: 880px; margin: 0 auto; padding: 10px 24px 90px; font-size: 1.05rem; line-height: 1.85; }
  .pp-body p { margin: 0 0 20px; }
  .pp-body strong { color: #fff; font-weight: 700; }
  .pp-body a { color: #fff; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,0.4); transition: color 0.25s; }
  .pp-body a:hover { color: #e8372c; }
  .cp-list { list-style: none; counter-reset: cp; margin: 0 0 28px; padding: 0; display: flex; flex-direction: column; gap: 16px; }
  .cp-list li { counter-increment: cp; position: relative; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 22px 20px 74px; }
  .cp-list li::before { content: counter(cp); position: absolute; left: 20px; top: 18px; width: 38px; height: 38px; border-radius: 50%; background: #e8372c; color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 1px; }
  .cp-note { border-left: 4px solid #e8372c; background: rgba(232,55,44,0.08); border-radius: 0 12px 12px 0; padding: 18px 22px; }
  @media (max-width: 768px) {
    .pp-nav { padding: 12px 18px; }
    .pp-hero { padding: 120px 18px 36px; }
    .pp-body { padding: 6px 18px 64px; font-size: 0.98rem; }
    .cp-list li { padding: 18px 16px 18px 62px; }
    .cp-list li::before { left: 14px; width: 34px; height: 34px; }
  }
`;

export default function CancellationPolicyPage() {
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
          <h1>Cancellation <span>&amp;</span> Late Arrival Policy</h1>
        </header>

        <main className="pp-body">
          <p>
            This cancellation policy supports and respects the time commitment of our clients and our physiotherapists/trainers:
          </p>

          <ol className="cp-list">
            <li>
              If an appointment is not cancelled at least 24 hours in advance (before 6pm), a no-show fee will be levied depending on the package of the session that you have selected. Request you to clear the due payment prior to the next session.
            </li>
            <li>
              If for some reason you arrive past your scheduled time, you will be attended right away for the available time that is left of your session but a full session charge will be levied.
            </li>
            <li>
              If upon late arrival you wish to reschedule your appointment, you will be catered with it but a no-show fee (depending on the package selected) will be levied. The session time can only be extended if the staff does not have the next scheduled appointment in line.
            </li>
          </ol>

          <p>
            To notify us of appointments/cancellations, kindly contact us between 08:00am to 05:00pm from Monday to Saturday: Incase if call is not answered , Kindly drop a message on Whatsapp (<a href="https://wa.me/918310331077" target="_blank" rel="noreferrer">+91-8310331077</a>).
          </p>

          <p className="cp-note">
            <strong>Please note:</strong> To cancel a session, a cancellation charge of Rs. 600/- (and 1200/- with Dr. Somya Rout) will be levied.
          </p>
        </main>

        <BranchesFooter />
      </div>
    </>
  );
}
