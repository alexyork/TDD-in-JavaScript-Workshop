describe("stockPriceDisplay", function() {

    var fetcher;
    var $testElem;
    
    beforeEach(function() {
        fetcher = jsWorkshop.stockPriceFetcher();
        affix("div#test-element span.status+span.price");
    });
    
    it("should ask the fetcher to fetch", function() {
        spyOn(fetcher, "fetch");
        
        var display = jsWorkshop.stockPriceDisplay(fetcher);
        display.stock("BOUVET");
        
        expect(fetcher.fetch).toHaveBeenCalled();
    });
    
    it("should display the price when fetching was successful", function() {
        spyOn(fetcher, "fetch").and.callFake(function(symbol, success, error) {
            success({ price: 123, timestamp: 456 });
        });
        
        var display = jsWorkshop.stockPriceDisplay(fetcher);
        display.stock("BOUVET");
        
        expect($("#test-element").find(".price").text()).toEqual("123");
    });
    
    it("should display the timestamp when fetching was successful", function() {
        spyOn(fetcher, "fetch").and.callFake(function(symbol, success, error) {
            success({ price: 123, timestamp: 456 });
        });
        
        var display = jsWorkshop.stockPriceDisplay(fetcher);
        display.stock("BOUVET");
        
        expect($("#test-element").find(".status").text()).toEqual("Updated 456");
    });
    
    it("should display the error when fetching was unsuccessful", function() {
        spyOn(fetcher, "fetch").and.callFake(function(symbol, success, error) {
            error("AN ERROR!");
        });
        
        var display = jsWorkshop.stockPriceDisplay(fetcher);
        display.stock("BOUVET");
        
        expect($("#test-element").find(".status").text()).toEqual("Error: AN ERROR!");
    });
    
});