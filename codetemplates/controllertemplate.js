app.controller("{{name}}", function ($scope, $rootScope, {{name}}Service) {

    $scope.Model = {{name}}Service.Model;

    $scope.Init = function(){
        {{name}}Service.Init();
    };
});