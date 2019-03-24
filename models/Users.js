const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserSchema = new schema({
  role: { type: String, default: 'regular' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  todos: [{ name: { type: String }, isCompleted: { type: Boolean, default: false } }],
});

const User = mongoose.model('userDetails', UserSchema);
module.exports = User;
