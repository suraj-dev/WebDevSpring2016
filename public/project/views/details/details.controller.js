(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce, $routeParams, LocationService, YelpAPIService, $window) {
        var pageid = $routeParams.pageid;
        var pageTitle;
        LocationService.findLocationByID(pageid, function(response) {
                console.log(response);
                $rootScope.data = response;
               /* LocationService.imageProvider(function(response) {
                    $rootScope.imageURL = response;
                    console.log(response);
                });*/
                $scope.detailsbg = "detailsbg";
                for(var key in $rootScope.data.query.pages){
                    if($rootScope.data.query.pages.hasOwnProperty(key)) {
                        $scope.location_name = $rootScope.data.query.pages[key].title;
                        $scope.location_content = $sce.trustAsHtml($rootScope.data.query.pages[key].extract);
                        LocationService.findTitleByID(pageid, function(response){
                            var pageinfo = response;
                            for(var key in pageinfo.query.pages) {
                                if (pageinfo.query.pages.hasOwnProperty(key)) {
                                    pageTitle = pageinfo.query.pages[key].title;
                                    console.log(pageTitle);
                                    $scope.imgSrc = $sce.trustAsResourceUrl("http://www.panoramio.com/wapi/template/photo_list.html?tag=" + pageTitle +"&amp;width=500&amp;height=500&amp;list_size=8&amp;position=bottom&amp;bgcolor=%2333")
                                    break;
                                }
                            }
                        });
                        YelpAPIService.request_yelp("Boston", function(response){
                            console.log(response);
                            $rootScope.yelpInfo = response;
                        });
                        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
                    }
                }
            });

        }
})();