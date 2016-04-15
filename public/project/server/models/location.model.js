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
        var deferred = q.defer();


        locationModel.findOne({locationId: locationId},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }


                if (doc) {

                    doc.favoritedUsers.push (user);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    location = new locationModel({
                        locationId : locationId,
                        favoritedUsers : [],
                        ratings : []
                    });

                    location.favoritedUsers.push (user);
                    // save new instance
                    location.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }
};