const request = require('supertest');

const app = require('../app');
const User = require('../models/User');

beforeAll((done) => {
  User.remove({}).then(() => done());
});

const registerOpts = {
  email: 'test1@test.com',
  password: '123456',
  confPassword: '123456',
  name: 'Test User'
};

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

  // it('works with post requests', (done) => {
  //   request(app)
  //     .post('/api/users/test')
  //     .send({ message: 'oh hai' })
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.message).toEqual('oh hai');
  //       done();
  //     });
  // });

  it('registers a new user successfully', (done) => {
    request(app)
      .post('/api/users/register')
      .send(registerOpts)
      .expect(200, done)
  });
});