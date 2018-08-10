const BASE_API = 'http://neumontcsc270.dynu.net:2018/piokf-back';

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
        method: 'POST',
        body: JSON.stringify(page)
    }).then(res => res.json());
}

function createPage(title) {
    return fetch(`${BASE_API}/addParentPage.php`, {
        method: 'POST',
        body: JSON.stringify({title: title})
    }).then(res => res.json());
}

function createChildPage(childTitle, parentId){
    return fetch(`${BASE_API}/addChildPage.php`, {
        method: 'POST',
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