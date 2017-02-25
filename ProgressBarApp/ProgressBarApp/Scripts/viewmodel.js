var viewModel = function () {
    var self = this;
    self.dropdownBars = ko.observableArray([]);
    self.Buttons = ko.observableArray([]);
    self.Bars = ko.observableArray([]);

    self.limit = ko.observable([]);
    self.value = ko.observableArray([]);

    $.getJSON("/Scripts/input.json", function (data) {
        self.Buttons(data.buttons);
        self.Bars(data.bars);
        self.limit(data.limit);
        self.value(data.buttons);
        for (i = 0 ; i < self.Bars().length; i++) {
            self.dropdownBars.push("Progress Bar " + (i + 1));
            self.Bars()[i] = Math.ceil(100 / (self.limit() / self.Bars()[i]));
            self.Bars.valueHasMutated();
        }
    })


    this.selectedChoice = ko.observable();
    this.selectedChoiceIndex = ko.dependentObservable(function () {
        return this.dropdownBars.indexOf(this.selectedChoice());
    }, this);
    
    self.progress = function (data, event) {
        debugger;
        var percent = self.limit() / (100 / self.Bars()[self.selectedChoiceIndex()]);
        percent = percent + data;
        self.Bars()[self.selectedChoiceIndex()] = Math.ceil(100 / (self.limit() / percent));
        if (self.Bars()[self.selectedChoiceIndex()] <= 0)
            self.Bars()[self.selectedChoiceIndex()] = 0;
        self.Bars.valueHasMutated();
    }
};
ko.applyBindings(new viewModel());