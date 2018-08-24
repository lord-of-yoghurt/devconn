const express = require('express'),
      router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

// Load User model
const User = require('../../models/User');

// IMPORTANT: the `/api/users` part is added in index.js,
// where we call `app.use` and feed it the imported routes

// @route   GET /api/users/test
// @desc    tests users route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testUser' });
});

// @route   GET /api/users/register
// @desc    Register new user
// @access  public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) return res.status(400).json({
        error: 'This email already exists!'
      });
      
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Avatar size
        r: 'pg', // Rating
        d: 'mm' // Default 
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      newUser.save()
        .then((user) => res.json(user))
        .catch((e) => console.log(e));
    })
    .catch((e) => {
      console.log(e);
    });
});

// @route   GET /api/users/login
// @desc    Login user / Assign JWT token
// @access  public
router.post('/login', (req, res) => {
  const email    = req.body.email,
        password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({
        error: 'User not found!'
      });

      // Check password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({
            error: 'The password is incorrect!'
          });
          
          // User matched - sign token
          // The payload is needed to identify user later on
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          jwt.sign(payload, keys.jwtSecret, {
            expiresIn: 86400 // seconds - 1 day
          }, (err, token) => {
            if (err) return console.log(err);

            res.json({
              message: 'Token successfully assigned!',
              token: `Bearer ${token}`
            });
          });
        })
        .catch((e) => console.log(e));
    });
});


module.exports = router;