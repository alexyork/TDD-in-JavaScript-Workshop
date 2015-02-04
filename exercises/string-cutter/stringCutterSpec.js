describe("stringCutter", function() {

    var stringCutter;

    beforeEach(function() {
        stringCutter = jsWorkshop.stringCutter();
    });

    it("should return an empty array when nothing is passed in", function() {
        var result = stringCutter.cut("");
        
        expect(result).toBeDefined();
        expect(result.length).toEqual(0);
    });

    it("should return undefined when junk is passed in", function() {
        var result = stringCutter.cut({ foo: 123 });
        expect(result).toBeUndefined();
    });

    it("should cut single-letter inputs", function() {
        var result = stringCutter.cut("a");

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual("a");
    });

    it("should cut two-letter inputs", function() {
        var result = stringCutter.cut("al");

        expect(result.length).toBe(2);
        expect(result[0]).toEqual("al");
        expect(result[1]).toEqual("a");
    });

    it("should cut n-letter inputs", function() {
        var result = stringCutter.cut("alex");

        expect(result.length).toBe(4);
        expect(result[0]).toEqual("alex");
        expect(result[1]).toEqual("ale");
        expect(result[2]).toEqual("al");
        expect(result[3]).toEqual("a");
    });
    
});