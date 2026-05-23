const express = require('express');

const app = express();

const port = 3000;

app.use('/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send('Hello World, welcome to CSE341');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});