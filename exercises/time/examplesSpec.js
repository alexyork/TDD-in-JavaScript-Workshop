//
// Production code
function doMyStuffLater(delay, callback) {
    setTimeout(function() {
        callback(new Date());
    }, delay);
}

describe("doMyStuffLater", function() {

    var callback;
    
    beforeEach(function() {
        callback = jasmine.createSpy("timer callback spy");
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should not call the callback immediately", function() {
        doMyStuffLater(1000, callback);
        expect(callback).not.toHaveBeenCalled();
    });
    
    it("should call the callback after the delay", function() {
        doMyStuffLater(1000, callback);
        
        jasmine.clock().tick(999);
        expect(callback).not.toHaveBeenCalled();
        
        jasmine.clock().tick(2);
        expect(callback).toHaveBeenCalled();
    });
    
    it("should call the callback after the delay with the date", function() {
        var baseDate = new Date(1985, 3, 17);
        jasmine.clock().mockDate(baseDate);
        
        doMyStuffLater(1000, callback);
        
        jasmine.clock().tick(1001);
        var actualDate = callback.calls.mostRecent().args[0];
        
        expect(actualDate.getTime()).toBe(baseDate.getTime() + 1001);
    });

});
