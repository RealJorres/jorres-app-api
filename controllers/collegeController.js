const College = require('../models/College');

exports.createCollege = async (req, res) => {
  try {
    const {collegeName, collegeAbbr} = req.body;
    const check = await College.findOne({$or: [{ collegeName}, {collegeAbbr} ]});
    if (check) return res.status(401).json({ error: 'College already exists.' });

    const college = new College({collegeName, collegeAbbr});
    await college.save();
    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
