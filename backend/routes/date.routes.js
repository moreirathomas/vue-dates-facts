const express = require('express');
const axios = require('axios');

const app = express();

const numbersApi = 'http://numbersapi.com/';

app.post('/api', async (req, res, next) => {
  const inputs = req.body;

  try {
    const dataList = inputs.map((input) => {
      return axios.get(`${numbersApi}/${input}/date`);
    });
    res.send(dataList);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
