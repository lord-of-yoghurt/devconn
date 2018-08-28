const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

// load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// load validation
const validateProfileInput = require('../../validations/profile');

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
      .populate('user', ['name', 'avatar'])
      .then((profile) => {
        if (!profile) {
          errors.noProfile = 'Can\'t find a profile for this user!';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((e) => res.status(404).json(e));
  }
);

// @route   GET /api/profile/handle/:handle
// @desc    fetch a user's profile by handle
// @access  public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'This profile does not exist';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((e) => res.status(404).json(e));
});

// @route   GET /api/profile/user/:id
// @desc    fetch a user's profile by id
// @access  public
router.get('/user/:id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'This profile does not exist';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((e) => {
      errors.databaseError = 'This profile does not exist';
      return res.status(404).json(errors);
    });
});

// @route   POST /api/profile
// @desc    receive user's profile data and create/edit profile
// @access  private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) return res.status(400).json(errors);
    // Get the fields that need further processing
    const user = req.user.id, 
      { skills, youtube, twitter, facebook, linkedin, instagram } = req.body;

    // this is all of the fields
    const profileFields = {
      // first, spread the req.body object...
      ...req.body,
      // then, add the user reference...
      user,
      // then, overwrite skills and social properly
      skills: skills
        .split(',')
        .map((skill) => skill.trim()),
      // WARNING: null values will be assigned if no link is provided.
      // check if this is a problem in the future
      social: { youtube, twitter, facebook, linkedin, instagram }
    };

    Profile.findOne({ user })
      .then((profile) => {
        // if the profile exists, this is an update!
        if (profile) {
          Profile.findOneAndUpdate(
            { user },
            { $set: profileFields },
            { new: true }
          )
            .then((profile) => res.json(profile));
        } else {
          // otherwise, create a new profile
          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              // handles must be unique
              if (profile) {
                errors.handle = 'This handle already exists';
                return res.status(400).json(errors);
              }
              // if all is good, save the profile
              const newProfile = new Profile(profileFields);
              newProfile.save()
                .then((savedProfile) => res.json(savedProfile))
                .catch((e) => console.log(e));
            });
        }
      });
  }
);

module.exports = router;