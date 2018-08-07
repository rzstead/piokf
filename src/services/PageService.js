let mockPage1 = {
    id: "1",
    title: "Sweet First Page",
    elements: [{
        id: "1",
        type: "a",
        innerHTML: "Some mock element content",
        attributes: [{
            href: "https://www.google.com"
        }],
        styles: [{
            color: "red",
            fontSize: 30,
            backgroundColor: 'magenta'
        }]
    }]
}

let mockPage2 = {
    id: "2",
    title: "Tasty Second Page",
    elements: [{
        id: "2",
        type: "h1",
        innerHTML: "You got the second page, baby",
        attributes: [],
        styles: [{
            color: "blue",
            fontSize: 30,
            backgroundColor: 'seagreen'
        }]
    }]
}

let mockPage3 = {
    id: "3",
    title: "Scrumptious Third Page",
    elements: [{
        id: "3",
        type: "img",
        innerHTML: "",
        attributes: [{
            src: "https://media1.tenor.com/images/4be2fecb985dd9a80e22d3c32225b12d/tenor.gif",
            alt: "Noot gif"
        }],
        styles: [{
            height: "150",
            backgroundColor: 'blue'
        }]
    }]
}

let pageMetas = [{
        id: "1",
        title: "Sweet First Page"
    },
    {
        id: "2",
        title: "Tasty Second Page"
    },
    {
        id: "3",
        title: "Scrumptious Third Page"
    }
]

async function getPage(id) {
    //take id and ask backend for page w/matching id
    return new Promise((resolve, reject) => {
        let itWorked = true;
        if (itWorked) {
            switch (id) {
                case '1':
                    resolve(mockPage1);
                    break;
                case '2':
                    resolve(mockPage2);
                    break;
                case '3':
                    resolve(mockPage3);
                    break;
                default:
                    resolve(mockPage1);
                    break;
            }
        } else {
            reject(Error("Something went wrong with the Page service!"));
        }
    });
}

function getPageMetas() {
    fetch('http://neumontcsc270.dynu.net:2018/piokf-back/loadPages.php').then(res => res.json()).then(json => console.log('received from api: ' + JSON.stringify(json)));

    return new Promise((resolve, reject) => {
        let itWorked = true;
        if (itWorked) {
            resolve(pageMetas);
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
    getPage: getPage,
    getPageMetas: getPageMetas
}