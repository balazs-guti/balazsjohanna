/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('gameService', gameService);

  function gameService($http, $timeout, loginService, messageBox) {
    'ngInject';

    var service = this;
    $http.defaults.headers.post["Content-Type"] = "application/json";

    service.newQuestion = {
      text: ''
    }

    function resetNewQuestion() {
      service.newQuestion.text = '';
    }

    service.sendQuestion = function(text) {
      var url = 'http://192.168.0.11:8000/sendQuestion/' + loginService.loginCredentials.state;
      if (text !== '') {
        $http({
          method: 'POST',
          url: url,
          data: {
            text: text
          }
        }).then(function successCallback(response) {
            messageBox.openMessageBox('Kérdés sikeresen mentve','success');
            resetNewQuestion();
            console.log('question sent ', response.data);
            loginService.getLoginData();
        }, function errorCallback(response) {
          console.log('error',response);
        });
      }
    }

    service.deleteQuestion = function(questionId) {
      var url = 'http://192.168.0.11:8000/deleteQuestion/' + loginService.loginCredentials.state;
      $http({
        method: 'POST',
        url: url,
        data: {
          questionId: questionId
        }
      }).then(function successCallback(response) {
          console.log('question deleted ', response.data);
          loginService.getLoginData();
      }, function errorCallback(response) {
        console.log('error',response);
      });
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
