///////////////////////////////////////////////////////////////////////////////////////////////////
// {{name}} Service.  


app.factory('{{name}}Service', ['$rootScope', 'RestService', function ($rootScope, RestService) {

    var service = {

        Model: {
            //{{name}}
            {{name}}: { rows: [], loading: false, count: 0 },
        },


        ///////////////////////////////////////////////////////////////////////////////////////////
        // {{name}}

        Get{{name}}: function (refresh) {
            if (service.Model.{{name}}.count == 0 || refresh == true)
                RestService.GetAndPopulate('/MarketingAdminRestAPI/api/{{name}}', service.Model.{{name}});
        },

        Add{{name}}: function ({{name}}) {
            service.Model.{{name}}.rows.unshift({{name}});//add to the start of the list
        },

        Update{{name}}: function ({{name}}) {
            RestService.Update('/MarketingAdminRestAPI/api/{{name}}', {{name}});
        },

        Insert{{name}}: function ({{name}}) {
            RestService.Insert('/MarketingAdminRestAPI/api/{{name}}', {{name}});
        },

        Upsert{{name}}: function ({{name}}, verb) {
            return RestService.Upsert('/MarketingAdminRestAPI/api/{{name}}', {{name}}, verb);
        },

        Delete{{name}}: function (id) {
            return RestService.Delete('/MarketingAdminRestAPI/api/{{name}}/' + id);
        },
    }

    return service;
}]);