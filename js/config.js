requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min',
        knockout: 'dependencies/knockout-3.5.0',
        popper: 'dependencies/popper.min',
        // bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min',
        sammy: 'dependencies/sammy',
        ajax: 'util/AjaxCalls',
        appViewModel: 'util/AppViewModel'
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        }
    }
});
requirejs(['jquery', 'knockout', 'sammy', 'ajax','appViewModel'], function ($, ko, sammy, Util,AppViewModel) {
    $(document).ready(function () {
        var app = sammy('#main', function () {
            
            let appViewModel=AppViewModel.getAppViewModel();
            let baseUrl = 'http://localhost:8090/vm/';
            let util = Util.getUtil();
            this.get('#start', async function (context) {
                baseUrl+='start';
                let displayData = await util.GET(baseUrl);
                alert(displayData);
            });

            this.get('#stop', function (context) {

            });

            $(function () {
                app.run('#');
                ko.applyBindings(appViewModel,document.getElementById('vmTableContainer'));
                ko.applyBindings(appViewModel,document.getElementById('mainButtons'));
                ko.applyBindings(appViewModel,document.getElementById('routingContainer'));
                ko.applyBindings(appViewModel,document.getElementById('homeGridContainer'));
            });
             
        })
    })

})
