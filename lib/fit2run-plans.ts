/**
 * Fit2Run charges - the ONE place to change prices.
 *
 * Every price on the Fit2Run packages tables AND on the checkout page
 * (/fit2run/register) is read from here. Edit an amount below and both update.
 *
 * `prices` is keyed by plan length in months, amounts are in rupees (no commas).
 * To remove a duration, delete it from `prices`; to add one, add another key.
 * (The Nutrition Charges table is plain text and is not part of checkout.)
 */

export type Service = {
  id: string;
  name: string;
  group: string;
  prices: Record<number, number>;
};

export const SERVICES: Service[] = [
  /* Running plan only */
  { id: "running", name: "Running Plan", group: "Running Plan", prices: { 3: 4200, 6: 8400, 12: 16800 } },

  /* All-inclusive program (3 and 6 months) */
  { id: "allinc-running", name: "Running Plan", group: "All-Inclusive Program", prices: { 3: 4200, 6: 8400 } },
  { id: "allinc-physio", name: "Physiotherapy", group: "All-Inclusive Program", prices: { 3: 7200, 6: 14400 } },
  { id: "allinc-massage", name: "Deep Tissue Massage", group: "All-Inclusive Program", prices: { 3: 12000, 6: 24000 } },
  { id: "allinc-nutrition", name: "Nutrition Plan", group: "All-Inclusive Program", prices: { 3: 14400, 6: 30400 } },
  { id: "allinc-sc", name: "Strength & Conditioning", group: "All-Inclusive Program", prices: { 3: 7200, 6: 14400 } },
  { id: "allinc-total", name: "Complete All-Inclusive Program", group: "All-Inclusive Program", prices: { 3: 45000, 6: 91600 } },

  /* Hybrid training package (1 month) */
  { id: "hybrid-running", name: "Running Program", group: "Hybrid Training", prices: { 1: 1600 } },
  { id: "hybrid-sc", name: "1-to-1 Strength & Conditioning", group: "Hybrid Training", prices: { 1: 11200 } },
  { id: "hybrid-weekend", name: "Group Weekend Simulation", group: "Hybrid Training", prices: { 1: 14400 } },
  { id: "hybrid-nutrition", name: "Nutrition Plan", group: "Hybrid Training", prices: { 1: 5800 } },
  { id: "hybrid-recovery", name: "Recovery - Deep Tissue / Massage", group: "Hybrid Training", prices: { 1: 4000 } },
  { id: "hybrid-total", name: "Complete Hybrid Training Package", group: "Hybrid Training", prices: { 1: 36800 } },
];

export const SERVICES_BY_ID: Record<string, Service> = Object.fromEntries(SERVICES.map((s) => [s.id, s]));

/** Amount in rupees for a service + duration. */
export const price = (id: string, months: number): number => SERVICES_BY_ID[id].prices[months];

/** 4200 -> "₹4,200" */
export const inr = (amount: number): string => "\u20b9" + amount.toLocaleString("en-IN");

export const termLabel = (months: number): string => (months === 1 ? "1 month" : `${months} months`);

/** Where the details form's answers are kept (this browser tab only) between the details page and the payment page. */
export const REGISTRATION_KEY = "fit2run-registration";

/** Link used by the "Pay now" buttons on the packages tables (opens the details page; payment is the next page). */
export const payHref = (id: string, months?: number): string =>
  `/fit2run/register?service=${id}${months ? `&term=${months}` : ""}`;
