// Ionic Starter App
 
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])
 
.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
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

    .state('tab.main', {
        url: '/main',
        views: {
            'tab-main': {
                templateUrl: 'templates/main.html'
            }
        }
    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/main');

})
 
.controller('MapController', function ($scope, $cordovaGeolocation, $ionicLoading, $compile) {
 
    document.addEventListener("deviceready", onDeviceReady, false);
     
    function onDeviceReady() {


        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Laster opp!'
        });
         
        var posOptions = {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            //var lat = "59.9154326";
            //var long = "10.7581677";
            var latLng = new google.maps.LatLng(lat,long);
             
            var mapOptions = {
                center: latLng,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // Specify location, radius and place types for your Places API search.
            var request = {
                location: latLng,
                radius: '2500',
                types: ['gas_station']
            };
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
            var service = new google.maps.places.PlacesService(map);

            service.nearbySearch(request, function (results, status) {

                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {

                        var place = results[i];
                        console.log('Navn: ' + place.name,'Addresse: '+ place.vicinity)

                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });

                    }  
                }
            });

        
            $scope.map = map;   
            $ionicLoading.hide();

            $scope.centerOnMe = function () {
                alert('Clicked')
                console.log('Clicked')
            };

        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    }               
});