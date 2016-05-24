var mod = angular.module('states.main', [
    require('./app/app.module').name
]);

require('./main.controller.js').load(mod);

module.exports = mod;