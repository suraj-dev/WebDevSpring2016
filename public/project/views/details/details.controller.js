(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce) {
        $scope.detailsbg = "detailsbg";
        for(var key in $rootScope.data.query.pages){
            if($rootScope.data.query.pages.hasOwnProperty(key)) {
                $scope.location_name = $rootScope.data.query.pages[key].title;
                $scope.location_content = $sce.trustAsHtml($rootScope.data.query.pages[key].extract);
            }
          }
        }
})();
