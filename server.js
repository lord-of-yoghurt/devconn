const express = require('express'),
      app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('I AM ALIVE!!!');
});

app.listen(PORT, () => {
  console.log(`You got this! Accepting all traffic on ${PORT}...`);
});