requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min',
        knockout: 'dependencies/knockout-3.5.0',
        popper: 'dependencies/popper.min',
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
                let URL=baseUrl+'start';
                let displayData = await util.GET(URL);
                alert(displayData);
            });

            this.get('#stop', function (context) {

            });
            this.get('#nodeGrid',async function(context){
                let util=Util.getUtil();
                let URL=baseUrl+'instanceData';
                let activeInstances= await util.GET(URL);
                  appViewModel.showActiveInstances(activeInstances);
            });

            $(function () {
                app.run('#nodeGrid');
                ko.applyBindings(appViewModel,document.getElementById('vmTableContainer'));
                ko.applyBindings(appViewModel,document.getElementById('mainButtons'));
                ko.applyBindings(appViewModel,document.getElementById('routingContainer'));
                ko.applyBindings(appViewModel,document.getElementById('homeGridContainer'));
            });
             
        })
    })

})
