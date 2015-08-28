(function(){
    angular.module("TodoApp").directive("todoItem", todoItem);

    function todoItem(){
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

        function linker(scope, element) {
            scope.edit = false;
            scope.deleteTodo = function(){
                scope.onDelete(scope.item.id);
            };

            scope.toggleTodoComplete = function() {

                scope.onUpdate(scope.item);
            };

            scope.editTitle = function() {
                scope.edit = true;
            }

            scope.submitForm = function() {
                scope.edit = false;
                scope.onUpdate(scope.item);

            }
        }
    }
})();
