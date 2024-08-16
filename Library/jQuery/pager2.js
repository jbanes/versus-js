$.fn.pager = function(content) {
    let pages = content.pagedContent("pages");
    let page = content.pagedContent("page");
    let select = $("<select>").addClass("pager-dropdown");

    function createPage(page, selected)
    {
        return $("<option>")
                    .attr("value", page)
                    .prop("selected", selected)
                    .text("Page " + page);
    }

    for(let i=0; i<pages; i++)
    {
        select.append(createPage(i+1, (page === i+1)));
    }
    
    select.change(function() {
        page = $(this).val();
        
        content.pagedContent("page", page);
        
        $("select.pager-dropdown option").each(function(index, element) {
            if(element.value === page) element.selected = "selected";
        });
    });

    this.empty().append(select);
};