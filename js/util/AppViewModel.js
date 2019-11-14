define(['knockout','ajax'], function (ko,Util) {

    let AppViewModel={};
    let AJAX=Util.getUtil();
    let baseURL='http://localhost:8090/vm/';

    vmList = [ 'NY-VPC-PRIS02', 'NY-VPC-PRIS03', 'NY-VPC-PRIS04', 'NY-VPC-PRIS07', 'NY-VPC-PRIS08',
            'NY-VPC-PRIS09', 'NY-VPC-PRIS10', 'NY-VPC-PRIS11', 'NY-VPC-PRIS12', 'NY-VPC-PRIS13', 'NY-VPC-PRIS14',
            'NY-VPC-PRIS15', 'NY-VPC-PRIS16', 'NY-VPC-PRIS17', 'NY-VPC-PRIS18', 'NY-VPC-PRIS23', 'NY-VPC-PRIS24',
            'NY-VPC-PRIS25', 'NY-VPC-PRIS26', 'NY-VPC-PRIS27']
    
    AppViewModel.showMainButtons=ko.observable(true);
    AppViewModel.showVmList=ko.observable(true);
    AppViewModel.showHomeGrid=ko.observable(false);
    AppViewModel.showActiveSymbol=ko.observable(false);
    AppViewModel.VM_LIST=ko.observableArray(vmList);
    AppViewModel.activeNodeList=ko.observableArray();
  
    AppViewModel.showActiveInstances=function(activeInstances){
        // for(var vmNode in activeInstances){
        //     let obj={
        //         nodeName:vmNode,
        //         instances:activeInstances[vmNode]
        //     }
        //     AppViewModel.activeNodeList.push(obj);
        // }
       activeInstances.forEach(function(activeInstance){
               vmList.forEach(function(vmNode){
                     if(activeInstance === vmNode){
                         AppViewModel.activeNodeList.push(activeInstance);
                     }
               });
       });
    }
    AppViewModel.startAllVm=function(){
        alert("All VMs started");
    }
    AppViewModel.stopAllVm=function(){
        alert("All VMs stopped");
    }
    AppViewModel.startVM= async function(){
        let URL='';
        URL=baseURL+'start?nodeName='+this;
       let response= await AJAX.GET(URL);
       alert("STARTED VM"+this+"response: "+response);
    }
    AppViewModel.stopVM=async function(){
        let URL='';
        URL=baseURL+'stop?nodeName='+this;
       let response= await AJAX.GET(URL);
       alert("STARTED VM"+this+"response: "+response);
    }
    AppViewModel.restartVM=async function(){
        let URL='';
        URL=baseURL+'restart?nodeName='+this;
       let response= await AJAX.GET(URL);
       alert("RESTARTED VM"+this+"response: "+response);
    }
    AppViewModel.clearMemoryVM=async function(){
        let URL='';
        URL=baseURL+'cleanMemory?nodeName='+this;
       let response= await AJAX.GET(URL);

       if(response === "STARTED"){
           AppViewModel.showActiveSymbol(true);
       }
       alert("CLEARED VM"+this+"response: "+response);
    }
    AppViewModel.showBrowserDetails=async function(){
      AppViewModel.showMainButtons(false);
      AppViewModel.showVmList(false);
      AppViewModel.showHomeGrid(true);
    //   let URL='';
    //   URL=baseURL+'start?nodeName='+this;
    //  let response= await AJAX.GET(URL);

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