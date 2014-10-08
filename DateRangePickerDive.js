/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-dateRangePickerDive-directive.

    cc-dateRangePickerDive-directive is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-dateRangePickerDive-directive is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-dateRangePickerDive-directive.  If not, see <http://www.gnu.org/licenses/>.

*/
angular.module('cc.dateRangePickerDive.directive', [])
.directive('dateRangePickerDive', ['$log', '$filter', function($log, $filter) {

        var controller = function($scope) {

            $scope.selected = false;

            $scope.predefinedRanges = [
                {
                    name: 'today',
                    val: 0
                },{
                    name: 'yesterday',
                    val: 1
                },{
                    name: 'last 7 days',
                    val: 2
                },{
                    name: 'last 30 days',
                    val: 3
                },{
                    name: 'month to yesterday',
                    val: 4
                },{
                    name: 'last month',
                    val: 5
                },{
                    name: 'year to date',
                    val: 6
                }
            ];

            $scope.getRange = function(type) {
                /*
                * 0 - today
                * 1 - yesterday
                * 2 - last 7 days
                * 3 - last 30 days
                * 4 - month to yesterday
                * 5 - last month
                * 6 - year to date
                * */
                var from, to,
                    today = new Date(),
                    format = 'yyyy-MM-dd';

                switch (type) {
                    case 0: // today
                        return {from: $filter('date')(today, format), to:$filter('date')(today, format)};
                        break;

                    case 1: // yesterday
                        from = new Date();
                        from.setDate(today.getDate() - 1);
                        return {from: $filter('date')(from, format), to: $filter('date')(from, format)};
                        break;

                    case 2: // last 7 days
                        from = new Date();
                        from.setDate(today.getDate() - 7);
                        return {from: $filter('date')(from, format), to: $filter('date')(today, format)};
                        break;

                    case 3: // last 30 days
                        from = new Date();
                        from.setDate(today.getDate() - 30);
                        return {from: $filter('date')(from, format), to: $filter('date')(today, format)};
                        break;

                    case 4: // month to yesterday
                        from = new Date(today.getFullYear(), today.getMonth(), 1);
                        return {from: $filter('date')(from, format), to: $filter('date')(today, format)};
                        break;

                    case 5: // last month
                        to      = new Date(today.getFullYear(), today.getMonth(), 0);
                        from    = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                        return {from: $filter('date')(from, format), to: $filter('date')(to, format)};
                        break;

                    case 6: // year to date
                        from = new Date();
                        from.setDate(today.getDate() - 365);
                        return {from: $filter('date')(from, format), to: $filter('date')(today, format)};
                        break;

                    default:
                        return null;
                        break;
                }

             };

            $scope.lastSelectedRangeText = false;

            $scope.from = $scope.getRange(0).from;
            $scope.to = $scope.getRange(0).to;

            $scope.setFiltersRange = function(type) {
                var range = $scope.getRange(type);
                $scope.from = range.from;
                $scope.to = range.to;

            };

            $scope.closeDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.dropdownOpen = false;
            };

            $scope.openFrom = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedFrom = true;
                $scope.openedTo = false;
            };

            $scope.openTo = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedTo = true;
                $scope.openedFrom = false;
            };

        };

        return {
            restrict: 'E',
            templateUrl: 'partials/DateRangePickerDive.html',
            replace: true,
            scope: {
                from: '=',
                to: '='
            },
            controller: controller
        }
    }]);