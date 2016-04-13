module.exports = function (app, locationModel) {
    app.get('/api/project/location/:id/favuser', findFavoritedUsers);
    app.put('/api/project/location/:locationid/favuser/:userid', createFavoritedUser);

    function findFavoritedUsers(req, res) {
        var locationId = Number(req.params.id);
        var favoritedUsers = locationModel.findFavoritedUsers(locationId)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc.favoritedUsers);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFavoritedUser(req, res) {
        var locationId = Number(req.params.locationid);
        var userId = Number(req.params.userid);
        var username = req.body;
        var user = {
            userId : userId,
            username : username
        };
        var favoritedUsers = locationModel.createFavoritedUser(locationId, user)
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