/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('guestsService', guestsService);

  function guestsService($http, $timeout, loginService, messageBox) {
    'ngInject';

    var service = this;

    service.newGuest = {
      name: '',
      age: '',
      lactose: false,
      gluten: false,
      other_allergy: ''
    };

    service.requestInviteData = {
      text: ''
      // amount is unset to force it to be 0
    }

    function resetNewGuest() {
      service.newGuest.name = '';
      service.newGuest.age = '';
      service.newGuest.lactose = false;
      service.newGuest.gluten = false;
      service.newGuest.other_allergy = '';
    }

    function resetRequestInviteData() {
      service.requestInviteData.text = '';
      service.requestInviteData.amount = '';
    }

    $http.defaults.headers.post["Content-Type"] = "application/json";

    service.addGuest = function() {
      var url = 'http://192.168.0.11:8000/addGuest/' + loginService.loginCredentials.state;
        console.log(service.newGuest);
        if (loginService.loginData.invites.length > 0) {
          $http({
            method: 'POST',
            url: url,
            data: service.newGuest
          }).then(function successCallback(response) {
              messageBox.openMessageBox('Vendég sikeresen mentve a vendéglistában','success');
              console.log('new guest added', response.data);
              loginService.getLoginData();
              resetNewGuest();
          }, function errorCallback(response) {
            console.log('error',response);
          });
        }
    }

    service.deleteGuest = function(guestId) {
      var url = 'http://192.168.0.11:8000/deleteGuest/' + loginService.loginCredentials.state;
      $http({
        method: 'POST',
        url: url,
        data: {
          userId: loginService.loginData.id,
          guestId: guestId
        }
      }).then(function successCallback(response) {
          console.log('guest deleted', response.data);
          loginService.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.deleteRequest = function(requestId) {
      var url = 'http://192.168.0.11:8000/deleteRequest/' + loginService.loginCredentials.state;
      $http({
        method: 'POST',
        url: url,
        data: {
          requestId: requestId
        }
      }).then(function successCallback(response) {
          console.log('request deleted', response.data);
          loginService.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.requestInvite = function(text, requested_invites) {
      var url = 'http://192.168.0.11:8000/requestInvite/' + loginService.loginCredentials.state;
      if (text !== '' && requested_invites) {
        $http({
          method: 'POST',
          url: url,
          data: {
            userId: loginService.loginData.id,
            text: text,
            requested_invites: requested_invites
          }
        }).then(function successCallback(response) {
            messageBox.openMessageBox('Meghívó igénylés sikeresen mentve','success');
            resetRequestInviteData();
            console.log('invites requested ', response.data);
            loginService.getLoginData();
        }, function errorCallback(response) {
          console.log('error',response);
        });
      }
    }

    // $timeout(function(){
    //   service.updateWishes();
    // },3000);

    //  Init

    function init() {
    }

    // Public Functions

    // Private Functions


    init();
  }
})();
