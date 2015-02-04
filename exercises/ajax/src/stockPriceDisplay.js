var jsWorkshop = jsWorkshop || {};

jsWorkshop.stockPriceDisplay = function(fetcher) {

    var _fetcher = fetcher;

    function fetchAndDisplayStock(symbol) {
        _fetcher.fetch(symbol, displayStock, displayError);
    }

    function displayStock(data) {
        $(".price").text(data.price);
        $(".status").text("Updated " + data.timestamp);
    }
    
    function displayError(message) {
        $(".status").text("Error: " + message);
    }

    return {
        stock: fetchAndDisplayStock
    };

};
