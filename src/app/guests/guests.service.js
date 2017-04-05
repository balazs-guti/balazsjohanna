/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('guestsService', guestsService);

  function guestsService($http, $timeout, loginService) {
    'ngInject';

    var service = this;
    service.newGuest = {
      name: '',
      age: '',
      lactose: false,
      gluten: false,
      other_allergy: ''
    };

    $http.defaults.headers.post["Content-Type"] = "application/json";

    service.addGuest = function() {
      var url = 'http://192.168.0.11:8000/addGuest/' + location.hash.replace('#/','');
        console.log(service.newGuest);
        if (loginService.loginData.invites > 0) {
          $http({
            method: 'POST',
            url: url,
            data: service.newGuest
          }).then(function successCallback(response) {
              console.log('new guest added', response.data);
              loginService.getLoginData();
          }, function errorCallback(response) {
            console.log('error',response);
          });
        }
    }

    service.deleteGuest = function(guestId) {
      var url = 'http://192.168.0.11:8000/deleteGuest/' + location.hash.replace('#/','');
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

    service.requestInvite = function(text, requested_invites) {
      var url = 'http://192.168.0.11:8000/requestInvite/' + location.hash.replace('#/','');
      if (text !== '' && requested_invites !== 0) {
        $http({
          method: 'POST',
          url: url,
          data: {
            userId: loginService.loginData.id,
            text: text,
            requested_invites: requested_invites
          }
        }).then(function successCallback(response) {
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
