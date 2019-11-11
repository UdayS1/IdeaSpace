define(['jquery', 'util', 'Handsontable'], function ($, Util, Handsontable) {

  return {
    dataSchema: { id: null, eventName: null, moOffice: null, dateConducted: null, ideasGenerated: null },
    data: '',
    contextMenu: true,
    colHeaders: ['Event Name', 'MO Office', 'Date Conducted', "Ideas Generated"],
    columns: [
      { data: 'eventName' },
      { data: 'moOffice' },
      { data: 'dateConducted' },
      { data: 'ideasGenerated' }
    ],
    rowHeaders: false,
    height: '33%',
    width: '100%',
    readOnly: true,
    licenseKey: 'non-commercial-and-evaluation',
    modifyColWidth: function (width, col) {
      if (width < 175) {
        return 175;
      }
    },
    cells: function (row, col) {
      var cellProperties = {};
      if (col === 0) {
        cellProperties.renderer = function (instance,td,row,col,prop,value,cellProperties) {
          Handsontable.renderers.TextRenderer.apply(this, arguments);
          td.style.fontWeight = 'bold';
          td.style.color = '#2c96f2';
          td.style.cursor="pointer";
        }
      }
      return cellProperties;
    },
    afterOnCellMouseUp: async function (e, coords, td) {

      if (coords.col === 0 && coords.row != -1) {
        $('#hackathonContainer').hide();
        $('#ideaContainer').show();
        let title = document.getElementById('title');
        title.innerText = this.getDataAtRowProp(coords.row, 'eventName');
        $('#titleContainer').addClass('jumbotron');
        let hackathonID = this.getDataAtRowProp(coords.row, 'id');
        let HackathonViewModel = require('hackathonViewModel');
        let hackathonViewModel = HackathonViewModel.getHackathonViewModel();
        hackathonViewModel.goToHackathon(this.getDataAtRowProp(coords.row, 'id'));
        let IdeaViewModel = require('ideaViewModel');
        let ideaViewModel = IdeaViewModel.getIdeaViewModel();
        ideaViewModel.chosenHackathonId(hackathonID);
        let util = Util.getUtil();
        let url = 'http://localhost:9090/hackathons/' + ideaViewModel.chosenHackathonId() + '/ideas';
        let displayData = await util.GET(url);
        ideaViewModel.displayUpdatedTable(displayData.ideas);

      }
    }
  };
});


