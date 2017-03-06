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
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	}
})();
