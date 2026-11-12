/**
 * Payment hook for the general checkout page (/pay) - services, session
 * packages and nutrition. Fit2Run has its own hook in lib/fit2run-payment.ts.
 *
 * Razorpay is NOT connected yet, so this throws PAYMENT_NOT_CONFIGURED and the
 * page tells the visitor to call the admin team.
 *
 * To add Razorpay, replace the body of startCheckout():
 *  1. POST `payload` to a server route (e.g. app/api/pay/order/route.ts). On the
 *     server, look the price up from ITEMS_BY_ID in lib/pricing-plans.ts using
 *     payload.itemId. Do NOT trust payload.amount from the browser. Create the
 *     Razorpay order with amount * 100 (paise) using your key secret.
 *  2. Load https://checkout.razorpay.com/v1/checkout.js and open Razorpay
 *     Checkout with the returned order id and your public key id.
 *  3. In Razorpay's `handler`, send the payment id + signature to a second server
 *     route that verifies it, then saves/emails the booking (payload.answers)
 *     and shows a thank-you page.
 */

export type CheckoutPayload = {
  itemId: string;
  itemName: string;
  /** Rupees. For display only - re-read the price on the server. */
  amount: number;
  /** Everything the visitor typed into the form, keyed by field name. */
  answers: Record<string, string>;
};

export async function startCheckout(payload: CheckoutPayload): Promise<void> {
  void payload;
  throw new Error("PAYMENT_NOT_CONFIGURED");
}
