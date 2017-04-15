(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('adminDataService', adminDataService);

  function adminDataService($http) {
    'ngInject';

    var service = this;

    //  Init

    function init() {
    }

    // Public Functions
    service.getAdminData = function(loginCredentialsState) {
      var loginDetails = {};
      var url = 'http://192.168.0.11:8000/admin/' + loginCredentialsState;
      return $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          if (response.data.users && response.data.guests) {
            // console.log('data recieved', response.data)

            // loginDetails.userRights = response.data.userRights;
            // loginDetails.wishes = response.data.wishes;
            // loginDetails.guests = response.data.guests;
            console.log('this ',response.data);
            return response.data;
          } else {
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
