const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  instructor: String,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  name: String,
  picture: String,
});

module.exports = mongoose.model('Guide', guideSchema);
