export const REASONS = [
    "Family & Friend support",
    "Tuition fee",
    "Rents",
    "Utility Bill Payment",
    "Hospital Bill",
    "Ceremonies",
    "Sending to self",
    "Airtime",
    "Debt repayment",
    "Construction project",
    "Njangi",
    "Other"
];

export const BANK_NAMES = [
   "ABC CAPITAL BANK LIMITED",
   "EAST AFRICAN DEVELOPMENT BANK",
   "BANK OF AFRICA-UGANDA LTD",
   "BANK OF BARODA UGANDA LIMITED",
   "ABSA BANK OF UGANDA LTD",
   "BANK OF INDIA UGANDA LTD",
   "CAIRO INTERNATIONAL BANK LTD",
   "COMMERCIAL BANK OF AFRICA UGANDA",
   "CENTENARY RURAL DEVELOPMENT BANK",
   "CITIBANK UGANDA LIMITED",
   "DFCU BANK LIMITED",
   "DIAMOND TRUST BANK UGANDA",
   "ECOBANK UGANDA",
   "EQUITY BANK UGANDA LTD",
   "EXIM BANK UGANDA LIMITED",
   "FINANCE TRUST BANK LTD",
   "GUARANTY TRUST BANK UGANDA",
   "HOUSING FINANCE BANK LTD",
   "KCB BANK UGANDA LIMITED",
   "NC BANK UGANDA LIMITED",
   "OPPORTUNITY BANK UGANDA",
   "ORIENT BANK LIMITED",
   "STANBIC BANK UGANDA",
   "STANDARD CHARTERED BANK UGANDA",
   "TOP FINANCE BANK LIMITED",
   "TROPICAL BANK LTD",
   "POSTBANK UGANDA LIMITED",
   "UNITED BANK FOR AFRICA UGANDA",
];
export const remittanceHandlers: any = {
   PIVOT_REMITTANCE_HANDLER: "PIVOT",
   MANUAL_REMITTANCE_HANDLER: "MANUAL"
}

// these criteria are properties as present on the redux transfer object
export const remittanceHandlersTransferCriteria: any[] = [
   {
      handler: remittanceHandlers.PIVOT_REMITTANCE_HANDLER,
      toReceive: {
         currency: [ "KES", "UGX", "TZS" ]
      },
      transferMethod: "mobile_money",
   }
]

export const maxTransfersUnverified: any = {
  GBP: 800,
  CAD: Number.MAX_SAFE_INTEGER,
  EUR: Number.MAX_SAFE_INTEGER
}

export const currencySymbols: any = {
  GBP: "£",
  CAD: "CA$",
  EUR: "€"
}

export interface CountryType {
  countryCode: string;
  name: string;
  phoneCode: string;
  countryCodeAlt: string;
}
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countriesAndCodes: readonly CountryType[] = [
  {
     "countryCode":"AD",
     "name":"Andorra",
     "phoneCode":"376",
     "countryCodeAlt":"AND"
  },
  {
     "countryCode":"AE",
     "name":"United Arab Emirates",
     "phoneCode":"971",
     "countryCodeAlt":"ARE"
  },
  {
     "countryCode":"AF",
     "name":"Afghanistan",
     "phoneCode":"93",
     "countryCodeAlt":"AFG"
  },
  {
     "countryCode":"AG",
     "name":"Antigua and Barbuda",
     "phoneCode":"1-268",
     "countryCodeAlt":"ATG"
  },
  {
     "countryCode":"AI",
     "name":"Anguilla",
     "phoneCode":"1-264",
     "countryCodeAlt":"AIA"
  },
  {
     "countryCode":"AL",
     "name":"Albania",
     "phoneCode":"355",
     "countryCodeAlt":"ALB"
  },
  {
     "countryCode":"AM",
     "name":"Armenia",
     "phoneCode":"374",
     "countryCodeAlt":"ARM"
  },
  {
     "countryCode":"AO",
     "name":"Angola",
     "phoneCode":"244",
     "countryCodeAlt":"AGO"
  },
  {
     "countryCode":"AQ",
     "name":"Antarctica",
     "phoneCode":"672",
     "countryCodeAlt":"ATA"
  },
  {
     "countryCode":"AR",
     "name":"Argentina",
     "phoneCode":"54",
     "countryCodeAlt":"ARG"
  },
  {
     "countryCode":"AS",
     "name":"American Samoa",
     "phoneCode":"1-684",
     "countryCodeAlt":"ASM"
  },
  {
     "countryCode":"AT",
     "name":"Austria",
     "phoneCode":"43",
     "countryCodeAlt":"AUT"
  },
  {
     "countryCode":"AU",
     "name":"Australia",
     "phoneCode":"61",
     "countryCodeAlt":"AUS"
  },
  {
     "countryCode":"AW",
     "name":"Aruba",
     "phoneCode":"297",
     "countryCodeAlt":"ABW"
  },
  {
     "countryCode":"AX",
     "name":"Alland Islands",
     "phoneCode":"358",
     "countryCodeAlt":"ALA"
  },
  {
     "countryCode":"AZ",
     "name":"Azerbaijan",
     "phoneCode":"994",
     "countryCodeAlt":"AZE"
  },
  {
     "countryCode":"BA",
     "name":"Bosnia and Herzegovina",
     "phoneCode":"387",
     "countryCodeAlt":"BIH"
  },
  {
     "countryCode":"BB",
     "name":"Barbados",
     "phoneCode":"1-246",
     "countryCodeAlt":"BRB"
  },
  {
     "countryCode":"BD",
     "name":"Bangladesh",
     "phoneCode":"880",
     "countryCodeAlt":"BGD"
  },
  {
     "countryCode":"BE",
     "name":"Belgium",
     "phoneCode":"32",
     "countryCodeAlt":"BEL"
  },
  {
     "countryCode":"BF",
     "name":"Burkina Faso",
     "phoneCode":"226",
     "countryCodeAlt":"BFA"
  },
  {
     "countryCode":"BG",
     "name":"Bulgaria",
     "phoneCode":"359",
     "countryCodeAlt":"BGR"
  },
  {
     "countryCode":"BH",
     "name":"Bahrain",
     "phoneCode":"973",
     "countryCodeAlt":"BHR"
  },
  {
     "countryCode":"BI",
     "name":"Burundi",
     "phoneCode":"257",
     "countryCodeAlt":"BDI"
  },
  {
     "countryCode":"BJ",
     "name":"Benin",
     "phoneCode":"229",
     "countryCodeAlt":"BEN"
  },
  {
     "countryCode":"BL",
     "name":"Saint Barthelemy",
     "phoneCode":"590",
     "countryCodeAlt":"BLM"
  },
  {
     "countryCode":"BM",
     "name":"Bermuda",
     "phoneCode":"1-441",
     "countryCodeAlt":"BMU"
  },
  {
     "countryCode":"BN",
     "name":"Brunei Darussalam",
     "phoneCode":"673",
     "countryCodeAlt":"BRN"
  },
  {
     "countryCode":"BO",
     "name":"Bolivia",
     "phoneCode":"591",
     "countryCodeAlt":"BOL"
  },
  {
     "countryCode":"BR",
     "name":"Brazil",
     "phoneCode":"55",
     "countryCodeAlt":"BRA"
  },
  {
     "countryCode":"BS",
     "name":"Bahamas",
     "phoneCode":"1-242",
     "countryCodeAlt":"BHS"
  },
  {
     "countryCode":"BT",
     "name":"Bhutan",
     "phoneCode":"975",
     "countryCodeAlt":"BTN"
  },
  {
     "countryCode":"BV",
     "name":"Bouvet Island",
     "phoneCode":"47",
     "countryCodeAlt":"BVT"
  },
  {
     "countryCode":"BW",
     "name":"Botswana",
     "phoneCode":"267",
     "countryCodeAlt":"BWA"
  },
  {
     "countryCode":"BY",
     "name":"Belarus",
     "phoneCode":"375",
     "countryCodeAlt":"BLR"
  },
  {
     "countryCode":"BZ",
     "name":"Belize",
     "phoneCode":"501",
     "countryCodeAlt":"BLZ"
  },
  {
     "countryCode":"CA",
     "name":"Canada",
     "phoneCode":"1",
     "countryCodeAlt":"CAN"
  },
  {
     "countryCode":"CC",
     "name":"Cocos (Keeling) Islands",
     "phoneCode":"61",
     "countryCodeAlt":"CCK"
  },
  {
     "countryCode":"CD",
     "name":"Congo, Democratic Republic of the",
     "phoneCode":"243",
     "countryCodeAlt":"COD"
  },
  {
     "countryCode":"CF",
     "name":"Central African Republic",
     "phoneCode":"236",
     "countryCodeAlt":"CAF"
  },
  {
     "countryCode":"CG",
     "name":"Congo Brazzaville",
     "phoneCode":"242",
     "countryCodeAlt":"COG"
  },
  {
     "countryCode":"CH",
     "name":"Switzerland",
     "phoneCode":"41",
     "countryCodeAlt":"CHE"
  },
  {
     "countryCode":"CI",
     "name":"Cote d'Ivoire",
     "phoneCode":"225",
     "countryCodeAlt":"CIV"
  },
  {
     "countryCode":"CK",
     "name":"Cook Islands",
     "phoneCode":"682",
     "countryCodeAlt":"COK"
  },
  {
     "countryCode":"CL",
     "name":"Chile",
     "phoneCode":"56",
     "countryCodeAlt":"CHL"
  },
  {
     "countryCode":"CM",
     "name":"Cameroon",
     "phoneCode":"237",
     "countryCodeAlt":"CMR"
  },
  {
     "countryCode":"CN",
     "name":"China",
     "phoneCode":"86",
     "countryCodeAlt":"CHN"
  },
  {
     "countryCode":"CO",
     "name":"Colombia",
     "phoneCode":"57",
     "countryCodeAlt":"COL"
  },
  {
     "countryCode":"CR",
     "name":"Costa Rica",
     "phoneCode":"506",
     "countryCodeAlt":"CRI"
  },
  {
     "countryCode":"CU",
     "name":"Cuba",
     "phoneCode":"53",
     "countryCodeAlt":"CUB"
  },
  {
     "countryCode":"CV",
     "name":"Cape Verde",
     "phoneCode":"238",
     "countryCodeAlt":"CPV"
  },
  {
     "countryCode":"CW",
     "name":"Curacao",
     "phoneCode":"599",
     "countryCodeAlt":"CUW"
  },
  {
     "countryCode":"CX",
     "name":"Christmas Island",
     "phoneCode":"61",
     "countryCodeAlt":"CXR"
  },
  {
     "countryCode":"CY",
     "name":"Cyprus",
     "phoneCode":"357",
     "countryCodeAlt":"CYP"
  },
  {
     "countryCode":"CZ",
     "name":"Czech Republic",
     "phoneCode":"420",
     "countryCodeAlt":"CZE"
  },
  {
     "countryCode":"DE",
     "name":"Germany",
     "phoneCode":"49",
     "countryCodeAlt":"DEU"
  },
  {
     "countryCode":"DJ",
     "name":"Djibouti",
     "phoneCode":"253",
     "countryCodeAlt":"DJI"
  },
  {
     "countryCode":"DK",
     "name":"Denmark",
     "phoneCode":"45",
     "countryCodeAlt":"DNK"
  },
  {
     "countryCode":"DM",
     "name":"Dominica",
     "phoneCode":"1-767",
     "countryCodeAlt":"DMA"
  },
  {
     "countryCode":"DO",
     "name":"Dominican Republic",
     "phoneCode":"1-809",
     "countryCodeAlt":"DOM"
  },
  {
     "countryCode":"DZ",
     "name":"Algeria",
     "phoneCode":"213",
     "countryCodeAlt":"DZA"
  },
  {
     "countryCode":"EC",
     "name":"Ecuador",
     "phoneCode":"593",
     "countryCodeAlt":"ECU"
  },
  {
     "countryCode":"EE",
     "name":"Estonia",
     "phoneCode":"372",
     "countryCodeAlt":"EST"
  },
  {
     "countryCode":"EG",
     "name":"Egypt",
     "phoneCode":"20",
     "countryCodeAlt":"EGY"
  },
  {
     "countryCode":"EH",
     "name":"Western Sahara",
     "phoneCode":"212",
     "countryCodeAlt":"ESH"
  },
  {
     "countryCode":"ER",
     "name":"Eritrea",
     "phoneCode":"291",
     "countryCodeAlt":"ERI"
  },
  {
     "countryCode":"ES",
     "name":"Spain",
     "phoneCode":"34",
     "countryCodeAlt":"ESP"
  },
  {
     "countryCode":"ET",
     "name":"Ethiopia",
     "phoneCode":"251",
     "countryCodeAlt":"ETH"
  },
  {
     "countryCode":"FI",
     "name":"Finland",
     "phoneCode":"358",
     "countryCodeAlt":"FIN"
  },
  {
     "countryCode":"FJ",
     "name":"Fiji",
     "phoneCode":"679",
     "countryCodeAlt":"FJI"
  },
  {
     "countryCode":"FK",
     "name":"Falkland Islands (Malvinas)",
     "phoneCode":"500",
     "countryCodeAlt":"FLK"
  },
  {
     "countryCode":"FM",
     "name":"Micronesia, Federated States of",
     "phoneCode":"691",
     "countryCodeAlt":"FSM"
  },
  {
     "countryCode":"FO",
     "name":"Faroe Islands",
     "phoneCode":"298",
     "countryCodeAlt":"FRO"
  },
  {
     "countryCode":"FR",
     "name":"France",
     "phoneCode":"33",
     "countryCodeAlt":"FRA"
  },
  {
     "countryCode":"GA",
     "name":"Gabon",
     "phoneCode":"241",
     "countryCodeAlt":"GAB"
  },
  {
     "countryCode":"GB",
     "name":"United Kingdom",
     "phoneCode":"44",
     "countryCodeAlt":"GBR"
  },
  {
     "countryCode":"GD",
     "name":"Grenada",
     "phoneCode":"1-473",
     "countryCodeAlt":"GRD"
  },
  {
     "countryCode":"GE",
     "name":"Georgia",
     "phoneCode":"995",
     "countryCodeAlt":"GEO"
  },
  {
     "countryCode":"GF",
     "name":"French Guiana",
     "phoneCode":"594",
     "countryCodeAlt":"GUF"
  },
  {
     "countryCode":"GG",
     "name":"Guernsey",
     "phoneCode":"44",
     "countryCodeAlt":"GGY"
  },
  {
     "countryCode":"GH",
     "name":"Ghana",
     "phoneCode":"233",
     "countryCodeAlt":"GHA"
  },
  {
     "countryCode":"GI",
     "name":"Gibraltar",
     "phoneCode":"350",
     "countryCodeAlt":"GIB"
  },
  {
     "countryCode":"GL",
     "name":"Greenland",
     "phoneCode":"299",
     "countryCodeAlt":"GRL"
  },
  {
     "countryCode":"GM",
     "name":"Gambia",
     "phoneCode":"220",
     "countryCodeAlt":"GMB"
  },
  {
     "countryCode":"GN",
     "name":"Guinea",
     "phoneCode":"224",
     "countryCodeAlt":"GIN"
  },
  {
     "countryCode":"GP",
     "name":"Guadeloupe",
     "phoneCode":"590",
     "countryCodeAlt":"GLP"
  },
  {
     "countryCode":"GQ",
     "name":"Equatorial Guinea",
     "phoneCode":"240",
     "countryCodeAlt":"GNQ"
  },
  {
     "countryCode":"GR",
     "name":"Greece",
     "phoneCode":"30",
     "countryCodeAlt":"GRC"
  },
  {
     "countryCode":"GS",
     "name":"South Georgia and the South Sandwich Islands",
     "phoneCode":"500",
     "countryCodeAlt":"SGS"
  },
  {
     "countryCode":"GT",
     "name":"Guatemala",
     "phoneCode":"502",
     "countryCodeAlt":"GTM"
  },
  {
     "countryCode":"GU",
     "name":"Guam",
     "phoneCode":"1-671",
     "countryCodeAlt":"GUM"
  },
  {
     "countryCode":"GW",
     "name":"Guinea-Bissau",
     "phoneCode":"245",
     "countryCodeAlt":"GNB"
  },
  {
     "countryCode":"GY",
     "name":"Guyana",
     "phoneCode":"592",
     "countryCodeAlt":"GUY"
  },
  {
     "countryCode":"HK",
     "name":"Hong Kong",
     "phoneCode":"852",
     "countryCodeAlt":"HKG"
  },
  {
     "countryCode":"HM",
     "name":"Heard Island and McDonald Islands",
     "phoneCode":"672",
     "countryCodeAlt":"HMD"
  },
  {
     "countryCode":"HN",
     "name":"Honduras",
     "phoneCode":"504",
     "countryCodeAlt":"HND"
  },
  {
     "countryCode":"HR",
     "name":"Croatia",
     "phoneCode":"385",
     "countryCodeAlt":"HRV"
  },
  {
     "countryCode":"HT",
     "name":"Haiti",
     "phoneCode":"509",
     "countryCodeAlt":"HTI"
  },
  {
     "countryCode":"HU",
     "name":"Hungary",
     "phoneCode":"36",
     "countryCodeAlt":"HUN"
  },
  {
     "countryCode":"ID",
     "name":"Indonesia",
     "phoneCode":"62",
     "countryCodeAlt":"IDN"
  },
  {
     "countryCode":"IE",
     "name":"Ireland",
     "phoneCode":"353",
     "countryCodeAlt":"IRL"
  },
  {
     "countryCode":"IL",
     "name":"Israel",
     "phoneCode":"972",
     "countryCodeAlt":"ISR"
  },
  {
     "countryCode":"IM",
     "name":"Isle of Man",
     "phoneCode":"44",
     "countryCodeAlt":"IMN"
  },
  {
     "countryCode":"IN",
     "name":"India",
     "phoneCode":"91",
     "countryCodeAlt":"IND"
  },
  {
     "countryCode":"IO",
     "name":"British Indian Ocean Territory",
     "phoneCode":"246",
     "countryCodeAlt":"IOT"
  },
  {
     "countryCode":"IQ",
     "name":"Iraq",
     "phoneCode":"964",
     "countryCodeAlt":"IRQ"
  },
  {
     "countryCode":"IR",
     "name":"Iran, Islamic Republic of",
     "phoneCode":"98",
     "countryCodeAlt":"IRN"
  },
  {
     "countryCode":"IS",
     "name":"Iceland",
     "phoneCode":"354",
     "countryCodeAlt":"ISL"
  },
  {
     "countryCode":"IT",
     "name":"Italy",
     "phoneCode":"39",
     "countryCodeAlt":"ITA"
  },
  {
     "countryCode":"JE",
     "name":"Jersey",
     "phoneCode":"44",
     "countryCodeAlt":"JEY"
  },
  {
     "countryCode":"JM",
     "name":"Jamaica",
     "phoneCode":"1-876",
     "countryCodeAlt":"JAM"
  },
  {
     "countryCode":"JO",
     "name":"Jordan",
     "phoneCode":"962",
     "countryCodeAlt":"JOR"
  },
  {
     "countryCode":"JP",
     "name":"Japan",
     "phoneCode":"81",
     "countryCodeAlt":"JPN"
  },
  {
     "countryCode":"KE",
     "name":"Kenya",
     "phoneCode":"254",
     "countryCodeAlt":"KEN",
  },
  {
     "countryCode":"KG",
     "name":"Kyrgyzstan",
     "phoneCode":"996",
     "countryCodeAlt":"KGZ"
  },
  {
     "countryCode":"KH",
     "name":"Cambodia",
     "phoneCode":"855",
     "countryCodeAlt":"KHM"
  },
  {
     "countryCode":"KI",
     "name":"Kiribati",
     "phoneCode":"686",
     "countryCodeAlt":"KIR"
  },
  {
     "countryCode":"KM",
     "name":"Comoros",
     "phoneCode":"269",
     "countryCodeAlt":"COM"
  },
  {
     "countryCode":"KN",
     "name":"Saint Kitts and Nevis",
     "phoneCode":"1-869",
     "countryCodeAlt":"KNA"
  },
  {
     "countryCode":"KP",
     "name":"Korea, Democratic People's Republic of",
     "phoneCode":"850",
     "countryCodeAlt":"PRK"
  },
  {
     "countryCode":"KR",
     "name":"Korea, Republic of",
     "phoneCode":"82",
     "countryCodeAlt":"KOR"
  },
  {
     "countryCode":"KW",
     "name":"Kuwait",
     "phoneCode":"965",
     "countryCodeAlt":"KWT"
  },
  {
     "countryCode":"KY",
     "name":"Cayman Islands",
     "phoneCode":"1-345",
     "countryCodeAlt":"CYM"
  },
  {
     "countryCode":"KZ",
     "name":"Kazakhstan",
     "phoneCode":"7",
     "countryCodeAlt":"KAZ"
  },
  {
     "countryCode":"LA",
     "name":"Lao People's Democratic Republic",
     "phoneCode":"856",
     "countryCodeAlt":"LAO"
  },
  {
     "countryCode":"LB",
     "name":"Lebanon",
     "phoneCode":"961",
     "countryCodeAlt":"LBN"
  },
  {
     "countryCode":"LC",
     "name":"Saint Lucia",
     "phoneCode":"1-758",
     "countryCodeAlt":"LCA"
  },
  {
     "countryCode":"LI",
     "name":"Liechtenstein",
     "phoneCode":"423",
     "countryCodeAlt":"LIE"
  },
  {
     "countryCode":"LK",
     "name":"Sri Lanka",
     "phoneCode":"94",
     "countryCodeAlt":"LKA"
  },
  {
     "countryCode":"LR",
     "name":"Liberia",
     "phoneCode":"231",
     "countryCodeAlt":"LBR"
  },
  {
     "countryCode":"LS",
     "name":"Lesotho",
     "phoneCode":"266",
     "countryCodeAlt":"LSO"
  },
  {
     "countryCode":"LT",
     "name":"Lithuania",
     "phoneCode":"370",
     "countryCodeAlt":"LTU"
  },
  {
     "countryCode":"LU",
     "name":"Luxembourg",
     "phoneCode":"352",
     "countryCodeAlt":"LUX"
  },
  {
     "countryCode":"LV",
     "name":"Latvia",
     "phoneCode":"371",
     "countryCodeAlt":"LVA"
  },
  {
     "countryCode":"LY",
     "name":"Libya",
     "phoneCode":"218",
     "countryCodeAlt":"LBY"
  },
  {
     "countryCode":"MA",
     "name":"Morocco",
     "phoneCode":"212",
     "countryCodeAlt":"MAR"
  },
  {
     "countryCode":"MC",
     "name":"Monaco",
     "phoneCode":"377",
     "countryCodeAlt":"MCO"
  },
  {
     "countryCode":"MD",
     "name":"Moldova, Republic of",
     "phoneCode":"373",
     "countryCodeAlt":"MDA"
  },
  {
     "countryCode":"ME",
     "name":"Montenegro",
     "phoneCode":"382",
     "countryCodeAlt":"MNE"
  },
  {
     "countryCode":"MF",
     "name":"Saint Martin (French part)",
     "phoneCode":"590",
     "countryCodeAlt":"MAF"
  },
  {
     "countryCode":"MG",
     "name":"Madagascar",
     "phoneCode":"261",
     "countryCodeAlt":"MDG"
  },
  {
     "countryCode":"MH",
     "name":"Marshall Islands",
     "phoneCode":"692",
     "countryCodeAlt":"MHL"
  },
  {
     "countryCode":"MK",
     "name":"Macedonia, the Former Yugoslav Republic of",
     "phoneCode":"389",
     "countryCodeAlt":"MKD"
  },
  {
     "countryCode":"ML",
     "name":"Mali",
     "phoneCode":"223",
     "countryCodeAlt":"MLI"
  },
  {
     "countryCode":"MM",
     "name":"Myanmar",
     "phoneCode":"95",
     "countryCodeAlt":"MMR"
  },
  {
     "countryCode":"MN",
     "name":"Mongolia",
     "phoneCode":"976",
     "countryCodeAlt":"MNG"
  },
  {
     "countryCode":"MO",
     "name":"Macao",
     "phoneCode":"853",
     "countryCodeAlt":"MAC"
  },
  {
     "countryCode":"MP",
     "name":"Northern Mariana Islands",
     "phoneCode":"1-670",
     "countryCodeAlt":"MNP"
  },
  {
     "countryCode":"MQ",
     "name":"Martinique",
     "phoneCode":"596",
     "countryCodeAlt":"MTQ"
  },
  {
     "countryCode":"MR",
     "name":"Mauritania",
     "phoneCode":"222",
     "countryCodeAlt":"MRT"
  },
  {
     "countryCode":"MS",
     "name":"Montserrat",
     "phoneCode":"1-664",
     "countryCodeAlt":"MSR"
  },
  {
     "countryCode":"MT",
     "name":"Malta",
     "phoneCode":"356",
     "countryCodeAlt":"MLT"
  },
  {
     "countryCode":"MU",
     "name":"Mauritius",
     "phoneCode":"230",
     "countryCodeAlt":"MUS"
  },
  {
     "countryCode":"MV",
     "name":"Maldives",
     "phoneCode":"960",
     "countryCodeAlt":"MDV"
  },
  {
     "countryCode":"MW",
     "name":"Malawi",
     "phoneCode":"265",
     "countryCodeAlt":"MWI"
  },
  {
     "countryCode":"MX",
     "name":"Mexico",
     "phoneCode":"52",
     "countryCodeAlt":"MEX"
  },
  {
     "countryCode":"MY",
     "name":"Malaysia",
     "phoneCode":"60",
     "countryCodeAlt":"MYS"
  },
  {
     "countryCode":"MZ",
     "name":"Mozambique",
     "phoneCode":"258",
     "countryCodeAlt":"MOZ"
  },
  {
     "countryCode":"NA",
     "name":"Namibia",
     "phoneCode":"264",
     "countryCodeAlt":"NAM"
  },
  {
     "countryCode":"NC",
     "name":"New Caledonia",
     "phoneCode":"687",
     "countryCodeAlt":"NCL"
  },
  {
     "countryCode":"NE",
     "name":"Niger",
     "phoneCode":"227",
     "countryCodeAlt":"NER"
  },
  {
     "countryCode":"NF",
     "name":"Norfolk Island",
     "phoneCode":"672",
     "countryCodeAlt":"NFK"
  },
  {
     "countryCode":"NG",
     "name":"Nigeria",
     "phoneCode":"234",
     "countryCodeAlt":"NGA"
  },
  {
     "countryCode":"NI",
     "name":"Nicaragua",
     "phoneCode":"505",
     "countryCodeAlt":"NIC"
  },
  {
     "countryCode":"NL",
     "name":"Netherlands",
     "phoneCode":"31",
     "countryCodeAlt":"NLD"
  },
  {
     "countryCode":"NO",
     "name":"Norway",
     "phoneCode":"47",
     "countryCodeAlt":"NOR"
  },
  {
     "countryCode":"NP",
     "name":"Nepal",
     "phoneCode":"977",
     "countryCodeAlt":"NPL"
  },
  {
     "countryCode":"NR",
     "name":"Nauru",
     "phoneCode":"674",
     "countryCodeAlt":"NRU"
  },
  {
     "countryCode":"NU",
     "name":"Niue",
     "phoneCode":"683",
     "countryCodeAlt":"NIU"
  },
  {
     "countryCode":"NZ",
     "name":"New Zealand",
     "phoneCode":"64",
     "countryCodeAlt":"NZL"
  },
  {
     "countryCode":"OM",
     "name":"Oman",
     "phoneCode":"968",
     "countryCodeAlt":"OMN"
  },
  {
     "countryCode":"PA",
     "name":"Panama",
     "phoneCode":"507",
     "countryCodeAlt":"PAN"
  },
  {
     "countryCode":"PE",
     "name":"Peru",
     "phoneCode":"51",
     "countryCodeAlt":"PER"
  },
  {
     "countryCode":"PF",
     "name":"French Polynesia",
     "phoneCode":"689",
     "countryCodeAlt":"PYF"
  },
  {
     "countryCode":"PG",
     "name":"Papua New Guinea",
     "phoneCode":"675",
     "countryCodeAlt":"PNG"
  },
  {
     "countryCode":"PH",
     "name":"Philippines",
     "phoneCode":"63",
     "countryCodeAlt":"PHL"
  },
  {
     "countryCode":"PK",
     "name":"Pakistan",
     "phoneCode":"92",
     "countryCodeAlt":"PAK"
  },
  {
     "countryCode":"PL",
     "name":"Poland",
     "phoneCode":"48",
     "countryCodeAlt":"POL"
  },
  {
     "countryCode":"PM",
     "name":"Saint Pierre and Miquelon",
     "phoneCode":"508",
     "countryCodeAlt":"SPM"
  },
  {
     "countryCode":"PN",
     "name":"Pitcairn",
     "phoneCode":"870",
     "countryCodeAlt":"PCN"
  },
  {
     "countryCode":"PR",
     "name":"Puerto Rico",
     "phoneCode":"1",
     "countryCodeAlt":"PRI"
  },
  {
     "countryCode":"PS",
     "name":"Palestine, State of",
     "phoneCode":"970",
     "countryCodeAlt":"PSE"
  },
  {
     "countryCode":"PT",
     "name":"Portugal",
     "phoneCode":"351",
     "countryCodeAlt":"PRT"
  },
  {
     "countryCode":"PW",
     "name":"Palau",
     "phoneCode":"680",
     "countryCodeAlt":"PLW"
  },
  {
     "countryCode":"PY",
     "name":"Paraguay",
     "phoneCode":"595",
     "countryCodeAlt":"PRY"
  },
  {
     "countryCode":"QA",
     "name":"Qatar",
     "phoneCode":"974",
     "countryCodeAlt":"QAT"
  },
  {
     "countryCode":"RE",
     "name":"Reunion",
     "phoneCode":"262",
     "countryCodeAlt":"REU"
  },
  {
     "countryCode":"RO",
     "name":"Romania",
     "phoneCode":"40",
     "countryCodeAlt":"ROU"
  },
  {
     "countryCode":"RS",
     "name":"Serbia",
     "phoneCode":"381",
     "countryCodeAlt":"SRB"
  },
  {
     "countryCode":"RU",
     "name":"Russian Federation",
     "phoneCode":"7",
     "countryCodeAlt":"RUS"
  },
  {
     "countryCode":"RW",
     "name":"Rwanda",
     "phoneCode":"250",
     "countryCodeAlt":"RWA"
  },
  {
     "countryCode":"SA",
     "name":"Saudi Arabia",
     "phoneCode":"966",
     "countryCodeAlt":"SAU"
  },
  {
     "countryCode":"SB",
     "name":"Solomon Islands",
     "phoneCode":"677",
     "countryCodeAlt":"SLB"
  },
  {
     "countryCode":"SC",
     "name":"Seychelles",
     "phoneCode":"248",
     "countryCodeAlt":"SYC"
  },
  {
     "countryCode":"SD",
     "name":"Sudan",
     "phoneCode":"249",
     "countryCodeAlt":"SDN"
  },
  {
     "countryCode":"SE",
     "name":"Sweden",
     "phoneCode":"46",
     "countryCodeAlt":"SWE"
  },
  {
     "countryCode":"SG",
     "name":"Singapore",
     "phoneCode":"65",
     "countryCodeAlt":"SGP"
  },
  {
     "countryCode":"SH",
     "name":"Saint Helena",
     "phoneCode":"290",
     "countryCodeAlt":"SHN"
  },
  {
     "countryCode":"SI",
     "name":"Slovenia",
     "phoneCode":"386",
     "countryCodeAlt":"SVN"
  },
  {
     "countryCode":"SJ",
     "name":"Svalbard and Jan Mayen",
     "phoneCode":"47",
     "countryCodeAlt":"SJM"
  },
  {
     "countryCode":"SK",
     "name":"Slovakia",
     "phoneCode":"421",
     "countryCodeAlt":"SVK"
  },
  {
     "countryCode":"SL",
     "name":"Sierra Leone",
     "phoneCode":"232",
     "countryCodeAlt":"SLE"
  },
  {
     "countryCode":"SM",
     "name":"San Marino",
     "phoneCode":"378",
     "countryCodeAlt":"SMR"
  },
  {
     "countryCode":"SN",
     "name":"Senegal",
     "phoneCode":"221",
     "countryCodeAlt":"SEN"
  },
  {
     "countryCode":"SO",
     "name":"Somalia",
     "phoneCode":"252",
     "countryCodeAlt":"SOM"
  },
  {
     "countryCode":"SR",
     "name":"Suriname",
     "phoneCode":"597",
     "countryCodeAlt":"SUR"
  },
  {
     "countryCode":"SS",
     "name":"South Sudan",
     "phoneCode":"211",
     "countryCodeAlt":"SSD"
  },
  {
     "countryCode":"ST",
     "name":"Sao Tome and Principe",
     "phoneCode":"239",
     "countryCodeAlt":"STP"
  },
  {
     "countryCode":"SV",
     "name":"El Salvador",
     "phoneCode":"503",
     "countryCodeAlt":"SLV"
  },
  {
     "countryCode":"SX",
     "name":"Sint Maarten (Dutch part)",
     "phoneCode":"1-721",
     "countryCodeAlt":"SXM"
  },
  {
     "countryCode":"SY",
     "name":"Syrian Arab Republic",
     "phoneCode":"963",
     "countryCodeAlt":"SYR"
  },
  {
     "countryCode":"SZ",
     "name":"Swaziland",
     "phoneCode":"268",
     "countryCodeAlt":"SWZ"
  },
  {
     "countryCode":"TC",
     "name":"Turks and Caicos Islands",
     "phoneCode":"1-649",
     "countryCodeAlt":"TCA"
  },
  {
     "countryCode":"TD",
     "name":"Chad",
     "phoneCode":"235",
     "countryCodeAlt":"TCD"
  },
  {
     "countryCode":"TF",
     "name":"French Southern Territories",
     "phoneCode":"262",
     "countryCodeAlt":"ATF"
  },
  {
     "countryCode":"TG",
     "name":"Togo",
     "phoneCode":"228",
     "countryCodeAlt":"TGO"
  },
  {
     "countryCode":"TH",
     "name":"Thailand",
     "phoneCode":"66",
     "countryCodeAlt":"THA"
  },
  {
     "countryCode":"TJ",
     "name":"Tajikistan",
     "phoneCode":"992",
     "countryCodeAlt":"TJK"
  },
  {
     "countryCode":"TK",
     "name":"Tokelau",
     "phoneCode":"690",
     "countryCodeAlt":"TKL"
  },
  {
     "countryCode":"TL",
     "name":"Timor-Leste",
     "phoneCode":"670",
     "countryCodeAlt":"TLS"
  },
  {
     "countryCode":"TM",
     "name":"Turkmenistan",
     "phoneCode":"993",
     "countryCodeAlt":"TKM"
  },
  {
     "countryCode":"TN",
     "name":"Tunisia",
     "phoneCode":"216",
     "countryCodeAlt":"TUN"
  },
  {
     "countryCode":"TO",
     "name":"Tonga",
     "phoneCode":"676",
     "countryCodeAlt":"TON"
  },
  {
     "countryCode":"TR",
     "name":"Turkey",
     "phoneCode":"90",
     "countryCodeAlt":"TUR"
  },
  {
     "countryCode":"TT",
     "name":"Trinidad and Tobago",
     "phoneCode":"1-868",
     "countryCodeAlt":"TTO"
  },
  {
     "countryCode":"TV",
     "name":"Tuvalu",
     "phoneCode":"688",
     "countryCodeAlt":"TUV"
  },
  {
     "countryCode":"TW",
     "name":"Taiwan, Province of China",
     "phoneCode":"886",
     "countryCodeAlt":"TWN"
  },
  {
     "countryCode":"TZ",
     "name":"Tanzania",
     "phoneCode":"255",
     "countryCodeAlt":"TZA"
  },
  {
     "countryCode":"UA",
     "name":"Ukraine",
     "phoneCode":"380",
     "countryCodeAlt":"UKR"
  },
  {
     "countryCode":"UG",
     "name":"Uganda",
     "phoneCode":"256",
     "countryCodeAlt":"UGA"
  },
  {
     "countryCode":"US",
     "name":"United States",
     "phoneCode":"1",
     "countryCodeAlt":"USA"
  },
  {
     "countryCode":"UY",
     "name":"Uruguay",
     "phoneCode":"598",
     "countryCodeAlt":"URY"
  },
  {
     "countryCode":"UZ",
     "name":"Uzbekistan",
     "phoneCode":"998",
     "countryCodeAlt":"UZB"
  },
  {
     "countryCode":"VA",
     "name":"Holy See (Vatican City State)",
     "phoneCode":"379",
     "countryCodeAlt":"VAT"
  },
  {
     "countryCode":"VC",
     "name":"Saint Vincent and the Grenadines",
     "phoneCode":"1-784",
     "countryCodeAlt":"VCT"
  },
  {
     "countryCode":"VE",
     "name":"Venezuela",
     "phoneCode":"58",
     "countryCodeAlt":"VEN"
  },
  {
     "countryCode":"VG",
     "name":"British Virgin Islands",
     "phoneCode":"1-284",
     "countryCodeAlt":"VGB"
  },
  {
     "countryCode":"VI",
     "name":"US Virgin Islands",
     "phoneCode":"1-340",
     "countryCodeAlt":"VIR"
  },
  {
     "countryCode":"VN",
     "name":"Vietnam",
     "phoneCode":"84",
     "countryCodeAlt":"VNM"
  },
  {
     "countryCode":"VU",
     "name":"Vanuatu",
     "phoneCode":"678",
     "countryCodeAlt":"VUT"
  },
  {
     "countryCode":"WF",
     "name":"Wallis and Futuna",
     "phoneCode":"681",
     "countryCodeAlt":"WLF"
  },
  {
     "countryCode":"WS",
     "name":"Samoa",
     "phoneCode":"685",
     "countryCodeAlt":"WSM"
  },
  {
     "countryCode":"XK",
     "name":"Kosovo",
     "phoneCode":"383",
     "countryCodeAlt":"UNK"
  },
  {
     "countryCode":"YE",
     "name":"Yemen",
     "phoneCode":"967",
     "countryCodeAlt":"YEM"
  },
  {
     "countryCode":"YT",
     "name":"Mayotte",
     "phoneCode":"262",
     "countryCodeAlt":"MYT"
  },
  {
     "countryCode":"ZA",
     "name":"South Africa",
     "phoneCode":"27",
     "countryCodeAlt":"ZAF"
  },
  {
     "countryCode":"ZM",
     "name":"Zambia",
     "phoneCode":"260",
     "countryCodeAlt":"ZMB"
  },
  {
     "countryCode":"ZW",
     "name":"Zimbabwe",
     "phoneCode":"263",
     "countryCodeAlt":"ZWE"
  }
]

export const constants = {
    HOME: "home",
    ABOUT: "about",
    SUPPORT: "support",
    CONTACT: "contact",
    MOBILE_MONEY: "mobile_money",
    BANK_TRANSFER: "bank_transfer",
    CASH_PICKUP: "cash_pickup",

    FREE_OPERATOR_FEE: "FREE_OPERATOR_FEE",
    FIXED_AMOUNT: "FIXED_AMOUNT",
    FIXED_RATE: "FIXED_RATE",
    PERCENTAGE: "PERCENTAGE",
    TRANSFER_STATUS_PENDING_VERIFICATION: "PENDING_VERIFICATION",
    TRANSFER_STATUS_PENDING: "PENDING_PAYMENT",
    TRANSFER_STATUS_PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
    TRANSFER_STATUS_COMPLETE: "COMPLETE",
    TRANSFER_STATUS_CANCELLED: "CANCELLED",

    VERIFICATION_TYPE_DOCUMENT: "DOCUMENT",
    VERIFICATION_TYPE_IDENTITY: "IDENTITY",
    VERIFICATION_TYPE_DOCUMENT_WITH_IDENTITY_PRECURSOR: "DOCUMENT_WITH_IDENTITY_PRECURSOR",
    VERIFICATION_TYPE_WATCHLIST: "WATCHLIST",

    VERIFICATION_STAGE_FINAL: "FINAL",
    MOBILE: "MOBILE",
    DESKTOP: "DESKTOP",

    COMPETITOR_RATES_BASE_CURRENCY: "GBP",
    COMPETITOR_RATES_TARGET_CURRENCY: "XAF",
    COMPETITOR_RATES_COMPARE_AMOUNT: 100,

    CAMEROON_MTN_SERVICE_RATE_INDEX: 0,
    UGANDA_MTN_SERVICE_RATE_INDEX: 3,
    UGANDA_AIRTEL_SERVICE_RATE_INDEX: 5,
    TANZANIA_MPESA_SERVICE_RATE_INDEX: 4,

    REMITTANCE_COUNTRIES_CODES: [ 'CM', 'UG', 'KE', 'TZ' ],

    SIGNUP_COUNTRIES: {
        "AT": "Austria",
        "BE": "Belgium",
        "BG": "Bulgaria",
        "CA": "Canada",
        "HR": "Croatia",
        "CY": "Cyprus",
        "CZ": "Czech Republic",
        "DK": "Denmark",
        "EE": "Estonia",
        "FI": "Finland",
        "FR": "France",
        "DE": "Germany",
        "GR": "Greece",
        "HU": "Hungary",
        "IE": "Ireland",
        "IT": "Italy",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MT": "Malta",
        "NL": "Netherlands",
        "PL": "Poland",
        "PT": "Portugal",
        "RO": "Romania",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "ES": "Spain",
        "SE": "Sweden",
        "GB": "United Kingdom",
    },

    COUNTRIES_PHONE_CODES: countriesAndCodes
}

export const transferMethodsInWords: any = {
   1: "Mobile money",
   2: "Bank transfer",
   3: "Cash pickup",
   mobile_money: "Mobile money",
   bank_transfer: "Bank transfer",
   cash_pickup: "Cash pickup"
}

export const resources = {
    DICE_BEAR_USER: "https://avatars.dicebear.com/api/initials/",
    DICE_BEAR_RECIPIENT: "https://avatars.dicebear.com/api/initials/",
    TRUST_PAYMENT_URL: 'https://payments.securetrading.net/process/payments/choice'
}

export const days = Array.from(Array(31).keys())

export const months: any = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

export const countriesTransferMethodAvailability: any = {
   CM: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: true
   },
   TD: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: false
   },
   GQ: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: false
   },
   GA: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: false
   },
   GM: {
       mobile_money: true,
       bank_transfer: false,
       cash_pickup: true
   },
   GH: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: true
   },
   KE: {
       mobile_money: true,
       bank_transfer: false,
       cash_pickup: false
   },
   LR: {
      mobile_money: true,
      bank_transfer: false,
      cash_pickup: false
   },
   NG: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: true
   },
   SN: {
       mobile_money: true,
       bank_transfer: false,
       cash_pickup: false
   },
   SL: {
       mobile_money: true,
       bank_transfer: false,
       cash_pickup: false
   },
   TZ: {
       mobile_money: true,
       bank_transfer: false,
       cash_pickup: false
   },
   UG: {
       mobile_money: true,
       bank_transfer: true,
       cash_pickup: false
   },
   CG: {
      mobile_money: true,
       bank_transfer: true,
       cash_pickup: false
   }
};


export const countriesAndCurrency = [
   {
      "countryCode":"UG",
      "name":"Uganda",
      "countryCodeAlt":"UGA",
      "countryCurrency":"UGX",
   },
   {
      "countryCode":"KE",
      "name":"Kenya",
      "countryCodeAlt":"KEN",
      "countryCurrency":"KES",
   },
   {
      "countryCode":"NG",
      "name":"Nigeria",
      "countryCodeAlt":"NGA",
      "countryCurrency":"NGN",
   },
   {
      "countryCode":"CM",
      "name":"Cameroon",
      "phoneCode":"237",
      "countryCodeAlt":"CMR",
      "countryCurrency":"XAF",
   },
   {
      "countryCode":"TZ",
      "name":"Tanzania",
      "countryCodeAlt":"TZA",
      "countryCurrency":"TZN",
   },
]