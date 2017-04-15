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
    service.getLoginData = function(loginCredentialsState) {
      var data = {};
      var url = 'http://192.168.0.11:8000/user/' + loginCredentialsState;
      return $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          if (response.data.wishes && response.data.guests) {
            console.log('data recieved', response.data)
            data.userRights = response.data.userRights;
            data.wishes = response.data.wishes;
            data.guests = response.data.guests;
            data.requests = response.data.requests;
            data.questions = response.data.questions;
            return data;
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
