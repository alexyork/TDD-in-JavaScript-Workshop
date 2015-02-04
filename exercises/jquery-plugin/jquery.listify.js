(function($) {
    $.fn.listify = function() {

        var $lists = this.filter("ul, ol");
        $lists.find(":even").addClass("even");
        $lists.children(":odd").addClass("odd");
        return this;

    };
})(jQuery);