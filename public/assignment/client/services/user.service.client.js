(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
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
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(callback) {
            return $http.get('/api/assignment/user');
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
           return $http.delete('/api/assignment/user/' + userId);
        }

        function updateUser(userId, user)
        {
           return $http.put('/api/assignment/user/' + userId, user);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();