require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome To Pendekin Router!' });
});

app.get('/:pendekinPath', async (req, res) => {
  res.json({
    message: 'Route not found!'
  });
});

app.listen(7140, () => console.debug('Server ready on port 7140'));

module.exports = app;
