define(['jquery'], function ($) {
    return function () {
        $('#ideaSummaryGroup').removeClass('has-error alert alert-danger');
        $('#ideaSummaryGroup').removeClass('alert alert-success');
        $('#ideaDetailsGroup').removeClass('has-error alert alert-danger');
        $('#ideaDetailsGroup').removeClass('alert alert-success');
        $('#teamMembersGroup').removeClass('alert alert-success');
        $('#teamMembersGroup').removeClass('alert alert-info');
        $('#teamMembersGroup').removeClass('has-error alert alert-danger');
        $('input').val('');
        $('#ideaDetails').val('');

    };

})