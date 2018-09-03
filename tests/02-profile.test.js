const request = require('supertest');

const app = require('../app');

const Profile = require('../models/Profile');

const {
  loginOpts,
  profileOpts,
  seedDb
} = require('./seeds');

let token, profileId;

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
      .expect(200)
      .then((res) => {
        profileId = res.body._id;
        expect(res.body.handle).toEqual('testuser9000');
        done();
      });
  });

  it('updates profile if already exists', (done) => {
    request(app)
      .post('/api/profile')
      .set('Authorization', token)
      .send({ ...profileOpts, status: 'Supreme Tester' })
      // 200 means no validation fails - i.e. profile is updated
      .expect(200)
      .then((res) => {
        // same id means it's the same profile
        expect(res.body._id).toEqual(profileId);
        expect(res.body.handle).toEqual(profileOpts.handle);
        done();
      });
  });
});