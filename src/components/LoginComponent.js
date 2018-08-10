import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/pageActions';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(evt){
        evt.preventDefault();
        console.log('onLogin has been called!');
        let username = document.getElementById('usernameInput').value;
        let password = document.getElementById('passwordInput').value;
        console.log(username + " : " + password);
        this.props.login(username, password);
        
    }

    render(){
        return (
            <div className="login-card">
                <div className="login-content">
                    <h2>Log In.</h2>
                    <form onSubmit={this.onLogin}>
                        <label htmlFor="email">Username</label>
                        <input id='usernameInput' name="email" type="text"/>
                        <label htmlFor="password">Password</label>
                        <input id='passwordInput' name="password" type="password"/>
                        <input className="submit" type="submit" value="Go"/>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user, pass) => {
            dispatch(login(user, pass));
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginComponent)