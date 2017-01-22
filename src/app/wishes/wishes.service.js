/* global angular */
/*
   Service: aac.test
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.service('wishesService', wishesService);

	function wishesService() {
		'ngInject';

		var service = this;


		//	Init

		function init() {
      getWishes();
		}

 		// Public Functions

		// Private Functions

    function getWishes() {

      service.wishesData = [
        'Áldott jó mindent kívánunk, pacsi!',
        'Hujujuj, közeleg az esküvőtök!',
        'Na nee, de kúl a honlapotok! :O'
      ];

    }

		init();
	}
})();
