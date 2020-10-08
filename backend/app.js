const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dateAPI = require('./routes/date.routes');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// app.use(dateRouter);
app.use('/api', dateAPI);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
