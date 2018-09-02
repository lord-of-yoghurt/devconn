const request = require('supertest');

const app = require('../app');

describe('The root path', () => {
  it('Returns 200', (done) => {
    request(app).get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});