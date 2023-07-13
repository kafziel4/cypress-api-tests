import * as fixtures from '../fixtures';
import * as Types from '../types';

const oneToThreeDigits = /^\d{1,3}$/;
const dateInISOFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

describe('ReqRes API', () => {
  it('GET to /users should return status 200 and a list of users', () => {
    // Act
    cy.request<Types.UserList>({
      url: '/users',
      method: 'GET',
      qs: { page: 2 },
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseBody = response.body;
      expect(responseBody.page).to.equal(2);
      expect(responseBody.per_page).to.equal(6);
      expect(responseBody.total).to.equal(12);
      expect(responseBody.total_pages).to.equal(2);
      expect(responseBody.data).to.have.lengthOf(6);

      for (let i = 0; i < fixtures.users.length; i += 1) {
        const responseUsersData = responseBody.data;
        expect(responseUsersData[i].id).to.equal(fixtures.users[i].id);
        expect(responseUsersData[i].email).to.equal(fixtures.users[i].email);
        expect(responseUsersData[i].first_name).to.equal(
          fixtures.users[i].first_name
        );
        expect(responseUsersData[i].last_name).to.equal(
          fixtures.users[i].last_name
        );
        expect(responseUsersData[i].avatar).to.equal(fixtures.users[i].avatar);
      }
    });
  });

  it('GET to /users/id for an existing user should return status 200 and the user data', () => {
    // Act
    cy.request<Types.SingleUser>({
      url: '/users/2',
      method: 'GET',
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseUserData = response.body.data;
      expect(responseUserData.id).to.equal(2);
      expect(responseUserData.email).to.equal('janet.weaver@reqres.in');
      expect(responseUserData.first_name).to.equal('Janet');
      expect(responseUserData.last_name).to.equal('Weaver');
      expect(responseUserData.avatar).to.equal(
        'https://reqres.in/img/faces/2-image.jpg'
      );
    });
  });

  it('GET to /users/id for a user that does not exist should return status 404', () => {
    // Act
    cy.request<object>({
      url: '/users/23',
      method: 'GET',
      failOnStatusCode: false,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(404);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(response.body).to.be.an('object').that.is.empty;
    });
  });

  it('GET to /colors should return status 200 and a list of colors', () => {
    // Act
    cy.request<Types.ColorList>({
      url: '/colors',
      method: 'GET',
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseBody = response.body;
      expect(responseBody.page).to.equal(1);
      expect(responseBody.per_page).to.equal(6);
      expect(responseBody.total).to.equal(12);
      expect(responseBody.total_pages).to.equal(2);
      expect(responseBody.data).to.have.lengthOf(6);

      for (let i = 0; i < fixtures.users.length; i += 1) {
        const responseColorsData = responseBody.data;
        expect(responseColorsData[i].id).to.equal(fixtures.colors[i].id);
        expect(responseColorsData[i].name).to.equal(fixtures.colors[i].name);
        expect(responseColorsData[i].year).to.equal(fixtures.colors[i].year);
        expect(responseColorsData[i].color).to.equal(fixtures.colors[i].color);
        expect(responseColorsData[i].pantone_value).to.equal(
          fixtures.colors[i].pantone_value
        );
      }
    });
  });

  it('GET to /colors/id for an existing color should return status 200 and the color data', () => {
    // Act
    cy.request<Types.SingleColor>({
      url: '/colors/2',
      method: 'GET',
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseColorData = response.body.data;
      expect(responseColorData.id).to.equal(2);
      expect(responseColorData.name).to.equal('fuchsia rose');
      expect(responseColorData.year).to.equal(2001);
      expect(responseColorData.color).to.equal('#C74375');
      expect(responseColorData.pantone_value).to.equal('17-2031');
    });
  });

  it('GET to /colors/id for a color that does not exist should return status 404', () => {
    // Act
    cy.request<object>({
      url: 'colors/23',
      method: 'GET',
      failOnStatusCode: false,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(404);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(response.body).to.be.an('object').that.is.empty;
    });
  });

  it('POST to /users with valid data should return status 201 and the user data', () => {
    // Arrange
    const requestBody: Types.CreateOrUpdateUserRequest = {
      name: 'morpheus',
      job: 'leader',
    };

    // Act
    cy.request<Types.CreateUserResponse>({
      url: '/users',
      method: 'POST',
      body: requestBody,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(201);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseBody = response.body;
      expect(responseBody.name).to.equal(requestBody.name);
      expect(responseBody.job).to.equal(requestBody.job);
      expect(responseBody.id).to.be.a('string').and.match(oneToThreeDigits);
      expect(responseBody.createdAt)
        .to.be.a('string')
        .and.match(dateInISOFormat);
    });
  });

  it('PUT to /users/id for an existing user with valid data should return status 200 and the user data', () => {
    // Arrange
    const requestBody: Types.CreateOrUpdateUserRequest = {
      name: 'morpheus',
      job: 'zion resident',
    };

    // Act
    cy.request<Types.UpdateUserResponse>({
      url: '/users/2',
      method: 'PUT',
      body: requestBody,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseBody = response.body;
      expect(responseBody.name).to.equal(requestBody.name);
      expect(responseBody.job).to.equal(requestBody.job);
      expect(responseBody.updatedAt)
        .to.be.a('string')
        .and.match(dateInISOFormat);
    });
  });

  it('PATCH to /users/id for an existing user with valid data should return status 200 and the user data', () => {
    // Arrange
    const requestBody: Types.CreateOrUpdateUserRequest = {
      name: 'morpheus',
      job: 'zion resident',
    };

    // Act
    cy.request<Types.UpdateUserResponse>({
      url: '/users/2',
      method: 'PATCH',
      body: requestBody,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseBody = response.body;
      expect(responseBody.name).to.equal(requestBody.name);
      expect(responseBody.job).to.equal(requestBody.job);
      expect(responseBody.updatedAt)
        .to.be.a('string')
        .and.match(dateInISOFormat);
    });
  });

  it('DELETE to /users/id for an existing user should return status 204', () => {
    // Act
    cy.request<void>({
      url: '/users/2',
      method: 'DELETE',
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(204);

      expect(response.headers['content-length']).to.equal('0');
    });
  });

  it('POST to /register with valid data should return status 200 and the registration id and token', () => {
    // Arrange
    const requestBody: Types.RegisterOrLoginRequest = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    // Act
    cy.request<Types.RegisterResponse>({
      url: '/register',
      method: 'POST',
      body: requestBody,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      const responseBody = response.body;
      expect(responseBody.id).to.equal(4);
      expect(responseBody.token).to.equal('QpwL5tke4Pnpja7X4');
    });
  });

  it('POST to /register with missing password should return status 400 and the validation error', () => {
    // Arrange
    const requestBody: Types.RegisterOrLoginRequest = {
      email: 'sydney@fife',
    };

    // Act
    cy.request<Types.ErrorResponse>({
      url: '/register',
      method: 'POST',
      body: requestBody,
      failOnStatusCode: false,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(400);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(response.body.error).to.equal('Missing password');
    });
  });

  it('POST to /login with valid data should return status 200 and the login token', () => {
    // Arrange
    const requestBody: Types.RegisterOrLoginRequest = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    // Act
    cy.request<Types.LoginResponse>({
      url: '/login',
      method: 'POST',
      body: requestBody,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(200);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(response.body.token).to.equal('QpwL5tke4Pnpja7X4');
    });
  });

  it('POST to /login with missing password should return status 400 and the validation error', () => {
    // Arrange
    const requestBody: Types.RegisterOrLoginRequest = {
      email: 'peter@klaven',
    };

    // Act
    cy.request<Types.ErrorResponse>({
      url: '/login',
      method: 'POST',
      body: requestBody,
      failOnStatusCode: false,
    }).should((response) => {
      // Assert
      expect(response.status).to.equal(400);

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );

      expect(response.body.error).to.equal('Missing password');
    });
  });
});
