import Base64 from 'base-64';
const BASE_API = 'http://neumontcsc270.dynu.net:2018/piokf-back';

function authenticate(username, password){
    return fetch(`${BASE_API}/login.php`, {
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
    }).then(res => res.json())
    .then(json => {
        console.log("AUTH RESPONSE: " + JSON.stringify(json));
        }
    );
}

export var AuthService = {
    authenticate: authenticate
}