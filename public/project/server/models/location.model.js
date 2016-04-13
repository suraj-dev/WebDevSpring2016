var q = require("q");

module.exports = function (db, mongoose) {

    var locationSchema = require('./location.schema.server.js')(mongoose);
    var locationModel = mongoose.model('location', locationSchema);
    var api = {
        findFavoritedUsers: findFavoritedUsers,
        createFavoritedUser : createFavoritedUser
    };

    return api;

    function findFavoritedUsers(locationId) {
        var deferred = q.defer();

        locationModel.findOne({locationId : locationId},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createFavoritedUser(locationId, user) {
        return locationModel.findOne({locationId: locationId})
            .then(
                function (location) {
                    location.favoritedUsers.push(user);
                    return location.save();
                }
            );
    }
};