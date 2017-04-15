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

    ctrl.loginCredentials = loginService.loginCredentials;
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

    ctrl.requestInviteData = {
      text: ''
    }

    ctrl.newQuestion = {
      text: ''
    }

    ctrl.windowHeight = window.innerHeight;
    ctrl.controlTabState = 'users';
    ctrl.userTabState = 'guests';

    ctrl.newWish = wishesService.newWish;

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

    ctrl.quit = function() {
      loginService.quit();
    }

    ctrl.answerComing = function(answer) {
      loginService.answerComing(answer);
    }


    // manage guests

    ctrl.addGuest = function() {
      guestsService.addGuest();
    }

    ctrl.deleteGuest = function(guestId) {
      guestsService.deleteGuest(guestId);
    }

    ctrl.requestInvite = function() {
      guestsService.requestInvite(ctrl.requestInviteData.text, ctrl.requestInviteData.amount);
    }

    ctrl.deleteRequest = function(requestId) {
      guestsService.deleteRequest(requestId);
    }

    // manage wishes

    ctrl.sendWish = function() {
      wishesService.sendWish();
    }

    ctrl.acceptWish = function(id, accepted) {
      wishesService.acceptWish(id, accepted);
    }

    ctrl.deleteWish = function(wishId) {
      wishesService.deleteWish(wishId);
    }

    // manage game (questions)

    ctrl.sendQuestion = function() {
      gameService.sendQuestion(ctrl.newQuestion.text);
    }

    ctrl.deleteQuestion = function(questionId) {
      gameService.deleteQuestion(questionId);
    }


    // Private Functions


    init();
  }
})();
