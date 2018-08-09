import React, { Component } from 'react';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="login-card">
                <div className="login-content">
                    <h2>Log In.</h2>
                    <label htmlFor="email">Username</label>
                    <input name="email" type="text"/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password"/>
                    <input className="submit" type="submit" value="Go"/>
                </div>
            </div>
        );
    }
}