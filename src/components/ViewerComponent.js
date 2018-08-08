import React, { Component } from 'react';

export default class ViewerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: []
        }
    }

    onReceivedPage(page) {
        let elements = [];
        elements = page.elements.map((element, i) => {
            let type = element.type;
            let styles = element.styles[0];
            let attributes = element.attributes[0];
            let innerHTML = element.innerHTML;
            let key = i;
            let createdElement = this.createElement(type, innerHTML, key, styles, attributes);
        return(createdElement);
        });

        this.setState({elements: elements})
    }

    addElement(type){
        let elements = this.state.elements;
        let createdElement = this.createElement(type);
        elements.push(createdElement);
        this.setState({elements: elements});
    }

    createElement(type, innerHTML, key, styles, attributes){
        var element;
        switch(type){
            case 'a':
                element = <a href={attributes && attributes.href ? attributes.href : '#'} target='_blank' style={styles}>{innerHTML ? innerHTML : 'Placeholder Link'}</a>
                break;
            case 'img':
                element = <img src={attributes && attributes.src ? attributes.src : 'https://noot.space/noot.gif'} alt={attributes && attributes.alt ? attributes.alt : 'noot.gif'} style={styles}/>
                break;
            case 'h1':
                element = <h1 style={styles}>{innerHTML ? innerHTML : 'Placeholder Header'}</h1>
                break;
            case 'p':
                element = <p style={styles}>Placeholder Text</p>
                break;
            case 'hr':
                element = <hr style={styles}/>
                break;
            default:
                throw console.error("Unsupported type!");
        }

        //this onclick somehow gets called on browse bar click?
        return <div className="element-wrapper" key={key} onClick={this.props.onElementClicked(element)}>{element}</div>;
    }

    render() {
        return(
            <div>
                {this.state.elements}
            </div>
        )
    }
}