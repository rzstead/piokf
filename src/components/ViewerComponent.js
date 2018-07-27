import React, { Component } from 'react';

export default class ViewerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Hello',
            elements: [],
            pages: []
        }

        this.onReceivedPage = this.onReceivedPage.bind(this);
    }

    onReceivedPage(page) {
        let elements = [];
        let styles = page.elements[0].styles[0];
        let href = page.elements[0].attributes[0].href;
        elements.push(<a style={styles} key={0} href={href}>{page.elements[0].innerHTML}</a>);
        console.log('ViewerComponent received page => ' + JSON.stringify(page));
        console.log('Attributes are =>' + JSON.stringify(page.elements[0].attributes[0].href));
        console.log('Styles are =>' + JSON.stringify(styles));
        this.setState({elements: elements})
    }

    render() {
        return(
            <div>
                <h1 style={{color: 'orange'}}>Test</h1>
                {this.state.elements}
            </div>
        )
    }
}