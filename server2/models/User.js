const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String},
  password: {type: String},
  email: String,
  profileImage: {
    type: String,
    default: "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
  },
  campus: {
    type: String,
    enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Mexico", "Sao Paulo", "Lisbon"]
  },
  course: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics"]
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

