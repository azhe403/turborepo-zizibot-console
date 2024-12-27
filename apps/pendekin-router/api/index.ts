require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome To Pendekin Router!' });
});

app.get('/:pendekinPath', async (req, res) => {
  const { pendekinPath } = req.params;

  let config = {
    method: 'get',
    url: 'https://console-stg.zizibot.nf.azhe.my.id/api/pendekin/' + pendekinPath,
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
