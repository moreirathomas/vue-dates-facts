const express = require('express');
const axios = require('axios');

const dateRoute = express.Router();

const numbersApi = 'http://numbersapi.com/';

const fetchFact = async (term) => {
  try {
    const res = await axios
      .get(numbersApi + `${term}/date`)
      .then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

dateRoute.route('/').post(async (req, res) => {
  const inputs = req.body;
  try {
    let dataList = await Promise.all(
      inputs.map(async (input) => {
        return { date: input, fact: await fetchFact(input) };
      })
    );
    console.log({ dataList });
    res.send(dataList);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = dateRoute;
