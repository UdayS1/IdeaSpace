define(['knockout'], function (ko) {
    return function () {
        this.id = ko.observable();
        this.ideaSummary = ko.observable();
        this.ideaDetails = ko.observable();
        this.category = ko.observable();
        this.teamMembers = ko.observable();
        this.likes = ko.observable();
        this.likeButton = "<button class='btn btn-secondary'><i class='far fa-thumbs-up'></i></button>";
    };
})