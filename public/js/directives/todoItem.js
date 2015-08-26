(function(){
    angular.module("TodoApp").directive("todoItem", todoItem);

    function todoItem(){
        var directive = {
            scope: {
                onDone: "=",
                onDelete: "=",
                item: "="
            },
            link: linker,
            templateUrl: "js/directives/todoItem.html"
        };
        return directive;

        function linker(scope, element) {

            scope.deleteTodo = function(){
                scope.onDelete(scope.item.id);
            };

            scope.toggleTodoComplete = function() {

                scope.onDone(scope.item);
            };
        }
    }
})();
