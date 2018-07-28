import React, { Component } from 'react';

export default class ViewerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: []
        }

        this.onReceivedPage = this.onReceivedPage.bind(this);
    }

    onReceivedPage(page) {
        let elements = [];
        //let styles = page.elements[0].styles[0];
        //let href = page.elements[0].attributes[0].href;
        //elements.push(<div key='foo' onClick={() => {this.props.onElementClicked(page.elements[0])}}><a style={styles} key={0} href={href}>{page.elements[0].innerHTML}</a></div>);
        elements.push(<div key="foo">{JSON.stringify(page)}</div>)
        this.setState({elements: elements})
    }

    render() {
        return(
            <div>
                {this.state.elements}
            </div>
        )
    }
}