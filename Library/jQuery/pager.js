$.fn.pager = function(content) {
    let that = this;
    let pages = content.pagedContent("pages");
    let page = content.pagedContent("page");

    function createPage(page, selected)
    {
        return $("<span>")
                    .addClass("page" + (selected ? " selected" : ""))
                    .text(page)
                    .click(function() {
                        content.pagedContent("page", page);
                        that.pager(content);
                    });
    }

    this.empty().append($("<span>").text("Page: "));

    for(let i=0; i<pages; i++)
    {
        this.append(createPage(i+1, (page === i+1)));
    }
};