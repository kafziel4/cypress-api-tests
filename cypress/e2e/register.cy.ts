import {
  headers,
  jsonContentType,
  missingPassword,
} from 'cypress/fixtures/constants';
import * as requests from 'cypress/requests/register';
import { ErrorResponse } from 'cypress/types/common';
import { RegisterRequest, RegisterResponse } from 'cypress/types/register';

describe('ReqRes API Register endpoints', () => {
  it('POST to /register with valid data should return status 200 and the registration id and token', () => {
    // Arrange
    const requestBody: RegisterRequest = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    const expectedResponse: RegisterResponse = {
      id: 4,
      token: 'QpwL5tke4Pnpja7X4',
    };

    // Act
    requests.postRegister(requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });

  it('POST to /register with missing password should return status 400 and the validation error', () => {
    // Arrange
    const requestBody: RegisterRequest = {
      email: 'sydney@fife',
    };

    const expectedResponse: ErrorResponse = {
      error: missingPassword,
    };

    // Act
    requests.postRegister(requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(400);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });
});
