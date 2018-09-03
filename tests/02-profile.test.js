const request = require('supertest');

const app = require('../app');

const Profile = require('../models/Profile');

const {
  loginOpts,
  profileOpts,
  seedDb
} = require('./seeds');

let token;

const LOGIN_URI   = '/api/users/login',
      PROFILE_URI = '/api/profile';

beforeAll((done) => {
  Profile.remove({});

  seedDb(loginOpts, LOGIN_URI, app, (res) => {
    token = res.body.token;
    done();
  });
});

describe('Profile router', () => {
  it('logs user in', (done) => {
    request(app)
      .get('/api/users/current')
      .set('Authorization', token)
      .expect(200, done);
  });
});