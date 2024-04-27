import { httpMethods } from 'cypress/fixtures/constants';
import { ErrorResponse } from 'cypress/types/common';
import { LoginRequest, LoginResponse } from 'cypress/types/login';

const loginPath = '/login';

export const postLogin = (
  body: LoginRequest
): Cypress.Chainable<Cypress.Response<LoginResponse | ErrorResponse>> =>
  cy.request({
    method: httpMethods.post,
    url: loginPath,
    body,
    failOnStatusCode: false,
  });
