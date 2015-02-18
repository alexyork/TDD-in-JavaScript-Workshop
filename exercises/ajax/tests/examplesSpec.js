//
// Production code
function runMyAjaxCode(callback) {
    $.ajax({
        type: "GET",
        url: "/foo",
        dataType: "json",
        success: function(data) {
            callback(data);
        }
    });
}

//
// Unit tests
describe("runMyAjaxCode", function() {

    it("should ???", function() {
    });
    
});