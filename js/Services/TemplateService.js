app.factory('TemplateService', ['$http', '$q', function ($http, $q) {

    var service = {
        //loads a template and renders it, uses a promise to let the caller know when it is done.
        LoadAndRender: function (templatename, data) {
            var defer = $q.defer();

            $http.get('codetemplates/' + templatename).
              success(function (template) {
                  defer.resolve(service.RenderTemplate(template, data));
              }).
              error(function (info, status, headers, config) {
                  alert(status);
                  defer.resolve('');
              });

            return defer.promise;
        },

        //user handlebars to render the template and vkbeautify to format it
        RenderTemplate: function (rawTemplate, data) {
            return vkbeautify.xml(Handlebars.compile(rawTemplate)(data));
        }
    }

    return service;
}]);
