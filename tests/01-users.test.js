const request = require('supertest');

const app = require('../app');
const User = require('../models/User');

// get dummy data to fill in fields
const { 
  registerOpts, 
  loginOpts,
  wrongEmail,
  wrongPassword
} = require('./seeds');

// JWT token to be saved here upon login
let token;

// before running tests, drop the test db (User model only)
beforeAll((done) => {
  User.remove({}).then(() => done());
});

describe('User router', () => {
  describe('/api/users/register', () => {
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

    it('returns errors when register validations fail', (done) => {
      request(app)
        .post('/api/users/register')
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.name).toEqual('Name cannot be empty');
          expect(res.body.email).toEqual('Email cannot be empty');
          done();
        });
    });

    it('returns an error when an email already exists', (done) => {
      request(app)
        .post('/api/users/register')
        .send(registerOpts)
        .expect(400)
        .then((res) => {
          expect(res.body.email).toEqual('This email already exists!');
          done();
        });
    });
  });

  describe('/api/users/login', () => {
    it('returns errors when login validations fail', (done) => {
      request(app)
        .post('/api/users/login')
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.email).toEqual('Email cannot be empty');
          expect(res.body.password).toEqual('Password cannot be empty');
          done();
        });
    });

    it('returns an error if the user doesn\'t exist', (done) => {
      request(app)
        .post('/api/users/login')
        .send(wrongEmail)
        .expect(404)
        .then((res) => {
          expect(res.body.email).toEqual('User not found!');
          done();
        });
    });

    it('returns an error if password is wrong', (done) => {
      request(app)
        .post('/api/users/login')
        .send(wrongPassword)
        .expect(400)
        .then((res) => {
          expect(res.body.password).toEqual('Incorrect email or password');
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

  describe('/api/users/current', () => {
    it('returns Unauthorized with wrong token', (done) => {
      request(app)
        .get('/api/users/current')
        .set('Authorization', 'notatoken')
        .expect(401, done);
    });

    it('returns a User instance when user is logged in', (done) => {
      request(app)
        .get('/api/users/current')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-type', /json/)
        .then((res) => {
          expect(res.body.name).toEqual('Test User');
          done();
        });
    });
  });
});