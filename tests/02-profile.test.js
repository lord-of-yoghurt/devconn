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
  Profile.remove({}).then(() => done());

  seedDb(loginOpts.userOne, LOGIN_URI, app, (res) => {
    token = res.body.token;
    done();
  });
});

describe('Profile router', () => {
  it('creates the user\'s profile correctly', (done) => {
    request(app)
      .post('/api/profile')
      .set('Authorization', token)
      .send(profileOpts)
      .expect(200, done);
  });
});