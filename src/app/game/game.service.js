/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('gameService', gameService);

  function gameService($http, $timeout, loginService) {
    'ngInject';

    var service = this;
    $http.defaults.headers.post["Content-Type"] = "application/json";

    service.sendQuestion = function(text) {
      var url = 'http://192.168.0.11:8000/sendQuestion/' + location.hash.replace('#/','');
      if (text !== '') {
        $http({
          method: 'POST',
          url: url,
          data: {
            text: text
          }
        }).then(function successCallback(response) {
            console.log('question sent ', response.data);
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
