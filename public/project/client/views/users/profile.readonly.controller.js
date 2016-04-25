(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("ProfileReadOnlyController", profileReadOnlyController);

    function profileReadOnlyController($routeParams, UserService, $rootScope) {
        var vm = this;
        vm.alreadyFollowing = null;

        function init() {
            var otherUserId = $routeParams.userId;
            if ($rootScope.currentUser.following.length > 0) {
                for (var i in $rootScope.currentUser.following) {
                    if ($rootScope.currentUser.following[i].userId === otherUserId) {
                        vm.alreadyFollowing = "true";
                    }
                }

                if(vm.alreadyFollowing !== "true") {
                    vm.alreadyFollowing = null;
                }
            }
        }

        init();

        var otherUserId = $routeParams.userId;
        var otherUser;
        UserService
            .findUserById(otherUserId)
            .then(
                function(response) {
                    console.log(response.data);
                    var user = response.data[0];
                    user.emails = user.emails.toString();
                    vm.user = user;
                    otherUser = user;
                }
            );

        vm.followUser = followUser;

        function followUser() {

            var otherUsr = {
                username: otherUser.username,
                userId: otherUser._id
            };

            var userFollowed = false;

            if ($rootScope.currentUser.following.length > 0) {
                for (var i in $rootScope.currentUser.following) {
                    if ($rootScope.currentUser.following[i].userId === otherUserId) {
                        userFollowed = true;
                        vm.alreadyFollowing = "true";
                    }
                }
            }

            if (userFollowed === false) {
                UserService
                    .followUser(otherUsr, $rootScope.currentUser._id)
                    .then(
                        function (response) {
                            vm.followMessage = "You are now following " + otherUser.username;
                            vm.alreadyFollowing = "true";
                        }
                    );
            }
        }

        vm.unfollowUser = unfollowUser;

        function unfollowUser() {
            UserService.unfollowUser($rootScope.currentUser._id, otherUser._id)
                .then(
                    function(response) {
                        vm.alreadyFollowing = null;
                    }
                )
        }



    }
})();