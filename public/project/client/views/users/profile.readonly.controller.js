(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .controller("ProfileReadOnlyController", profileReadOnlyController);

    function profileReadOnlyController($routeParams, UserService, $rootScope) {
        var vm = this;

        function init() {

        }

        init();

        var otherUser;
        var otherUserId = $routeParams.userId;
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
                username : otherUser.username,
                userId : otherUser._id
            };

            UserService
                .followUser(otherUsr, $rootScope.currentUser._id)
                .then(
                    function(response) {
                        vm.followMessage = "You are now following " + otherUser.username;
                    }
                )
        }



    }
})();