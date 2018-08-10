import React, { Component } from 'react';
import Spinner from 'react-spinkit';

const LoadingIndicator = () => {
    return(
        <div style={{position: 'absolute', margin: 'auto', right: '50%', bottom: '50%', zIndex: 9}}>
            <Spinner name='line-spin-fade-loader' fadeIn='quarter' />
        </div>
    )
}

export default class ViewerComponent extends Component {
    render() {
        return(
            <div>
                {this.props.isLoading ? <LoadingIndicator /> : null}
                {this.props.renderableElements}
            </div>
        )
    }
}