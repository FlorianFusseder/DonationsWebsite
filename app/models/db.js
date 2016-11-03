'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let dbURI = 'mongodb://donationuser:donationuser@ds019836.mlab.com:19836/donations';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

//mongoose.connection.on('connected', function () {
//  console.log('Mongoose connected to ' + dbURI);
//});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
  if (process.env.NODE_ENV != 'production') {
    var seeder = require('mongoose-seeder');
    const data = require('./data.json');
    const Donation = require('./donation');
    const User = require('./user');
    const Candidate = require('./candidate');
    seeder.seed(data, { dropDatabase: false, dropCollections: true })
        .catch(err => {
      console.log(error);
    });
  }
});
