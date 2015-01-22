

app.controller("aws", function ($scope, $rootScope, TemplateService) {

    $scope.CloudFormationTemplate = "";
    $scope.CreateAMITemplate = "";


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateCloudFormationTemplate();
        CreateCreateAMI();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // templates

    function CreateCloudFormationTemplate() {
        TemplateService.LoadAndRender('cloudformationtemplate.html', $rootScope.TemplateData, true)
        .then(function (data) {
            $scope.CloudFormationTemplate = data;
        });
    };

    function CreateCreateAMI() {
        TemplateService.LoadAndRender('createamitemplate.html', $rootScope.TemplateData, true)
        .then(function (data) {
            $scope.CreateAMITemplate = data;
        });
    };

});