/* Shared footer: "Our Branches" — used on every page.
   Edit branch details in the `branches` array below. */

import AutoScrollRow from "./AutoScrollRow";

const EMAIL = "info@stairsphysiotherapy.in";
const HOURS = "(Monday to Saturday, 9am - 6pm)";

type Branch = {
  name: string;
  address: string;
  phones: string[];
  map: string;
};

export const branches: Branch[] = [
  {
    name: "Ulsoor",
    address: "Salma Business House, 34/1, Kensington Road, Pulikeshi Nagar, Ulsoor, Bengaluru - 560005",
    phones: ["+91 8884807132", "+91 7975849062"],
    map: "https://g.co/kgs/hL6ZMWA",
  },
  {
    name: "Koramangala",
    address: "No. 577, 4th floor, 8th Block, Ganapati Temple Road, 80 Feet Road, Koramangala, Bengaluru - 560095",
    phones: ["+91 8310331077", "+91 7975849062"],
    map: "https://g.co/kgs/dG1izWE",
  },
  {
    name: "Indiranagar",
    address: "2nd floor, MSK plaza, 100 feet road, 3rd main road, above cafe coffee day, Indiranagar, Bengaluru - 560038",
    phones: ["+91 8951027859"],
    map: "https://g.co/kgs/jjJ5wMR",
  },
  {
    name: "Whitefield",
    address: "(Swaasthya Physiotherapy and Fitness) Sree Bywaweshwara arcade, 3rd Floor, Nallurahalli Main Rd, near Spectra Palmwoods, Siddapura, Whitefield, Bengaluru - 560066",
    phones: ["+91 8050247888"],
    map: "https://g.co/kgs/x4wc4ue",
  },
  {
    name: "New BEL Road",
    address: "1st Floor, 3, 80 Feet Rd, MET Layout, Geddalahalli, R.M.V. 2nd Stage, Bengaluru, Karnataka 560094",
    phones: ["+91 8147131116"],
    map: "https://share.google/KepbMoHRAfQuIoq9I",
  },
];

const css = `
  .branches-footer { position: relative; background: var(--dark, #111111); color: #cfcfcf; padding: 70px 60px 60px; font-family: var(--font-barlow), 'Barlow', sans-serif; }
  .bf-title { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-weight: 400; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: 2px; text-transform: uppercase; color: #ffffff; text-align: center; margin: 0 0 50px; line-height: 1.1; }
  .bf-title::after { content: ''; display: block; width: 70px; height: 3px; background: var(--red, #e8372c); border-radius: 2px; margin: 14px auto 0; }
  .bf-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 40px 32px; max-width: 1400px; margin: 0 auto; }
  .bf-col { display: flex; flex-direction: column; gap: 14px; font-size: 0.88rem; line-height: 1.7; min-width: 0; }
  .bf-col h3 { font-family: var(--font-barlow), 'Barlow', sans-serif; font-weight: 800; font-size: 0.92rem; letter-spacing: 2px; text-transform: uppercase; color: #ffffff; margin: 0 0 4px; text-decoration: underline; text-decoration-color: var(--red, #e8372c); text-decoration-thickness: 2px; text-underline-offset: 7px; }
  .bf-col p { margin: 0; }
  .bf-phones { display: flex; flex-direction: column; }
  .bf-col a { color: #ffffff; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,0.4); transition: color 0.25s, text-decoration-color 0.25s; overflow-wrap: anywhere; }
  .bf-col a:hover { color: var(--red, #e8372c); text-decoration-color: var(--red, #e8372c); }
  .bf-hours { color: #a8a8a8; }

  @media (max-width: 1100px) {
    .branches-footer { padding: 60px 30px 50px; }
    .bf-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .branches-footer { padding: 48px 18px 40px; }
    .bf-title { margin-bottom: 30px; }
    .bf-grid { display: flex; flex-direction: row; align-items: stretch; gap: 14px; margin: 0 -18px; padding: 6px 18px 10px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 18px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .bf-grid::-webkit-scrollbar { display: none; }
    .bf-col { flex: 0 0 82%; max-width: 320px; scroll-snap-align: start; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 18px; }
  }
`;

export default function BranchesFooter() {
  return (
    <footer id="branches-footer" className="branches-footer">
      <style>{css}</style>
      <h2 className="bf-title">Our Branches</h2>
      <AutoScrollRow className="bf-grid">
        {branches.map((b) => (
          <div className="bf-col" key={b.name}>
            <h3>{b.name} Branch</h3>
            <p>{b.address}</p>
            <div className="bf-phones">
              {b.phones.map((p) => (
                <span key={p}>
                  Call/WhatsApp: <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                </span>
              ))}
            </div>
            <p className="bf-hours">{HOURS}</p>
            <a href={b.map} target="_blank" rel="noreferrer">View on Google Maps</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        ))}
      </AutoScrollRow>
    </footer>
  );
}
