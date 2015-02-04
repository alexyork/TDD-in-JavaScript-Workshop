describe("stockPriceFetcher", function () {

    it("should fetch data from the correct URL", function() {
        spyOn($, "ajax");

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", function() {}, function() {});

        var ajaxOptions = $.ajax.calls.mostRecent().args[0];
        expect(ajaxOptions.url).toMatch(/BOUVET/);
    });

    it("should call the success callback when successful", function () {
        spyOn($, "ajax").and.callFake(function (options) {
            options.success();
        });

        var successSpy = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successSpy, function () { });

        expect(successSpy).toHaveBeenCalled();
    });

    it("should pass data to the success callback when successful", function () {
        spyOn($, "ajax").and.callFake(function (options) {
            options.success({ foo: "bar" });
        });
        var successSpy = jasmine.createSpy();

        var stockFetcher = jsWorkshop.stockPriceFetcher();
        stockFetcher.fetch("BOUVET", successSpy, function() { });

        var args = successSpy.calls.mostRecent().args[0];
        expect(args).toEqual({ foo: "bar" });
    });

    it("XHR tests", function() {
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