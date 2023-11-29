export function checkPaymentCodeWithPattern(code: string): number {
  const patterns = [
    /^(000\.000\.|000\.100\.1|000\.[36]|000\.400\.[1][12]0)/,
    /^(000.400.0[^3]|000.400.100)/,
    /^(800\.400\.5|100\.400\.500)/,
    /^(000\.200)/,
  ];

  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i].test(code)) {
      return i === 0 ? 0 : 1; // return 1 if pattern matches at index 0, esle 2
    }
  }

  return 2;
}

// Result codes for successfully processed transactions /^(000.000.|000.100.1|000.[36]|000.400.[1][12]0)/
// Result codes for successfully processed transactions that should be manually reviewed /^(000.400.0[^3]|000.400.100)/
// Result codes for pending transactions /^(000\.200)/ and  /^(800\.400\.5|100\.400\.500)/
//
