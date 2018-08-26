const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

// load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET /api/profile/test
// @desc    tests profile route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testProfile' });
});

// @route   GET /api/profile
// @desc    get current user's profile
// @access  private
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noProfile = 'Can\'t find a profile for this user!';
          return res.status(404).json(errors);
        }
        res.json(profile)
      })
      .catch((e) => res.status(404).json(e));
  }
);

module.exports = router;