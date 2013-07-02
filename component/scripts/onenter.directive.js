'use strict';

/**
 * @ngdoc directive
 * @name alchemy.directive:onEnter
 * @restrict A
 *
 * @description
 *   Defines an onEnter directive for handling the enter key being pressed
 *   on an element. Accepts any expression and executes that expression
 *   as is.
 *
 * @scope
 *
 * @element ANY
 *
 * @example
 *   <pre>
       <input ng-model="name" on-enter="enterPressed(name)">
     </pre>
 *
 */
angular.module('alchemy').directive('onEnter', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            element.bind('keypress', function(event) {
                if(event.which === 13) {
                    scope.$apply(attrs.onEnter);
                }
            });
        }
    };
});
