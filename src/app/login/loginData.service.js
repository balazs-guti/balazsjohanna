(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('loginDataService', loginDataService);

  function loginDataService($http) {
    'ngInject';

    var service = this;

    //  Init

    function init() {
    }

    // Public Functions
    service.getLoginData = function() {
      var loginData = {};
      var url = 'http://192.168.0.11:8000/user/' + location.hash.replace('#','');
      return $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          if (response.data.wishes && response.data.guests) {
            console.log('data recieved', response.data)
            loginData.userRights = response.data.userRights;
            loginData.wishes = response.data.wishes;
            loginData.guests = response.data.guests;
            loginData.requests = response.data.requests;
            loginData.questions = response.data.questions;
            return loginData;
          }
          else {
            console.log('login details request failed, invalid code', response);
          }
        }, function errorCallback(response) {
          console.log('error',response);
        });
    }


    // Private Functions

    init();
  }
})();
