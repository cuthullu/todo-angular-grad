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
            scope.tempTitle = scope.item.title;
            scope.invalid = false;
            scope.error = "";
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

            scope.submitForm = function() {
                if(scope.tempTitle !== undefined ){
                    scope.edit = false;
                    scope.item.title = scope.tempTitle;
                    scope.onUpdate(scope.item);
                    scope.invalid = false; 
                }else{
                    scope.invalid = true;
                    scope.error = "Title is too short";
                }
                

            };
            scope.uneditTitle = function() {
                scope.edit = false;

            };
        }
    }
})();
