/* global angular */
/*
   main controller
*/

(function () {
	'use strict';

	angular
		.module('balazsjohanna')
		.controller('mainController', mainController);

	function mainController(loginService, wishesService) {
		'ngInject';

		var ctrl = this;

    ctrl.loginData = loginService.loginData;
    ctrl.wishesData = wishesService.wishesData;


		//	Init

		function init() {

		}

		//	Public Functions

    ctrl.login = function() {
      loginService.sendLoginData();
    }

		// Private Functions


		init();
	}
})();
