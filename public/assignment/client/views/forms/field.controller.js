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
            vm.update = updateField;

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

            else if(fieldType === "Email") {
                field = {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Field"};
                FieldService
                    .createFieldForForm(formId, field)
                    .then(function(response) {
                        var fields = response.data["fields"];
                        vm.fields.push(fields[fields.length - 1]);
                    });
            }

            else if(fieldType === "Password") {
                field = {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Field"};
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

            if(vm.isPlaceholder) {
                delete vm.isPlaceholder;
            }

            if(vm.isOptions) {
                delete vm.isOptions;
            }

            var editField;

            if(!field.placeholder) {

                if(!field.options) {
                    editField = {
                        _id: field._id,
                        label: field.label
                    };
                }
                else {
                    editField = {
                        _id: field._id,
                        label: field.label,
                        options : field.options
                    };
                }
            }
            else {

                vm.isPlaceholder = true;
                editField = {
                    _id : field._id,
                    label: field.label,
                    placeholder: field.placeholder
                };
            }

            vm.selectedField = editField;

            if (field.options.length !== 0) {
                vm.isOptions = true;
                vm.option = '';
                for(var i = 0; i< field.options.length ; i++){
                    vm.option += field.options[i].label + ":" + field.options[i].value + "\n";
                }
            }
        }

        function updateField(field) {
            if(!field.placeholder) {

                    if(!field.options) {
                        updatedField = {
                            label: field.label
                        };
                    }

                    else {
                        var updatedField;
                        var opts = vm.options;
                        var op = [];
                        var fieldOpts = opts.split("\n");
                        for(var i in fieldOpts) {
                            var lv = fieldOpts[i].split(":");
                            op.push({
                               label : lv[0],
                               value : lv[1]
                            });
                        }
                        updatedField = {
                            label: field.label,
                            options : op
                        };
                    }
            }
            else {
                updatedField = {
                    label: field.label,
                    placeholder: field.placeholder
                };
            }

            FieldService
                .updateField(formId, field._id, updatedField)
                .then(function(response) {

                    console.log(response.data);
                    var id = field._id;

                    for(var i = 0 ; i < vm.fields.length ; i++)
                    {
                        if(id == vm.fields[i]._id) {
                            vm.fields[i].label = field.label;

                            if (vm.fields[i].options) {
                                vm.fields[i].options = updatedField.options;
                            }
                            if (vm.fields[i].placeholder) {
                                vm.fields[i].placeholder = field.placeholder;
                            }
                        }
                    }
                });
        }
    }
})();

