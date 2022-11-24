const transferReasons = {
  "Sending money into my own account": "personal_account",
  "Donations and gifts": "donations_and_gifts",
  "Sending money to a friend, family member or any third party person":
    "third_party_person_account",
  // Mortgage repayments: mortgage_repayments
  // Business Travel Payments: business_travel_payments
  // Personal Travel Payments: personal_travel_payments
  // Tuition fees: tuition_fees
  // Commission and fees for financial services: financial_commission_fees
  // Proceeds for financial services charged for advice provided: financial_services_proceeds
  // Investment into property by a foreign individual: individual_property_investments
  // Investment by a foreign individual - other: other_investments
  // Investment into property by a foreign corporate entity: corporate_property_investments
  // Capital payments by immigrants: immigrants_capital_payments
  // Legal services: legal_services
  // Accounting services: accounting_services
  // Management consulting services: consulting_services
  // Public relation services: public_relation_services
  // Advertising & market research services: ads_and_market_research_services
  // Managerial services: managerial_services
  // Medical and dental services: medical_and_dental_services
  // Educational services: educational_services
  // Operational leasing: operational_leasing
  // Cultural and recreational services: cultural_and_recreational_services
  // Salary paid to Recipient Country Resident Temporarily Abroad: salary_resident_out_country
  // Salary paid to a non-resident employee in recipient country: salary_non_resident_in_country
  // Salary paid to a foreign national contract worker in recipient country: salary_contract_worker_in_country
  // Payments to social security schemes: social_security_schemes
  // Payments to charities and religious bodies: charities_and_religious_bodies
  // Donations and aid to Government: donations_and_aid_to_government
  // Donations and aid to private sector: donations_and_aid_to_private
  // Pensions: pensions
  // Annuities: annuities
  // Inheritances: inheritances
  // Alimony: alimony
  // Tax - Income tax: tax_income
  // Tax - VAT refunds: tax_vat_refunds
  // Tax - Other: tax_other
  // Insurance premiums (non life/short term): non_life_insurance_premiums
  // Insurance premiums (life): life_insurance_premiums
  // Dividends: dividends
  // Branch profits: branch_profits
  // Commission or brokerage: commision_or_brokerage
  // Rental: rental
  // Income earned abroad by a resident on an individual investment: individual_investment_income_from_abroad
  // Sale of shares: shares_sale
  // Sale of bonds: bonds_sale
  // Sale of money market instruments: money_market_instruments_sale
  // Repatriation of funds out of a foreign bank account: funds_repatriation_of_foreign_bank_account
  // Sale of mutual funds or collective investment schemes: mutual_funds_sale_or_collective_investment
  // Sale of overseas property: overseas_property_sale
  // Sale and repatriation of other investment: sale_and_repatriation_of_other_investment
  // Repatriation on instruction by the Central Bank: repatriation_south_african_reserve_bank_instruction
  // Loan made to a resident by a non-resident shareholder: resident_loan_from_non_resident_share_holder
  // Loan made to a resident by a non-resident third party: resident_loan_from_non_resident_third_party
  // Repayment by a Citizen living overseas of a loan granted by a resident: resident_loan_repayment_from_overseas_living_south_african
  // Repayment of a study loan: study_loan_repayment
  // Repayment of a shareholders loan: shareholders_loan_repayment
  // Repayment of a third party loan (excluding shareholders): third_party_loan_repayment
  // Repayment of a trade finance loan: trade_finance_loan_repayment
  // Proceeds received for research and development services: research_and_development_proceeds
  // Funding received for research and development: research_and_development_funding
  // Repairs and maintenance on machinery and equipment: machinary_and_equipment_repairs
  // Architectural, engineering and other technical services: architectural_engineering_technical_services
  // Agricultural, mining, waste treatment and depollution services: agrigultural_mining_waste_depollution_services
  // Proceeds for construction services: construction_services
  // Payments for telecommunication services: telecommunication_services
  // Payments for data, news related and news agency fees: data_news_agency_fees
  // Payments for passenger services - road: road_passenger_services
  // Payments for passenger services - rail: rail_passenger_services
  // Payments for passenger services - sea: sea_passenger_services
  // Payments for passenger services - air: air_passenger_services
  // Payments for freight services - road: road_freight_services
  // Payments for freight services - rail: rail_freight_services
  // Payments for freight services - sea: sea_freight_services
  // Payments for freight services - air: air_freight_services
  // Payments for postal and courier services - road: road_postal_and_courier_services
  // Payments for postal and courier services - rail: rail_postal_and_courier_services
  // Payments for postal and courier services - sea: sea_postal_and_courier_services
  // Payments for postal and courier services - air: air_postal_and_courier_services
  // Investment in listed shares: listed_shares_investment
  // Investment in non-listed shares: non_listed_shares_investment
  // Investment into money market instruments: money_market_instruments_investment
  // Investment into listed bonds: listed_bonds_investment
  // Investment into non-listed bonds: non_listed_bonds_investment
  // Rights assigned for licences to reproduce and/or distribute: reproduce_distribute_rights_license
  // Rights assigned for using patents and inventions (licensing): patents_and_investions_rights_license
  // Rights assigned for using patterns and designs (including industrial processes): patterns_and_designs_rights
  // Rights assigned for using copyrights: copyrights_rights
  // Rights assigned for using franchises and trademarks: franchises_and_trademarks_rights
  // Disposal of patents and inventions: patents_and_inventions_disposal
  // Disposal of patterns and designs (including industrial processes): patterns_and_designs_disposal
  // Disposal of copyrights: copyrights_disposal
  // Disposal of franchises and trademarks: franchises_and_trademarks_disposal
  // Sales of original manuscripts, sound recordings and films: sales_of_manuscripts_sound_recordings_films
  // Receipt of funds relating to the production of motion pictures, radio and television programs and musical recordings: funds_related_to_recording_productions
  // The outright selling of ownership rights of software: software_ownership_rights_sale
  // Computer-related services including maintenance, repair and consultancy: computer_services
  // Commercial sales of customised software and related licenses for use of customers: customised_software_sales
  // Commercial sales of non-customised software on physical media with periodic licence to use: non_customised_software_on_physical_media_periodic_licence_sale
  // Commercial sales of non-customised software provided on physical media with right to perpetual (ongoing) use: non_customised_software_on_pyisical_media_perpetual_use_sale
  // Commercial sales of non-customised software provided for downloading or electronically: non_customised_software_for_downloading_electronically_made_periodic_licence_salemade available with periodic license'
  // Commercial sales of non-customised software provided for downloading or electronically: non_customised_software_for_downloading_electronically_made_single_payment_salemade available with single payment'
  // Donations to Government for fixed assets: fixed_assets_donations_to_sa_government
  // Donations to corporate entities - fixed assets: fixed_assets_donations_to_corporate_entities
  // Disinvestment of property by a resident corporate entity: property_disinvestment_by_corporate_entity_resident
  // Proceeds for other business services not included elsewhere: other_business_services
  // Disinvestment by resident institutional investor - Collective Investment Scheme: institutional_investor_disinvestment
  // Payment for Government Services: government_services
};

export const azaRecipientConfigs: any = {
  NGN: {
    bank_transfer: {
      paymentMethodType: "NGN::Bank",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        bank_code: {
          internal_name: "bankCode",
          type: "select",
          options: {
            "Access Bank": "044",
            "Citi Bank Group": "023",
            EcoBank: "050",
            "FCMB Bank": "214",
            "Fidelity Bank": "070",
            "First Bank of Nigeria": "011",
            "Guaranty Trust Bank": "058",
            "Heritage Bank": "030",
            "Jaiz Bank": "301",
            Keystone: "082",
            "Polaris Bank": "076",
            "Stanbic IBTC Bank": "039",
            "Standard Chartered Bank PLC": "068",
            "Sterling bank": "232",
            "Suntrust Bank": "100",
            "Union Bank": "032",
            "United Bank for Africa": "033",
            "Unity Bank": "215",
            "Wema Bank": "035",
            "Zenith International": "057",
          },
        },
        bank_account: {
          internal_name: "accountNumber",
          type: "number",
        },
        bank_account_type: {
          internal_name: "bankAccountType",
          type: "select",
          options: {
            savings: 10,
            current: 20,
          },
          isOptional: true,
        },
      },
    },

    mobile_money: {
      paymentMethodType: "NGN::Mobile",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "text",
        },
      },
    },
  },

  GHS: {
    bank_transfer: {
      paymentMethodType: "GHS::Bank",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        bank_code: {
          internal_name: "bankCode",
          type: "select",
          options: {
            "ABSA Ghana Bank (formerly Barclays)": "030100",
            "Access Bank": "280100",
            "Agricultural Development Bank": "080100",
            "Bank of Africa": "210100",
            "CAL Bank": "140100",
            Ecobank: "130100",
            "Fidelity Bank": "240100",
            "First Atlantic Bank": "170100",
            "First Bank Nigeria": "200100",
            "First National Bank": "330100",
            "GCB Bank": "040100",
            "Guaranty Trust Bank": "230100",
            "Heritage Bank": "370100",
            "National Investment Bank": "050100",
            "Prudential Bank": "180100",
            "Republic HFC Bank": "110100",
            "Stanbic Bank": "190100",
            "Standard Chartered Bank": "020100",
            "United Bank for Africa": "060100",
            "Zenith Bank": "120100",
          },
        },
        bank_account: {
          internal_name: "accountNumber",
          type: "number",
        },
      },
    },

    mobile_money: {
      paymentMethodType: "GHS::Mobile",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "number",
        },
        mobile_provider: {
          internal_name: "mobileProvider",
          type: "select",
          options: {
            airtel: "airtel",
            mtn: "mtn",
            tigo: "tigo",
            vodafone: "vodafone",
          },
          isOptional: true,
        },
      },
    },

    cash_pickup: {
      paymentMethodType: "GHS::Cash",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "number",
        },
      },
    },
  },

  UGX: {
    mobile_money: {
      paymentMethodType: "UGX::Mobile",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "number",
        },
        mobile_provider: {
          internal_name: "mobileProvider",
          type: "select",
          options: {
            africell: "africell",
            airtel: "airtel",
            mtn: "mtn",
            telecom: "telecom",
          },
          isOptional: true,
        },
      },
    },
  },

  XOF: {
    bank_transfer: {
      paymentMethodType: "XOF::Bank",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        iban: {
          internal_name: "iban",
          type: "text",
        },
        bank_code: {
          // # Burkina Faso
          "United Bank for Africa Burkina": "BF022",
          "Banque Internationale pour le Commerce, l'Industrie et l'Agriculture du Burkina":
            "BF023",
          "Banque Commerciale du Burkina": "BF056",
          "Société Générale Burkina Faso": "BF074",
          // Ecobank Burkina Faso: BF083
          // Bank Of Africa Burkina Faso: BF084
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce - Burkina Faso: BF108
          // Banque Atlantique Burkina Faso: BF134
          // International Business Bank: BF139
          // Coris Bank International: BF148
          // CBAO, Groupe Attijariwafa bank, Succursale au Burkina: BF161
          // Orabank Côte d'Ivoire, Succursale du Burkina: BF171
          // Banque De l'Union Burkina Faso: BF179
          // Wendkuni Bank International: BF202
          // Banque Agricole du Faso: BF207

          // # Benin
          // Orabank Bénin: BJ058
          // Bank Of Africa Bénin: BJ061
          // Ecobank Bénin: BJ062
          // Banque Internationale du Benin: BJ063
          // United Bank for Africa Bénin: BJ067
          // NSIA BANQUE Bénin: BJ099
          // Société Générale - Benin: BJ104
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce - Bénin: BJ107
          // Banque Atlantique du Bénin: BJ115
          // BGFIBank Bénin: BJ157
          // CBAO, Groupe Attijariwafa bank, Succursale du Bénin: BJ177
          // CCEI BANK BENIN: BJ184
          // BANQUE AFRICAINE POUR L'INDUSTRIE ET LE COMMERCE - BENIN: BJ185
          // Coris Bank International Bénin: BJ212
          // Société Nigérienne de Banque, Succursale du Bénin: BJ199

          // # Ivory Coast
          // Banque Internationale pour le Commerce et l'Industrie de la Côte d'Ivoire: CI006
          // Societe Ivoirienne de Banque: CI007
          // Société Générale Côte d'Ivoire: CI008
          // Bank Of Africa Côte d'Ivoire: CI032
          // Banque Atlantique Côte d'Ivoire: CI034
          // NSIA Banque Côte d'Ivoire: CI042
          // Ecobank Côte d'Ivoire: CI059
          // Banque de l'Habitat de Côte d'Ivoire: CI068
          // Banque Nationale d'Investissement: CI092
          // Standard Chartered Bank Côte d'Ivoire: CI097
          // AFRILAND FIRST BANK Côte d'Ivoire: CI106
          // Versus Bank S.A: CI112
          // Citibank - Côte d'Ivoire: CI118
          // ORABANK Côte d'Ivoire: CI121
          // Bridge Bank Group Côte d'Ivoire: CI131
          // United Bank for Africa CI: CI150
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce Côte d'Ivoire: CI154
          // Banque Populaire de Côte d'Ivoire: CI155
          // Diamond Bank Côte d'Ivoire: CI158
          // BGFI BANK COTE D'IVOIRE: CI162
          // Guaranty Trust Bank Côte d'Ivoire: CI163
          // Coris Bank International Côte d'Ivoire: CI166
          // Banque De l'Union Côte d'Ivoire: CI180
          // Banque Malienne de Solidarité, Succursale de Côte d'Ivoire: CI188
          // Banque Régionale de Marchés, Succursale de Côte d'Ivoire: CI194
          // Stanbic Bank: CI198
          // Banque d'Abidjan: CI201
          // Mansa Bank: CI211
          // Orange Abidjan Compagnie: CI214

          // # Guinea-Bissau
          // Banco da Africa Ocidental: GW096
          // Banco Da União: GW128
          // Ecobank Guinée Bissau: GW143
          // Orabank Côte d'Ivoire, Succursale de la Guinée-Bissau: GW172
          // Banque Atlantique Côte d'Ivoire, Succursale de Guinée-Bissau: GW195

          // # Mali
          // Banque de Developpement du Mali: ML016
          // Banque Internationale pour le Mali: ML041
          // Banque Nationale pour le Dévéloppement Agricole: ML043
          // Banque Commerciale du Sahel: ML044
          // Bank Of Africa Mali: ML045
          // Banque Internationale pour le Commerce et l'Industrie du Mali: ML089
          // Ecobank Mali: ML090
          // Banque Malienne de Solidarité: ML102
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce Mali: ML109
          // Banque Atlantique Mali: ML135
          // Banque pour le Commerce et l'Industrie du Mali: ML147
          // Orabank Côte d'Ivoire, Succursale du Mali: ML173
          // CORIS BANK ML: ML181
          // United Bank for Africa Mali: ML206

          // # Niger
          // Bank Of Africa Niger: NE038
          // Banque Internationale pour l'Afrique au Niger: NE040
          // Banque Commerciale du Niger: NE057
          // Société Nigérienne de Banque: NE064
          // Banque Islamique du Niger: NE081
          // Ecobank Niger: NE095
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce Niger: NE110
          // Banque Atlantique Niger: NE136
          // Banque Agricole du Niger: NE164
          // CBAO, Groupe Attijariwafa bank, Succursale du Niger: NE168
          // Orabank Côte d'Ivoire, Succursale du Niger: NE174
          // Banque Régionale de Marchés, Succursale du Niger: NE193
          // Banque de l'Habitat du NIGER: NE208
          // Coris Bank International, Succursale du Niger: NE210

          // # Senegal
          // Banque Internationale pour le Commerce et l'Industrie du Sénégal: SN010
          // Société Générale Sénégal: SN011
          // CBAO, Groupe Attijariwafa bank: SN012
          // Banque de l'Habitat du Sénégal: SN039
          // La Banque Agricole du Sénégal: SN048
          // Crédit du Sénégal: SN060
          // Banque Islamique du Sénégal: SN079
          // Ecobank Sénégal: SN094
          // Bank Of Africa Sénégal: SN100
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce Sénégal: SN111
          // Banque des Institutions Mutualistes d'Afrique de l'Ouest: SN117
          // Banque Atlantique Sénégal: SN137
          // FBNBank Sénégal: SN140
          // Citibank - Sénégal: SN141
          // Banque Régionale de Marchés: SN144
          // United Bank for Africa Sénégal: SN153
          // Crédit International: SN156
          // NSIA Banque Bénin, Succursale du Sénégal: SN159
          // Banque Nationale pour le Développement Economique: SN169
          // Orabank Côte d'Ivoire, Succursale du Sénégal: SN175
          // Banque pour le Commerce et l'Industrie du Mali, Succursale au Sénégal: SN178
          // BGFIBank Sénégal: SN189
          // Banque de Dakar: SN191
          // Coris Bank International Sénégal: SN213
          // La Banque OUTARDE: SN200
          // Banque de Développement du Mali, Succursale du Sénégal: SN221

          // # Togo
          // Banque de Développement du Mali, Succursale du Togo: TG221
          // Banque Internationale pour l'Afrique au Togo: TG005
          // Union Togolaise de Banque: TG009
          // SUNU Bank: TG151
          // Société Générale Bénin, Succursale du Togo: TG187
          // Banque Togolaise pour le Commerce et l'Industrie: TG024
          // Société Interafricaine de Banque: TG027
          // Ecobank Togo: TG055
          // Orabank Togo: TG116
          // Banque Atlantique Togo: TG138
          // Banque Sahélo-Saharienne pour l'Investissement et le Commerce Togo: TG133
          // NSIA Banque Bénin, Succursale du Togo: TG160
          // Bank Of Africa Togo: TG167
          // Coris Bank International Togo: TG182
        },
        transfer_reason: {
          internal_name: "reason",
          type: "select",
          options: transferReasons,
        },
      },
    },

    mobile_money: {
      paymentMethodType: "XOF::Mobile",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "text",
        },
        country: {
          internal_name: "countryCode",
          type: "select",
          options: {
            Senegal: "SN",
            "Ivory Coast": "CI",
            "Burkina Faso": "BF",
            Mali: "ML",
          },
        },
        mobile_provider: {
          internal_name: "mobileProvider",
          type: "select",
          options: {
            orange: "orange",
            tigo: "tigo",
            wave: "wave",
            moov: "moov",
            mobicash: "mobicash",
          },
        },
        transfer_reason: {
          internal_name: "reason",
          type: "select",
          options: transferReasons,
        },
      },
    },
  },

  XAF: {
    bank_transfer: {
      paymentMethodType: "XAF::Bank",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        iban: {
          internal_name: "iban",
          type: "text",
        },
        bank_code: {
          "Banque Internationale du Cameroun pour l'Epargne et le Crédit":
            "10001",
          "Societe Commerciale de Banque - Cameroun": "10002",
          // Société Générale de Banques au Cameroun: 10003
          // Standard Chartered Bank Cameroon: 10004
          // Afriland First Bank: 10005
          // Amity Bank Cameroon Plc.: 10006
          // Citibank Cameroon SA: 10007
          // Commercial Bank - Cameroun: 10008
          // Crédit Foncier du Cameroun: 10019
          // Société Camerounaise d'Equipement: 10020
          // Société Camerounaise de Crédit Automobile: 10021
          // Société Camerounaise de Crédit Bail: 10022
          // Union Bank of Cameroon Plc.: 10023
          // National Financial Credit Bank: 10025
          // Fonds de Garantie des Petites et Moyennes Entreprises: 10026
          // Société de Recouvrement des Créances du Cameroun: 10027
          // Société Nationale d'Investissement: 10028
          // Ecobank Cameroun: 10029
          // PRO-PME Financement: 10030
          // Africa Leasing Company: 10031
          // Société Financière Africaine: 10032
          // United Bank for Africa - Cameroon: 10033
          // Banque Atlantique Cameroun: 10034
          // BGFIBANK Cameroun SA: 10035
          // Banque Camerounaise des Petites et Moyennes Entreprises: 10036
          // WAFACASH CENTRAL AFRICA: 10037
          // CREDIT COMMUNAUTAIRE D'AFRIQUE BANK: 10039
          // BANGE BANK CAMEROUN: 10040
          // Crédit du Sahel: 16010
          // Fonds Provinciale de Refinancement: 16012
          // Crédit pour l'Agriculture l'Industrie et le Commerce: 30004
        },
        transfer_reason: {
          internal_name: "reason",
          type: "select",
          options: transferReasons,
        },
      },
    },

    mobile_money: {
      paymentMethodType: "XAF::Mobile",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "text",
        },
        country: {
          internal_name: "countryCode",
          type: "select",
          options: {
            Cameroon: "CM",
          },
        },
        mobile_provider: {
          internal_name: "mobileProvider",
          type: "select",
          options: {
            orange: "orange",
            mtn: "mtn",
          },
        },
      },
    },
  },

  GNF: {
    mobile_money: {
      paymentMethodType: "GNF::Mobile",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "text",
        },
        mobile_provider: {
          internal_name: "mobileProvider",
          type: "select",
          options: {
            mtn: "mtn",
          },
        },
      },
    },
  },

  ZAR: {
    bank_transfer: {
      paymentMethodType: "XAF::Bank",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        street: {
          internal_name: "street",
          type: "text",
        },
        postal_code: {
          internal_name: "zip",
          type: "text",
        },
        city: {
          internal_name: "city",
          type: "text",
        },
        email: {
          internal_name: "email",
          type: "email",
          isOptional: true,
        },
        bank_code: {
          ABSA: "632005",
          "Access Bank": "410506",
          // African Bank: 430000
          // Albaraka Bank: 800000
          // Bank of China: 686000
          // Bank Zero: 888000
          // Bidvest Bank: 462005
          // BNP Paribas: 688000
          // Capitec Bank: 470010
          // Citibank: 350005
          // China Construction Bank: 586666
          // Discovery Bank: 679000
          // Finbond Mutual Bank: 589000
          // First National Bank: 250655
          // Grindrod Bank: 584000
          // Habib Overseas Bank Limited: 700066
          // HBZ Bank: 570100
          // HSBC Bank: 587000
          // ICICI Bank: 362000
          // Investec: 580105
          // JP Morgan Bank: 432000
          // Mercantile Bank: 450905
          // Nedbank: 198765
          // Olympus Mobile: 585001
          // Peoples Bank: 720026
          // PEP Bank: 400001
          // Permanent Bank: 760005
          // Rand Merchant Bank: 261251
          // Reserve Bank: 980172
          // SA Post Office: 460005
          // Sasfin Bank: 683000
          // Standard Bank: 051001
          // Standard Chartered Bank: 730020
          // State Bank of India: 801000
          // Tyme Bank: 678910
          // Ubank: 431010
          // Unibank Limited: 790005
          // VBS: 588000
        },
        bank_account: {
          internal_name: "accountNumber",
          type: "text",
        },
        phone_number: {
          internal_name: "mobile",
          type: "text",
        },
        transfer_reason: {
          internal_name: "reason",
          type: "select",
          options: transferReasons,
        },
      },
    },
  },

  KES: {
    bank_transfer: {
      paymentMethodType: "KES::Bank",
      fields: {
        first_name: {
          internal_name: "firstName",
          type: "text",
        },
        last_name: {
          internal_name: "lastName",
          type: "text",
        },
        bank_code: {
          internal_name: "bankCode",
          type: "select",
          options: {
            "Habib Bank Limited": "08",
            "Trans-National Bank Limited": "26",
            "Housing Finance Co. Kenya": "61",
            // UBA Kenya Bank Ltd: 76
            // Kenya Commercial Bank: 01000
            // Standard Chartered Bank: 02000
            // Barclays Bank of Kenya: 03000
            // Bank of India: 05000
            // Bank of Boroda: 06000
            // NCBA Bank: 07000
            // Prime Bank: 10000
            // Co-operative Bank of Kenya: 11000
            // National Bank of Kenya: 12000
            // M-Oriental Commercial Bank Limited: 14000
            // Citibank: 16000
            // Habib Bank A.G. Zurich: 17000
            // Middle East Bank: 18000
            // Bank of Africa Kenya: 19000
            // Consolidated Bank of Kenya: 23000
            // Credit Bank Ltd: 25000
            // Chase Bank: 30000
            // Stanbic Bank Kenya: 31000
            // African Banking Corporation: 35000
            // Giro Bank Limited: 42000
            // ECO Bank Kenya: 43000
            // Spire Bank Limited: 49000
            // Paramount Universal Bank Limited: 50000
            // Jamii Bora Bank: 51000
            // Guaranty Trust Bank Kenya: 53000
            // Victoria Bank Limited: 54000
            // Guardian Bank: 55000
            // Investments and Mortgages Bank Limited: 57000
            // Development Bank of Kenya: 59000
            // Fidelity Commercial Bank: 46000
            // Diamond Trust Bank: 63000
            // Sidian Bank: 66000
            // Equity Bank Limited: 68000
            // Family Bank: 70000
            // Gulf African Bank: 72000
            // First Community Bank: 74000
            // KWFT Bank: 78000
          },
        },
        branch_code: {
          internal_name: "branchCode",
          type: "select",
          options: {},
          isOptional: true,
        },

        bank_account: {
          internal_name: "accountNumber",
          type: "number",
        },
        swift_code: {
          internal_name: "swiftCode",
          type: "text",
        },
        identity_card_type: {
          internal_name: "identityCardType",
          type: "select",
          option: {
            Passport: "PP",
            "National ID": "ID",
            "Driver's License": 'DL',
            Other: "O",
          },
        },
        identity_card_id: {
          internal_name: "identityCardId",
          type: "text",
        },
        transfer_reason: {
          internal_name: "reason",
          type: "select",
          options: transferReasons,
        },
      },
    },

    mobile_money: {
        paymentMethodType: "XAF::Mobile",
        fields: {
          first_name: {
            internal_name: "firstName",
            type: "text",
          },
          last_name: {
            internal_name: "lastName",
            type: "text",
          },
          phone_number: {
            internal_name: "mobile",
            type: "text",
          },
          mobile_provider: {
            internal_name: "mobileProvider",
            type: "select",
            options: {
              mpesa: "mpesa",
            },
          },
          street: {
            internal_name: "street",
            type: "text",
          },
          identity_card_type: {
            internal_name: "identityCardType",
            type: "select",
            option: {
              Passport: "PP",
              "National ID": "ID",
              "Driver's License": 'DL',
              Other: "O",
            },
          },
          identity_card_id: {
            internal_name: "identityCardId",
            type: "text",
          },
          transfer_reason: {
            internal_name: "reason",
            type: "select",
            options: transferReasons,
          },
        },
      },
  },
};

// Source:
// https://docs.azafinance.com/docs/individual-payments

//  optimization -  Display countries on recipient view card or filter by it

