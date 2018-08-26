const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

// load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET /api/profile/test
// @desc    test profile route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testProfile' });
});

// @route   GET /api/profile
// @desc    send current user's profile
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

// @route   POST /api/profile
// @desc    receive user's profile data and create/edit profile
// @access  private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get the fields that need further processing
    const { 
      skills, 
      youtube, 
      twitter, 
      facebook, 
      linkedin, 
      instagram 
    } = req.body;

    // this is all of the fields
    const profileFields = {
      // first, spread the req.body object...
      ...req.body,
      // then, add the user reference...
      user: req.user.id,
      // then, overwrite skills and social properly
      skills: skills.split(','),
      social: { youtube, twitter, facebook, linkedin, instagram }
    };
  }
);

module.exports = router;