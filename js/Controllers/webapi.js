﻿app.controller("webapi", function ($scope, $rootScope, $compile, TemplateService) {

    $scope.IRepository = "";
    $scope.Repository = "";
    $scope.CSIService = "";
    $scope.CSService = "";
    $scope.CSController = "";


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateIRepository();
        CreateRepository();
        CreateIService();
        CreateService();
        CreateController();
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

    function CreateIService() {
        TemplateService.LoadAndRender('cs_iservicetemplate.html', $rootScope.TemplateData, false)
        .then(function (data) { $scope.CSIService = data; });
    }
    function CreateService() {
        TemplateService.LoadAndRender('cs_servicetemplate.html', $rootScope.TemplateData, false)
        .then(function (data) { $scope.CSService = data; });
    }

    function CreateController() {
        TemplateService.LoadAndRender('cs_controllertemplate.html', $rootScope.TemplateData, false)
        .then(function (data) { $scope.CSController = data; });
    }

});