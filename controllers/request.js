const { promisify } = require('util');
const Request = require('../models/Request');
var ObjectId = require('mongoose').Types.ObjectId; 

/**
 * POST /account/profile
 * Update profile information.
 */
exports.createRequest = (req, res, next) => {

  req.assert('patientName', 'Patient Name cannot be blank.').notEmpty();
  req.assert('requiredBloodGroup', 'Blood group cannot be blank.').notEmpty();
  req.assert('numberOfUnits', 'Number of Units should be a number').isNumeric();
  req.assert('requiredDate', 'Required Date cannot be blank').notEmpty();
  req.assert('hospitalName', 'Hospital name cannot be blank').notEmpty();
  req.assert('contactNumber', 'Contact Number should be a mobile number').isMobilePhone();
  req.assert('city', 'City cannot be blank').notEmpty();
  req.assert('state', 'State cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect("/requests/new")
  }

  const bloodRequest = new Request({
    requiredBloodGroup: req.body.requiredBloodGroup,
    patientName: req.body.patientName,
    contactNumber: req.body.contactNumber,
    requiredDate: req.body.requiredDate,
    numberOfUnits: req.body.numberOfUnits,
    hospitalName: req.body.hospitalName,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  });

  bloodRequest.save((err, r) => {
    if (err) {
      if (err.code === 11000) {
        req.flash('errors', { msg: 'Unable to create a request for blood requirement' });
      }
      res.redirect('/requests/new');
      return next(err);
    }
    req.flash('success', { msg: 'Your request has been posted' });
    res.redirect(`/requests/view/${r._id.toString()}`);
  });
};


/**
 * GET /requests
 * Reset Password page.
 */

exports.newRequest = (req, res, next)  => {
  res.render('requests/new', {
    title: 'Request For Blood'
  })
};

exports.getAllRequests = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', { msg: 'You need to be logged in.' });
    return res.redirect('/login');
  }
  Request
    .find({})
    .where('requiredDate').gt(Date.now())
    .exec((err, requests) => {
      if (err) { return next(err); }
      res.render('requests/list', {
        title: 'Requests',
        requests: requests
      });
    });
};

exports.getRequestById = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', { msg: 'You need to be logged in.' });
    return res.redirect('/login');
  }
  Request
    .findOne({_id: new ObjectId(req.params.id)})
    .where('requiredDate').gt(Date.now())
    .exec((err, request) => {
      if (err) { return next(err); }
      res.render('requests/view', {
        title: 'Requests',
        request: request
      });
    });

}