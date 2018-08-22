const express = require('express'),
      router = express.Router();

// @route   GET /api/posts/profile
// @desc    tests profile route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testProfile' });
});

module.exports = router;