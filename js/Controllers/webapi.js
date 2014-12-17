app.controller("webapi", function ($scope, $rootScope, $compile, TemplateService) {

    $scope.IRepository = "";
    $scope.Repository = "";


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateIRepository();
        CreateRepository();
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
});