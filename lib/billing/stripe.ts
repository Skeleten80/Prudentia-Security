export const hasStripeKeys=Boolean(process.env.STRIPE_SECRET_KEY&&process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export async function createCheckoutSession(){return {url:hasStripeKeys?'/api/stripe/checkout':'/dashboard/billing?mock=1'}}
