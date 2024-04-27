import { httpMethods } from 'cypress/fixtures/constants';
import { ErrorResponse } from 'cypress/types/common';
import { RegisterRequest, RegisterResponse } from 'cypress/types/register';

const registerPath = '/register';

export const postRegister = (
  body: RegisterRequest
): Cypress.Chainable<Cypress.Response<RegisterResponse | ErrorResponse>> =>
  cy.request({
    method: httpMethods.post,
    url: registerPath,
    body,
    failOnStatusCode: false,
  });
