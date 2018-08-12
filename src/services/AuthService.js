import Base64 from 'base-64';
const BASE_API = 'http://neumontcsc270.dynu.net:2018/piokf-back';

function authenticate(username, password){
    return fetch(`${BASE_API}/login.php`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Authorization : 'Basic ' + Base64.encode(username + ':' + password)
        }
    }).then(res => res.json());
}

export var AuthService = {
    authenticate: authenticate
}