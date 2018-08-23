const express = require('express'),
      router = express.Router();

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

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
    })
    .catch((e) => {
      res.status(500).json({ error: e });
    });
});

module.exports = router;