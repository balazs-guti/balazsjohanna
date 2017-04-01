/* global angular */
/*
   main controller
*/

(function () {
  'use strict';

  angular
    .module('balazsjohanna')
    .filter('translateAge', translateAge);

  function translateAge() {
    return function(input) {
      switch (input) {
        case 'baby':
          return 'baba';
          break;
        case 'child':
          return 'gyerek';
          break;
        case 'teen':
          return 'fiatal';
          break;
        case 'adult':
          return 'felnőtt';
          break;
        default:
          return input;
      }
    };
  }
})();
