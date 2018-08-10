//import Base64 from 'base-64';
function authenticate(user, pass){
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + user + ':' + pass);
    fetch('http://neumontcsc270.dynu.net:2018/piokf-back/login.php', {
        method: 'post',
        headers: headers
    })
        .then(res => res.headers.then(headers => console.log('received from login: ' + JSON.stringify(headers))));
}

export var AuthService = {
    authenticate: authenticate
}