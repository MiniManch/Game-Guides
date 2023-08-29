const express = require('express');
const router = express.Router();
const Guide = require('../Schemas/guideModel');

// Route to get all guides
router.get('/all', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching guides.' });
  }
});

module.exports = router;
