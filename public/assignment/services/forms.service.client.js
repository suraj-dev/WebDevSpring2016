(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            form["_id"] = (new Date).getTime();
            form["userId"] = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var form;
            var formsForUser = [];
            for (form in forms) {
                if (forms[form].userId === userId)
                {
                    formsForUser.push(forms[form]);
                }
            }

            callback(formsForUser);
            return formsForUser;

        }

        function deleteFormById(formId, callback) {
            var form;
            for (form in forms) {
                if (forms[form]._id === formId)
                {
                    delete forms[form];
                    callback(forms);
                }
            }
        }

        function updateFormById(formId, newForm, callback) {
            var form;
            for (form in forms) {
                if (forms[form]._id === formId) {
                    forms[form].title = newForm.title;
                    callback(forms[form]);
                }
            }
        }
    }
})();
