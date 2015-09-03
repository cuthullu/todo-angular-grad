(function () {
    angular.module("TodoApp").factory("methodToAction", methodToAction);

    function methodToAction() {
        var service = {
            convert: convert
        };
        return service;

        //////////////////
        function convert(method){
            switch (method.toUpperCase()){
                case "POST": return "create";
                case "GET": return "read";
                case "PUT": return "update";
                case "DELETE": return "delete";
            }
        }
    }
})();