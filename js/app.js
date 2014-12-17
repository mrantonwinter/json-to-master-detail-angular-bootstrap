var app = angular.module("app", []);

app.run(function ($rootScope) {
    $rootScope.Go = false;
    $rootScope.Keys = [];
    $rootScope.Headers = [];

    $rootScope.fields = {
        Name: '',
        LowerCaseName: '',
        JSON: '',
        Description: ''
    };
    $rootScope.TemplateData = {};

    $rootScope.Show = {
        Client: false,
        WebAPI: false,
        AWS: false
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

        var operators, result;

        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }

        operators = {
            '==': function (l, r) { return l == r; },
            '===': function (l, r) { return l === r; },
            '!=': function (l, r) { return l != r; },
            '!==': function (l, r) { return l !== r; },
            '<': function (l, r) { return l < r; },
            '>': function (l, r) { return l > r; },
            '<=': function (l, r) { return l <= r; },
            '>=': function (l, r) { return l >= r; },
            'typeof': function (l, r) { return typeof l == r; }
        };

        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }

        result = operators[operator](lvalue, rvalue);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });

    Handlebars.registerHelper('escape', function (variable) {
        return variable.replace(/(['"])/g, '\\$1');
    });

});