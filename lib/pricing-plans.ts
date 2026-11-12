/**
 * Stairs services, session packages and nutrition plans - everything that can
 * be paid for on /pay (the general checkout). Fit2Run has its own, separate
 * checkout and its prices live in lib/fit2run-plans.ts.
 *
 * THE AMOUNT HERE IS WHAT GETS CHARGED. The price text shown on the
 * /new-pricing-plan tables is separate text: if you change an amount here,
 * update the matching figure on that page too.
 *
 * Amounts are in rupees (no commas). To add a plan, add an item with a unique
 * `id`, put it in a `category`, then link to it with payUrl("<id>").
 *
 * Not payable online (so they have no item): "Group Strength & Conditioning"
 * (the rate is a range, ₹750 - ₹1200) and "Session Cancellation". Add an item
 * for them if you decide on a fixed amount.
 *
 * Assumption to check: "Physiotherapy (Basic)" and "Strength & Conditioning
 * (1-on-1)" are listed as ₹1500 - ₹1800. They are offered here as the Junior
 * (₹1500) and Senior (₹1800) single-session rates, matching the package tables.
 */

export type PayCategory = "services" | "junior" | "senior" | "nutrition";

export type PayItem = {
  id: string;
  category: PayCategory;
  name: string;
  detail?: string;
  amount: number;
};

export const CATEGORIES: { id: PayCategory; label: string; blurb: string }[] = [
  { id: "services", label: "Services", blurb: "Single sessions and treatments" },
  { id: "junior", label: "Junior Packages", blurb: "Junior Physio / S&C session packages" },
  { id: "senior", label: "Senior Packages", blurb: "Senior Physio / S&C session packages" },
  { id: "nutrition", label: "Nutrition", blurb: "Customised nutrition plans" },
];

export const PAY_ITEMS: PayItem[] = [
  /* Services */
  { id: "svc-physio-junior", category: "services", name: "Physiotherapy (Basic) - Junior", detail: "1 session", amount: 1500 },
  { id: "svc-physio-senior", category: "services", name: "Physiotherapy (Basic) - Senior", detail: "1 session", amount: 1800 },
  { id: "svc-physio-somya", category: "services", name: "Physiotherapy (with Somya)", detail: "1 session", amount: 2200 },
  { id: "svc-mfr-full", category: "services", name: "Myofascial Release (Full Body)", detail: "With physio", amount: 3000 },
  { id: "svc-mfr-half", category: "services", name: "Myofascial Release (Half Body)", detail: "With physio", amount: 2000 },
  { id: "svc-massage-full", category: "services", name: "Sports / Deep Tissue Massage (Full Body)", detail: "1 session", amount: 2500 },
  { id: "svc-massage-half", category: "services", name: "Sports / Deep Tissue Massage (Half Body)", detail: "1 session", amount: 1800 },
  { id: "svc-assessment", category: "services", name: "Assessment", detail: "1 session", amount: 1000 },
  { id: "svc-sc-junior", category: "services", name: "Strength & Conditioning (1-on-1) - Junior", detail: "1 session", amount: 1500 },
  { id: "svc-sc-senior", category: "services", name: "Strength & Conditioning (1-on-1) - Senior", detail: "1 session", amount: 1800 },
  { id: "svc-mfr-cupping", category: "services", name: "MFR + Cupping (with Masseur)", detail: "1 session", amount: 2700 },
  { id: "svc-physio-needling", category: "services", name: "Physiotherapy + Needling", detail: "1 session", amount: 1900 },

  /* Junior Physio / S&C packages (amount = after discount) */
  { id: "jr-1s", category: "junior", name: "Junior - 1 Session", detail: "1 session, valid 1 day", amount: 1500 },
  { id: "jr-1m", category: "junior", name: "Junior - 1 Month", detail: "12 sessions, valid 45 days", amount: 16800 },
  { id: "jr-3m", category: "junior", name: "Junior - 3 Months", detail: "36 sessions, valid 120 days", amount: 48600 },
  { id: "jr-6m", category: "junior", name: "Junior - 6 Months", detail: "72 sessions, valid 200 days", amount: 90000 },

  /* Senior Physio / S&C packages (amount = after discount) */
  { id: "sr-1s", category: "senior", name: "Senior - 1 Session", detail: "1 session, valid 1 day", amount: 1800 },
  { id: "sr-1m", category: "senior", name: "Senior - 1 Month", detail: "12 sessions, valid 45 days", amount: 19200 },
  { id: "sr-3m", category: "senior", name: "Senior - 3 Months", detail: "36 sessions, valid 120 days", amount: 54000 },
  { id: "sr-6m", category: "senior", name: "Senior - 6 Months", detail: "72 sessions, valid 200 days", amount: 100800 },

  /* Nutrition */
  { id: "nut-1m", category: "nutrition", name: "Nutrition - 1 Month", detail: "1 nutrition plan + 2 consultations, weekly follow-ups", amount: 7000 },
  { id: "nut-3m", category: "nutrition", name: "Nutrition - 3 Months", detail: "3 nutrition plans + 3 consultations, weekly follow-ups", amount: 18000 },
  { id: "nut-6m", category: "nutrition", name: "Nutrition - 6 Months", detail: "6 nutrition plans + 6 consultations, weekly follow-ups", amount: 38000 },
];

export const ITEMS_BY_ID: Record<string, PayItem> = Object.fromEntries(PAY_ITEMS.map((i) => [i.id, i]));

/** 4200 -> "₹4,200" */
export const inr = (amount: number): string => "\u20b9" + amount.toLocaleString("en-IN");

/** Link used by the "Pay now" buttons - opens the general checkout with this plan selected. */
export const payUrl = (id: string): string => `/pay?item=${id}`;
