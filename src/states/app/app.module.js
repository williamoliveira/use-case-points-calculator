var controller = require('./app.controller.js');
var appTemplate = require('./app.tpl.html');

var mod = angular.module('states.main.app', []);

/** @ngInject */
mod.config(function ($stateProvider) {

    $stateProvider.state("app", {
        url: '',
        templateUrl: appTemplate,
        controller: controller,
        controllerAs: "vm"
    });


});

module.exports = mod;