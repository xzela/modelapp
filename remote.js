  var request = require('request');

  var model = {
    // "id": null,
    "version": 0,
    "memberId": 1386014360861,
    // "pornstarId": null,
    // "username": null,
    "stageName": "Beate Uhse",
    "fullLegalName": "Beate Agatha Uhse",
    // "otherNames": "betty",
    // "maidenName": null,
    "email": "beateuhse@kink.com",
    "dateOfBirth": [
      2013,
      12,
      2
    ],
    "country": "United Stated",
    "phoneNumber": "555-555-5555",
    "idExpirationDate": [
      2013,
      12,
      2
    ],
    "idPhotoUuid1": "fb5daf46-c1bd-42b6-9f6a-58ea49cd0aec",
    "idPhotoUuid2": "fb5daf45-c1bd-42b6-9f6a-58ea49cd0aec",
    "status": "PENDING"
    // "createdOn": null,
    // "modifiedOn": null,
    // "modifiedBy": null
  };
  var remote = request(
    {
      url: 'http://localhost:8090/kink-modelapplication-rest/modelapplication',
      method: 'POST',
      header: {'Content-type': 'application/json'},
      json: model
    }, function(error, response, body) {
    // console.log(error);
    // console.log(response.body);
    console.log(body);
  });

