(function() {
    angular.module("TodoApp").controller("TodoController", TodoController);

    function TodoController( $http, todoService) {
        var vm = this;
        $http.defaults.transformRequest.push(function(config) {
            vm.loading = true;
            return config;
        });
        $http.defaults.transformResponse.push(function(response) {
            vm.loading = false;
            return response;
        });

        vm.loading = false;
        vm.items = [];

        vm.submitForm = function() {
            todoService.createTodo(vm.newTodo).success(reloadTodoList).error(handleError);
            vm.newTodo = "";
        };

        vm.toggleTodoComplete = function(todo) {
            todo.isComplete = !todo.isComplete;
            todoService.updateTodo(todo).success(reloadTodoList).error(handleError);
        };

        vm.todoDeleted = function(todoId) {
            todoService.deleteTodo(todoId).success(reloadTodoList).error(handleError);
        };

        function reloadTodoList() {
            todoService.getTodoList().success(function(data) {
                vm.items = data;
            })
            .error(handleError);
        }

        function handleError(text, status){
            vm.error = "Failed to do action. Server returned " + status + " - " + text;
        }

        setInterval(reloadTodoList, 1000)

        reloadTodoList();
    }
})();
