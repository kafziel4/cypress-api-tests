import {
  dateInISOFormat,
  headers,
  jsonContentType,
  oneToThreeDigits,
} from 'cypress/fixtures/constants';
import { users } from 'cypress/fixtures/users';
import * as requests from 'cypress/requests/users';
import {
  CreateUserRequest,
  SingleUser,
  UpdateUserRequest,
  UserList,
} from 'cypress/types/users';

describe('ReqRes API Users endpoints', () => {
  it('GET to /users should return status 200 and a list of users', () => {
    // Arrange
    const page = 2;
    const expectedResponse: UserList = users;

    // Act
    requests.getUsers(page).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(expectedResponse);
    });
  });

  it('GET to /users/id for an existing user should return status 200 and the user data', () => {
    // Arrange
    const expectedResponse: SingleUser = {
      data: {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
      },
    };

    // Act
    requests.getSingleUser(expectedResponse.data.id).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(expectedResponse);
    });
  });

  it('GET to /users/id for a user that does not exist should return status 404', () => {
    // Arrange
    const nonexistentId = 23;

    // Act
    requests.getSingleUser(nonexistentId).should((response) => {
      // Assert
      expect(response.status).to.equal(404);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.be.an('object').that.is.empty;
    });
  });

  it('POST to /users with valid data should return status 201 and the user data', () => {
    // Arrange
    const requestBody: CreateUserRequest = {
      name: 'morpheus',
      job: 'leader',
    };

    // Act
    requests.postUser(requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(201);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(requestBody);
      expect(response.body.id).to.match(oneToThreeDigits);
      expect(response.body.createdAt).to.match(dateInISOFormat);
    });
  });

  it('PUT to /users/id for an existing user with valid data should return status 200 and the user data', () => {
    // Arrange
    const id = 2;
    const requestBody: UpdateUserRequest = {
      name: 'morpheus',
      job: 'zion resident',
    };

    // Act
    requests.putUser(id, requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(requestBody);
      expect(response.body.updatedAt).to.match(dateInISOFormat);
    });
  });

  it('PATCH to /users/id for an existing user with valid data should return status 200 and the user data', () => {
    // Arrange
    const id = 2;
    const requestBody: UpdateUserRequest = {
      name: 'morpheus',
      job: 'zion resident',
    };

    // Act
    requests.patchUser(id, requestBody).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(requestBody);
      expect(response.body.updatedAt).to.match(dateInISOFormat);
    });
  });

  it('DELETE to /users/id for an existing user should return status 204', () => {
    // Arrange
    const id = 2;

    // Act
    requests.deleteUser(id).should((response) => {
      // Assert
      expect(response.status).to.equal(204);
      expect(response.headers[headers.contentLength]).to.equal('0');
    });
  });
});
