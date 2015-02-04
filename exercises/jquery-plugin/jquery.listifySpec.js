describe("Listify jQuery plugin", function() {

    beforeEach(function() {
        affix("ul#MyList li+li+li+li");
        affix("div#MyDiv div+div+div+div");
    });

    it("should add the css class 'even' to all even list items", function() {
        $("#MyList").listify();

        var hasEvenCssClass = $("#MyList li:even").hasClass("even");
        expect(hasEvenCssClass).toEqual(true);
    });

    it("should add the css class 'odd' to all odd list items", function() {
        $("#MyList").listify();

        var hasOddCssClass = $("#MyList li:odd").hasClass("odd");
        expect(hasOddCssClass).toEqual(true);
    });

    it("should be chainable and return the jQuery object", function() {
        var $returnValue = $("#MyList").listify();

        expect($returnValue).toBeDefined();
        expect($returnValue.size()).toBe(1);
        expect($returnValue[0].id).toBe("MyList");
    });

    it("should do nothing on divs", function() {
        $("#MyDiv").listify();

        var hasOddCssClass = $("#MyDiv div:odd").hasClass("odd");
        expect(hasOddCssClass).toEqual(false);

        var hasEvenCssClass = $("#MyDiv div:even").hasClass("even");
        expect(hasEvenCssClass).toEqual(false);
    });

});