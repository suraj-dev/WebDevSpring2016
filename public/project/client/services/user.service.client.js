(function() {
    'use strict';
    angular
        .module("TouristaApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {
            findUserByUsername : findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser : setCurrentUser
        };

        return service;


        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(callback) {
            return $http.get('/api/project/user');
        }

        function createUser(user) {
            return $http.post('/api/project/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/user/' + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put('/api/project/user/' + userId, user);
        }

        function findUserByUsername(username) {
            return $http.get('/api/project/user?username=' + username);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();
