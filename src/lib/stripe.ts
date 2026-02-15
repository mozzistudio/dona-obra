import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

export async function createPaymentIntent(
  amount: number,
  metadata: Record<string, string>
) {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata,
  });
}

export async function createConnectAccount(email: string) {
  return await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
}

export async function createAccountLink(accountId: string, returnUrl: string, refreshUrl: string) {
  return await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
}
