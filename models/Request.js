const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requiredBloodGroup: String,
  patientName: String,
  contactNumber: String,
  requiredDate: String,
  numberOfUnits: Number,
  cause: String,
  // fulfilled: Boolean,
  // spam: Boolean,
  hospitalName: String,
  city: String,
  state: String,
  country: String,
  loc: {
    type: { type: String },
    coordinates: [Number],
  },
}, { timestamps: true });

requestSchema.methods.bloodGroup = function(params, callback) {
  switch (this.requiredBloodGroup) {
    case 'a_pos': return 'A+';
    case 'a_neg': return 'A-';
    case 'b_pos': return 'B+';
    case 'b_neg': return 'B-';
    case 'ab_pos': return 'AB+';
    case 'ab_neg': return 'AB-';
    case 'o_pos': return 'O+';
    case 'o_neg': return 'O-';
    case 'a1b_pos': return 'A1B+';
    case 'a1b_neg': return 'A1B-';
    case 'a2b_pos': return 'A2B+';
    case 'a2b_neg': return 'A2B-';
    case 'hh': return 'Hh (Bombay blood group)';
  }
};

requestSchema.methods.hospitalDetails = function(params, callback) {
  const country = (this.country == '') ? '' : ', ' + this.country;
  return `${this.hospitalName}, ${this.city}, ${this.state}` + country;
};

requestSchema.methods.hospitalLocation = function(params, callback) {
  return `${this.city}, ${this.state}` + (this.country == '') ? '' : `, ${this.country}`;
};

requestSchema.methods.viewUrl = function(params, callback) {
  return `/requests/view/${this._id.toString()}`
};


const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
