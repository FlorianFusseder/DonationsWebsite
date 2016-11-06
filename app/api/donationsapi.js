'use strict'
var Donation = require('../models/donation');
var boom = require('boom');

exports.findAllDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.find({}).populate('donor').populate('candidate').then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.findDonations = {

  auth: false,

  handler: (request, reply) => {
    Donation.find({ candidate: request.params.id }).then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeDonation = {

  auth: false,

  handler: (request, reply) => {
    const donation = new Donation(request.payload);
    donation.candidate = request.params.id;
    donation.save().then(newDonation => {
      reply(newDonation).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error making donation'));
    });
  },
};

exports.deleteOneDonation = {

  auth: false,

  handler: (request, reply) => {
    Donation.remove({ _id: request.params.id })
        .then(donation => reply(donation).code(204))
            .catch(err => reply(Boom.notFound('id not found')));
  },
};

exports.deleteDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.remove({ candidate: request.params.id }).then(result => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },
};

exports.deleteAllDonations = {

  auth: false,

  handler: function (request, reply) {
    Donation.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },

};
