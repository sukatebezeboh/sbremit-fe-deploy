//TODO: THIS hooks helps simplyfy the server app value
const PayinCountries = [
  {
    name: "Belgium",
    countryCode: "BE",
    dialCode: "+32",
    currency: "EUR",
  },
  {
    name: "Canada",
    countryCode: "CA",
    dialCode: "+1",
    currency: "CAD",
  },
  {
    name: "Denmark",
    countryCode: "DK",
    dialCode: "+45",
    currency: "DKK",
  },
  {
    name: "Finland",
    countryCode: "FI",
    dialCode: "+358",
    currency: "EUR",
  },
  {
    name: "France",
    countryCode: "FR",
    dialCode: "+33",
    currency: "EUR",
  },
  {
    name: "Germany",
    countryCode: "DE",
    dialCode: "+49",
    currency: "EUR",
  },
  {
    name: "Ireland",
    countryCode: "IE",
    dialCode: "+353",
    currency: "EUR",
  },
  {
    name: "Italy",
    countryCode: "IT",
    dialCode: "+39",
    currency: "EUR",
  },
  {
    name: "Netherlands",
    countryCode: "NL",
    dialCode: "+31",
    currency: "EUR",
  },
  {
    name: "Norway",
    countryCode: "NO",
    dialCode: "+47",
    currency: "NOK",
  },
  {
    name: "Spain",
    countryCode: "ES",
    dialCode: "+34",
    currency: "EUR",
  },
  {
    name: "Sweden",
    countryCode: "SE",
    dialCode: "+46",
    currency: "SEK",
  },
  {
    name: "Switzerland",
    countryCode: "CH",
    dialCode: "+41",
    currency: "CHF",
  },
  {
    name: "United Kingdom",
    countryCode: "GB",
    dialCode: "+44",
    currency: "GBP",
  },
  {
    name: "Andorra",
    countryCode: "AD",
    dialCode: "+376",
    currency: "EUR",
  },
] as const;

export const PayoutCountries = [
  //  LOG  {"Cameroon": "XAF", "Kenya": "KES", "Tanzania": "TZS", "Uganda": "UGX"}
  {
    name: "Cameroon",
    countryCode: "CM",
    dialCode: "+237",
    currency: "XAF",
  },
  {
    name: "Kenya",
    countryCode: "KE",
    dialCode: "+254",
    currency: "KES",
  },
  {
    name: "Tanzania",
    countryCode: "TZ",
    dialCode: "+255",
    currency: "TZS",
  },
  {
    name: "Uganda",
    countryCode: "UG",
    dialCode: "+256",
    currency: "UGX",
  },
];

export const userAppValues = () => {
  return {
    PayinCountries,
    PayoutCountries,
  };
};
