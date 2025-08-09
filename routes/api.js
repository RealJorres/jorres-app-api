const express = require('express');
const router = express.Router();

const collegeController = require('../controllers/collegeController');
const facultyController = require('../controllers/facultyController');
const studentController = require('../controllers/studentController');
const courseController = require('../controllers/courseController');
const attendanceController = require('../controllers/attendanceController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

// College Routes
router.post('/colleges', collegeController.createCollege);
router.get('/colleges', collegeController.getColleges);

// Faculty Routes
router.post('/faculties', facultyController.createFaculty);
router.get('/faculties', facultyController.getFaculties);

// Student Routes
router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);

// Course Routes
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getCourses);

// Attendance Routes
router.post('/attendances', attendanceController.createAttendance);
router.get('/attendances', attendanceController.getAttendance);

// Protected Example
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;