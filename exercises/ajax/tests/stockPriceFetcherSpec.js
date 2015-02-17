//
// Demo of testing code that makes AJAX calls.
// Production code uses jQuery.ajax()
// Test code uses Jasmine's spies to spy on and manipulate jQuery.ajax()
//
describe("stockPriceFetcher", function () {

    var stockFetcher;
    var emptyCallback;
    
    beforeEach(function() {
        stockFetcher = jsWorkshop.stockPriceFetcher();
        emptyCallback = function() {};
    });
    
    it("should fetch data from the correct URL", function() {
        spyOn($, "ajax");

        stockFetcher.fetch("BOUVET", emptyCallback, emptyCallback);

        var ajaxOptions = $.ajax.calls.mostRecent().args[0];
        expect(ajaxOptions.url).toBe("quote.json?q=BOUVET");
    });

    it("should call the success callback when successful", function() {
        spyOn($, "ajax").and.callFake(function(options) {
            options.success(); // This fakes $.ajax to call its own success handler
        });

        var successCallback = jasmine.createSpy();
        stockFetcher.fetch("BOUVET", successCallback, emptyCallback);

        expect(successCallback).toHaveBeenCalled();
    });

    it("should pass data to the success callback when successful", function() {
        spyOn($, "ajax").and.callFake(function(options) {
            options.success({ foo: "bar" }); // Fakes $.ajax's success handler with some "server" data
        });
        var successCallback = jasmine.createSpy();
        stockFetcher.fetch("BOUVET", successCallback, emptyCallback);

        var args = successCallback.calls.mostRecent().args[0];
        expect(args).toEqual({ foo: "bar" });
    });

    it("should call the error callback when an error occurs", function() {
        spyOn($, "ajax").and.callFake(function(options) {
            options.error(); // This fakes $.ajax to call its own success handler
        });

        var errorCallback = jasmine.createSpy();
        stockFetcher.fetch("BOUVET", emptyCallback, errorCallback);

        expect(errorCallback).toHaveBeenCalled();
    });

    it("should do nothing if no symbol is passed in", function() {
        spyOn($, "ajax");

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();
        stockFetcher.fetch("", successCallback, errorCallback);

        expect($.ajax.calls.count()).toBe(0);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
    });

});

describe("stockPriceFetcher w/ jasmine.Ajax()", function() {

    beforeEach(function() {
        jasmine.Ajax.install();
    });
    
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    
    it("should fetch data from the correct URL", function() {
        var successCallback = jasmine.createSpy();
        
        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successCallback);

        var xhr = jasmine.Ajax.requests.mostRecent();
        
        expect(xhr.url).toMatch(/BOUVET/);
    });
    
    it("should call the success callback when successful", function() {
        var successCallback = jasmine.createSpy();
        
        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successCallback);

        server.doesNotRespondYet();
        expect(successCallback).not.toHaveBeenCalled();

        server.successfullyRespondsWith({ some: "json", data: "from the server" });
        expect(successCallback).toHaveBeenCalled();
    });
    
    // DSL-type object which makes the unit tests more pleasant
    var server = {
        doesNotRespondYet: function() {
        },
        successfullyRespondsWith: function(obj) {
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status": 200,
                "contentType": 'application/json',
                "responseText": JSON.stringify(obj)
            });
        }
    };
    
});