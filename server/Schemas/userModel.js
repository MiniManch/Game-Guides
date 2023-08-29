const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  isAdmin: { type: Boolean, default: false },
  profileImage: String,
  confirmedEmail: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
