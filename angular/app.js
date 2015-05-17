/**
 * Created by Max on 5/15/2015.
 */
// Creates app.
angular.module('myapp', [
    'ngRoute'
])
    // Creates nav element.
    .directive('nav', function() {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: './angular/templates/nav.html'
        };
    })
    // The controller for the nav bar. Switches the active class for ach page.
    .controller('navCtrl',['$scope', '$location',  function ($scope, $location)
    {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }])
    // Routes the nav buttons to pages. Loads the pages through ajax.
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: './angular/templates/home.html'

            })
            .when('/about', {
                templateUrl: './angular/templates/about.html'


            })
            .when('/contact', {
                templateUrl: './angular/templates/contact.html'


            })
            .otherwise({
                redirectTo: '/'
            });
    }]);