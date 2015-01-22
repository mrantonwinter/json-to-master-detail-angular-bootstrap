

app.controller("powershell", function ($scope, $rootScope, TemplateService) {

    $scope.BuildTemplate = "";
    $scope.BuildTasksTemplate = "";


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateBuildTemplate();
        CreateBuildTasksTemplate();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // templates

    function CreateBuildTemplate() {
        TemplateService.LoadAndRender('powershellbuild.html', $rootScope.TemplateData, true)
        .then(function (data) {
            $scope.BuildTemplate = data;
        });
    };

    function CreateBuildTasksTemplate() {
        TemplateService.LoadAndRender('powershellbuildtasks.html', $rootScope.TemplateData, true)
        .then(function (data) {
            $scope.BuildTasksTemplate = data;
        });
    };

});