const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async () => {
  try {
    if (database) {
      return database;
    }

    const client = new MongoClient(process.env.MONGODB_URL, {
      tls: true,
      tlsAllowInvalidCertificates: false
    });

    await client.connect();

    database = client.db('contactsDB');

    console.log('Connected to MongoDB');

    return database;
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    throw err;
  }
};

module.exports = { initDb };