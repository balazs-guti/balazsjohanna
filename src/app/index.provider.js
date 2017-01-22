/* global angular */
/*
   Service: aac.test
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.service('bla', bla);

	function bla() {
		'ngInject';

		var service = this;
		console.log('asadf');

		/*
			Init
		*/
		function init() {

		}

		/*
			Public Functions
		*/

		/*
			Private Functions
		*/

		init();
	}
})();
