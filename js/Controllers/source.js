app.controller("source", function ($scope, $rootScope) {
    $scope.Name = '';
    $rootScope.JSON = '{"id":1,"name":"john smith","email":"john@gmail.com", "dob":"5/11/1968","groupID":10}';

    $scope.Go = function ($event) {
        $event.preventDefault();
        $rootScope.JSON = JSON.stringify(JSON.parse($rootScope.JSON), null, 4);
        $rootScope.$broadcast('Go');
    }
});