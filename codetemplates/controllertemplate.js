///////////////////////////////////////////////////////////////////////////////////////////////////
// {{name}} Controller

app.controller('{{name}}Controller', function ($scope, $rootScope, {{name}}Service, RuntimeFrameworkService, ModalService) {

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Init

    //use the service to populate our {{name}}
    $scope.Model = {{name}}Service.Model;
    {{name}}Service.Get{{name}}();

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Master detail 

    $scope.Edit = false;
    //reference to our selected row
    $scope.Selected = null;

    var Original = null;

    //called when a row is selected
    $scope.Select = function (selected) {
        if ($scope.Edit) {
            ModalService.Message("Warning!", "You cannot change your selection while editing");
            return;
        }        //clone our object in case we need to revert it
        Original = RuntimeFrameworkService.Clone(selected);

        $scope.Selected = selected;
    }


    //edit 
    $scope.Edit{{name}} = function () {
        $scope.Edit = true;
    }

    //save 
    $scope.Save{{name}} = function () {
            {{name}}Service.Upsert{{name}}($scope.Selected, $scope.Selected.{{name}}ID == -1 ? "POST" : "PUT")
        .success(function (id) {
            if (id != null && id != "")
                $scope.Selected.{{name}}ID = id;
            $scope.Edit = false;
        })
        .error(function (data, status, headers, config) {
            $rootScope.$broadcast("errorpopup", "Problem saving", data);
        });
    }

    //new 
    $scope.New{{name}} = function () {
        AddNew{{name}}Internal({{json}});
    }

    //clone to a new copy
    $scope.Copy{{name}} = function () {
        var clone = RuntimeFrameworkService.Clone($scope.Selected);
        clone.{{name}}ID = -1;
        AddNew{{name}}Internal(clone);
    }

    //internal function for adding a new item
    function AddNew{{name}}Internal(newitem) {
        {{name}}Service.Add{{name}}(newitem);
        $scope.Select(newitem);
        $scope.Edit = true;
    }


    //reset any changes
    $scope.Reset{{name}} = function () {
        RuntimeFrameworkService.LoadFrom($scope.Selected, Original);
        $scope.Edit = false;
    }


    //delete 
    $scope.Delete{{name}} = function () {
        ModalService.Confirmation("Delete {{name}}?", $scope.Selected.{{name}}ID + ": " + $scope.Selected.Description)
        .then(function () {
            Delete{{name}}Internal();
        }, function () {
            //cancel pressed
        });
    };

        function Delete{{name}}Internal() {
        //handle if we havent saved yet
            if ($scope.Selected.{{name}}ID == -1) {
                Delete{{name}}FromViewInternal()
            return;
        }

        //call the backend to persist
            {{name}}Service.Delete{{name}}($scope.Selected.{{name}}ID)
        .success(function (data) {
            Delete{{name}}FromViewInternal();
        })
        .error(function (data, status, headers, config) {
            $rootScope.$broadcast("error", status, 'url = ' + url, config)
        });
    }

    //removes the items from the view ( not the backend )
        function Delete{{name}}FromViewInternal() {
            {{name}}Service.Model.{{name}}.rows = _.without({{name}}Service.Model.{{name}}.rows, $scope.Selected);
        $scope.Select(null);
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // list pagination

    $scope.rowsPerPage = 18;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) { $scope.currentPage = pageNo; };

    //event handler for page change
    $scope.PageChanged = function () {
        $scope.Selected = null;
    };
});