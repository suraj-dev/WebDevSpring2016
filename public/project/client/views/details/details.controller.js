(function () {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce, $routeParams, LocationService, YelpAPIService, $location, $anchorScroll) {

        var vm = this;
        var imgUrl;
        var pageid = $routeParams.pageid;
        var pageTitle;
        LocationService
            .findLocationByID(pageid)
            .then(function (response) {
            console.log(response);
            $rootScope.data = response.data;
            vm.detailsbg = "detailsbg";
            for (var key in $rootScope.data.query.pages) {
                if ($rootScope.data.query.pages.hasOwnProperty(key)) {
                    vm.location_name = $rootScope.data.query.pages[key].title;
                    vm.location_content = $sce.trustAsHtml($rootScope.data.query.pages[key].extract);
                    LocationService
                        .getCoverImage(pageid)
                        .then(function(response) {
                            for (var key in response.data.query.pages) {
                                if (response.data.query.pages.hasOwnProperty(key)) {
                                    imgUrl = response.data.query.pages[key].thumbnail.original;
                                    $scope.getImage = function() {
                                        return 'url(' + imgUrl + ')';
                                    }
                                }
                                }
                        });
                    LocationService
                        .findTitleByID(pageid)
                        .then(function (response) {
                        var pageinfo = response.data;
                        for (var key in pageinfo.query.pages) {
                            if (pageinfo.query.pages.hasOwnProperty(key)) {
                                pageTitle = pageinfo.query.pages[key].title;
                                console.log(pageTitle);
                                var geocoder = new google.maps.Geocoder();
                                geocoder.geocode({'address': pageTitle}, function (results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        $scope.map = {
                                            center: {
                                                latitude: results[0].geometry.location.lat(),
                                                longitude: results[0].geometry.location.lng()
                                            }, zoom: 8
                                        };
                                        $scope.marker = {
                                            id: 0,
                                            location: {
                                                latitude: results[0].geometry.location.lat(),
                                                longitude: results[0].geometry.location.lng()
                                            }
                                        };
                                    }

                                    else {
                                        vm.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
                                    }
                                });
                                vm.imgSrc = $sce.trustAsResourceUrl("http://www.panoramio.com/wapi/template/photo_list.html?tag=" + pageTitle + "&amp;width=500&amp;height=500&amp;list_size=8&amp;position=bottom&amp;bgcolor=%2333");
                                YelpAPIService.request_yelp(pageTitle)
                                    .then(function (response) {
                                    console.log(response);
                                    $rootScope.yelpInfo = response.data;
                                });
                                break;
                            }
                        }
                    });
                }
            }
        });

        var commentsForLocation = LocationService.findComments(pageid);
        vm.comments = commentsForLocation;


        vm.postComment = postComment;

        function postComment() {
            var comment = {
                commentId: (new Date).getTime(),
                locationId: pageid,
                username: $rootScope.currentUser.username,
                timestamp: new Date(),
                comment: vm.commentBox
            };
            LocationService.postComment(comment)
                .then(function (response) {
                vm.comments.push(response);
            });
        }

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            vm.comments.splice(index, 1);
        }

        vm.goToImageGallery = goToImageGallery;

        function goToImageGallery(event) {
            var id = $location.hash();
            event.stopPropagation();
            event.preventDefault();
            $location.hash('imgGallery');
            $anchorScroll();
            $location.hash(id);
        }

        vm.goToGmaps = goToGmaps;

        function goToGmaps(event) {
            var id = $location.hash();
            event.stopPropagation();
            event.preventDefault();
            $location.hash('gmaps');
            $anchorScroll();
            $location.hash(id);
        }

        vm.goToReviews = goToReviews;

        function goToReviews(event) {
            var id = $location.hash();
            event.stopPropagation();
            event.preventDefault();
            $location.hash('reviews');
            $anchorScroll();
            $location.hash(id);
        }

        vm.goToPtsOfInterest = goToPtsOfInterest;

        function goToPtsOfInterest(event) {
            var id = $location.hash();
            event.stopPropagation();
            event.preventDefault();
            $location.hash('ptsOfInterest');
            $anchorScroll();
            $location.hash(id);
        }

    }
})();