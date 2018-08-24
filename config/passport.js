const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      mongoose = require('mongoose');

const User = require('../models/User');

const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.jwtSecret;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then((user) => {
        if (user) return done(null, user);
        
        return done(null, false);
      })
      .catch((e) => console.log(e));
  }));
};