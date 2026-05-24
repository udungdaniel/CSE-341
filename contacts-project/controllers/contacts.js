const mongodb = require('../mongodb');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = await mongodb.initDb();

    const result = await db.collection('contacts').find();

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
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
};

const createContact = async (req, res) => {
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

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = await mongodb.initDb();

    const response = await db.collection('contacts').replaceOne(
      { _id: contactId },
      contact
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const response = await db.collection('contacts').deleteOne({
      _id: contactId
    });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};