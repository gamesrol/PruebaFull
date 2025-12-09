const Person = require('../models/personsModel');

const listPersonsController = async (req, res) => {
    const perPage = 2;
    const page =  4;
    const persons = await Person.find().sort({name: 1 }).skip((page - 1) * perPage).limit(perPage);
    res.status(200).json(persons);
}

const getPersonController = async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.status(200).json(person);
}

const createPersonController = async (req, res) => {
    const { name, surname, is_teacher, birthdate } = req.body;
    if (!name || !surname || !birthdate) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const newPerson = new Person({ name, surname, is_teacher, birthdate });
    await newPerson.save();
    res.status(201).json(newPerson);
}

const updatePersonController =  async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    Object.assign(person, req.body);
    await person.save();
    res.status(201).json(person);
}

const deletePersonController = async (req, res) => {
    const person = await Person.findById(req.params.id);
    console.log(person);
    if (!person) {
        return res.status(404).json({ error: 'Person not found' });
    }

    await person.deleteOne();
    res.json({ message: 'Person deleted' });
}

module.exports = {
    listPersonsController,
    getPersonController,
    createPersonController,
    updatePersonController,
    deletePersonController
};