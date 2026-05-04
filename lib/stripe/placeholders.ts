export function getStripePlaceholderSession() {
  return {
    provider: 'stripe',
    status: 'placeholder',
    products: ['Basic', 'Pro', 'Family+'],
    checkoutUrl: '/api/billing/checkout (TODO)',
  };
}
