'use strict';

angular.module('componentExampleApp', ['alchemy'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/example.html',
        controller: 'ExampleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

function ExampleCtrl(){};
