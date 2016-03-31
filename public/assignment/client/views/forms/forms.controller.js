(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService, $location) {
        var vm = this;

        function init() {

            var user_id = $rootScope.currentUser._id;
            vm.selectedFormId = -1;

            vm.addForm = addForm;
            vm.selectForm = selectForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;

            FormService
                .findAllFormsForUser(user_id)
                .then(function (response) {
                    vm.forms = response.data;
                });
        }

        init();

        function addForm(frm) {
            var form = {
                title: frm.title
            };
            FormService
                .createFormForUser($rootScope.currentUser._id, form)
                .then(function(response) {
                    vm.forms.push(response.data);
            }, function(error) {
                    console.log(error);
                });
        }



        function selectForm(index) {

            vm.title = vm.forms[index].title;
            vm.selectedFormId = vm.forms[index]._id;
        }


        function updateForm(frm) {
            var newForm = {
                title: frm.title,
                updated: Date.now()
            };

            FormService
                .updateFormById(vm.selectedFormId, newForm)
                .then(function(response) {
                    var id = vm.selectedFormId;

                    for(var i = 0 ; i < vm.forms.length ; i++)
                    {
                        if(id == vm.forms[i]._id)
                        {
                            vm.forms[i].title = frm.title;
                        }
                    }

            });
        }

        function deleteForm(index) {
            var form_id = vm.forms[index]._id;
            FormService
                .deleteFormById(form_id)
                .then(function(response) {
                vm.forms.splice(index,1);
            });
        }
    }
})();
