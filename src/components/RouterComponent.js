import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRoute, fetchPage } from '../actions/pageActions';
import MotherComponent from './MotherComponent';
import LoginComponent from './LoginComponent';
import ViewerComponent from './ViewerComponent';
import NavComponent from './NavComponent';


let LOGIN = 'login';
let EDITOR = 'editor';
let VIEWER = 'viewer';

class RouterComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const BASE_URL = 'http://localhost:3000/';
        let route = window.location.href.replace(BASE_URL, '');
        console.log('loading route => ' + route);
        this.props.changeRoute(route);
        if(!route && this.props.renderableElements.length == 0){
            this.props.fetchPage();
        }
    }

    render() {
        let component = 
        <div>
            <NavComponent />
            <ViewerComponent isLoading={this.props.isLoading} renderableElements={this.props.renderableElements} />
        </div>

        switch (this.props.routeName) {
            case LOGIN:
                component = <LoginComponent />
                break;
            case EDITOR:
                component = <MotherComponent />
                break;
        }
        return (
            <div>
                {component}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    routeName: state.app.routeName,
    renderableElements: state.app.renderableElements,
    isLoading: state.app.isLoading
});

const mapDispatchToProps = dispatch => {
    return {
        changeRoute: (route) => {
            dispatch(changeRoute(route))
        },
        fetchPage: () => {
            dispatch(fetchPage())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

