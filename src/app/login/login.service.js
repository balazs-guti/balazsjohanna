/* global angular */
/*
   Service: aac.test
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.service('loginService', loginService);

	function loginService(getLoginDetailsService,$http,$timeout) {
		'ngInject';

		var service = this;

		service.loginData = {
			loggedIn: false
		};

		//	Init

		function init() {

		}

 		// Public Functions
		service.sendLoginData = function() {
			var url = 'http://192.168.0.11:8000/user/' + service.loginData.inviteId;
			$http({
			  method: 'POST',
			  url: url,
				data: {date: new Date()}
			}).then(function successCallback(response) {
					if (response.data.length > 0) {
						location.hash = '#'+response.data[0].code;
						service.loginData.inviteId = '';
						service.loginData.loggedIn = true;
						getLoginDetailsService.getLoginDetails().then(function(value){
								console.log('from promise: ',value);
								service.loginData.guests = value.guests;
								service.loginData.wishes = value.wishes;
							},
							function(reason) {
								console.log(reason);
							}
						);
						// service.loginData.loginDetails = recievedLoginDetails.$$state.value;
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


		// Private Functions

		init();
	}
})();
