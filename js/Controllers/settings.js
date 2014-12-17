app.controller("settings", function ($scope, $rootScope) {


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // main entry point

    $rootScope.$on('Go', function () {
        $rootScope.Keys = [];

        //create a list of all the data elements, their types and if to show them or not in the master table
        var keys = _.keys(JSON.parse($rootScope.fields.JSON));
        var element = JSON.parse($rootScope.fields.JSON);

        _.each(keys, function (key) {
            var type = CalcType(key, element[key]);
            var humanised = CalcName(key, type);
            var row = { key: key, humanised: humanised, type: type, inmaster: true };
            $rootScope.Keys.push(row);
        });

        $scope.Process();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // get data ready and let everyone know to run
    $scope.Process = function () {
        SetupTemplateData();

        $rootScope.$broadcast('Process');
    };

    function SetupTemplateData() {

        //get the list of columns for our master table 
        var columns = _.where($rootScope.Keys, { inmaster: true });

        //setup our data
        $rootScope.TemplateData = {
            name: $rootScope.fields.Name,
            lowercasename: $rootScope.fields.Name.toLowerCase(),
            description: $rootScope.fields.Description,
            keys: _.pluck(columns, 'key'),
            headers: _.pluck(columns, 'humanised'),
            elements: columns,
            allElements: $rootScope.Keys,
            json: $rootScope.fields.JSON
        };
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    // helper functions

    $scope.TypeOptions = ["label", "input", "email", "textarea", "checkbox", "select", "datepicker"];

    // try to infer what type of data we have
    function CalcType(key, value) {
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

        if (value === true || value === false)
            return "checkbox";

        return "input";
    };

    //calculate a human friendly name
    function CalcName(key, type) {

        //return _(key).humanize();
        return key;

    };
});
