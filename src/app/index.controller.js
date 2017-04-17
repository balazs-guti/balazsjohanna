/* global angular */
/*
   main controller
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .controller('mainController', mainController);

  function mainController(loginService, wishesService, guestsService, gameService, messageBox, $timeout, $interval) {
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

    ctrl.requestInviteData = guestsService.requestInviteData;
    ctrl.newQuestion = gameService.newQuestion;

    ctrl.windowHeight = window.innerHeight;
    ctrl.controlTabState = 'users';
    ctrl.userTabState = 'guests';

    ctrl.newWish = wishesService.newWish;

    // messagebox

    ctrl.messageBox = messageBox.messageBox;

    ctrl.openMessageBox = function(text,type) {
      messageBox.openMessageBox(text,type);
    }

    //  Init

    function init() {

    }

    //  Public Functions

    ctrl.login = function() {
      loginService.getLoginData();
    }

    ctrl.executeIfEnter = function(event,executableFunction) {
      if (event.keyCode === 13) {
        executableFunction();
      }
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
      if (guestsService.newGuest.name !== '' && guestsService.newGuest.age !== '') {
        guestsService.addGuest();
      } else if (guestsService.newGuest.name === '') {
        messageBox.openMessageBox('Adj meg nevet a vendégnek!','error');
      } else if (guestsService.newGuest.age === '') {
        messageBox.openMessageBox('Add meg a vendég életkorát!','error');
      }
    }

    ctrl.deleteGuest = function(guestId) {
      guestsService.deleteGuest(guestId);
    }

    ctrl.requestInvite = function() {
      if (ctrl.requestInviteData.text !== '' && ctrl.requestInviteData.amount !== '' && ctrl.requestInviteData.amount !== 0) {
        guestsService.requestInvite(ctrl.requestInviteData.text, ctrl.requestInviteData.amount);
      } else if (ctrl.requestInviteData.text === '') {
        messageBox.openMessageBox('Adj meg indoklást az igényléshez!','error');
      } else if (ctrl.requestInviteData.amount === '' || ctrl.requestInviteData.amount === 0) {
        messageBox.openMessageBox('Állítsd be, hogy hány meghívót szeretnél igényelni!','error');
      }
    }

    ctrl.deleteRequest = function(requestId) {
      guestsService.deleteRequest(requestId);
    }

    // manage wishes

    ctrl.sendWish = function() {
      if (ctrl.newWish.text !== '' && ctrl.newWish.signature !== '') {
        wishesService.sendWish();
      } else if (ctrl.newWish.text === '') {
        messageBox.openMessageBox('Adj meg szöveget a jókívánsághoz!','error');
      } else if (ctrl.newWish.signature === '') {
        messageBox.openMessageBox('Adj meg aláírást a jókívánsághoz!','error');
      }
    }

    ctrl.acceptWish = function(id, accepted) {
      wishesService.acceptWish(id, accepted);
    }

    ctrl.deleteWish = function(wishId) {
      wishesService.deleteWish(wishId);
    }

    // manage game (questions)

    ctrl.sendQuestion = function() {
      if (ctrl.newQuestion.text !== '') {
        gameService.sendQuestion(ctrl.newQuestion.text);
      } else {
        messageBox.openMessageBox('Adj meg szöveget a kérdéshez!','error');
      }

    }

    ctrl.deleteQuestion = function(questionId) {
      gameService.deleteQuestion(questionId);
    }


    // Private Functions


    init();
  }
})();
