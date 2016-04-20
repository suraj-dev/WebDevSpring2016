module.exports = function (app, locationModel) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../../uploads' });
    app.get('/api/project/location/:id/favuser', findFavoritedUsers);
    app.post('/api/project/location/:locationid/favuser/:userid/:username', createFavoritedUser);
    app.post('/api/project/location/:locationid/comment', createComment);
    app.get('/api/project/location/:locationid/comment', findAllComments);
    app.delete('/api/project/location/:locationid/comment/:commentid', deleteComment);
    app.delete('/api/project/location/:locationId/user/:userId/delete', undoFavorite);


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

    function createComment(req ,res) {
        var locationId = req.params.locationid;
        var comment = req.body;
        var com = locationModel.createComment(locationId, comment)
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteComment(req, res) {
        var locationId = req.params.locationid;
        var commentId = req.params.commentid;
        var del = locationModel.deleteComment(locationId, commentId)
            .then(
                function(doc) {
                    res.status(200).send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllComments(req, res) {
        var locationId = req.params.locationid;
        var coms = locationModel.findAllComments(locationId)
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

        locationModel.undoFavorite(locationId, userId)
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