interface PaymentGateway {
  slug: string;
  method: string;
  provider: string;
  label: (transaction: any) => string;
  isRecommended: boolean;
}

export const PaymentGateWays = (
  transaction: any
): PaymentGateway[] | undefined => {
  if (transaction?.originCurrency === "GBP") {
    return [
      {
        slug: "axcess-payment",
        method: "Pay with card",
        provider: "Axcess Merchant",
        label: (transaction: any) =>
          transaction?.meta?.destinationCountryCode === "CM"
            ? `0.00 ${transaction?.originCurrency}`
            : `0.99 ${transaction?.originCurrency}`,
        isRecommended: true,
      },
      {
        slug: "truelayer",
        method: "Instant bank transfer",
        provider: "True Layer",
        label: (transaction: any) => `0.00 ${transaction?.originCurrency}`,
        isRecommended: false,
      },
    ];
  } else if (transaction?.originCurrency === "CAD") {
    return [
      {
        slug: "axcess-payment",
        method: "Pay with card",
        provider: "Axcess Merchant",
        label: (transaction: any) =>
          transaction?.meta?.destinationCountryCode === "CM"
            ? `0.00 ${transaction?.originCurrency}`
            : `0.99 ${transaction?.originCurrency}`,
        isRecommended: true,
      },
      {
        slug: "interac",
        method: "Instant bank transfer",
        provider: "Interac®",
        label: (transaction: any) =>
          `0.00 ${transaction?.originCurrency} (Free)`,
        isRecommended: false,
      },
    ];
  } else if (
    ["EUR", "NOK", "SEK", "CHF", "DKK"].includes(transaction?.originCurrency)
  ) {
    return [
      {
        slug: "axcess-payment",
        method: "Pay with card",
        provider: "Axcess Merchant",
        label: (transaction: any) =>
          transaction?.meta?.destinationCountryCode === "CM"
            ? `0.00 ${transaction?.originCurrency}`
            : `0.99 ${transaction?.originCurrency}`,
        isRecommended: true,
      },
    ];
  }
};