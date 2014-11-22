app.controller("settings", function ($scope, $rootScope) {


    $rootScope.$on('Go', function () {
        $rootScope.Keys = [];

        var keys = _.keys(JSON.parse($rootScope.JSON));

        _.each(keys, function (key) {
            var type = CalcType(key);
            var humanised = CalcName(key, type);
            var row = { key: key, humanised: humanised, type: type, inmaster: true };
            $rootScope.Keys.push(row);
        });


        $scope.Process();
    });

    function SetupTemplateData() {
        //get the list of columns for our master table 
        var columns = _.where($rootScope.Keys, { inmaster: true });

        //setup our data
        $rootScope.TemplateData = {
            name: $rootScope.fields.Name,
            keys: _.pluck(columns, 'key'),
            headers: _.pluck(columns, 'humanised'),
            elements: columns
        };
    }

    $scope.Process = function () {
        SetupTemplateData();

        $rootScope.$broadcast('Process');
    };

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
