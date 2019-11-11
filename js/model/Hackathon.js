define(['knockout'], function (ko) {
    return function () {
        this.id = ko.observable();
        this.eventName = ko.observable();
        this.moOffice = ko.observable();
        this.dateConducted = ko.observable();
        this.ideasGenerated = ko.observable();
    };
})