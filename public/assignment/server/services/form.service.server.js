module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', findFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormsForUser(req, res) {
        var userId = Number(req.params.userId);
        var forms = formModel.findFormsByUserId(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.send(200);
    }

    function createForm(req, res) {
        var userId = Number(req.params.userId);
        var form = req.body;
        var forms = formModel.createForm(form, userId);
        res.json(forms);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var forms = formModel.updateFormById(formId, form);
        res.json(forms);
    }
};