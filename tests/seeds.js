const request = require('supertest');

// register a user
exports.registerOpts = {
  userOne: {
    email: 'test1@test.com',
    password: '123456',
    confPassword: '123456',
    name: 'Test User'
  },
  userTwo: {
    email: 'test1@test.com',
    password: '123456',
    confPassword: '123456',
    name: 'Test User'
  }
};

// log a user in
exports.loginOpts = {
  userOne: {
    email: 'test1@test.com',
    password: '123456'
  }
};

// non-existing email
exports.wrongEmail = {
  email: 'doesnotexist@anywhere.com',
  password: 'whocares'
};

// wrong, uh, password?
exports.wrongPassword = {
  email: 'test1@test.com',
  password: '654321'
};

exports.profileOpts = {
  handle: 'testuser9000',
  status: 'Master Tester',
  skills: 'RSpec, Jest, Mocha, Chai',
  website: 'http://testingrocks.ee',
  youtube: 'http://youtube.com/users/itesteverything'
};

exports.seedDb = (userData, url, app, callback) => {
  request(app)
    .post(url)
    .send(userData)
    .then((res) => callback(res));
};