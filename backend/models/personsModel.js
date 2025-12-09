const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    is_teacher: { type: Boolean, default: false },
    birthdate: { type: Date, required: true }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;