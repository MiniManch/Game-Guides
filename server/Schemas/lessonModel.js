const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  subjects: [String],
  video: String,
  picture: String,
  difficulty: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' },
});

module.exports = mongoose.model('Lesson', lessonSchema);
