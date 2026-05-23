const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

const mongodb = require('../mongodb');

router.get('/', async (req, res) => {
  try {
    const db = await mongodb.initDb();

    const result = await db.collection('contacts').find();

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const result = await db
      .collection('contacts')
      .find({ _id: contactId });

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;