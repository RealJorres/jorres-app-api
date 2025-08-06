const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');

exports.createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFaculties = async (req, res) => {
  try {
    const facultyList = await Faculty.find().populate('collegeID');
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
