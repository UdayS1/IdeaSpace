define(['jquery', 'knockout', 'Handsontable', 'idea', 'ideaTableSettings', 'util', 'resetValidationEffects', 'validator', 'bootstrap'], function ($, ko, Handsontable, Idea, ideaTableSettings, Util, resetValidationEffects, FormValidator) {

  var baseURL = 'http://localhost:9090/hackathons';
  var util = Util.getUtil();
  var viewModel = {};
  viewModel.ideaTable = {};
  viewModel.displayAddIdeaButton = ko.observable(false);
  viewModel.editedIdealikes = 0;
  viewModel.IdeasList = ko.observableArray();
  viewModel.chosenHackathonId = ko.observable();
  viewModel.chosenIdeadId = ko.observable();
  viewModel.loadModal = function () {
    resetValidationEffects();
    $('#newIdeaModel').modal('show');
  };
  viewModel.showToast = async function (msg) {
    var x = document.getElementById("toast");
    x.innerText = msg;
    x.className = "show";
    let displayToast = new Promise(resolve => {
      setTimeout(function () {
        x.className = x.className.replace("show", "");
        resolve();
      }, 3000);
    });
    await displayToast;
  };
  viewModel.displayUpdatedTable = async function (displayData) {
    viewModel.processIdeasData(displayData);
    ideaTableSettings.data = viewModel.IdeasList();
    let updateTable = new Promise(resolve => {
      if (jQuery.isEmptyObject(viewModel.ideaTable)) {
        viewModel.ideaTable = new Handsontable(document.getElementById('ideas'), ideaTableSettings);
      }
      else {
        viewModel.ideaTable.updateSettings(ideaTableSettings);
        viewModel.ideaTable.render();
      }
      resolve();
    });
    await updateTable;
    viewModel.displayAddIdeaButton(true);
  };
  viewModel.processIdeasData = function (data) {
    viewModel.IdeasList.removeAll();
    for (var index in data) {
      var idea = new Idea();
      idea.id = data[index].id;
      idea.ideaSummary = data[index].ideaSummary;
      idea.ideaDetails = data[index].ideaDetails;
      idea.category = data[index].category;
      idea.teamMembers = data[index].teamMembers;
      idea.likes = data[index].likes;
      viewModel.IdeasList.push(idea);
    }
  };
  viewModel.sendIdeaToServer = function () {
    FormValidator();
  };
  viewModel.likeIdea = function (idea) {
    delete idea.likeButton;
    let modifiedData = ko.toJSON(idea);
    let url = baseURL + '/ideas/' + viewModel.chosenIdeadId();
    let msg = "Idea ID: " + idea.id() + " \"" + idea.ideaSummary() + "\" has been liked!";

    let sendUpdatedDataTask = util.PUT(url, modifiedData);
    sendUpdatedDataTask.then(() => {
      let getUrl = baseURL + "/" + viewModel.chosenHackathonId() + '/ideas';
      let getDataTask = util.GET(getUrl);
      getDataTask.then((displayData) => {
        viewModel.displayUpdatedTable(displayData.ideas);
        viewModel.showToast(msg);
      })
    })
  };

  viewModel.sendIdea = function (idea) {
    let url = baseURL + "/" + viewModel.chosenHackathonId() + '/ideas';
    delete idea.likeButton;
    let sendDataTask = util.POST(url, idea);
    sendDataTask.then(() => {
      $('#submitButton').html('Save');
      $('#newIdeaModal').modal('hide');
    })
      .then(() => {
        let getDataTask = util.GET(url);
        getDataTask.then((displayData) => {
          viewModel.displayUpdatedTable(displayData.ideas);
          viewModel.showToast("Idea added successfully!");
        })
      });

  };

  viewModel.sendEditedIdea = function (idea) {
    idea.id(viewModel.chosenIdeadId());
    idea.likes(viewModel.editedIdealikes);
    delete idea.likeButton;
    let modifiedData = ko.toJSON(idea);
    let url = baseURL + '/ideas/' + viewModel.chosenIdeadId();
    let sendUpdatedDataTask = util.PUT(url, modifiedData);
    sendUpdatedDataTask.then(() => {
      $('#submitButton').html('Save');
      $('#newIdeaModal').modal('hide');
    })
      .then(() => {
        let getIdeasUrl = baseURL + "/" + viewModel.chosenHackathonId() + '/ideas';
        let getDataTask = util.GET(getIdeasUrl);
        getDataTask.then((displayData) => {
          viewModel.displayUpdatedTable(displayData.ideas);
          let msg = "Idea ID: " + idea.id() + " \"" + idea.ideaSummary() + "\" has been updated!";
          viewModel.showToast(msg);
        })
      });

  };
  return {
    getIdeaViewModel: function () {
      return viewModel;
    }
  }
})