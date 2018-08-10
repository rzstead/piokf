const BASE_API = 'http://neumontcsc270.dynu.net:2018/piokf-back';


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
        styles: {
            color: "red",
            fontSize: 30,
            backgroundColor: 'magenta'
        }
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
        styles: {
            color: "blue",
            fontSize: 30,
            backgroundColor: 'seagreen'
        }
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
        styles: {
            height: "150",
            backgroundColor: 'blue'
        }
    }]
}

let pageMetas = [{
        id: "1",
        title: "Sweet First Page",
        children: [
            {
                id: '2',
                title: 'First Child'
            },
            {
                id: '3',
                title: 'Second Child'
            }
        ]
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

function getPage(id) {
    console.log('PageService => getPage => ' + id);
    return fetch(`${BASE_API}/loadPageElements.php?id=${id}`)
        .then(res => res.json());
}

function getPageMetas() {
    console.log('PageService => getPageMetas');
    return fetch(`${BASE_API}/loadPages.php`)
        .then(res => res.json());
}

function savePage(page) {
    console.log('PageService => savePage');
    return fetch(`${BASE_API}/savePage.php`, {
        type: 'POST',
        body: JSON.stringify(page)
    }).then(res => res.json());
}

function createPage(page) {
    return fetch(`${BASE_API}/addPage.php`, {
        type: 'POST',
        body: JSON.stringify(page)
    }).then(res => res.json());
}

function createChildPage(childTitle, parentId){
    return fetch(`${BASE_API}/addChildPage.php`, {
        type: 'POST',
        body: JSON.stringify({parent_page_id: parentId, title: childTitle})
    }).then(res => res.json());
}

async function updatePage(page) {

}

async function deletePage(page) {

}

export var PageService = {
    getPage: getPage,
    getPageMetas: getPageMetas,
    savePage: savePage,
    createPage: createPage,
    createChildPage: createChildPage
}