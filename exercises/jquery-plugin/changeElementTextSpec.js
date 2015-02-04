describe("changeElementText", function() {

    beforeEach(function() {
        $("body").append("<h1 id='test-heading'></h1>");
    });

    it("should change the text of the heading", function() {
        changeElementText("test-heading", "Hello, Bouvet!");

        var newText = $("#test-heading").text();
        expect(newText).toEqual("Hello, Bouvet!");
    });

    afterEach(function() {
        $("#test-heading").remove();
    });

});