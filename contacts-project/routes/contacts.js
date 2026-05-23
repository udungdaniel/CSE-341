const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

const mongodb = require('../mongodb');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', async (req, res) => {
  try {
    const db = await mongodb.initDb();

    const result = await db.collection('contacts').find();

    const contacts = await result.toArray();

    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get single contact
 */
router.get('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const result = await db
      .collection('contacts')
      .find({ _id: contactId });

    const contacts = await result.toArray();

    res.status(200).json(contacts[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create new contact
 */
router.post('/', async (req, res) => {
  try {
    const db = await mongodb.initDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('contacts').insertOne(contact);

    res.status(201).json({
      message: 'Contact created',
      id: response.insertedId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update contact
 */
router.put('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('contacts').replaceOne(
      { _id: contactId },
      contact
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete contact
 */
router.delete('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const response = await db.collection('contacts').deleteOne({
      _id: contactId
    });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;