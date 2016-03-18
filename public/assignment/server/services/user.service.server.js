module.exports = function(app, userModel) {
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findAllUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.get('/api/assignment/user?username=:username', findUserByUsername);
    app.get('/api/assignment/user?username=:username&password=:password', findUserByCredentials);
    app.put('/api/assignment/user/:id', updateUserById);
    app.delete('/api/assignment/user/:id', deleteUserById);

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
        console.log(userId);
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
        console.log(username, password);
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
        userModel.updateUserById(userId, user);
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function deleteUserById(req, res) {
        var userId = Number(req.params.id);
        userModel.deleteUserById(userId);
        var users = userModel.findAllUsers();
        res.json(users);
    }
};