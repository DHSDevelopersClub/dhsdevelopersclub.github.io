/**
 * Created by Max on 5/15/2015.
 */
// Creates app.
angular.module('clubwebsite', [
  'ngRoute',
  'ui.bootstrap'
])
  // Creates nav element.
  .directive('nav', function () {
    'use strict';
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: '/angular/templates/nav.html'
    };
  })

    .controller('CarouselDemoCtrl', ['$scope', function ($scope) {
      $scope.myInterval = 5000;
      var slides = $scope.slides = [];
      $scope.addSlide = function() {
        var newWidth = 800 + slides.length + 1;
        slides.push({
          image: 'http://placekitten.com/' + newWidth + '/600',
          text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
      };
      for (var i=0; i<4; i++) {
        $scope.addSlide();
      }
    }])

// The controller for the nav bar. Switches the active class for each page.
    
  .controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }])
  // Routes the nav buttons to pages. Loads the pages through ajax.
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
      $routeProvider
      .when('/', {
        templateUrl: '/angular/templates/home.html'
      })
      .when('/references', {
        templateUrl: '/angular/templates/references.html'
      })
      .when('/projects', {
        templateUrl: '/angular/templates/projects.html'
      })
      .when('/gallery', {
        templateUrl: '/angular/templates/gallery.html'
      })
      .when('/about', {
        templateUrl: '/roster/about.html'
      })
      .when('/contact', {
        templateUrl: '/angular/templates/contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
