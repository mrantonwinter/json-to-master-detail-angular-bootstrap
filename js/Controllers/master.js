app.controller("master", function ($scope, $rootScope, $compile, TemplateService) {

    $scope.HTML = "";
    $scope.Controller = "";
    $scope.Service = "";
    $scope.LayoutHTML = "";

    $scope.Model = { rows: [] };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateHTML();
        CreateLayoutHTML();
        CreateController();
        CreateService();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // templates

    function CreateHTML() {
        TemplateService.LoadAndRender('mastertemplate.html', $rootScope.TemplateData, true)
        .then(function (data) {
            $scope.HTML = data;
            CreatePreview();
        });
    };

    function CreateLayoutHTML() {
        TemplateService.LoadAndRender('layouttemplate.html', $rootScope.TemplateData, true)
        .then(function (data) { $scope.LayoutHTML = data; });
    }

    //preview our master table view
    function CreatePreview() {
        //add some dummy data
        
        $scope.Model[$rootScope.fields.Name] = { rows: [] };
        for (var i = 0; i < 5; i++)
            $scope.Model[$rootScope.fields.Name].rows.push(JSON.parse($rootScope.fields.JSON));

        //let angular know about our new html and add it to the DOM
        //TODO work out a way to not hardcode the dom element in
        $('#masterpreview').html($compile($scope.HTML)($scope));
    };

    function CreateController() {
        TemplateService.LoadAndRender('controllertemplate.js', $rootScope.TemplateData, true)
        .then(function (data) { $scope.Controller = data; });
    };

    function CreateService() {
        TemplateService.LoadAndRender('servicetemplate.js', $rootScope.TemplateData, true)
        .then(function (data) { $scope.Service = data; });
    };


});