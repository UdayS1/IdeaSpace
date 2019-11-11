define(['knockout', 'Handsontable', 'hackathon', 'util', 'jquery', 'hackathonTableSettings'], function (ko, Handsontable, Hackathon, Util, $, hackathonTableSettings) {

  var hackathonViewModel = {};
  hackathonViewModel.hackathonTable = {};
  hackathonViewModel.displayGetHackathonButton = ko.observable(true);
  hackathonViewModel.HackathonList = ko.observableArray();
  hackathonViewModel.chosenHackathonId = ko.observable();
  hackathonViewModel.chosenIdeadId = ko.observable();
  hackathonViewModel.chosenIdeaData = ko.observable();
  hackathonViewModel.displayTable=function(data){
    hackathonViewModel.processAllHackathonsData(data);
    hackathonTableSettings.data = hackathonViewModel.HackathonList();
    if (jQuery.isEmptyObject(hackathonViewModel.hackathonTable)) {
      hackathonViewModel.hackathonTable = new Handsontable(document.getElementById('header'), hackathonTableSettings);
    }
    else {
      hackathonViewModel.hackathonTable.updateSettings(hackathonTableSettings);
    }
  };
  hackathonViewModel.processAllHackathonsData = function (data) {

    for (var index in data) {

      var hackathon = new Hackathon();
      hackathon.id = data[index].id;
      hackathon.eventName = data[index].eventName;
      hackathon.moOffice = data[index].moOffice;
      var date = new Date(data[index].dateConducted);
      date.toUTCString();
      hackathon.dateConducted = date;
      hackathon.ideasGenerated = data[index].ideasGenerated;
      hackathonViewModel.HackathonList.push(hackathon);
    }
  };

  hackathonViewModel.goToMainPage = function () {
    location.hash = "";
    hackathonViewModel.HackathonList.removeAll();
    hackathonViewModel.displayGetHackathonButton(true);
    $('#hackathonContainer').show();
    $('#header').hide();
    $('#ideaContainer').hide();
  };
  hackathonViewModel.goToHackathon = function (hackathonId) {
    location.hash = 'hackathons/' + hackathonId + '/ideas';
    hackathonViewModel.chosenHackathonId(hackathonId);

  };
  hackathonViewModel.goToIdea = function (ideaId) {
    location.hash = 'hackathons/ideas/' + ideaId;

  };

  hackathonViewModel.getData = async function () {
    $('#ideaContainer').hide();
    $('#hackathonContainer').show();
    $('#header').show();
    hackathonViewModel.displayGetHackathonButton(false);
    hackathonViewModel.HackathonList.removeAll();
    location.hash = 'hackathons';
    let url = 'http://localhost:9090/hackathons';
    let util = Util.getUtil();
    let data = await util.GET(url);
    hackathonViewModel.displayTable(data);

  };
  return {
    getHackathonViewModel: function () {
      return hackathonViewModel;
    }
  }

})