import { ColorList, SingleColor } from 'cypress/types/colors';

const colorsPath = '/colors';

export const getColors = (): Cypress.Chainable<Cypress.Response<ColorList>> =>
  cy.request(colorsPath);

export const getSingleColor = (
  id: number
): Cypress.Chainable<Cypress.Response<SingleColor>> =>
  cy.request({
    url: `${colorsPath}/${id}`,
    failOnStatusCode: false,
  });
