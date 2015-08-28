(function() {
    angular.module("TodoApp").factory("todoService", TodoService);

    function TodoService($http){
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
            return $http.put("/api/todo/" + todo.id, todo);
        }

        function deleteTodo(todoId) {
            return $http.delete("/api/todo/" + todoId);
        }

    }

})();
