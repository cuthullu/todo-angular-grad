(function () {
    angular.module("TodoApp").factory("customYesNoModal", customYesNoModal);

    function customYesNoModal($mdDialog) {
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
