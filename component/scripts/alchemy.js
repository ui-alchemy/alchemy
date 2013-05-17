'use strict';

/**
 * @ngdoc module
 * @name alch-templates
 *
 * @description
 *   Defines the base Alchemy templates module for housing cached versions of component
 *   templates within JavaScript.
 */
angular.module('alch-templates', []);

/**
 * @ngdoc module
 * @name alchemy
 *
 * @description
 *   Base Alchemy module for components to link up to.
 */
angular.module('alchemy', ['alch-templates']);
