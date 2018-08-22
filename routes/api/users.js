const express = require('express'),
      router = express.Router();

// IMPORTANT: the `/api/users` part is added in index.js,
// where we call `app.use` and feed it the imported routes

// @route   GET /api/posts/users
// @desc    tests users route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testUser' });
});

module.exports = router;