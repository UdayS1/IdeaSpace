define(['knockout','ajax'], function (ko,Util) {

    let AppViewModel={};
    let AJAX=Util.getUtil();
    let baseURL='http://localhost:8090/vm/';

    vmList = ['NY-VPC-PRIS01', 'NY-VPC-PRIS02', 'NY-VPC-PRIS03', 'NY-VPC-PRIS04', 'NY-VPC-PRIS07', 'NY-VPC-PRIS08',
            'NY-VPC-PRIS09', 'NY-VPC-PRIS10', 'NY-VPC-PRIS11', 'NY-VPC-PRIS12', 'NY-VPC-PRIS13', 'NY-VPC-PRIS14',
            'NY-VPC-PRIS15', 'NY-VPC-PRIS16', 'NY-VPC-PRIS17', 'NY-VPC-PRIS18', 'NY-VPC-PRIS23', 'NY-VPC-PRIS24',
            'NY-VPC-PRIS25', 'NY-VPC-PRIS26', 'NY-VPC-PRIS27']
    
    AppViewModel.showMainButtons=ko.observable(true);
    AppViewModel.showVmList=ko.observable(true);
    AppViewModel.showHomeGrid=ko.observable(false);
    AppViewModel.VM_LIST=ko.observableArray(vmList);

    AppViewModel.startAllVm=function(){
        alert("All VMs started");
    }
    AppViewModel.stopAllVm=function(){
        alert("All VMs stopped");
    }
    AppViewModel.startVM= async function(){
        let URL='';
        URL=baseURL+'start?nodeName='+this;
        //baseURL+=('start?nodeName='+this);
       let response= await AJAX.GET(URL);
       alert("STARTED VM"+this+"response: "+response);
    }
    AppViewModel.stopVM=function(){
        alert("STOPPED VM"+this);
    }
    AppViewModel.restartVM=function(){
        alert("RESTARTED VM"+this);
    }
    AppViewModel.clearMemoryVM=function(){
        alert("CLEARED MEMORY VM"+this);
    }
    AppViewModel.showBrowserDetails=function(){
      AppViewModel.showMainButtons(false);
      AppViewModel.showVmList(false);
      AppViewModel.showHomeGrid(true);
    }
    AppViewModel.showGridOperations=function(){
        AppViewModel.showMainButtons(true);
        AppViewModel.showVmList(true);
        AppViewModel.showHomeGrid(false);
      }
      AppViewModel.showChromeVersions=function(){
          alert("Chrome versions are: ");
      }
    return {
        getAppViewModel : function(){
            return AppViewModel;
        }
    };
})