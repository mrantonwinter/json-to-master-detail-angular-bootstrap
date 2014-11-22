var app = angular.module("app", []);

app.run(function ($rootScope) {
    $rootScope.Go = false;
    $rootScope.Keys = [];
    $rootScope.Headers = [];

    $rootScope.fields = { Name: '' };
    $rootScope.TemplateData = {};


    ///////////////////////////////////////////////////////////////////////////////////////////////


});