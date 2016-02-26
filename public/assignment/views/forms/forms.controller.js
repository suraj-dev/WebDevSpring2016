(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService){

        var user_id = $rootScope.currentUser._id;

        $scope.forms = FormService.findAllFormsForUser(user_id, function(response){
            console.log(response);
        });

        $scope.addForm = function(){
            var form = {
                title: $scope.frmname
            }
            FormService.createFormForUser($rootScope.data._id, form, function(response){
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(data){
                  $scope.forms = data;
                });
            });
        };

        var selectedFormId = -1;

        $scope.selectForm = function(index){
            $scope.frmname = $scope.forms[index].title;
            selectedFormId = $scope.forms[index]._id;
        };

        $scope.updateForm = function(index){
            var newForm = {
                title: $scope.frmname
            };

            FormService.updateFormById(selectedFormId, newForm, function(response){
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(data){
                    $scope.forms = data;
                });
            });
        };

        $scope.deleteForm = function(index){
            var form_id = $scope.forms[index]._id;
            FormService.deleteFormById(form_id, function(response){
                FormService.findAllFormsForUser($rootScope.currentUser._id, function(data){
                    $scope.forms = data;
                });
            });
        };
    }
})();
