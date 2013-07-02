'use strict';

describe('Directive: OnEnter', function () {
    var element, scope,
        keypress_event;

    beforeEach(module('alchemy'));

    describe('', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<div ng-model="test_data" on-enter="submit_test(test_data)">');

            scope = $rootScope;

            scope.test_data = "test1";
            scope.submit_test = function(arg){
                scope.function_ran = true;
                scope.test_arg = arg;
            }

            keypress_event = jQuery.Event("keypress");
            keypress_event.which = 13;

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should call the function specified as the attribute on keypress', inject(function () {
            $(element).trigger(keypress_event);

            expect(scope.function_ran).toBe(true);
        }));

        it('should call the function specified and pass an attribute on keypress', inject(function () {
            $(element).trigger(keypress_event);

            expect(scope.test_arg).toBe(scope.test_data);
        }));

    });
});
