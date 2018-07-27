async function getPages() {
    let mockPages = [
        {
            id: "1",
            title: "Mock First Page",
            elements: [
                {
                    id: "1",
                    type: "a",
                    innerHTML: "Some mock element content",
                    attributes: [
                        {
                            href: "https://www.google.com"
                        }
                    ],
                    styles: [
                        {
                            color: "red",
                            fontSize: 30
                        }
                    ]
                }
            ]
        }
    ]

    return new Promise((resolve, reject) => {
        let itWorked = true;
        if (itWorked) {
            resolve(mockPages);
        } else {
            reject(Error("Something went wrong with the Page service!"));
        }
    });
}

async function createPage(page) {

}

async function updatePage(page) {

}

async function deletePage(page) {

}

export var PageService = {
    getPages: getPages
}