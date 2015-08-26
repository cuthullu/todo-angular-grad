(function() {
    angular.module("TodoApp").factory("todoService", TodoService);

    function TodoService($http){
        var service = {
            createTodo : createTodo,
            getTodoList: getTodoList,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        };
        return servic;

        ///////////////////////

        function createTodo(title) {
            return $http.post("/api/todo", {
                title: title
            }).then(null, function(result) {
                vm.error = "Failed to create item. Server returned " + result.status + " - " + result.data;
            });
        }

        function getTodoList() {
            return $http.get("/api/todo").then(function(result) {
                return result.data;
            });
        }

        function updateTodo(todo) {
            return $http.put("/api/todo/" + todo.id, todo)
            .then(null, function(result) {
                vm.error = "Failed to update item. Server returned " + result.status + " - " + result.data;
            });
        }

        function deleteTodo(todoId) {
            return $http.delete("/api/todo/" + todoId)
            .then(null, function(result) {
                vm.error = "Failed to delte item. Server returned " + result.status + " - " + result.data;
            });
        }

    }

})();
