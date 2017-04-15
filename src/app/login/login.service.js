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

    service.loginCredentials = {
      state: false, // ezt vissza false-ra
      inputValue: ''
    }

    service.loginData = {
      data: {}
    };

    //  Init

    function init() {
      // service.getLoginData(); // ezt töröld
    }

    // Public Functions
    service.getLoginData = function() {
      var url = service.loginCredentials.state ?
        'http://192.168.0.11:8000/user/' + service.loginCredentials.state :
        'http://192.168.0.11:8000/user/' + service.loginCredentials.inputValue;
      $http({
        method: 'POST',
        url: url,
        data: {date: new Date()}
      }).then(function successCallback(response) {
          if (response.data.length > 0) {
            location.hash = response.data[0].code;
            if (service.loginCredentials.inputValue !== '') {
              service.loginCredentials.state = service.loginCredentials.inputValue;
              service.loginCredentials.inputValue = '';
            }
            loginDataService.getLoginData(service.loginCredentials.state).then(function(value){
                console.log('from promise: ',value);
                service.loginData.data = value;
                service.loginData.id = response.data[0].id;
                service.loginData.coming = response.data[0].coming;
                service.loginData.invites = new Array(response.data[0].invites);
                console.log(service.loginData);

                if (value.userRights.is_admin === 1) {
                  adminDataService.getAdminData(service.loginCredentials.state).then(function(value) {
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
            console.log(service.loginData.invites);
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
          service.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.deleteUser = function(code) {
      var url = 'http://192.168.0.11:8000/deleteUser/' + location.hash.replace('#/','');
      $http({
        method: 'POST',
        url: url,
        data: {
          code: code
        }
      }).then(function successCallback(response) {
          console.log('user deleted', response.data);
          service.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.changeUserInvites = function(code, amount) {
      var url = 'http://192.168.0.11:8000/changeUserInvites/' + location.hash.replace('#/','');
      $http({
        method: 'POST',
        url: url,
        data: {
          code: code,
          amount: amount
        }
      }).then(function successCallback(response) {
          console.log('user deleted', response.data);
          service.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.answerRequest = function(requestId, answer) {
      var url = 'http://192.168.0.11:8000/answerRequest/' + location.hash.replace('#/','');
      $http({
        method: 'POST',
        url: url,
        data: {
          requestId: requestId,
          answer: answer
        }
      }).then(function successCallback(response) {
          service.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.answerComing = function(answer) {
      var url = 'http://192.168.0.11:8000/answerComing/' + location.hash.replace('#/','');
      $http({
        method: 'POST',
        url: url,
        data: {
          answer: answer
        }
      }).then(function successCallback(response) {
          service.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
    }

    service.quit = function() {
      service.loginCredentials.state = '';
    }


    // Private Functions

    init();
  }
})();
