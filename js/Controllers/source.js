app.controller("source", function ($scope, $rootScope) {
    $rootScope.fields.JSON = '{"id":1,"name":"john smith","email":"john@gmail.com", "dob":"5/11/1968","groupID":10, "cool":true}';//example json

    $scope.Go = function ($event) {
        $event.preventDefault();
        $rootScope.fields.JSON = JSON.stringify(JSON.parse($rootScope.fields.JSON), null, 4);//4 is the number of spaces to indent by
        $rootScope.Go = true;
        $rootScope.$broadcast('Go');
    }
});