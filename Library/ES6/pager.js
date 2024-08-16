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
            let element = document.createElement("span");

            element.classList.add("page");

            if(selected) element.classList.add("selected");

            element.textContent = String(page);
            element.addEventListener("click", function() {
                that.content.changePage(page);

                that.render();
            });

            return element;
        }

        this.elements.forEach(function(element, index) {
            let title = document.createElement("span");

            title.textContent = "Page: ";

            element.replaceChildren(title);

            for(let i=0; i<pages; i++)
            {
                element.appendChild(createPage(i+1, (page === i+1)));
            }
        });
    }
}