module.exports = function (db, mongoose) {
    var q = require("q");
    var projectUserSchema = require("./user.schema.server.js")(mongoose);
    var ProjectUserModel =  mongoose.model('projectUser', projectUserSchema);

    var api = {
        findUserById : findUserById,
        findAllUsers : findAllUsers,
        createUser : createUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        deleteUserById : deleteUserById,
        updateUserById : updateUserById,
        userFavoritesLocation : userFavoritesLocation,
        uploadImage : uploadImage,
        followUser : followUser,
        undoFavoriteLocation : undoFavoriteLocation,
        unfollowUser : unfollowUser
    };

    return api;

    function findAllUsers() {

        var deferred = q.defer();

        ProjectUserModel.find(function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        ProjectUserModel.find({_id : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        return ProjectUserModel.findOne({username : username});
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one retrieves one document
        ProjectUserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        ProjectUserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });
        // return a promise
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        ProjectUserModel.remove({_id : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var deferred = q.defer();
        ProjectUserModel.update({_id : userId}, user, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                ProjectUserModel.findById(userId, function(err, doc) {
                    if(err)
                        deferred.reject(err);
                    else
                        deferred.resolve(doc);
                });
            }
        });
        return deferred.promise;
    }

    function userFavoritesLocation(userId, location) {
        /*return ProjectUserModel.findById(userId)
            .then(
                function (doc) {
                    user.favoriteLocations.push(location);
                    return doc.save();
                }
            );*/
        var deferred = q.defer();


        ProjectUserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add movie id to user likes
                doc.favoriteLocations.push (location);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function uploadImage(username, img) {
        return ProjectUserModel.update(
            {username : username},
            {$push : {images : img}}
        );
    }

    function followUser(userId, otherUser) {
        var deferred = q.defer();


        ProjectUserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.following.push (otherUser);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function undoFavoriteLocation(userId, locationId) {
        return ProjectUserModel.update(
            {_id: userId},
            {$pull: {'favoriteLocations': {locationId : locationId}}}
        );
    }

    function unfollowUser(userId, otherUserId) {
        return ProjectUserModel.update(
            {_id: userId},
            {$pull: {'following': {userId : otherUserId}}}
        );
    }
};