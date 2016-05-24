module.exports.load = function (mod) {
    mod.config(config);
};

/** @ngInject */
function config($logProvider, $urlRouterProvider) {

    // Enable log
    $logProvider.debugEnabled(true);

    //Default route
    $urlRouterProvider.otherwise('app');
}