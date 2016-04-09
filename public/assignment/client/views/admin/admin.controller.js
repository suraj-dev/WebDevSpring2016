(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {

        var vm = this;

        function init() {
            vm.remove = remove;
            vm.update = update;
            vm.add    = add;
            vm.select = select;
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user, index)
        {
            UserService
                .deleteUserById(user._id)
                .then(function(response) {
                    vm.users.splice(index,1);
                });
        }

        function update(user)
        {
            if(user.roles) {
                user.roles = user.roles.split(",");
            }
            UserService
                .updateUserById(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            if(user.roles) {
                user.roles = user.roles.split(",");
            }
            UserService
                .createUser(user)
                .then(function(response) {
                    vm.users.push(response.data);
                });
        }

        function select(user)
        {
            vm.username = user.username;
            vm.password = user.password;
            vm.firstName = user.firstName;
            vm.lastName = user.lastName;
            vm.roles = user.roles.toString();
        }

        function handleSuccess(response) {
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }

    }
})();