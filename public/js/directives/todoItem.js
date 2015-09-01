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
                scope.item.isComplete = !scope.item.isComplete;
                scope.onUpdate(scope.item);
            };

            scope.editTitle = function() {
                scope.edit = true;

                setTimeout(function(){
                    scope.$apply(function(){
                        element.find("#titleInput")[0].focus();
                    });
                }, 0);
            };

            scope.submitForm = function(e) {
                scope.edit = false;
                scope.item.title = e.tempTitle;
                scope.onUpdate(scope.item);

            };
            scope.uneditTitle = function() {
                scope.edit = false;

            };
        }
    }
})();
