var mock = require('./location.mock.json');

module.exports = function () {
    var api = {
        findFavoritedUsers: findFavoritedUsers,
        createFavoritedUser : createFavoritedUser
    };

    return api;

    function findFavoritedUsers(locationId) {
        for (var l in mock) {
            if (mock[l]._id === locationId) {
                return mock[l].favoritedUsers;
            }
        }
        return null;
    }

    function createFavoritedUser(locationId, userId) {
        for (var l in mock) {
            if (mock[l]._id === locationId) {
                mock[l].favoritedUsers.push(userId);
                return mock[l].favoritedUsers;
            }

        }
        mock[l]._id = locationId;
        mock[l].favoritedUsers = [userId];
        return mock[l].favoritedUsers;
    }
};