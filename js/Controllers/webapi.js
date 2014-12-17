app.controller("webapi", function ($scope, $rootScope, $compile, TemplateService) {

    $scope.IRepository = "";
    $scope.Repository = "";
    $scope.CSService = "";


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateIRepository();
        CreateRepository();
        CreateService();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // templates


    function CreateIRepository() {
        TemplateService.LoadAndRender('irepositorytemplate.html', $rootScope.TemplateData, false)
        .then(function (data) { $scope.IRepository = data; });
    }

    function CreateRepository() {
        TemplateService.LoadAndRender('repositorytemplate.html', $rootScope.TemplateData, false)
        .then(function (data) { $scope.Repository = data; });
    }

    function CreateService() {
        TemplateService.LoadAndRender('cs_servicetemplate.html', $rootScope.TemplateData, false)
        .then(function (data) { $scope.CSService = data; });
    }

});