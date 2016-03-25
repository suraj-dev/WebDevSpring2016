module.exports = function(app, locationModel) {
    app.get('/api/project/location/:id/favuser', findFavoritedUsers);
    app.put('/api/project/location/:locationid/favuser/:userid', createFavoritedUser);

    function  findFavoritedUsers(req, res) {
        var locationId = Number(req.params.id);
        var favoritedUsers = locationModel.findFavoritedUsers(locationId);
        res.json(favoritedUsers);
    }

    function createFavoritedUser(req, res) {
        var locationId = Number(req.params.locationid);
        var userId = Number(req.params.userid);
        var favoritedUsers = locationModel.findFavoritedUsers(locationId, userId);
        res.json(favoritedUsers);
    }
};