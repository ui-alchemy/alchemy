'use strict';

// Defines an onEnter directive for handling the enter key being pressed
// on an element. Accepts any expression and executes that expression
// as is.
//
// @example <input type="text" ng-model="name" on-enter="enterPressed(name)">
//
// @module alchemy
// @directive onEnter
angular.module('alchemy').directive('onEnter', function() {
    return {
        scope: true,
        link: function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if(event.which === 13) {
                    scope.$apply(attrs.onEnter);
                }
            });
        }
    };
});
