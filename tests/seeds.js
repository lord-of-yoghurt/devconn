// register a user
exports.registerOpts = {
  email: 'test1@test.com',
  password: '123456',
  confPassword: '123456',
  name: 'Test User'
};

// log a user in
exports.loginOpts = {
  email: 'test1@test.com',
  password: '123456'
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