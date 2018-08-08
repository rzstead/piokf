import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRoute } from '../actions/pageActions';
import MotherComponent from './MotherComponent';
import ViewerComponent from './ViewerComponent';

let LOGIN = 'Login';
let EDITOR = 'Editor';
let VIEWER = 'Viewer';

class RouterComponent extends Component {

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(){
        this.props.changeRoute('Editor');
    }

    render() {
        let component = <ViewerComponent renderableElements={this.props.renderableElements} />
        switch (this.props.routeName) {
            case LOGIN:
                component = <h1 style={{ color: 'red' }}>Login</h1>
                break;
            case EDITOR:
                component = <MotherComponent />
                break;
            case VIEWER:
                component = <ViewerComponent renderableElements={this.props.renderableElements} />
                break;
        }
        return (
            <div>
            {component}
            <button onClick={this.onButtonClick}>Click Me</button>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    routeName: state.app.routeName,
    renderableElements: state.app.renderableElements
});

const mapDispatchToProps = dispatch => {
    return {
        changeRoute: (route) => {
            dispatch(changeRoute(route))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

