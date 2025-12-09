const indexController = (req, res) => {
    res.status(200).json({ message: 'Welcome to the Classroom Management API' });
}

module.exports = indexController;