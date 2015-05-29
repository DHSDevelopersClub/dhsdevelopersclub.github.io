/**
 * Created by Max on 5/27/2015.
 */
angular.module('myPage', [])

    .controller('myController', ['$scope', '$http', function ($scope, $http) {
        'use strict';
        $http.get('data/members.json').
            success(function(data, status, headers, config) {
                $scope.members = data;
            }).
            error(function(data, status, headers, config) {
                console.log(status);
            });
        $scope.author = 'Max Starr';

    }]);