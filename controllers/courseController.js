const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('collegeID');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
