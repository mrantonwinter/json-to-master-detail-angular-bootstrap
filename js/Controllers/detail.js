app.controller("detail", function ($scope, $rootScope, $compile,TemplateService) {
    $scope.HTML = "";

    $scope.Selected = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Process', function () {
        CreateHTML();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////

    function CreateHTML() {
        TemplateService.LoadAndRender('detailtemplate.html', $rootScope.TemplateData, true)
        .then(function (data) {
            $scope.HTML = data;
            CreatePreview();
        });
    };

    function CreatePreview() {
        //add some dummy data
        $scope.Selected = JSON.parse($rootScope.fields.JSON);

        //let angular know about our new html and add it to the DOM
        //TODO work out a way to not hardcode the dom element in
        $('#detailpreview').html($compile($scope.HTML)($scope));
    };




});