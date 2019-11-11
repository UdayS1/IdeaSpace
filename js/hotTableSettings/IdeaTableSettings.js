define(['jquery', 'idea', 'resetValidationEffects', 'bootstrap'], function ($, Idea, resetValidationEffects) {

  return {
    dataSchema: { id: null, ideaSummary: null, ideaDetails: null, category: null, teamMembers: null, likes: null, likeButton: null },
    data: '',
    colHeaders: ['ID', 'Idea Summary', 'Idea Details', 'Category', 'Team Members', 'Likes Count', 'Like'],
    hiddenColumns: {
      columns: [0]
    },
    rowHeaders: false,
    height: '60%',
    width: '100%',
    readOnly: true,
    licenseKey: 'non-commercial-and-evaluation',
    modifyColWidth: function (width, col) {
      if (width > 300) {
        return 300;
      }
      if ((col === 5 || col === 6) && width < 120) {
        return 50;
      }
    },
    contextMenu: true,
    columns: [
      { data: 'id' },
      { data: 'ideaSummary' },
      { data: 'ideaDetails' },
      { data: 'category' },
      { data: 'teamMembers' },
      { data: 'likes' },
      { data: 'likeButton', renderer: "html" }
    ],
    afterOnCellMouseUp: async function (e, coords, td) {
      $('#ideaContainer').show();
      if (coords.col === 6 && coords.row != -1) {
        let likes = this.getDataAtRowProp(coords.row, 'likes');

        let IdeaViewModel = require('ideaViewModel');
        let ideaViewModel = IdeaViewModel.getIdeaViewModel();
        ideaViewModel.editedIdealikes = this.getDataAtRowProp(coords.row, 'likes');
        let idea = new Idea();
        ideaViewModel.chosenIdeadId(this.getDataAtRowProp(coords.row, 'id'));
        idea.id(this.getDataAtRowProp(coords.row, 'id'));
        idea.ideaSummary(this.getDataAtRowProp(coords.row, 'ideaSummary'));
        idea.ideaDetails(this.getDataAtRowProp(coords.row, 'ideaDetails'));
        idea.category(this.getDataAtRowProp(coords.row, 'category'));
        idea.teamMembers(this.getDataAtRowProp(coords.row, 'teamMembers'));
        idea.likes(this.getDataAtRowProp(coords.row, 'likes') + 1);
        ideaViewModel.likeIdea(idea);

      }
      if (coords.row != -1 && coords.col != 6) {
        let IdeaViewModel = require('ideaViewModel');
        let ideaViewModel = IdeaViewModel.getIdeaViewModel();

        $('#submitButton').html('Edit');

        resetValidationEffects();

        ideaViewModel.chosenIdeadId(this.getDataAtRowProp(coords.row, 'id'));
        $('#ideaSummary').val(this.getDataAtRowProp(coords.row, 'ideaSummary'));
        $('#ideaDetails').val(this.getDataAtRowProp(coords.row, 'ideaDetails'));
        $('#category').val(this.getDataAtRowProp(coords.row, 'category'));
        $('#teamMembers').val(this.getDataAtRowProp(coords.row, 'teamMembers'));
        ideaViewModel.editedIdealikes = this.getDataAtRowProp(coords.row, 'likes');
        $('#newIdeaModal').modal('show');
      }
    }

  };
});