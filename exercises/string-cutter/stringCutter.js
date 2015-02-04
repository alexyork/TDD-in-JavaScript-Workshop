var jsWorkshop = jsWorkshop || {};

jsWorkshop.stringCutter = function () {

    function cut(stringToCut) {
        if (isInvalid(stringToCut)) return;

        var cutStrings = [];
        for (var i = stringToCut.length; i > 0; i--) {
            cutStrings.push(stringToCut.slice(0, i));
        }
        return cutStrings;
    }
    
    function isInvalid(input) {
        return input === undefined || input === null || typeof(input) !== "string";
    }

    return {
        cut: cut
    };

};