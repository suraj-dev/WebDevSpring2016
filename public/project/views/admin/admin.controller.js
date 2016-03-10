(function() {
    angular
        .module("TouristaApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $scope) {
        UserService.findAllUsers(function(response) {
           $scope.users = response;
        });

        $scope.addUser = function() {
            var user= {
                username : $scope.usrname,
                password : $scope.passwd,
                roles : $scope.role
            };
            UserService.createUser(user, function(response) {
                //$scope.users.push(response);
            });
        };

        var selectedUserId = -1;

        $scope.selectUser = selectUser;

        function selectUser(index) {
            $scope.usrname = $scope.users[index].username;
            $scope.role = $scope.users[index].roles;
            selectedUserId = $scope.users[index]._id;
        }

        $scope.updateUser = updateUser;

        function updateUser() {
            var newUser = {
                username : $scope.usrname,
                password : $scope.passwd,
                roles : $scope.role
            };

            UserService.updateUser(selectedUserId, newUser, function(response) {

            });
        }

        $scope.deleteUser = deleteUser;

        function deleteUser(index) {
            var user_id = $scope.users[index]._id;
            UserService.deleteUserById(user_id, function(response) {
                $scope.users.splice(index,1);
            });
        }
    }
})();