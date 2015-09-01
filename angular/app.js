/**
 * Created by Max on 5/15/2015.
 */
// Creates app.
angular.module('clubwebsite', [
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
      .when('/join', {
        templateUrl: '/angular/templates/join.html'
      })
      .when('/learn', {
        templateUrl: '/angular/templates/learn.html'
      })
      .when('/collaborate', {
        templateUrl: '/angular/templates/collaborate.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
