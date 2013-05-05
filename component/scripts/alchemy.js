'use strict';

// Defines the base Alchemy templates module for housing cached versions of component
// templates within JavaScript.
// 
// @module alch-templates
angular.module('alch-templates', []);

// Base Alchemy module for components to link up to.
//
// @module alchemy
angular.module('alchemy', ['alch-templates']);
