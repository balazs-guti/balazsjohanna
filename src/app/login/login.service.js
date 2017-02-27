/* global angular */
/*
   Service: aac.test
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.service('loginService', loginService);

	function loginService($http) {
		'ngInject';

		var service = this;

		service.loginData = {};


		//	Init

		function init() {

		}

 		// Public Functions
		service.sendLoginData = function() {
			$http({
			  method: 'POST',
			  url: 'http://127.0.0.1:3000/users',
				data: {name: service.loginData.inviteId}
			}).then(function successCallback(response) {
			    console.log('added',response);
			  }, function errorCallback(response) {
					console.log('error',response);
			  });
		}


		// Private Functions

		init();
	}
})();
