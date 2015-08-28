(function() {
    angular.module("TodoApp").controller("TodoController", TodoController);

    function TodoController( $http, $rootScope, $scope, todoService) {
        var vm = this;
        var deregisters = [];
        $http.defaults.transformRequest.push(function(config) {
            vm.loading = true;
            return config;
        });
        $http.defaults.transformResponse.push(function(response) {
            vm.loading = false;
            return response;
        });

        deregisters.push($rootScope.$on("todosChanged", reloadTodoList));
        deregisters.push($rootScope.$on("errorResponse", handleError));
        $scope.$on("$destroy", destroyThis);

        vm.loading = false;
        vm.items = [];

        vm.submitForm = function() {
            todoService.createTodo(vm.newTodo);
            vm.newTodo = "";
        };

        vm.toggleTodoComplete = function(todo) {
            todo.isComplete = !todo.isComplete;
            todoService.updateTodo(todo);
        };

        vm.todoDeleted = function(todoId) {
            todoService.deleteTodo(todoId);
        };

        function reloadTodoList() {
            todoService.getTodoList().success(function(data) {
                vm.items = data;
            });
        }

        function handleError(event, text, status){
            vm.error = "Failed to do action. Server returned " + status + " - " + text;
        }

        function destroyThis(){
            deregisters.forEach(function(eventDereg) { eventDereg();});
        }

        reloadTodoList();
    }
})();
