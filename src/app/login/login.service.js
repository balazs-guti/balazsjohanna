/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('loginService', loginService);

  function loginService(loginDataService,adminDataService,$http,$timeout) {
    'ngInject';

    var service = this;

    service.loginData = {
      loggedIn: false
    };

    //  Init

    function init() {

    }

    // Public Functions
    service.getLoginData = function() {
      var url = service.loginData.loggedIn ?
        'http://192.168.0.11:8000/user/' + service.loginData.loggedIn :
        'http://192.168.0.11:8000/user/' + service.loginData.inviteId;
      $http({
        method: 'POST',
        url: url,
        data: {date: new Date()}
      }).then(function successCallback(response) {
          if (response.data.length > 0) {
            location.hash = response.data[0].code;
            if (service.loginData.inviteId !== '') {
              service.loginData.loggedIn = service.loginData.inviteId;
              service.loginData.inviteId = '';
            }
            loginDataService.getLoginData().then(function(value){
                console.log('from promise: ',value);
                service.loginData.userRights = value.userRights;
                service.loginData.guests = value.guests;
                service.loginData.wishes = value.wishes;
                service.loginData.requests = value.requests;
                service.loginData.questions = value.questions;

                if (value.userRights.is_admin === 1) {
                  adminDataService.getAdminData().then(function(value) {
                      console.log(value);
                      service.loginData.controlPanelData = value;
                  })
                }
              },
              function(reason) {
                console.log(reason);
              }
            );
            // service.loginData.loginDetails = recievedLoginDetails.$$state.value;
            service.loginData.id = response.data[0].id;
            service.loginData.invites = response.data[0].invites;
            console.log('code is valid', response.data);
            console.log('loginData: ',service.loginData);
          }
          else {
            console.log('invalid code', response);
          }
        }, function errorCallback(response) {
          console.log('error',response);
        });
    }

    service.addUser = function(code, name, invites) {
      var url = 'http://192.168.0.11:8000/addUser/' + location.hash.replace('#/','');
      $http({
        method: 'POST',
        url: url,
        data: {
          name: name,
          code: code,
          invites: invites 
        }
      }).then(function successCallback(response) {
          console.log('new user added', response.data);
          loginService.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }


    // Private Functions

    init();
  }
})();
