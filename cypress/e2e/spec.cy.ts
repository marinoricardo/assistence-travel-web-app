describe('Home Page', () => {
  it('should search city name', () => {
    cy.visit('/')
    cy.get('input[name="city_name"]').type('nampula')
    cy.get('button[name="btnSearch"]').click()
  })
})
