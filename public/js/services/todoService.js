(function() {
    angular.module("TodoApp").factory("todoService", TodoService);

    function TodoService($http){
        var items = [];
        var lastActionID = 0;
        var service = {
            createTodo : createTodo,
            getTodoList: getTodoList,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        };
        return service;

        ///////////////////////

        function createTodo(title) {
            return $http.post("/api/todo", {
                title: title
            });
        }

        function getTodoList() {
            return $http.get("/api/todo");
        }

        function updateTodo(todo) {
            if(items.length < 1) {
                return $http.put("/api/todo/" + todo.id, todo)
                .then(null, function(result) {
                    vm.error = "Failed to update item. Server returned " + result.status + " - " + result.data;
                });
            }else{
                //return $http.get("/api/changes")
            }
        }

        function deleteTodo(todoId) {
            return $http.delete("/api/todo/" + todoId)
            .then(null, function(result) {
                vm.error = "Failed to delte item. Server returned " + result.status + " - " + result.data;
            });
        }

    }

})();
