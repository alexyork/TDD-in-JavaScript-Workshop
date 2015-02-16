//
// Demo of testing code that makes AJAX calls.
// Production code uses jQuery.ajax()
// Test code uses Jasmine's spies to spy on and manipulate jQuery.ajax()
//
describe("stockPriceFetcher", function () {

    it("should fetch data from the correct URL", function() {
        spyOn($, "ajax");

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", function() {}, function() {});

        var ajaxOptions = $.ajax.calls.mostRecent().args[0];
        expect(ajaxOptions.url).toBe("quote.json?q=BOUVET");
    });

    it("should call the success callback when successful", function () {
        spyOn($, "ajax").and.callFake(function(options) {
            options.success(); // This fakes $.ajax to call its own success handler
        });

        var successSpy = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successSpy, function() { });

        expect(successSpy).toHaveBeenCalled();
    });

    it("should pass data to the success callback when successful", function () {
        spyOn($, "ajax").and.callFake(function(options) {
            options.success({ foo: "bar" }); // Fakes $.ajax's success handler with some "server" data
        });
        var successCallback = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successCallback, function() { });

        var args = successCallback.calls.mostRecent().args[0];
        expect(args).toEqual({ foo: "bar" });
    });

    it("should call the error callback when an error occurs", function () {
        spyOn($, "ajax").and.callFake(function(options) {
            options.error(); // This fakes $.ajax to call its own success handler
        });

        var errorCallback = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", function() { }, errorCallback);

        expect(errorCallback).toHaveBeenCalled();
    });

    it("should do nothing if no symbol is passed in", function () {
        spyOn($, "ajax");

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("", successCallback, errorCallback);

        expect($.ajax.calls.count()).toBe(0);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
    });

    xit("XHR tests", function() {
        jasmine.Ajax.install();

        var successSpy = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successSpy, function () { });

        var xhr = jasmine.Ajax.requests.mostRecent();
        expect(xhr.url).toMatch(/BOUVET/);
        expect(successSpy).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'application/json',
            "responseText": JSON.stringify({ fake: "json" })
        });
        
        expect(successSpy).toHaveBeenCalled();

        jasmine.Ajax.uninstall();
    });

});