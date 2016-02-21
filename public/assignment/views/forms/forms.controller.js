(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService){
        $scope.addForm = function(){
            var form = {
                title: $scope.frmname
            }
            FormService.addForm($rootScope.data._id, form, function(response){
                $scope.data = response;
            });
        };

        $scope.updateForm = function(index){

        };

        $scope.deleteForm = function(index){
            FormService.deleteFormById(index, function(response){
               $scope.data=response;
            });
        };
    }
})();
