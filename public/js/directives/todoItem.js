(function () {
    angular.module("TodoApp").directive("todoItem", todoItem);

    function todoItem(customConfirmCancelModal) {
        var directive = {
            scope: {
                onUpdate: "=",
                onDelete: "=",
                item: "="
            },
            link: linker,
            templateUrl: "js/directives/todoItem.html"
        };
        return directive;

        function linker(scope) {

            scope.deleteTodo = function () {
                scope.onDelete(scope.item);
            };

            scope.toggleTodoComplete = function () {
                scope.item.isComplete = !scope.item.isComplete;
                scope.onUpdate(scope.item);
            };

            scope.editTitle = function (item, $event) {
                customConfirmCancelModal(item, "js/directives/editModal.html", "EditModelController", $event)
                    .then(scope.onUpdate);
            };
        }
    }
})();
