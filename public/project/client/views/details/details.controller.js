(function () {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $sce, $routeParams, LocationService, YelpAPIService, $location, $anchorScroll, UserService) {

        var vm = this;
        var pageid;
        vm.favorited = null;
        function init() {
            pageid = $routeParams.pageid;
            if ($rootScope.currentUser.favoriteLocations.length > 0) {
                for (var i in $rootScope.currentUser.favoriteLocations) {
                    if (pageid == $rootScope.currentUser.favoriteLocations[i].locationId.toString()) {
                        vm.favorited = true;
                        break;
                    }
                }
                if(vm.favorited !== true) {
                    vm.favorited = null;
                }

            }
        }

        init();
        vm.favoritedUsers = [];
        var imgUrl;
        var pageTitle;
        var userId;
        if ($rootScope.currentUser != null) {
            userId = $rootScope.currentUser._id;
            console.log(userId);
        }
        else {
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
                            .then(function (response) {
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
                                                    }, zoom: 12
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
                                        vm.imgSrc = $sce.trustAsResourceUrl("http://www.panoramio.com/wapi/template/photo_list.html?tag=" + pageTitle + "&amp;width=700&amp;height=500&amp;list_size=8&amp;position=bottom&amp;bgcolor=%2333");

                                        YelpAPIService.request_yelp(pageTitle)
                                            .then(function (response) {
                                                console.log(response);
                                                var yelpInfo = response.data;
                                                console.log(yelpInfo);
                                                $rootScope.yelpInfo = response.data;
                                            });
                                        break;
                                    }
                                }
                            });
                    }
                }
            });

        LocationService.findComments(pageid)
            .then(function (response) {
                console.log(response.data);
                if (response.data === null) {
                    vm.comments = [];
                }
                else {
                    vm.comments = response.data.comments;
                }
            });


        vm.postComment = postComment;

        function postComment() {
            var comment = {
                commentId: (new Date).getTime(),
                userId: $rootScope.currentUser._id,
                username: $rootScope.currentUser.username,
                timestamp: new Date(),
                comment: vm.commentBox
            };
            var com = LocationService.postComment(pageid, comment)
                .then(function (response) {
                    console.log(response.data);
                    vm.comments.push(comment);
                });
        }

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            var commentId = vm.comments[index].commentId;
            LocationService.deleteComment(pageid, commentId)
                .then(
                    function (response) {
                        vm.comments.splice(index, 1);
                    }
                );
        }


        vm.userFavoritesLocation = userFavoritesLocation;

        function userFavoritesLocation() {
            var location = {
                locationId: pageid,
                locationTitle: pageTitle
            };
            var locationExists = false;

            if ($rootScope.currentUser.favoriteLocations.length > 0) {
                for (var i in $rootScope.currentUser.favoriteLocations) {
                    if (pageid === $rootScope.currentUser.favoriteLocations[i].locationId.toString()) {
                        locationExists = true;
                        break;
                    }
                }
                if(locationExists === false) {
                    UserService
                        .userFavoritesLocation(userId, location)
                        .then(function (response) {
                            $rootScope.currentUser.favoriteLocations = response.data;
                        });

                    LocationService
                        .postFavoritedUser(pageid, userId, $rootScope.currentUser.username)
                        .then(function (response) {
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
                    vm.favorited = true;
                }

                }

            else {
                UserService
                    .userFavoritesLocation(userId, location)
                    .then(function (response) {
                        $rootScope.currentUser.favoriteLocations = response.data;
                    });

                LocationService
                    .postFavoritedUser(pageid, userId, $rootScope.currentUser.username)
                    .then(function (response) {
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
                vm.favorited = true;
            }


        }

        LocationService
            .findFavoritedUsers(pageid)
            .then(function (response) {
                vm.favoritedUsers = response.data;

            });

        vm.tab = 'info';

        vm.setTab = function (tabId) {
            vm.tab = tabId;
        };

        vm.isSet = function (tabId) {
            return vm.tab === tabId;
        };

        vm.undoFavorite = undoFavorite;

        function undoFavorite() {
            UserService
                .undoFavorite($rootScope.currentUser._id, pageid)
                .then(function(response) {
                    for (var i in $rootScope.currentUser.favoriteLocations) {
                        if (pageid == $rootScope.currentUser.favoriteLocations[i].locationId.toString()) {
                            $rootScope.currentUser.favoriteLocations.splice(i, 1);
                        }
                    }
                });

            LocationService
                .undoFavorite(pageid, $rootScope.currentUser._id)
                .then(function(response) {
                    for (var i in vm.favoritedUsers) {
                        if ($rootScope.currentUser._id == vm.favoritedUsers[i].userId) {
                            vm.favoritedUsers.splice(i, 1);
                        }
                    }
            });

            vm.favorited = null;
        }

    }
})();