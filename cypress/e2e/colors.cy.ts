import { colors } from 'cypress/fixtures/colors';
import { headers, jsonContentType } from 'cypress/fixtures/constants';
import * as requests from 'cypress/requests/colors';
import { ColorList, SingleColor } from 'cypress/types/colors';

describe('ReqRes API Colors endpoints', () => {
  it('GET to /colors should return status 200 and a list of colors', () => {
    // Arrange
    const expectedResponse: ColorList = colors;

    // Act
    requests.getColors().should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(expectedResponse);
    });
  });

  it('GET to /colors/id for an existing color should return status 200 and the color data', () => {
    // Arrange
    const expectedResponse: SingleColor = {
      data: {
        id: 2,
        name: 'fuchsia rose',
        year: 2001,
        color: '#C74375',
        pantone_value: '17-2031',
      },
    };

    // Act
    requests.getSingleColor(expectedResponse.data.id).should((response) => {
      // Assert
      expect(response.status).to.equal(200);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.deep.include(expectedResponse);
    });
  });

  it('GET to /colors/id for a color that does not exist should return status 404', () => {
    // Arrange
    const nonexistentId = 23;

    // Act
    requests.getSingleColor(nonexistentId).should((response) => {
      // Assert
      expect(response.status).to.equal(404);
      expect(response.headers[headers.contentType]).to.equal(jsonContentType);
      expect(response.body).to.be.an('object').that.is.empty;
    });
  });
});
