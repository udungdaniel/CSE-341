const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use('/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send('Welcome to Contacts API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});