var q = require("q");

module.exports = function (db, mongoose, formModel) {

    var FieldSchema = require('./field.schema.server.js')(mongoose);

    var FormModel = formModel.getMongooseModel();

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateFieldById: updateFieldById
    };

    return api;

    function findFieldsByFormId(formId) {
        return FormModel.findById(formId).select("fields");
    }

    function findFieldById(fieldId, formId) {
        return FormModel
            .findById(formId)
            .then(
                function (form) {
                    return form.fields._id(fieldId);
                }
            );
    }

    function deleteFieldById(fieldId, formId) {
        return FormModel.update(
            {_id: formId},
            {$pull: {'fields': {_id: fieldId}}}
        );
    }

    function createField(field, formId) {
        return FormModel.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateFieldById(fieldId, field, formId) {

        if(!field.placeholder) {
            return FormModel.update(
                {_id: formId, "fields._id": fieldId},
                {$set: {"fields.$.label": field.label}}
            );
        }

        else {
            return FormModel.update(
                {_id: formId, "fields._id": fieldId},
                {$set: {"fields.$.label": field.label, "fields.$.placeholder" : field.placeholder}}
            );
        }
    }
};
