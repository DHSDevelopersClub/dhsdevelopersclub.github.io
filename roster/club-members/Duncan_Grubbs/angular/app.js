angular.module('duncanpage', [
  'ngRoute',
  'ui.bootstrap'
])
  .controller('mainCtrl', ['$scope', function($scope) {}])
  // Routes the nav buttons to pages. Loads the pages through ajax.
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
      $routeProvider
      .when('/', {
        templateUrl: '/angular/templates/home.html'
      })
      .when('/about', {
        templateUrl: '/angular/templates/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);