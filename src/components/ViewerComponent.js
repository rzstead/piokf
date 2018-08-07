import React, { Component } from 'react';

export default class ViewerComponent extends Component {
    render() {
        return(
            <div>
                {this.props.renderableElements}
            </div>
        )
    }
}