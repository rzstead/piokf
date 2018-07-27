import React, { Component } from 'react';

export default class InspectorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            element: {}
        }
    }

    onReceivedElement(element) {
        console.log('InspectorComponent received => ' + JSON.stringify(element));
        this.setState({element: element});
    }

    render() {
        return(
            <div>
                <p> I am the inspector panel! </p>
                <textarea>{this.state.element.innerHTML}</textarea>
            </div>
        )
    }
}