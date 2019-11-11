define(['jquery', 'idea'], function ($, Idea) {
    return function () {
        let ideaSummary = $('#ideaSummary').val().trim();
        let ideaDetails = $('#ideaDetails').val().trim();
        let teamMembers = $('#teamMembers').val().trim();
        let category = document.getElementById('category');
        let validData = true;
        let selectedCategory = category.options[category.selectedIndex].text;
        let regexp = new RegExp('^[a-zA-Z ,!&.;]*$');

        if (validData) {
            if (ideaSummary == '') {
                $('#ideaSummaryGroup').addClass('has-error alert alert-danger');
                validData = false;
            }
            else {
                $('#ideaSummaryGroup').removeClass('has-error alert alert-danger');

                if (regexp.test(ideaSummary)) {
                    $('#ideaSummaryGroup').addClass(' alert alert-success');
                }
                else {
                    $('#ideaSummaryGroup').addClass('has-error alert alert-danger');
                    validData = false;
                }

            }
            if (ideaDetails == '') {
                $('#ideaDetailsGroup').addClass('has-error alert alert-danger');
                validData = false;
            }
            else {
                $('#ideaDetailsGroup').removeClass('has-error alert alert-danger');
                if (regexp.test(ideaDetails)) {
                    $('#ideaDetailsGroup').addClass(' alert alert-success');
                }
                else {
                    $('#ideaDetailsGroup').addClass('has-error alert alert-danger');
                    validData = false;
                }
            }
            if (teamMembers == '') {
                teamMembers = 'None';
                $('#teamMembersGroup').removeClass('has-error alert alert-danger');
                $('#teamMembersGroup').addClass('has-error alert alert-info');
            }
            else {
                if (regexp.test(teamMembers)) {
                    $('#teamMembersGroup').addClass(' alert alert-success');
                }
                else {
                    $('#teamMembersGroup').removeClass('has-error alert alert-info');
                    $('#teamMembersGroup').addClass('has-error alert alert-danger');
                    validData = false;
                }
            }


            ;
            if (validData) {
                
                let IdeaViewModel = require('ideaViewModel');
                let ideaViewModel = IdeaViewModel.getIdeaViewModel();
                let idea = new Idea();
                idea.ideaSummary(ideaSummary);
                idea.ideaDetails(ideaDetails);
                idea.category(selectedCategory);
                idea.teamMembers(teamMembers);

                let buttonName = $('#submitButton').html();
                if (buttonName == 'Edit') {
                    ideaViewModel.sendEditedIdea(idea);
                }
                else {
                    ideaViewModel.sendIdea(idea);
                }

            }
        }

    };
})