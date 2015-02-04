var jsWorkshop = jsWorkshop || {};

jsWorkshop.fizzBuzz = function() {

    function getResult(number) {
        if (isMultipleOfThreeAndFive(number)) {
            return "fizzbuzz";
        }
        if (isMultipleOfThree(number)) {
            return "fizz";
        }
        if (isMultipleOfFive(number)) {
            return "buzz";
        }
        return number.toString();
    };

    function isMultipleOfThreeAndFive(number) {
        return isMultipleOfFive(number) && isMultipleOfThree(number);
    };

    function isMultipleOfThree(number) {
        return number % 3 == 0 && number != 0;
    };

    function isMultipleOfFive(number) {
        return number % 5 == 0 && number != 0;
    };

    return {
        getResult: getResult
    };

};