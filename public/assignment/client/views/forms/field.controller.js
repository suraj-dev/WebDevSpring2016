(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController(FieldService, $routeParams, $uibModal) {
        var vm = this;
        var formId = $routeParams.formId;

        FieldService
            .getFieldsForForm(formId)
            .then(function(response) {
                console.log(response.data);
               vm.fields = response.data;
            });

        vm.addField = addField;

        function addField(fieldType) {
            var field;
            if(fieldType === "Single Line Text") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        vm.fields.push(response.data[response.data.length - 1]);
                    });
            }

            else if(fieldType === "Multiline Text") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        vm.fields.push(response.data[response.data.length - 1]);
                    });
            }

            else if(fieldType === "Date") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        vm.fields.push(response.data[response.data.length - 1]);
                    });
            }

            else if(fieldType === "Dropdown") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        vm.fields.push(response.data[response.data.length - 1]);
                    });
            }

            else if(fieldType === "Checkboxes") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        vm.fields.push(response.data[response.data.length - 1]);
                    });
            }

            else if(fieldType === "Radio buttons") {
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        vm.fields.push(response.data[response.data.length - 1]);
                    });
            }
        }

        vm.removeField = removeField;

        function removeField(index) {
            var fieldId = vm.fields[index]._id;
            console.log(fieldId);
            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function(response) {
                   vm.fields.splice(index,1);
                });
        }

        vm.textPop = textPop;

        function textPop() {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl'
            });
        }

        angular.module('FormBuilderApp')
            .controller('ModalInstanceCtrl', function ($uibModalInstance) {

            vm.ok = function () {
                $uibModalInstance.close();
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
    }
})();