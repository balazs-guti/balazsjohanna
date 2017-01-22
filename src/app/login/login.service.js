/* global angular */
/*
   Service: aac.test
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.service('loginService', loginService);

	function loginService() {
		'ngInject';

		var service = this;

		service.loginData = {};


		//	Init

		function init() {

		}

 		// Public Functions

		service.sendLoginData = function() {
			console.log(service.loginData.inviteId);
		}


		// Private Functions

		init();
	}
})();
