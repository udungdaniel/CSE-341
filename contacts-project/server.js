const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', require('./routes/contacts'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Contacts API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});