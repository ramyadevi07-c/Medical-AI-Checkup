// const mongoose = require('mongoose');

// const checkupSchema = new mongoose.Schema({
//   symptoms: String,
//   age: Number,
//   gender: String,
//   results: Array,
//   date: { type: Date, default: Date.now }
// });

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   passwordHash: String,
//   checkups: [checkupSchema]
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const CheckupSchema = new mongoose.Schema({
  symptoms: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  results: [
    {
      condition: String,
      probability: Number,
      urgency: String,
      advice: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  checkups: [CheckupSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);