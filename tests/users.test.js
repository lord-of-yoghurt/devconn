const request = require('supertest');

const app = require('../app');
const User = require('../models/User');

const { registerOpts, loginOpts } = require('./dummyData');
let token;

beforeAll((done) => {
  User.remove({}).then(() => done());
});

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

  it('registers a new user successfully', (done) => {
    request(app)
      .post('/api/users/register')
      .send(registerOpts)
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body.name).toEqual(registerOpts.name);
        done();
      });
  });

  it('logs user in and receives a token', (done) => {
    request(app)
      .post('/api/users/login')
      .send(loginOpts)
      .expect(200)
      .then((res) => {
        token = res.body.token;
        expect(token).toBeTruthy();
        done();
      });
  });
});