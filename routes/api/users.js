const express = require('express'),
      router = express.Router();

const gravatar = require('gravatar');

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

module.exports = router;