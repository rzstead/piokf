import React, { Component } from 'react';

export default class InspectorComponent extends Component {
    render() {
        return(
            <div>
                <h3 className='component-title'>Properties</h3>
                <p>{this.props.activeElement.id}</p>
            </div>
        )
    }
}