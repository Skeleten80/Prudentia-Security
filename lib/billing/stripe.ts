export const hasStripeKeys = Boolean(
  process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export type CheckoutSession = { url: string; mock: boolean };

/**
 * Placeholder checkout session. Once Stripe keys are configured, replace the
 * mock branch with a real `stripe.checkout.sessions.create(...)` call inside
 * an API route and return its hosted URL here.
 */
export async function createCheckoutSession(planName: string): Promise<CheckoutSession> {
  if (!hasStripeKeys) {
    return { url: `/dashboard/billing?mock=1&plan=${encodeURIComponent(planName)}`, mock: true };
  }

  return { url: '/api/billing/checkout', mock: false };
}
