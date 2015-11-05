// Ionic Starter App
 
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])
 
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        var dialogBody = parent.document.getElementById("exec-dialog");
        var overlay = parent.document.querySelector(".ui-widget-overlay");
        var ngDialog = angular.element(dialogBody.parentElement);
        var ngOverlay = angular.element(overlay);
        var hideRules = { "height": "0px", "width": "0px", "display": "none" };
        ngDialog.css(hideRules); // hide annoying popup
        ngOverlay.css(hideRules); // hide annoying popup's backdrop

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

    // Each tab has its own nav history stack:

    .state('tab.mapdemo', {
        url: '/mapdemo',
        views: {
            'tab-mapdemo': {
                templateUrl: 'templates/mapdemo.html'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/mapdemo');

})
 
