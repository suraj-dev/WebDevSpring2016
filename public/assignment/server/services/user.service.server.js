var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authenticated;
    var loggedInUser;
    app.post('/api/assignment/admin/user', isAdmin, createUser);
    app.get('/api/assignment/admin/user', isAdmin, findAllUsers);
    app.get('/api/assignment/admin/user/:id', isAdmin, findUserById);
    app.get('/api/assignment/user?username=:username', findUserByUsername);
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/register', register);
    app.put('/api/assignment/user/:id', updateUserById);
    app.put('/api/assignment/admin/user/:id', isAdmin, updateUserById);
    app.delete('/api/assignment/admin/user/:id', isAdmin, deleteUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
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
        if(req.isAuthenticated()) {

            res.send(req.user);
        }

        else
        {
            res.send('0');
        }

    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
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
};