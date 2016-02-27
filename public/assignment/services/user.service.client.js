(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users= [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie", "password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;


        function findUserByCredentials(username, password, callback) {
            var usr;
            for (usr in users) {
                if (users[usr].username == username && users[usr].password == password)
                {
                    callback(users[usr]);
                    return users[usr];
                }
            }
            callback(null);
            return null;
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user["_id"] = (new Date).getTime();
            users.push(user);
            callback(user);
            return user;

        }

        function deleteUserById(userId, callback) {
            var user;
            for (user in users) {
                if (users[user]._id == userId)
                {
                    delete users[user];
                    callback(users);
                }
            }
        }

        function updateUser(userId, user, callback)
        {
            var usr;
            for(usr in users) {
                if(users[usr]._id == userId)
                {
                    users[usr].username = user.username;
                    users[usr].password = user.password;
                    users[usr].firstName = user.firstName;
                    users[usr].lastName = user.lastName;
                    users[usr].email_id = user.email_id;
                    callback(users[usr]);
                }
            }
        }
    }
})();