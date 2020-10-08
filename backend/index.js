const express = require('express');
const cors = require('cors');

const dateRouter = require('./routes/date.routes');

const app = express();
app.use(cors());

app.use(dateRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}...`);
});
