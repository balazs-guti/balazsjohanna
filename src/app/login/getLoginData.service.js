(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.service('getLoginDetailsService', getLoginDetailsService);

	function getLoginDetailsService($http) {
		'ngInject';

		var service = this;

		//	Init

		function init() {
		}

 		// Public Functions
		service.getLoginDetails = function() {
      var loginDetails = {};
			var url = 'http://192.168.0.11:8000/user/' + location.hash.replace('#','');
			return $http({
			  method: 'GET',
			  url: url
			}).then(function successCallback(response) {
					if (response.data.wishes && response.data.guests) {
						console.log('data recieved', response.data)
						loginDetails.wishes = response.data.wishes;
						loginDetails.guests = response.data.guests;
            return loginDetails;
					}
					else {
						console.log('login details request failed, invalid code', response);
					}
			  }, function errorCallback(response) {
					console.log('error',response);
			  });

        console.log('doh');
		}


		// Private Functions

		init();
	}
})();
