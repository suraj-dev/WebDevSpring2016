(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce, $routeParams, LocationService, YelpAPIService, $window) {
        var pageid = $routeParams.pageid;
        LocationService.findLocationByID(pageid, function(response) {
                console.log(response);
                $rootScope.data = response;
                $scope.detailsbg = "detailsbg";
                for(var key in $rootScope.data.query.pages){
                    if($rootScope.data.query.pages.hasOwnProperty(key)) {
                        $scope.location_name = $rootScope.data.query.pages[key].title;
                        $scope.location_content = $sce.trustAsHtml($rootScope.data.query.pages[key].extract);
                     /*   /!*YelpAPIService.request_yelp("San Francisco", function(response){
                           console.log("Hello");*!/
                        });*/
                        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
                    }
                }
            });

        }
})();