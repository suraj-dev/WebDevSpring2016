module.exports = function(app) {

    var userModel = require('./models/user.model.js')();
    var locationModel = require('./models/location.model.js')();

    var userService = require('./services/user.service.server.js')(app, userModel);
    var locationService = require('./services/location.service.server.js')(app, locationModel);

};