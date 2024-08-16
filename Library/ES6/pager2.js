class Pager 
{
    constructor(elements, content)
    {
        this.elements = elements;
        this.content = content;

        this.render();
    }

    render()
    {
        let that = this;
        let page = this.content.page;
        let pages = this.content.pages;

        function createPage(page, selected)
        {
            let element = document.createElement("option");

            element.value = page;
            element.textContent = "Page " + page;
            element.class = "pager-dropdown";

            if(selected) element.selected = "selected";

            return element;
        }

        this.elements.forEach(function(element, index) {
            let select = document.createElement("select");

            for(let i=0; i<pages; i++)
            {
                select.appendChild(createPage(i+1, (page === i+1)));
            }

            element.replaceChildren(select);
            element.addEventListener("change", function() {
                that.content.changePage(element.querySelector("select").value);
                
                that.elements.forEach(function(element, index) {
                    element.querySelector("select").value = that.content.page; 
                });
            });
        });
    }
}