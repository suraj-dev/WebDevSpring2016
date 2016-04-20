var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authenticated;
    var loggedInUser;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'../../../uploads'});
    app.post('/api/project/user', isAdmin, createUser);
    app.get('/api/project/user', isAdmin, findAllUsers);
    app.get('/api/project/user/:id', findUserById);
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.get('/api/project/loggedin', loggedin);
    app.post('/api/project/register', register);
    app.get('/api/project/user?username=:username', findUserByUsername);
    app.get('/api/project/user?username=:username&password=:password', findUserByCredentials);
    app.put('/api/project/user/:id', updateUserById);
    app.delete('/api/project/user/:id', deleteUserById);
    app.put('/api/project/user/:userId/location', userFavoritesLocation);
    app.put('/api/project/admin/user/:id', isAdmin, updateUserById);
    app.delete('/api/project/admin/user/:id', isAdmin, deleteUserById);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/project/user/:userid/follow", followUser);
    app.delete("/api/project/user/:userId/location/:locationId/delete", undoFavorite);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        loggedInUser = user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                console.log(user);
                                loggedInUser = user;
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var usr = req.body;
        usr.roles = ["user"];
        usr.password = bcrypt.hashSync(usr.password);
        var user = userModel.createUser(usr)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }

            );

    }

    function findAllUsers(req, res) {

        if(req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            var users = userModel.findAllUsers()
                .then(
                    function(doc) {
                        res.json(doc);
                    },

                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username : username,
            password : password
        };
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.updateUserById(userId, user)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function userFavoritesLocation(req, res) {
        var userId = req.params.userId;
        var location = req.body;
        var favoriteLocations = userModel.userFavoritesLocation(userId, location)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc.favoriteLocations);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function uploadImage(req, res) {
        var file = req.file;
        var filename = file.filename;
        var username = loggedInUser.username;
        console.log(username);
        var imgUrl = '../uploads/' + filename;
        var img = {
            imageUrl : imgUrl
        };
        userModel.uploadImage(username, img)
            .then(
                function(doc) {
                    return doc;
                },

                function(err) {
                    res.status(400).send(err);
                }
            )
    .then(
            function(){
                res.redirect("/project/client/index.html#/profile");
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function authenticated (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {

        if(req.isAuthenticated()) {
            if(loggedInUser.roles.indexOf("admin") >= 0) {
                next();
            }
        }
        else {
            res.send(403);
        }
    }

    function followUser(req, res) {
        var otherUser = req.body;
        var userId = req.params.userid;

        userModel.followUser(userId, otherUser)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function undoFavorite(req, res) {
        var locationId = req.params.locationId;
        var userId = req.params.userId;
        userModel.undoFavoriteLocation(userId, locationId)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};