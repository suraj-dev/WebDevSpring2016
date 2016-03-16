module.exports = function(app, formModel, userModel) {
    app.get('/api/assignment/user/:userId/form', findFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = userModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = userModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        userModel.deleteFormById(formId);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        userModel.createForm(form, userId);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        userModel.updateFormById(formId, form);
    }
};