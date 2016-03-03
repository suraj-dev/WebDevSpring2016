(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce, $routeParams, $http, $templateCache) {
        var pageid = $routeParams.pageid;
        $http({method: 'JSONP',
            url: "http://wikitravel.org/wiki/en/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=extracts&pageids=" + pageid,
            cache: $templateCache})
            .success(function(response) {
                console.log(response);
                $rootScope.data = response;
                $scope.detailsbg = "detailsbg";
                for(var key in $rootScope.data.query.pages){
                    if($rootScope.data.query.pages.hasOwnProperty(key)) {
                        $scope.location_name = $rootScope.data.query.pages[key].title;
                        $scope.location_content = $sce.trustAsHtml($rootScope.data.query.pages[key].extract);
                    }
                }
            });

        }
})();
