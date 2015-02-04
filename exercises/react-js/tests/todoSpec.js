describe("Todo List", function() {

    var $todoContainer;

    beforeEach(function() {
        $todoContainer = $("<div id='todoContainer'></div>").appendTo("body");
        renderTodoApp($todoContainer[0]);
    });

    describe("initial state", function() {

        it("should have rendered the form", function() {
            var $form = $todoContainer.find("form");
            expect($form.size()).toBe(1);
            
            var $input = $todoContainer.find("input[type='text']");
            expect($input.size()).toBe(1);
            
            var $button = $todoContainer.find("button");
            expect($button.size()).toBe(1);
        });

        it("should start with no Todo items", function () {
            var $todoListItems = $todoContainer.find("li");
            expect($todoListItems.size()).toBe(0);
        });

    });
    
    describe("adding an item", function () {

        it("should add the item to the list", function () {
            var input = $todoContainer.find("input[type='text']").get(0);
            
            $(input).val("Wash the dishes");
            React.addons.TestUtils.Simulate.change(input); // sucks
            $todoContainer.find("button").click();

            var $todoListItems = $todoContainer.find("li");

            expect($todoListItems.size()).toBe(1);
            expect($todoListItems.eq(0).text()).toBe("Wash the dishes");
        });
        
        it("should add new items to the bottom of the list", function () {
            var input = $todoContainer.find("input[type='text']").get(0);

            $(input).val("Wash the dishes");
            React.addons.TestUtils.Simulate.change(input); // sucks
            $todoContainer.find("button").click();
            
            $(input).val("Recycle bottles and cans");
            React.addons.TestUtils.Simulate.change(input); // sucks
            $todoContainer.find("button").click();

            var $todoListItems = $todoContainer.find("li");

            expect($todoListItems.size()).toBe(2);
            expect($todoListItems.eq(0).text()).toBe("Wash the dishes");
            expect($todoListItems.eq(1).text()).toBe("Recycle bottles and cans");
        });

    });
    
    afterEach(function() {
        $todoContainer.remove();
    });

});