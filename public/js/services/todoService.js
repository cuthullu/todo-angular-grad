(function() {
    angular.module("TodoApp").factory("todoService", TodoService);

    function TodoService($http, $rootScope){
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
            }).success(broadcastChange).error(broadcastError);
        }

        function getTodoList() {
            return $http.get("/api/todo").error(broadcastError);
        }

        function updateTodo(todo) {
            return $http.put("/api/todo/" + todo.id, todo).success(broadcastChange).error(broadcastError);
        }

        function deleteTodo(todoId) {
            return $http.delete("/api/todo/" + todoId).success(broadcastChange).error(broadcastError);
        }

        function broadcastChange(data) {
            $rootScope.$broadcast("todosChanged");
            return data;
        }

        function broadcastError(text, status) {
            $rootScope.$broadcast("errorResponse", text, status);
        }

    }

})();
