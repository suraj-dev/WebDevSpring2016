(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        var user_id = $rootScope.currentUser._id;

        $scope.forms = FormService.findAllFormsForUser(user_id, function(response) {
            console.log(response);
        });

        $scope.addForm = addForm;

        function addForm() {
            var form = {
                title: $scope.frmname
            };
            FormService.createFormForUser($rootScope.data._id, form, function(response) {
                $scope.forms.push(response);
            });
        }

        var selectedFormId = -1;

        $scope.selectForm = selectForm;

        function selectForm(index) {
            $scope.frmname = $scope.forms[index].title;
            selectedFormId = $scope.forms[index]._id;
        }

        $scope.updateForm = updateForm;

        function updateForm(index) {
            var newForm = {
                title: $scope.frmname
            };

            FormService.updateFormById(selectedFormId, newForm, function(response) {

            });
        }

        $scope.deleteForm = deleteForm;

        function deleteForm(index) {
            var form_id = $scope.forms[index]._id;
            FormService.deleteFormById(form_id, function(response) {
                $scope.forms.splice(index,1);
            });
        }
    }
})();
