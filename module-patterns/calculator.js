// Namespace
var jsWorkshop = jsWorkshop || {};

// Module
jsWorkshop.calculator = function() {

    //
    // Public functions
    function add(x, y) {
        return x + y;
    }
    
    function subtract(x, y) {
        return x - y;
    }
    
    //
    // Private functions
    function random() {
        return 3; // Truly random. Taken from the roll of a dice.
    }

    return {
        add: add,
        subtract: subtract
    };

};