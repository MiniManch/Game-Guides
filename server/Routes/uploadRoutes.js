const express = require('express');
const router = express.Router();
const fs = require('fs');
const Guide = require('../Schemas/guideModel'); // Assuming you have a Guide model
const Lesson = require('../Schemas/lessonModel'); // Assuming you have a Lesson model
const path = require('path');

router.get('/setup', async (req, res) => {
  try {
    // Read the guide JSON files
    const guideFiles = ['LOL.json', 'MineCraft.json', 'RL.json','Fortnite.json'];
    const guides = [];
    for (const guideFile of guideFiles) {
      const guideData = fs.readFileSync(`./Data/Guides/${guideFile}`, 'utf-8');
      const guide = JSON.parse(guideData);
      guide.name = guideFile.replace('.json', ''); // Set the name based on the file name
      guides.push(guide);
    }

    // Insert guides and lessons into the database
    for (const guide of guides) {
      const newGuide = new Guide(guide);
      await newGuide.save();

      const lessonFileName = path.join(__dirname, `../Data/Lessons/${guide.name}.json`);
      const lessonsData = fs.readFileSync(lessonFileName, 'utf-8');
      const lessons = JSON.parse(lessonsData);

      for (const lesson of lessons) {
        const newLesson = new Lesson(lesson);
        newLesson.guide = newGuide._id;
        await newLesson.save();
        newGuide.lessons.push(newLesson._id);
        await newGuide.save();
      }
    }

    res.json({ message: 'Database setup successful.' });
  } catch (error) {
    console.error('Error setting up database:', error);
    res.status(500).json({ error: 'An error occurred while setting up the database.' });
  }
});

module.exports = router;

