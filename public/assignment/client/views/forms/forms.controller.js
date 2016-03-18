(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {

        var user_id = $rootScope.currentUser._id;

        var vm = this;


        FormService
            .findAllFormsForUser(user_id)
            .then(function (response) {
                console.log(response.data);
                vm.forms = response.data;
            });

        vm.addForm = addForm;

        function addForm(frm) {
            var form = {
                title: frm.title
            };
            FormService
                .createFormForUser($rootScope.currentUser._id, form)
                .then(function(response) {
                    vm.forms = response.data;
            }, function(error) {
                    console.log(error);
                });
        }

        var selectedFormId = -1;

        vm.selectForm = selectForm;

        function selectForm(index) {
            vm.title = vm.forms[index].title;
            selectedFormId = vm.forms[index]._id;
        }

        vm.updateForm = updateForm;

        function updateForm(frm) {
            var newForm = {
                title: frm.title
            };

            FormService
                .updateFormById(selectedFormId, newForm)
                .then(function(response) {
                    vm.forms = response.data;
            });
        }

        vm.deleteForm = deleteForm;

        function deleteForm(index) {
            var form_id = vm.forms[index]._id;
            console.log(form_id);
            FormService
                .deleteFormById(form_id)
                .then(function(response) {
                vm.forms.splice(index,1);
            });
        }
    }
})();
