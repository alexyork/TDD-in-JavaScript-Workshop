//
// Production code
function doMyStuffLater(delay, callback) {
    setTimeout(function() {
        callback(new Date());
    }, delay);
}

//
// Unit tests
describe("doMyStuffLater", function() {

    it("should ???", function() {
    });
    
});
