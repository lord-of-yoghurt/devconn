const request = require('supertest');

const app = require('../app');

if (process.env.NODE_ENV === 'test') console.log('we\'re testing!');

describe('User router', () => {
  it('receives 200 from the test route', (done) => {
    request(app)
      .get('/api/users/test')
      .expect(200)
      .then((res) => {
        expect(res.body.test).toEqual('testUser');
        done();
      });
  });

  it('works with post requests', (done) => {
    request(app)
      .post('/api/users/test')
      .send({ message: 'oh hai' })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual('oh hai');
        done();
      });
  });
});