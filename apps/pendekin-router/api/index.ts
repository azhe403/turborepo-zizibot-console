require('dotenv').config();

const express = require('express');
const axios = require('axios');
const process = require('process');
const https = require('node:https');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome To Pendekin Router!' });
});

app.get('/:pendekinPath', async (req, res) => {
  const { pendekinPath } = req.params;

  let config = {
    method: 'get',
    url: process.env.API_BASE_URL + '/api/pendekin/' + pendekinPath,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false // Disable SSL verification
    }),
    validateStatus: function() {
      return true; // Accept all HTTP status codes
    }
  };

  const response = await axios(config);
  console.log('pendekin response', JSON.stringify(response.data));
  const originalUrl = response.data.result?.originalUrl;
  console.log('originalUrl', originalUrl);

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({
      message: 'Pendekin not found!'
    });
  }
});

app.listen(7140, () => console.debug('Server ready on port 7140'));

module.exports = app;
