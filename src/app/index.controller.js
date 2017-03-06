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

		ctrl.windowHeight = window.innerHeight;

		ctrl.mainOptions = {
			sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
			anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
			menu: '#menu'
		};

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
