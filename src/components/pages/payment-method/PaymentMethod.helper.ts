export const PAYMENT_GATEWAYS: { [x: string]: any } = {
  truelayer: {
    slug: "truelayer",
    method: "Instant bank transfer",
    provider: "TrueLayer",
    label: (transaction: any) => `0.00 ${transaction?.originCurrency}`,
    isRecommended: true,
  },
  interac: {
    slug: "interac",
    method: "Instant Transfer",
    provider: "Interac®",
    // label: (transaction: any) => `1.99% (${(1.99 * Number(transaction?.meta?.totalToPay) / 100).toFixed(2)} CAD)`,
    label: (transaction: any) => `0.00 CAD)`,
    maxLimit: 3000,
  },
  "trust-payment": {
    slug: "trust-payment",
    method: "Pay with card",
    provider: "Trust payment",
    label: (transaction: any) =>
      transaction?.meta?.destinationCountryCode === "CM"
        ? `0.00 ${transaction?.originCurrency}`
        : `0.99 ${transaction?.originCurrency}`,
    isRecommended: true,
  },
  "axcess-payment": {
    slug: "axcess-payment",
    method: "Pay with card",
    provider: "Axcess Merchant",
    label: (transaction: any) =>
      transaction?.meta?.destinationCountryCode === "CM"
        ? `0.00 ${transaction?.originCurrency}`
        : `0.99 ${transaction?.originCurrency}`,
    isRecommended: false,
  },
};
