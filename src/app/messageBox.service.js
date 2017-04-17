/* global angular */
/*
   Service: aac.test
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .service('messageBox', messageBox);

  function messageBox($http, $timeout, loginService) {
    'ngInject';

    var service = this;

    service.messageBox = {
      active: false,
      text: '',
      type: ''
    }

    service.openMessageBox = function(text, type) {
      $timeout.cancel(service.boxTimeout);
      service.messageBox.active = true;
      service.messageBox.text = text;
      service.messageBox.type = type;

      service.boxTimeout = $timeout(function(){
        service.messageBox.active = false;
      },2500);
    }
  }
})();
