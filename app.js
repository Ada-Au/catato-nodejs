const express = require('express');
const morganBody = require('morgan-body');
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === 'production' });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

require('./routes/parasite')(app);

app
  .post('/square', (req, res) => {
    const output = parseInt(req.body.input) ** 2;
    res.json(output);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
