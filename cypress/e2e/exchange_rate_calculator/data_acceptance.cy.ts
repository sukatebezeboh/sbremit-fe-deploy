import { ORIGIN_COUNTRIES } from "../../../src/components/pages/new-auth-pages/utils/countries";

let serviceData: any[] = [];
const url = Cypress.env('baseUrl') + ':' + Cypress.env('port')

Cypress.Commands.add('waitUntilInputEnabled' as any, { prevSubject: true }, (subject: any, maxWaitTime: number) => {
  const MAX_WAIT_TIME = maxWaitTime || 10000; // Maximum wait time in milliseconds
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

    checkEnabled(); // Start checking if the input field is enabled
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
      const countryObject = ORIGIN_COUNTRIES.find(c => c.countryCode === data.country);
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
      console.log({ data })

    }
  });

  it('has correct operator fees for each fee boundary', () => {
    for (const data of serviceData) {
      console.log({ data })

    }
  });

  it('total value is correct with tax percentage accounted for', () => {
    for (const data of serviceData) {
      console.log({ data })
    }
  });



});

