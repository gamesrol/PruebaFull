const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;