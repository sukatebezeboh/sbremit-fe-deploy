import React from 'react'
import ExchangeRateCalculator from './ExchangeRateCalculator'

describe('<ExchangeRateCalculator />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ExchangeRateCalculator />)
  })
})