var mock = require("./form.mock.json");

module.exports = function () {
    var api = {
        findFormByTitle : findFormByTitle,
        findFormById : findFormById,
        findAllForms : findAllForms,
        createForm : createForm,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById
    };

    return api;

    function findFormByTitle(title) {
        for(var f in mock) {
            if (mock[f].title === title) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormById(formId) {
        for(var u in mock) {
            if (mock[u]._id === formId) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllForms() {
        return mock;
    }

    function createForm(form) {
        form._id = (new Date()).getTime();
        mock.push(form);
        return mock;
    }

    function deleteFormById(formId) {
        for(var u in mock) {
            if (mock[u]._id === formId) {
                delete mock[u];
            }
        }
    }

    function updateFormById(formId, form) {
        for (var u in mock) {
            if (mock[u]._id === formId) {
                mock[u].title = form.title;
                mock[u].fields = form.fields;
            }
        }
    }

};