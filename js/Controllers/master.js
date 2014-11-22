app.controller("master", function ($scope, $rootScope, $sce, $compile, $http, $q) {

    $scope.MasterHTML = "";
    $scope.Controller = "";
    $scope.Service = "";
    $scope.Model = { rows: [] };
    var TemplateData = {};


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //templates.  
    //TODO use a proper templating lib

    //table head
    var tableheadstart = '<table class="table table-striped table-bordered table-condensed table-hover"><thead><tr>';
    var tdheadstart = '<td>';
    var tdheadend = '</td>';
    var tableheadend = '</tr></thead>';

    //table body
    var tablebodystart = '<tbody><tr ng-repeat="row in Model.rows">';
    var tdbodystart = '<td>{{row.';
    var tdbodyend = '}}</td>';
    var tablebodyend = '</tr></tbody></table>';

    //controller

    //service

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //

    $rootScope.$on('Process', function () {

        TemplateData = { name: $rootScope.fields.Name };
        CreateMasterHTML();
        CreateMasterPreview();
        CreateController();
        CreateService();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //

    function CreateMasterHTML() {
        //get our keys and headers
        var keys = _.pluck(_.where($rootScope.Keys, { inmaster: true }), 'key');
        var headers = _.pluck(_.where($rootScope.Keys, { inmaster: true }), 'humanised');

        //create our html
        var html = tableheadstart;
        _.each(headers, function (header) { html += tdheadstart + header + tdheadend; });
        html += tableheadend + tablebodystart;
        _.each(keys, function (key) { html += tdbodystart + key + tdbodyend; });
        html += tablebodyend;

        //format the html
        $scope.MasterHTML = vkbeautify.xml(html);
    };

    function CreateMasterPreview() {
        //add some dummy data
        $scope.Model = { rows: [] };
        for (var i = 0; i < 5; i++)
            $scope.Model.rows.push(JSON.parse($rootScope.JSON));

        //let angular know about our new html and add it to the DOM
        //TODO work out a way to not hardcode the dom element in
        $('#masterpreview').html($compile($scope.MasterHTML)($scope));
    };

    function CreateController() {
        LoadAndRender('controllertemplate.js', TemplateData)
        .then(function (data) { $scope.Controller = data; });
    };

    function CreateService() {
        LoadAndRender('servicetemplate.js', TemplateData)
        .then(function (data) { $scope.Service = data; });
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // helper functions to download and render templates

    //loads a template and renders it, uses a promise to let the caller know when it is done.
    function LoadAndRender(templatename, data) {
        var defer = $q.defer();

        $http.get('/codetemplates/' + templatename).
          success(function (template) {
              defer.resolve(RenderTemplate(template, data));
          }).
          error(function (info, status, headers, config) {
              alert(status);
              defer.resolve('');
          });

        return defer.promise;
    }

    //user handlebars to render the template and vkbeautify to format it
    function RenderTemplate(rawTemplate, data) {
        return vkbeautify.xml(Handlebars.compile(rawTemplate)(data));
    }

});