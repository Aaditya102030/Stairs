/**
 * Payment hook for the Fit2Run checkout page.
 *
 * The payment page (/fit2run/payment) calls startPayment() when the visitor presses Pay,
 * with the details they entered on /fit2run/register.
 * Razorpay is NOT connected yet, so this currently throws PAYMENT_NOT_CONFIGURED
 * (the page then tells the visitor to call the admin team).
 *
 * When you add Razorpay, replace the body of startPayment():
 *  1. POST `payload` to a server route (e.g. app/api/razorpay/order/route.ts).
 *     On the server, look the price up from SERVICES in lib/fit2run-plans.ts using
 *     payload.serviceId + payload.term. Do NOT trust payload.amount from the browser.
 *     Create the Razorpay order with amount * 100 (paise) using your key secret.
 *  2. Load https://checkout.razorpay.com/v1/checkout.js and open Razorpay Checkout
 *     with the returned order id and your public key id (NEXT_PUBLIC_RAZORPAY_KEY_ID).
 *  3. In the Razorpay `handler`, send the payment id + signature to a second server
 *     route that verifies the signature, then saves/emails the registration
 *     (payload.answers holds the form fields) and redirects to a thank-you page.
 */

export type CheckoutPayload = {
  serviceId: string;
  serviceName: string;
  term: number;
  /** Rupees. For display only - re-read the price on the server. */
  amount: number;
  /** Everything the visitor typed into the form, keyed by field name. */
  answers: Record<string, string>;
};

export async function startPayment(payload: CheckoutPayload): Promise<void> {
  void payload;
  throw new Error("PAYMENT_NOT_CONFIGURED");
}
