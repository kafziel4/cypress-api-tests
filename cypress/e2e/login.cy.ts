import {
  headers,
  jsonContentType,
  missingPassword,
} from 'cypress/fixtures/constants';
import * as requests from 'cypress/requests/login';
import { ErrorResponse } from 'cypress/types/common';
import { LoginRequest, LoginResponse } from 'cypress/types/login';

describe('ReqRes API Login endpoints', () => {
  it('POST to /login with valid data should return status 200 and the login token', () => {
    // Arrange
    const requestBody: LoginRequest = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    const expectedResponse: LoginResponse = {
      token: 'QpwL5tke4Pnpja7X4',
    };

    // Act
    requests.postLogin(requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });

  it('POST to /login with missing password should return status 400 and the validation error', () => {
    // Arrange
    const requestBody: LoginRequest = {
      email: 'peter@klaven',
    };

    const expectedResponse: ErrorResponse = {
      error: missingPassword,
    };

    // Act
    requests.postLogin(requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(400);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });
});
