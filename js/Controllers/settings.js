﻿app.controller("settings", function ($scope, $rootScope) {

    $scope.Keys = [];

    $rootScope.$on('Go', function () {
        var keys = _.keys(JSON.parse($rootScope.JSON));

        _.each(keys, function (key) {
            var type =CalcType(key);
            var humanised = CalcName(key,type);
            var row = { key: key, humanised:humanised, type: type, master: true };
            $scope.Keys.push(row);
        });
    });


    $scope.TypeOptions = ["label", "input", "email", "textarea", "checkbox", "select", "datepicker"];

    function CalcType(key) {
        key = key.toLowerCase();
        if (_.str.include(key, "date") || key == "dob")
            return "datepicker";

        if (key == "id")
            return "label";

        if (_.str.include(key, "id"))
            return "select";

        if (key == "true" || key == "false")
            return "checkbox";

        if (key == "email")
            return "email";


        return "input";
    };

    function CalcName(key, type) {

        //return _(key).humanize();
        return key;
        
    };
});