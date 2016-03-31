(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController(FieldService, $routeParams) {
        var vm = this;
        var formId = $routeParams.formId;

        function init() {
            vm.addField = addField;
            vm.removeField = removeField;
            vm.edit = edit;
            FieldService
                .getFieldsForForm(formId)
                .then(function(response) {
                    console.log(response.data);
                    vm.fields = response.data;
                });
        }

        init();

        function addField(fieldType) {
            var field;
            if(fieldType === "Single Line Text") {
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }

            else if(fieldType === "Multiline Text") {
                field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }

            else if(fieldType === "Date") {
                field = {"label": "New Date Field", "type": "DATE"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }

            else if(fieldType === "Dropdown") {
                field = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }

            else if(fieldType === "Checkboxes") {
                field = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }

            else if(fieldType === "Radio buttons") {
                field = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }
        }

        function removeField(index) {
            var fieldId = vm.fields[index]._id;
            console.log("fieldId=" + fieldId + " formId=" + formId);
            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function(response) {
                    console.log(response.data);
                   vm.fields.splice(index,1);
                });
        }


        vm.sortableFields = {
            axis : 'y'
        };

        function edit(field) {
            vm.selectedField = field;
            if (field.options){
                vm.option = '';
                for(var i = 0; i< field.options.length ; i++){
                    vm.option += field.options[i].label + ":" + field.options[i].value + "\n";
                }
            }
        }


    }
})();

