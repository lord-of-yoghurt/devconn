const express = require('express'),
      router = express.Router();

router.get('/test', (req, res) => {
  res.json({ test: 'testProfile' });
});

module.exports = router;