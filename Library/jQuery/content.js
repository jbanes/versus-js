$.fn.pagedContent = function(operation, value) {

    if($.isEmptyObject(this.data())) 
    {
        this.data("page", 1);
        this.data("pages", 5);
    }

    if(operation === "page" && value) this.data("page", value);
    else if(operation === "page") return this.data("page");
    else if(operation === "pages") return this.data("pages");

    //Render
    this.empty().append("<div>").text("Page " + this.data("page"));

    return this;
};