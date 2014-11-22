app.factory('{{name}}Service', ['RestService', function (RestService) {

    var service = {

        Model: {
                    {{name}}s: { rows: [], loading : false, count : 0 }
                },

        Init: function () {
            RestService.GetAndPopulate(service.Model.{{name}}s);
        }
    }

    return service;
}]);
