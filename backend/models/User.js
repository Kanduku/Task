const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },

  profileImage: {
    label: String,
    url: String,
    size: Number,
    type: { type: String, enum: ['image'] }
  },

  additionalInfo: {
    type: Map,
    of: String,  // You can change this to Mixed if needed
    default: {}
  },

  lastViewedOn: {
    type: Date,
    default: null
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
