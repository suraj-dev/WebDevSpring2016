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
            login : login,
            logout : logout,
            register : register,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser : setCurrentUser,
            userFavoritesLocation : userFavoritesLocation,
            findUserById : findUserById,
            followUser : followUser,
            undoFavorite : undoFavorite
        };

        return service;

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(callback) {
            return $http.get('/api/project/user');
        }

        function createUser(user) {
            console.log(user);
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

        function userFavoritesLocation(userId, location) {
            return $http.put('/api/project/user/' + userId + '/location', location);
        }

        function findUserById(userId) {
            return $http.get('/api/project/user/' + userId);
        }

        function followUser(otherUser, userId) {
            return $http.post('/api/project/user/' + userId + '/follow', otherUser);
        }

        function undoFavorite(userId, locationId) {
            return $http.delete('/api/project/user/' + userId +'/location/' + locationId + '/delete');
        }
    }
})();
