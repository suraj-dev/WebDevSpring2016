(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {
            findUserByUsername : findUserByUsername,
            findUserById : findUserById,
            login : login,
            logout : logout,
            register : register,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserById: updateUserById,
            setCurrentUser : setCurrentUser
        };

        return service;


        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function findAllUsers(callback) {
            return $http.get('/api/assignment/admin/user');
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function deleteUserById(userId) {
           return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function updateUser(userId, user)
        {
           return $http.put('/api/assignment/user/' + userId, user);
        }

        function updateUserById(userId, user)
        {
            return $http.put('/api/assignment/admin/user/' + userId, user);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function findUserById(userId) {
            return $http.get('/api/assignment/admin/user/' + userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();