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
        elements.push(<div key='foo' style={{padding: 4, border: '1px solid black'}} onClick={() => {this.props.onElementClicked(page.elements[0])}}><a style={styles} key={0} href={href}>{page.elements[0].innerHTML}</a></div>);
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