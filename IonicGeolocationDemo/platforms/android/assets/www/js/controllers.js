﻿angular.module('starter.controllers',[])

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