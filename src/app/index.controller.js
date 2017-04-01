/* global angular */
/*
   main controller
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .controller('mainController', mainController);

  function mainController(loginService, wishesService, guestsService, gameService, $timeout) {
    'ngInject';

    var ctrl = this;

    ctrl.loginData = loginService.loginData;
    ctrl.wishesData = wishesService.wishesData;
    ctrl.newGuest = guestsService.newGuest;

    ctrl.newUser = {
      code: '',
      name: '',
      invites: 0
    }

    ctrl.requestInvite = {
      text: '',
      amount: 0
    }

    ctrl.newQuestion = {
      text: 'dsa'
    }

    ctrl.windowHeight = window.innerHeight;
    ctrl.controlTabState = 'users';

    ctrl.newWish = wishesService.newWish;

    // ctrl.mainOptions = {
    //   sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
    //   anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    //   menu: '#menu'
    // };

    //  Init

    function init() {

    }

    //  Public Functions

    ctrl.login = function() {
      loginService.getLoginData();
    }

    ctrl.addUser = function() {
      loginService.addUser(ctrl.newUser.code, ctrl.newUser.name, ctrl.newUser.invites);
    }

    ctrl.addGuest = function() {
      guestsService.addGuest();
    }

    ctrl.deleteGuest = function(guestId) {
      guestsService.deleteGuest(guestId);
    }

    ctrl.sendWish = function() {
      wishesService.sendWish();
    }

    ctrl.sendQuestion = function() {
      gameService.sendQuestion(ctrl.newQuestion.text);
    }

    ctrl.acceptWish = function(id, accepted) {
      wishesService.acceptWish(id, accepted);
    }

    ctrl.requestInvite = function() {
      guestsService.requestInvite(ctrl.requestInvite.text, ctrl.requestInvite.amount);
    }

    // Private Functions


    init();
  }
})();
