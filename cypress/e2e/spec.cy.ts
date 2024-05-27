const url = Cypress.env('baseUrl') + ':' + Cypress.env('port')

describe('SBRemit', () => {
  it('visits landing page', () => {
    console.log({port: Cypress.env('port')})
    cy.visit(url)
  })
})


