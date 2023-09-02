const express = require('express');
const router = express.Router();
const Guide = require('../Schemas/guideModel');
const Lesson = require('../Schemas/lessonModel'); // Import your Lesson model


// Route to get all guides
router.get('/all', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching guides.' });
  }
});

// Get preview of a guide
router.get('/preview/:guidename', async (req, res) => {
  try {
    const guideName = req.params.guidename;
    const guide = await Guide.findOne({ name: guideName }).populate('lessons');

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    if (guide.lessons.length === 0) {
      return res.status(404).json({ message: 'No lessons found for this guide' });
    }

    const firstLesson = guide.lessons[0]; // Get the first lesson
    res.json(firstLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
