const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  subject: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
