/* global angular */
/*
   main controller
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .controller('mainController', mainController);

  function mainController(loginService, wishesService, guestsService, gameService, $timeout, $interval) {
    'ngInject';

    var ctrl = this;

    ctrl.loginData = loginService.loginData;
    ctrl.wishesData = wishesService.wishesData;
    ctrl.newGuest = guestsService.newGuest;
    ctrl.activeWishIndex = 0;

    $timeout(function() {
      ctrl.activeWish = wishesService.wishesData.data[ctrl.activeWishIndex].id;
    },0);

    $interval(function() {
      if (wishesService.wishesData.data.length - 1 === ctrl.activeWishIndex) {
        ctrl.activeWishIndex = 0;
      }
      else {
        ctrl.activeWishIndex += 1;
      }
      ctrl.activeWish = wishesService.wishesData.data[ctrl.activeWishIndex].id;
    },4500);


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

    ctrl.deleteUser = function(code) {
      ctrl.deleteUserCode = code;
    }

    ctrl.confirmDeleteUser = function(code) {
      loginService.deleteUser(code);
    }

    ctrl.changeUserInvites = function(code, amount) {
      loginService.changeUserInvites(code, amount);
    }

    ctrl.answerRequest = function(requestId, answer) {
      loginService.answerRequest(requestId, answer);
    }


    // manage guests

    ctrl.addGuest = function() {
      guestsService.addGuest();
    }

    ctrl.deleteGuest = function(guestId) {
      guestsService.deleteGuest(guestId);
    }

    ctrl.requestInvite = function() {
      guestsService.requestInvite(ctrl.requestInvite.text, ctrl.requestInvite.amount);
    }

    // manage wishes

    ctrl.sendWish = function() {
      wishesService.sendWish();
    }

    ctrl.acceptWish = function(id, accepted) {
      wishesService.acceptWish(id, accepted);
    }

    ctrl.sendQuestion = function() {
      gameService.sendQuestion(ctrl.newQuestion.text);
    }


    // Private Functions


    init();
  }
})();
