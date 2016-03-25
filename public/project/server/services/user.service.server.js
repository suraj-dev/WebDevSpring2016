module.exports = function(app, userModel) {
    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findAllUsers);
    app.get('/api/project/user/:id', findUserById);
    app.get('/api/project/user?username=:username', findUserByUsername);
    app.get('/api/project/user?username=:username&password=:password', findUserByCredentials);
    app.put('/api/project/user/:id', updateUserById);
    app.delete('/api/project/user/:id', deleteUserById);
    app.put('/api/project/user/:id/location', userFavoritesLocation);

    function createUser(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        res.json(users);
    }

    function findAllUsers(req, res) {
        if(req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if(req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    function findUserById(req, res) {
        var userId = Number(req.params.id);
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username : username,
            password : password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = Number(req.params.id);
        var user = req.body;
        var result = userModel.updateUserById(userId, user);
        res.send(result);
    }

    function deleteUserById(req, res) {
        var userId = Number(req.params.id);
        userModel.deleteUserById(userId);
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function userFavoritesLocation(req, res) {
        var userId = Number(req.params.id);
        var location = req.body;
        var favoriteLocations = userModel.userFavoritesLocation(userId, location);
        res.json(favoriteLocations);
    }
};