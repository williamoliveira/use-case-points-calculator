var angular = require('angular');

//angular dependencies
require('api-check');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-formly');
require('angular-formly-templates-bootstrap');

require('font-awesome/css/font-awesome.min.css');
require('font-awesome/fonts/fontawesome-webfont.woff2');


// styles
require('bootstrap/less/bootstrap.less');
require('./app.less');
require('highlight.js/styles/default.css');

var app = angular.module('myApp', [

    /*
     * Dependences
     */
    'ui.router', // state routing
    'ui.bootstrap', // no jquery bootstrap components
    'formly',
    'formlyBootstrap',

    /*
     * App modules
     */
    // States (main state requires child states and so on)
    require('./states/main.module.js').name
]);

//global config
require('./config').load(app);