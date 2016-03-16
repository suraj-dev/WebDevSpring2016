module.exports = function(app) {

    var userModel = require('./models/user.model.js')();
    var formModel = require('./models/form.model.js')();

    var userService = require('./services/user.service.client.js')(app, formModel, userModel);
    var formService = require('./services/forms.service.client.js')(app, formModel, userModel);
    var fieldService = require('./services/field.service.server.js')(app, formModel, userModel);
};