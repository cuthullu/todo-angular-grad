(function() {
    angular.module("TodoApp").factory("todoService", TodoService);

    function TodoService($http, $rootScope, $interval, errorService){
        var service = {
            createTodo : createTodo,
            getTodoList: getTodoList,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            updateOrder: updateOrder
        };
        var checksum = "notAChecksum";
        var items = [];

        $interval(pollTodoList, 1000);
        pollTodoList();
        return service;

        ///////////////////////

        function createTodo(title) {
            return $http.post("/api/todo", {
                title: title
            }).success(pollTodoList).error(errorService.broadcast);
        }

        function updateOrder(newOrder){
            var updates = [];
            for(var i = 0; i < newOrder.length; i++){
                if(newOrder[i] !== items[i]){
                    updates.push({index: i, newTodo: newOrder[i]});
                }
            }

            $http.put("/api/order/",updates).error(errorService.broadcast);
        }


        function getTodoList(){
            return items;
        }

        function pollTodoList() {
            return $http.get("/api/todo?checksum=" + checksum).success(function (data, status, headers) {
                if(status === 200){
                    items = data;
                    checksum = headers("checksum");
                    broadcastChange(items);
                }
            }).error(errorService.broadcast);
        }

        function updateTodo(todo) {
            return $http.put("/api/todo" , todo).success(pollTodoList).error(errorService.broadcast);
        }

        function deleteTodo(todoId) {
            return $http.delete("/api/todo/" + todoId).success(pollTodoList).error(errorService.broadcast);
        }

        function broadcastChange(data) {
            $rootScope.$broadcast("todosChanged");
            return data;
        }

    }

})();
