var mock = require("./user.mock.json");

module.exports = function () {
    var api = {
        findUserById : findUserById,
        findAllUsers : findAllUsers,
        createUser : createUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        deleteUserById : deleteUserById,
        updateUserById : updateUserById,
        userFavoritesLocation : userFavoritesLocation
    };

    return api;

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        var usr;
        for(usr in mock) {
            if (mock[usr]._id === userId) {
                return mock[usr];
            }
        }
        console.log('id ' + userId + ' not found');
        return null;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if (mock[u]._id === userId) {
                delete mock[u];
            }
        }
    }

    function updateUserById(userId, user) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u].username = user.username;
                mock[u].password = user.password;
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].email_id = user.email_id;
                mock[u].dob = user.dob;
                mock[u].hometown = user.hometown;
                return "Success";
                console.log(mock[u]);
            }
            else
            {
                return "Error";
            }
        }
    }

    function userFavoritesLocation(userId, location) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u].favoriteLocations.push(location);
                console.log(mock[u]);
                return mock[u].favoriteLocations;
            }
        }
    }
};