module.exports = function(app, userModel) {
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findAllUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.get('/api/assignment/user?username=:username', findUserByUsername);
    app.get('/api/assignment/user?username=:username&password=:password', findUserByCredentials);
    app.put('/api/assignment/user/:id', updateUserById);
    app.delete('/api/assignment/user/:id', deleteUserById);

    function createUser(req, res) {
        var usr = req.body;
        var user = userModel.createUser(usr)
            .then(
                function(doc) {
                    console.log("newUser =" + user);
                    console.log("newUser doc =" + doc);
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }

            );

    }

    function findAllUsers(req, res) {
        if(req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if(req.query.username) {
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
};