const request = require('supertest');

const app = require('../app');
const Profile = require('../models/Profile');

const {
  loginOpts,
  profileOpts,
  seedDb
} = require('./seeds');

let token, profileId, userId;

const LOGIN_URI   = '/api/users/login',
      PROFILE_URI = '/api/profile';

beforeAll((done) => {
  Profile.remove({}).then(() => done());

  // log a test user in
  seedDb(loginOpts.userOne, LOGIN_URI, app, (res) => {
    token = res.body.token;
    done();
  });
});

describe('Profile router', () => {
  describe('various /api/profile errors', () => {
    it('returns an error if no profiles exist for /all', (done) => {
      request(app)
        .get('/api/profile/all')
        .expect(404)
        .then((res) => {
          expect(res.body.noProfiles).toEqual('No profiles added yet!');
          done();
        });
    });

    it('returns an error if user profile doesn\'t exist', (done) => {
      request(app)
        .get('/api/profile')
        .set('Authorization', token)
        .expect(404)
        .then((res) => {
          expect(res.body.noProfile).toEqual(
            'Can\'t find a profile for this user!'
          );
          done();
        });
    });
  });

  /*
   * GET and POST /api/profile
   */ 
  describe('/api/profile', () => {
    it('returns errors for failed validations', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.handle).toEqual('Handle is required');
          expect(res.body.status).toEqual('Status is required');
          expect(res.body.skills).toEqual('Please add at least one skill');
          done();
        });
    });

    it('creates the user\'s profile correctly', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send(profileOpts.profileOne)
        .expect(200)
        .then((res) => {
          // save profile id and corresponding user id
          // for later tests
          profileId = res.body._id;
          userId = res.body.user.toString();
          expect(res.body.handle).toEqual('testuser9000');
          done();
        });
    });

    it('updates profile if already exists', (done) => {
      request(app)
        .post('/api/profile')
        .set('Authorization', token)
        .send({ ...profileOpts.profileOne, status: 'Supreme Tester' })
        // 200 means no validation fails - i.e. profile is updated
        .expect(200)
        .then((res) => {
          // same id means it's the same profile
          expect(res.body._id).toEqual(profileId);
          // make sure the status is indeed updated
          expect(res.body.status).toEqual('Supreme Tester');
          done();
        });
    });

    it('returns user\'s profile via GET request, if exists', (done) => {
      request(app)
        .get('/api/profile')
        .set('Authorization', token)
        .expect('Content-type', /json/)
        .expect(200, done);
    });
  });

  /*
   * GET /api/profile/handle/:handle
   */
  describe('/api/profile/handle/:handle', () => {
    it('returns user profile data by handle', (done) => {
      request(app)
        .get(`/api/profile/handle/${profileOpts.profileOne.handle}`)
        .expect('Content-type', /json/)
        .expect(200, done);
    });

    it('returns error if profile doesn\'t exist', (done) => {
      request(app)
        .get('/api/profile/handle/nosuchhandle')
        .expect(404)
        .then((res) => {
          expect(res.body.noProfile).toEqual('This profile does not exist');
          done();
        });
    });
  });

  /*
   * GET /api/profile/user/:id
   */
  describe('/api/profile/user/:id', () => {
    it('returns existing user profile by its user ID', (done) => {
      request(app)
        .get(`/api/profile/user/${userId}`)
        .expect('Content-type', /json/)
        .expect(200, done);
    });

    it('returns error if profile doesn\'t exist', (done) => {
      request(app)
        .get('/api/profile/user/5b8cfd75e695d0a5845ea2c7')
        .expect(404)
        .then((res) => {
          expect(res.body.noProfile).toEqual('This profile does not exist');
          done();
        });
    });
  });
});