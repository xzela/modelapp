
/*
 * GET / POST models routes.
 */
var logger = require('../logger'); // load the logging
var request = require('request');
var page = {title: 'Default Model Title', message: '', errors: ''};
var countries = [{name: 'US of A', value: 'merica'}, {name: 'some other place', value: 'other1'}, {name: 'other', value: 'other2'}];

function remote_add(fields, callback) {
  // default fields
  fields.status = "PENDING";
  fields.idPhotoUuid1 = "fb5daf46-c1bd-42b6-9f6a-58ea49cd0aec";
  fields.idPhotoUuid2 = "fb5daf46-c1bd-42b6-9f6a-58ea49cd0aec";

  // var model = {
  //   // "id": null,
  //   "version": 0,
  //   "memberId": 1386014360861,
  //   // "pornstarId": null,
  //   // "username": null,
  //   "stageName": "Beate Uhse",
  //   "fullLegalName": "Beate Agatha Uhse",
  //   // "otherNames": "betty",
  //   // "maidenName": null,
  //   "email": "beateuhse@kink.com",
  //   "dateOfBirth": [
  //     2013,
  //     12,
  //     2
  //   ],
  //   "country": "United Stated",
  //   "phoneNumber": "555-555-5555",
  //   idExpirationDate: [
  //     2013,
  //     12,
  //     2
  //   ],
  //   idPhotoUuid1: "fb5daf46-c1bd-42b6-9f6a-58ea49cd0aec",
  //   idPhotoUuid2: "fb5daf45-c1bd-42b6-9f6a-58ea49cd0aec",
  //   status: "PENDING",
  //   // "createdOn": null,
  //   // "modifiedOn": null,
  //   // "modifiedBy": null
  // };
  var options = {
      url: 'http://localhost:8090/kink-modelapplication-rest/modelapplication',
      method: 'POST',
      header: {'Content-type': 'application/json'},
      json: fields
  };
  request(options, function(error, response, body) {
      console.log(body);
      callback();
  });
  // callback();
}

exports.form = function(req, response) {
  page.countries = countries;
  response.render('./models/add', page);
};

exports.post = function(req, response) {
    page.countries = countries;
    page.fields = req.body;

    req.assert('stageName', 'Stage Name is required').notEmpty();
    req.assert('stageName', 'Stage Name should contain only alphanumeric characters').is(/^[a-zA-Z0-9\-\ \_]+$/, 'g');
    req.assert('email', 'Email Address is not valid').isEmail();
    req.assert('phoneNumber', 'Phone number can not be empty').notEmpty();
    req.assert('phoneNumber', 'Phone numbers should not contain letters or weird ass characters.').is(/^[0-9\-\s\+]+$/, 'g');
    req.assert('country', 'Country is requried').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      logger.info(errors);
      logger.info(page.fields);
      page.errors = errors;
      response.render('./models/add', page);
    }
    else {
      logger.info("success");
      remote_add(page.fields, function() {
        logger.info("after remote add");
        page.title = "model successfully added.";
        response.render('./models/success', page);
      });
    }
};

exports.image = function(req, response) {
  var data = {id: 12345};
  response.json(data);
}