export function checkPaymentCodeWithPattern(
  isTrulayerPayment: boolean,
  code: string
): number {
  const patterns = [
    /^(000\.000\.|000\.100\.1|000\.[36]|000\.400\.[1][12]0)/,
    /^(000.400.0[^3]|000.400.100)/,
    /^(800\.400\.5|100\.400\.500)/,
    /^(000\.200)/,
  ];

  if (isTrulayerPayment) {
    if (code === "executed") {
      return 0; // payment success
    } else if (code === "failed") {
      return 2; //payment failed
    } else {
      return 1; // other Trulayer payment status such as 'authorized' are defaulted to inprogress.
    }
  } else {
    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].test(code)) {
        return i === 0 ? 0 : 1; // return 0 if pattern matches at index 0, else 1
      }
    }

    return 2; // Default to failure if no pattern matches
  }
}

// Result codes for successfully processed transactions /^(000.000.|000.100.1|000.[36]|000.400.[1][12]0)/ : return 0
// Result codes for successfully processed transactions that should be manually reviewed /^(000.400.0[^3]|000.400.100)/ return 1
// Result codes for pending transactions /^(000\.200)/ and  /^(800\.400\.5|100\.400\.500)/ return 1
// else return 2, which is payment failed.

export const PaymentTitle = [
  "Payment Successful!",
  "Payment Inprogress!",
  "Payment Unsuccessful!",
  "Transfer created!",
];

export const AvatarColors = ["#87d068", "#4259cf", "#CF0921", "#4259cf"];
export const PaymentDescriptionsColors = [
  "#007B5D",
  "#4259cf",
  "#CF0921",
  "#4259cf",
];
