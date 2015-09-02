/**
 * Created by Max on 5/27/2015.
 */
angular.module('myPage', [])

    .directive('myNav', function () {
    'use strict';
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: './data/nav.html'
    };
  })

    .controller('myController', ['$scope', '$http', function ($scope, $http) {
        'use strict';

        $scope.author = 'Max Starr';

    }]);
