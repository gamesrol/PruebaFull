const { listClassrooms, getClassroom, createClassroom, updateClassroom, deleteClassroom } = require('../models/classroomModel');

const listClassroomsController = (req, res) => {
    const classrooms = listClassrooms();
    res.status(200).json(classrooms);
}

const getClassroomController = (req, res) => {
    const classroom = getClassroom(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });
    res.status(200).json(classroom);
}

const createClassroomController = (req, res) => {
    const { name, teacher_id , students  } = req.body;
    if (!name || !teacher_id || !students) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    res.status(201).json(createClassroom(req.body));
}

const updateClassroomController = (req, res) => {
    const classroom = getClassroom(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });
    res.status(201).json(updateClassroom(req.params.id, req.body));
}

const deleteClassroomController = (req, res) => {
    const classroom = getClassroom(req.params.id);

    if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
    }

    deleteClassroom(req.params.id)
    res.json({ message: 'Classroom deleted' });
}

module.exports = {
    listClassroomsController,
    getClassroomController,
    createClassroomController,
    updateClassroomController,
    deleteClassroomController
};