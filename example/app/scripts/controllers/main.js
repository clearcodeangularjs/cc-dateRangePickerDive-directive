'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 $scope.calendarDate = new Date();

     $scope.nextMonth = function () {
      $scope.calendarDate = new Date(moment($scope.calendarDate).add('M', 1).format());
    };

    $scope.previousMonth = function () {
      $scope.calendarDate = new Date(moment($scope.calendarDate).add('M', -1).format());
    };
  });