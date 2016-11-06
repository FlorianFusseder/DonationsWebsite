'use strict';

const SyncHttpService = require('./sync-http-client');

class DonationService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  getCandidates() {
    return this.httpService.get('/api/candidates');
  }

  getCandidate(id) {
    return this.httpService.get('/api/candidates/' + id);
  }

  createCandidate(newCandidate) {
    return this.httpService.post('/api/candidates', newCandidate);
  }

  deleteAllCandidates() {
    return this.httpService.delete('/api/candidates');
  }

  deleteOneCandidate(id) {
    return this.httpService.delete('/api/candidates/' + id);
  }

  getUsers() {
    return this.httpService.get('/api/users');
  }

  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }

  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }

  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }

  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }

  authenticate(user) {
    return this.httpService.post('/api/users/authenticate', user);
  }

  makeDonation(id, donation) {
    return this.httpService.post('/api/candidates/' + id + '/donations', donation);
  }

  getDonations(id) {
    return this.httpService.get('/api/candidates/' + id + '/donations');
  }

  deleteAllDonations() {
    return this.httpService.delete('/api/donations');
  }

  deleteDonations(id) {
    return this.httpService.delete('/api/candidates/' + id + '/donations');
  }

  deleteOneDonation(id) {
    return this.httpService.delete('/api/donations/' + id);
  }

  login(user) {
    return this.httpService.setAuth('/api/users/authenticate', user);
  }

  logout() {
    this.httpService.clearAuth();
  }

}

module.exports = DonationService;
