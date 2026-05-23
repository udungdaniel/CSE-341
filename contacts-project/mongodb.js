const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

let database;

async function initDb() {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db('contactsDB');
    console.log('Connected to MongoDB');
    return database;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { initDb };