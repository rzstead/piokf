async function authenticate(user, pass){
    //fetch('http://neumontcsc270.dynu.net:2018/piokf-back/loadPages.php').then(res => res.json()).then(json => console.log('received from api: ' + JSON.stringify(json)));

    return new Promise((resolve, reject) => {
        let itWorked = true;
        if (itWorked) {
            resolve(pageMetas);
        } else {
            reject(Error("Something went wrong with the Page service!"));
        }
    });
}