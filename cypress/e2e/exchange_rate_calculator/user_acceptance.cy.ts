import {
  formatAmount
} from "components/pages/transcations-flow/utils/reuseableUtils";

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

describe('Exchange Rate Calculator [User Journey]', () => {

  beforeEach(() => {
    cy.visit(url);
    cy.get('[data-testid="x-calculator"]').should('be.visible');
    cy.get('[data-testid="payin-input"]').waitUntilInputEnabled()
  });

  it('calculates correct payout amount based on exchange rate', () => {
    const payIn = '1000';

    cy.get('[data-testid="payin-input"]').type(payIn);

    cy.get('[data-testid="payout-method-select"]').click();

    cy.contains('.ant-select-item-option-content', 'Bank Transfer').click();

    cy.get('[data-testid="calculator-x-rate"]').then(($xRate) => {
      const xRate = parseFloat($xRate[0].dataset.testvalue!);

      const expectedPayout = parseFloat(payIn) * xRate;

      cy.get('[data-testid="payout-input"]').should('have.value', formatAmount(Math.round(expectedPayout)));
    });
  });

  it('calculates correct total amount for selected Payment Method', () => {
    const payIn = '1000';

    cy.get('[data-testid="payin-input"]').type(payIn);

    cy.get('[data-testid="payout-method-select"]').click();
    cy.contains('.ant-select-item-option-content', 'Bank Transfer').click();

    cy.get('[data-testid="calculator-operator-fee"]').then(($opFee) => {
      const operatorFee = parseFloat($opFee[0].dataset.testvalue!);

      const expectedTotal = (parseFloat(payIn)) + operatorFee;

      cy.get('[data-testid="calculator-total-amount"]').should('have.text', formatAmount(expectedTotal));
    })
  });

  it('correctly switches PayIn currency', () => {
    // Select NOK in the calculator-payin-currency ant design dropdown
    cy.get('[data-testid="calculator-payin-currency"]').click();
    cy.contains('.ant-select-item-option-content', 'NOK').click();

    // Verify that calculator-total-currency reads NOK
    cy.get('[data-testid="calculator-total-currency"]').should('have.text', 'NOK');

    // Verify that x-payin-currency reads NOK in text
    cy.get('[data-testid="x-payin-currency"]').should('have.text', 'NOK');
  });


  it('correctly switches PayOut currency', () => {
    // Select XAF in the calculator-payout-currency ant design dropdown
    cy.get('[data-testid="calculator-payout-currency"]').click();
    cy.contains('.ant-select-item-option-content', 'XAF').click();

    // Verify that x-payout-currency reads XAF in text
    cy.get('[data-testid="x-payout-currency"]').should('have.text', 'XAF');
  });

  it('Start Sending Money button goes to /get-quote page', () => {
    // Click on the "Start Sending Money" button
    cy.get('[data-testid="x-calculator-send-btn"]').click();

    // Assert that the URL contains "/get-quote"
    cy.url().should('include', '/get-quote');
  });

});

