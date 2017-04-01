/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('wishesService', wishesService);

  function wishesService($http, $timeout, loginService) {
    'ngInject';

    var service = this;
    service.wishesData = {
      data : []
    }
    service.newWish = {
      text: '',
      signature: ''
    }

    // $timeout(function(){
    //   service.updateWishes();
    // },3000);

    //  Init

    function init() {
      service.getWishes();
    }

    // Public Functions

    // Private Functions

    service.getWishes = function() {
        var url = 'http://192.168.0.11:8000/getWishes/';
        $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
            console.log('wishes data recieved', response.data)

            var endObject = response.data.map(function(obj) { 
               var rObj = {};
               rObj.text = obj.text;
               rObj.signature = obj.signature;
               return rObj;
            });

            service.wishesData.data = endObject;
            console.log(service.wishesData);
        }, function errorCallback(response) {
          console.log('error',response);
        });
    }

    service.sendWish = function() {
      var url = 'http://192.168.0.11:8000/sendWish/' + loginService.loginData.loggedIn;
      $http({
          method: 'POST',
          url: url,
          data: service.newWish
        }).then(function successCallback(response) {
            console.log('wish sent', response.data)
            loginService.getLoginData();
        }, function errorCallback(response) {
          console.log('error',response);
        });
    }

    service.acceptWish = function(id,accepted) {
      var url = 'http://192.168.0.11:8000/acceptWish/' + loginService.loginData.loggedIn;
      var data = {
        id: id,
        accepted: accepted
      }
      $http({
        method: 'POST',
        url: url,
        data: data
      }).then(function successCallback(response) {
          console.log('wish set', response.data)
          // loginService.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    init();
  }
})();
