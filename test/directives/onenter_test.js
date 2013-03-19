'use strict';

describe('Directive: OnEnter', function () {
    var element, scope, keypress_event;
  
    //beforeEach(module('alchemy'));

    describe('blah', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<div ng-model="test_data" on-enter="submit_test(test_data)">');

            scope = $rootScope;
            
            scope.test_data = "test1";
            scope.submit_test = function(arg){
                scope.function_ran = true;
                scope.test_arg = arg;
            }

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should call the function specified as the attribute', inject(function () {
            browserTrigger(element, 'keypress');

            expect(scope.function_ran).toBe(false);
        }));

        it('should call the function specified and pass an attribute', inject(function () {
            browserTrigger(element, 'keypress');

            expect(scope.test_arg).toBe(scope.test_data);
        }));

    });
});
