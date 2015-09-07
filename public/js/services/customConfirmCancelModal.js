(function () {
    angular.module("TodoApp").factory("customConfirmCancelModal", customConfirmCancelModal);

    function customConfirmCancelModal($mdDialog) {
        return function (item, templateUrl, controller, $event) {
            return $mdDialog.show({
                targetEvent: $event,
                templateUrl: templateUrl,
                controller: controller,
                locals: {item: item},
                blindToCOntroller: true,
                clickOutsideToClose: true,
                escapeToClose: true,
                hasBackdrop: true
            });
        };
    }
})();
