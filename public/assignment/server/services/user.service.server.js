module.exports = function(app, userModel, formModel) {
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findAllUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.get('/api/assignment/user?username=username', findUserByUsername);
    app.get('/api/assignment/user?username=alice&password=wonderland', findUserByCredentials);
    app.put('/api/assignment/user/:id', updateUserById);
    app.delete('/api/assignment/user/:id', deleteUserById);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }
};