import { formatAmount } from "components/pages/transcations-flow/utils/reuseableUtils";
import { ORIGIN_COUNTRIES } from "../../../src/components/pages/new-auth-pages/utils/countries";
import { countriesTransferMethodAvailability, destinationCountriesAndCurrency } from "util/constants";
import { PayinCountries, PayoutCountries } from "components/pages/transcations-flow/utils/useAppValues";

let serviceData: any[] = [];
const url = Cypress.env('baseUrl') + ':' + Cypress.env('port')

Cypress.Commands.add('waitUntilInputEnabled' as any, { prevSubject: true }, (subject: any, maxWaitTime: number) => {
  const MAX_WAIT_TIME = maxWaitTime || 15000; // Maximum wait time in milliseconds
  const INTERVAL = 500; // Interval between retries in milliseconds
  let elapsedTime = 0;


  return new Cypress.Promise((resolve, reject) => {
    const checkEnabled = () => {
      if (!subject.is(':disabled')) {
        // Input field is enabled, resolve the promise
        resolve(subject);
      } else if (elapsedTime >= MAX_WAIT_TIME) {
        // Maximum wait time exceeded, reject the promise
        reject(new Error('Input field did not become enabled within the specified time'));
      } else {
        // Input field is still disabled, retry after interval
        elapsedTime += INTERVAL;
        setTimeout(checkEnabled, INTERVAL);
      }
    };

    checkEnabled();
  });
});

describe('Exchange Rate Calculator [Data Validation]', () => {

  before(() => {
    cy.intercept('GET', '**/transfer/services').as('apiRequest');
    cy.visit(url);
    cy.wait('@apiRequest').then((interception) => {
      const apiResponse = interception.response.body;
      console.log({ apiResponse });

      serviceData = (apiResponse || JSON.parse(localStorage.getItem('SERVICES') || '{}')).data;
      console.log({ serviceData });
    });
  });

  beforeEach(() => {
    cy.visit(url);
    cy.get('[data-testid="x-calculator"]').should('be.visible');
    cy.get('[data-testid="payin-input"]').waitUntilInputEnabled();
  })

  it('uses correct currencies from the services', () => {
    for (const data of serviceData) {
      let expectedCurrency = 'GBP'
      const countryObject = PayinCountries.find(c => c.countryCode === data.country);
      if (countryObject) {
        expectedCurrency = countryObject.currency;
        // Select NOK in the calculator-payin-currency ant design dropdown
        cy.get('[data-testid="calculator-payin-currency"]').click();
        cy.contains('.ant-select-item-option-content', expectedCurrency).click();
        cy.get('[data-testid="payin-input"]').waitUntilInputEnabled();
      }

      cy.get('[data-testid="x-payin-currency"]').should('have.text', expectedCurrency)
    }
  });

  it('correctly validates maximum payin / payout', () => {
    for (const data of serviceData) {
      const maxLimit = parseFloat(data.meta.transferLimitMax);
      const exceedingAmount = maxLimit + 1;



      if (+data.meta.isInOriginCurrency) {

        const availablePayoutCountryCode = Object.keys(countriesTransferMethodAvailability).find(([countryCode, value]) => value[data.name.toLowerCase().replace(' ', '_')])
        const payoutCountryObject = PayoutCountries.find(c => c.countryCode === availablePayoutCountryCode);
        const payoutCurrency = payoutCountryObject?.currency || 'XAF';
        cy.get('[data-testid="calculator-payout-currency"]').click();
        cy.contains('.ant-select-item-option-content', payoutCurrency).click();

      
        const countryObject = PayinCountries.find(c => c.countryCode === data.country);
        const currency = countryObject?.currency || 'GBP'
        cy.get('[data-testid="calculator-payin-currency"]').click();
        cy.contains('.ant-select-item-option-content', currency).click();


        cy.get('[data-testid="payout-method-select"]').click();
        cy.contains('.ant-select-item-option-content', data.name).click();


        cy.get('[data-testid="payin-input"]').waitUntilInputEnabled();
        cy.get('[data-testid="payin-input"]').clear().type(exceedingAmount.toString());
        

        cy.get('[data-testid="error-message"]').should('have.text', `Maximum ${formatAmount(data.meta.transferLimitMax)} ${currency} allowed at a time.`)
      } else {
        const countryObject = PayoutCountries.find(c => c.countryCode === data.country);
        const currency = countryObject?.currency || 'XAF'
        cy.get('[data-testid="calculator-payout-currency"]').click();
        cy.contains('.ant-select-item-option-content', currency).click();

        cy.get('[data-testid="payout-method-select"]').click();
        cy.contains('.ant-select-item-option-content', data.name).click();

        cy.get('[data-testid="payout-input"]').waitUntilInputEnabled();
        cy.get('[data-testid="payout-input"]').clear().type(exceedingAmount.toString());
        cy.get('[data-testid="error-message"]').should('have.text', `Maximum ${formatAmount(data.meta.transferLimitMax)} ${currency} allowed at a time.`)
      }
    }
  });

  it('correctly implements transfer method availability', () => {
    for (const data of serviceData) {
      for (const fee of data.fees) {
        const amount = (parseFloat(fee.lowerLimit) + parseFloat(fee.upperLimit)) / 2;

        cy.get('[data-testid="payin-input"]').clear().type(amount.toString());
        cy.get('[data-testid="calculator-operator-fee"]').should('have.text', formatAmount(fee.fee));
      }
    }
  });

  it('has correct operator fees for each fee boundary', () => {
    for (const data of serviceData) {
      for (const fee of data.fees) {
        const amount = (parseFloat(fee.lowerLimit) + parseFloat(fee.upperLimit)) / 2;

        cy.get('[data-testid="payin-input"]').clear().type(amount.toString());
        cy.get('[data-testid="calculator-operator-fee"]').should('have.text', formatAmount(fee.fee));
      }
    }
  });

  it('total value is correct with tax percentage accounted for', () => {
    for (const data of serviceData) {
      const payIn = 1000;
      const taxPercentage = parseFloat(data.meta.taxPercentage);

      cy.get('[data-testid="payin-input"]').clear().type(payIn.toString());
      cy.get('[data-testid="calculator-operator-fee"]').then(($opFee) => {
        const operatorFee = parseFloat($opFee[0].dataset.testvalue!);
        const expectedTotal = payIn + operatorFee + (payIn * (taxPercentage / 100));

        cy.get('[data-testid="calculator-total-amount"]').should('have.text', formatAmount(expectedTotal));
      });
    }
  });



});

