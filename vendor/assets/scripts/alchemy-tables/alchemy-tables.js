'use strict';

angular.module('alch-templates').run(function($templateCache) {
  $templateCache.put("component/templates/table.html",
    "<thead>" +
    "  <tr>" +
    "    <th ng-show=\"row_select\"><input ng-click=\"select_all(rows)\" class=\"select_all\" type=\"checkbox\" name=\"select_all\" value=\"none\"></td>" +
    "    <th ng-repeat=\"header in table_data.row_headers\">{{ header }}</th>" +
    "  </tr>" +
    "</thead>" +
    "<tbody>" +
    "  <tr ng-repeat=\"row in table_data.rows\" ng-class=\"{active : row.selected }\">" +
    "    <td ng-show=\"row_select\"><input ng-model=\"row.selected\" type=\"checkbox\" name=\"{{ row.id }}\" value=\"{{ row.id }}\"></td>" +
    "    <td ng-repeat=\"cell in row.cells\">{{ cell }}</td>" +
    "  </tr>" +
    "</tbody>" +
    "");
});

angular.module('alch-templates').run(function($templateCache) {
  $templateCache.put("component/templates/table-temp.html",
    "<thead>" +
    "  <tr>" +
    "    <th ng-show=\"row_select\"><input ng-click=\"select_all(rows)\" class=\"select_all\" type=\"checkbox\" name=\"select_all\" value=\"none\"></td>" +
    "    <th ng-repeat=\"header in table_data.row_headers\">{{ header }}</th>" +
    "  </tr>" +
    "</thead>" +
    "<tbody>" +
    "  <tr ng-repeat=\"row in table_data.rows\" ng-class=\"{active : row.selected }\">" +
    "    <td ng-show=\"row_select\"><input ng-model=\"row.selected\" type=\"checkbox\" name=\"{{ row.id }}\" value=\"{{ row.id }}\"></td>" +
    "    <td ng-repeat=\"cell in row.cells\">{{ cell }}</td>" +
    "  </tr>" +
    "</tbody>" +
    "");
});
    
angular.module('alchemy').directive('alchTable', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope : true,
        templateUrl: 'component/templates/table-temp.html',

        controller: function(){}
    };
});

angular.module('alchemy').directive('rowSelect', function(){
    return {
        require: 'alchTable',

        controller : function($scope){
            $scope.all_selected = false;

            $scope.select_all = function(rows){
                var selected = $scope.all_selected = !$scope.all_selected;

                angular.forEach(rows, function(row){
                    row.selected = selected;
                });
            };
        },

        link: function(scope){
            scope.row_select = true;
        }
    };
});
