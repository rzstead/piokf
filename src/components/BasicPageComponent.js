import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BasicPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: null
        }
    }

    render(){
        return (
            <div>
                BASIC PAGE
                <Link className="admin-link" to="/login">Admin</Link>
            </div>
        );
    }
}