var mock = require("./form.mock.json");

module.exports = function () {
    var api = {
        findFormByTitle : findFormByTitle,
        findFormById : findFormById,
        findAllForms : findAllForms,
        createForm : createForm,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findFormsByUserId : findFormsByUserId,
        findFieldsByFormId : findFieldsByFormId,
        findFieldById : findFieldById,
        deleteFieldById : deleteFieldById,
        createField : createField,
        updateFieldById : updateFieldById
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

    function createForm(form, userId) {
        form._id = (new Date()).getTime().toString();
        form.userId = userId;
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
                return mock;
            }
        }
    }

    function findFormsByUserId(userId) {
        var forms = [];
        for(var u in mock) {
            if (mock[u].userId === userId) {
                forms.push(mock[u]);
            }
        }
        return forms;
    }

    function findFieldsByFormId(formId) {
        for(var u in mock) {
            if (mock[u]._id === formId) {
                return mock[u].fields;
            }
        }
    }

    function findFieldById(fieldId, formId) {
        for(var u in mock) {
            if (mock[u]._id === formId) {
                for(var v in mock[u].fields) {
                    if (v._id === fieldId) {
                        return v;
                    }
                }
            }
        }
    }

    function deleteFieldById(fieldId, formId) {
        for(var u in mock) {
            if (mock[u]._id === formId) {
                for(var v in mock[u].fields) {
                    if (v._id === fieldId) {
                        delete v;
                    }
                }
            }
        }
    }

    function createField(field, formId) {
        for (var u in mock) {
            if (mock[u]._id === formId) {
                field._id = (new Date()).getTime();
                mock[u].fields.push(field);
            }
        }
    }

    function updateFieldById(fieldId, field, formId) {

        for (var u in mock) {
            if (mock[u]._id === formId) {
                for(var v in mock[u].fields) {
                    if (v._id === fieldId) {
                        v.label = field.label;
                        v.type = field.type;
                        v.placeholder = field.placeholder;
                    }
                }
            }
        }
    }
};