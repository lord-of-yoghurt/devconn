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
    email: 'test2@test.com',
    password: '121212',
    confPassword: '121212',
    name: 'Some weird dude'
  }
};

// log a user in
exports.loginOpts = {
  userOne: {
    email: 'test1@test.com',
    password: '123456'
  },
  userTwo: {
    email: 'test2@test.com',
    password: '121212'
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
  profileOne: {
    handle: 'testuser9000',
    status: 'Master Tester',
    skills: 'RSpec, Jest, Mocha, Chai',
    website: 'http://testingrocks.ee',
    youtube: 'http://youtube.com/users/itesteverything'
  },
  profileTwo: {
    handle: 'testallday',
    status: 'Testing Apprentice',
    skills: 'Postman',
    instagram: 'http://instagram.com/borntotest'
  }
};

exports.expOpts = {
  title: 'Tester Protegee',
  company: 'Testing Unlimited, Inc.',
  from: '2005-11-27',
  to: '2006-11-26',
  description: 'Test, test, test!'
};

exports.eduOpts = {
  school: 'NYU School of Testing',
  degree: 'Bachelor of Testing, Master of Testing',
  fieldOfStudy: 'Agriculture',
  from: '2007-01-01',
  current: true
};

exports.seedDb = (userData, url, app, callback) => {
  request(app)
    .post(url)
    .send(userData)
    .then((res) => callback(res));
};