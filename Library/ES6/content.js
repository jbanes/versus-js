class PagedContent 
{
    constructor(elements)
    {
        this.page = 1;
        this.pages = 5;
        this.elements = elements;

        this.render();
    }

    changePage(page)
    {
        this.page = page;

        this.render();
    }

    render()
    {
        let page = this.page;

        this.elements.forEach(function(element, index) {
            let info = document.createElement("div");

            info.textContent = "Page " + page;

            element.replaceChildren(info);
        });
    }
}