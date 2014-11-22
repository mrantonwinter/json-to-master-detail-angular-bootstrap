app.controller("master", function ($scope, $rootScope, $compile, TemplateService) {

    $scope.HTML = "";
    $scope.Controller = "";
    $scope.Service = "";

    $scope.Model = { rows: [] };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateHTML();
        CreateController();
        CreateService();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // templates

    function CreateHTML() {
        TemplateService.LoadAndRender('mastertemplate.html', $rootScope.TemplateData)
        .then(function (data) {
            $scope.HTML = data;
            CreatePreview();
        });
    };

    //preview our master table view
    function CreatePreview() {
        //add some dummy data
        $scope.Model.rows = [];
        for (var i = 0; i < 5; i++)
            $scope.Model.rows.push(JSON.parse($rootScope.JSON));

        //let angular know about our new html and add it to the DOM
        //TODO work out a way to not hardcode the dom element in
        $('#masterpreview').html($compile($scope.HTML)($scope));
    };

    function CreateController() {
        TemplateService.LoadAndRender('controllertemplate.js', $rootScope.TemplateData)
        .then(function (data) { $scope.Controller = data; });
    };

    function CreateService() {
        TemplateService.LoadAndRender('servicetemplate.js', $rootScope.TemplateData)
        .then(function (data) { $scope.Service = data; });
    };


});