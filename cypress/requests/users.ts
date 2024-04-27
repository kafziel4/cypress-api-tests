import { httpMethods } from 'cypress/fixtures/constants';
import {
  CreateUserRequest,
  CreateUserResponse,
  SingleUser,
  UpdateUserRequest,
  UpdateUserResponse,
  UserList,
} from 'cypress/types/users';

const usersPath = '/users';

export const getUsers = (
  page: number
): Cypress.Chainable<Cypress.Response<UserList>> =>
  cy.request({
    url: usersPath,
    qs: { page },
  });

export const getSingleUser = (
  id: number
): Cypress.Chainable<Cypress.Response<SingleUser>> =>
  cy.request({
    url: `${usersPath}/${id}`,
    failOnStatusCode: false,
  });

export const postUser = (
  body: CreateUserRequest
): Cypress.Chainable<Cypress.Response<CreateUserResponse>> =>
  cy.request(httpMethods.post, usersPath, body);

export const putUser = (
  id: number,
  body: UpdateUserRequest
): Cypress.Chainable<Cypress.Response<UpdateUserResponse>> =>
  cy.request(httpMethods.put, `${usersPath}/${id}`, body);

export const patchUser = (
  id: number,
  body: UpdateUserRequest
): Cypress.Chainable<Cypress.Response<UpdateUserResponse>> =>
  cy.request(httpMethods.patch, `${usersPath}/${id}`, body);

export const deleteUser = (
  id: number
): Cypress.Chainable<Cypress.Response<string>> =>
  cy.request(httpMethods.delete, `${usersPath}/${id}`);
