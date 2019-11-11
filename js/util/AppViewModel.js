define(['knockout'], function (ko) {

    let AppViewModel={};
    vmList = ['NY-VPC-PRIS01', 'NY-VPC-PRIS02', 'NY-VPC-PRIS03', 'NY-VPC-PRIS04', 'NY-VPC-PRIS07', 'NY-VPC-PRIS08',
            'NY-VPC-PRIS09', 'NY-VPC-PRIS10', 'NY-VPC-PRIS11', 'NY-VPC-PRIS12', 'NY-VPC-PRIS13', 'NY-VPC-PRIS14',
            'NY-VPC-PRIS15', 'NY-VPC-PRIS16', 'NY-VPC-PRIS17', 'NY-VPC-PRIS18', 'NY-VPC-PRIS23', 'NY-VPC-PRIS24',
            'NY-VPC-PRIS25', 'NY-VPC-PRIS26', 'NY-VPC-PRIS27']
    
    AppViewModel.VM_LIST=ko.observableArray(vmList);
    AppViewModel.startAllVm=function(){
        alert("All VMs started");
    }
    AppViewModel.stopAllVm=function(){
        alert("All VMs stopped");
    }
    AppViewModel.startVM=function(){
        alert("STARTED VM"+this);
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
    return {
        getAppViewModel : function(){
            return AppViewModel;
        }
    };
})