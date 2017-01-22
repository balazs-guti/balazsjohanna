/* global angular */
/*
   Config: balazsjohanna
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.config(config)
		.constant(
			'CONSTANT_KEY', {}
		);

	function config($httpProvider) {
		'ngInject';
	}
})();
