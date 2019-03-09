const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requiredBloodGroup: String,
  contactPersonName: String,
  contactNumber: String,
  requiredDate: String,
  numberOfUnits: Number,
  fulfilled: Boolean,
  spam: Boolean,
  hospitalName: String,
  city: String,
  state: String,
  country: String,
  loc: {
    type: { type: String },
    coordinates: [Number],
  },
}, { timestamps: true });

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
