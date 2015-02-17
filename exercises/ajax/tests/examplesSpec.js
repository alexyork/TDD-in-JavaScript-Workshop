//
// Production code
function runMyAjaxCode(callback) {
    $.ajax({
        type: "GET",
        url: "/foo",
        dataType: "json",
        success: function(data) {
            callback(data);
        }
    });
}

describe("overwriting $.ajax", function() {

    var $ajaxOriginalFn;

    beforeEach(function() {
        $ajaxOriginalFn = $.ajax;
    });

    afterEach(function() {
        $.ajax = $ajaxOriginalFn;
    });

    it("should call the callback", function() {
        $.ajax = function(options) {
            options.success();
        };

        var callbackWasCalled = false;
        var ajaxCallback = function() {
            callbackWasCalled = true;
        };

        runMyAjaxCode(ajaxCallback);
        expect(callbackWasCalled).toBe(true);
    });

    it("should pass the data to the callback", function() {
        $.ajax = function(options) {
            options.success({ what: "the f**k?" });
        };

        var ajaxCallback = function(data) {
            expect(data.what).toEqual("the f**k?");
        };

        runMyAjaxCode(ajaxCallback);
    });

});

describe("using Jasmine spies", function() {

    it("should call $.ajax", function() {
        spyOn($, "ajax");

        runMyAjaxCode(function() {});

        expect($.ajax).toHaveBeenCalled();
    });

    it("should call my callback", function() {
        spyOn($, "ajax").and.callFake(function(options) {
            options.success();
        });

        var myCallbackSpy = jasmine.createSpy();
        runMyAjaxCode(myCallbackSpy);

        expect(myCallbackSpy).toHaveBeenCalled();
    });

});

describe("faking AJAX responses with a fake server", function() {

    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should call my callback", function() {
        var myCallbackSpy = jasmine.createSpy();
        runMyAjaxCode(myCallbackSpy);

        var xhr = jasmine.Ajax.requests.mostRecent();
        expect(xhr.url).toMatch(/foo/);
        expect(myCallbackSpy).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'application/json',
            "responseText": JSON.stringify({ fake: "json" })
        });

        expect(myCallbackSpy).toHaveBeenCalled();
    });
});