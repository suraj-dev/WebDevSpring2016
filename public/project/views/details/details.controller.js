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
                                    $scope.imgSrc = $sce.trustAsResourceUrl("http://www.panoramio.com/wapi/template/photo_list.html?tag=" + pageTitle +"&amp;width=500&amp;height=500&amp;list_size=8&amp;position=bottom&amp;bgcolor=%2333");
                                    YelpAPIService.request_yelp(pageTitle, function(response){
                                        console.log(response);
                                        $rootScope.yelpInfo = response;
                                    });
                                    break;
                                }
                            }
                        });
                        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
                    }
                }
            });

        LocationService.findComments(pageid, function(response) {
           $scope.comments = response;
        });

        $scope.postComment = postComment;

        function postComment() {
            var comment = {
                commentId: (new Date).getTime(),
              locationId : pageid,
                username: $rootScope.currentUser.username,
                timestamp: new Date(),
                comment: $scope.commentBox
            };
            LocationService.postComment(comment, function(response) {
               $scope.comments.push(response);
            });
        }

        $scope.deleteComment = deleteComment;

        function deleteComment(index) {
            $scope.comments.splice(index,1);
        }

        }
})();