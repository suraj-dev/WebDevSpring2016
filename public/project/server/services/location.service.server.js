module.exports = function (app, locationModel) {
    app.get('/api/project/location/:id/favuser', findFavoritedUsers);
    app.post('/api/project/location/:locationid/favuser/:userid/:username', createFavoritedUser);

    function findFavoritedUsers(req, res) {
        var locationId = Number(req.params.id);
        var favoritedUsers = locationModel.findFavoritedUsers(locationId)
            .then(
                function (doc) {
                    res.json(doc.favoritedUsers);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFavoritedUser(req, res) {

        var locationId = req.params.locationid;
        var userId = req.params.userid;
        var username = req.params.username;
        var user = {
            userId : userId,
            username : username
        };
        var favoritedUsers = locationModel.createFavoritedUser(locationId, user)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};