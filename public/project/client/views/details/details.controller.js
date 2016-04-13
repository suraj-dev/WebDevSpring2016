(function () {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce, $routeParams, LocationService, YelpAPIService, $location, $anchorScroll, UserService) {

        var vm = this;
        var imgUrl;
        var pageid = $routeParams.pageid;
        var pageTitle;
        var userId;
        if($rootScope.currentUser != null) {
            userId = $rootScope.currentUser._id;
            console.log(userId);
        }
        else
        {
            userId = null;
        }
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
                                    vm.imgUrl = imgUrl;
                                  /*  $scope.getImage = function() {
                                        return 'url(' + imgUrl + ')';
                                    }*/
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
         var com =   LocationService.postComment(comment);
                vm.comments.push(com);
        }

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            vm.comments.splice(index, 1);
        }


        vm.userFavoritesLocation = userFavoritesLocation;

        function userFavoritesLocation() {
            var location = {
                locationId : pageid,
                locationTitle : pageTitle
            };

            UserService
                .userFavoritesLocation(userId, location)
                .then(function(response) {
                   $rootScope.currentUser.favoriteLocations = response.data;
                });

            LocationService
                .postFavoritedUser(pageid, userId, $rootScope.currentUser.username)
                .then(function(response) {
                    vm.favoritedUsers.push($rootScope.currentUser.username);
                    /*var users = response.data;
                    var favoritedUsers = [];
                    for(var u in users) {
                        UserService
                            .findUserById(users[u])
                            .then(function(response) {
                                favoritedUsers.push(response.data.username);
                            });
                    }
                    vm.favoritedUsers = favoritedUsers;*/
                });
        }

        LocationService
            .findFavoritedUsers(pageid)
            .then(function(response) {
                vm.favoritedUsers = response.data;
                /*var favoritedUsers = [];
                for(var u in users) {
                    UserService
                        .findUserById(users[u])
                        .then(function(response) {
                           favoritedUsers.push(response.data.username);
                        });
                }*/

            });

        vm.tab = 'info';

        vm.setTab = function (tabId) {
            vm.tab = tabId;
        };

        vm.isSet = function (tabId) {
            return vm.tab === tabId;
        };

    }
})();