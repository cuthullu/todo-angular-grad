(function(){
    angular.module("TodoApp").controller("EditModelController", EditModelController);
    function EditModelController($scope, $mdDialog, item) {
        $scope.tempTitle = item.title;
        $scope.cancelDialog = function() {
            $mdDialog.cancel();
        };
        $scope.confirmDialog = function() {
            item.title = $scope.tempTitle;
            $mdDialog.hide(item);
        };
    }
})();