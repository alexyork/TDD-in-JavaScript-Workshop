var jsWorkshop = jsWorkshop || {};

jsWorkshop.stockPriceFetcher = function() {

    function fetchStock(symbol, success, error) {
        if (!symbol) return;

        $.ajax({
            type: "GET",
            url: "quote.json?q=" + symbol,
            dataType: "json",
            success: function(data) {
                success(data);
            },
            error: function(msg) {
                error(msg);
            }
        });
    }

    return {
        fetch: fetchStock
    };

};
