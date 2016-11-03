'use strict';

const Candidate = require('../models/candidate');
const Boom = require('boom');

exports.find = {

  auth: false,

  handler: function (request, reply) {
    Candidate.find({}).exec().then(candidates => {
      reply(candidates);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    Candidate.findOne({ _id: request.params.id }).then(candidate => {
      reply(candidate);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

}