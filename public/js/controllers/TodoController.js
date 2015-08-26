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
            todoService.createTodo(vm.newTodo).then(reloadTodoList);
            vm.newTodo = "";
        };

        vm.toggleTodoComplete = function(todo) {
            todo.isComplete = !todo.isComplete;
            todoService.updateTodo(todo).then(reloadTodoList);
        };

        vm.todoDeleted = function(todoId) {
            todoService.deleteTodo(todoId).then(reloadTodoList);
        };

        function reloadTodoList() {
            todoService.getTodoList().then(function(items) {
                vm.items = items;
                console.log(items);
            }, function(result) {
                vm.error = "Failed to get list. Server returned " + result.status + " - " + result.data;
            });
        }

        reloadTodoList();
    }
})();
