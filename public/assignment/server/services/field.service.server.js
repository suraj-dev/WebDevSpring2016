module.exports = function(app, formModel, userModel) {
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldById);


    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(fieldId, formId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldById(fieldId, formId);
        res.json(fields);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = formModel.createField(field, formId);
        res.json(fields);
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateFieldById(fieldId, field, formId);
    }
};