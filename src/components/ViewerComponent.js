import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectElement, deSelectElement } from '../actions/elementActions';
import WrapperElement from '../components/WrapperElement';

class ViewerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
        }
        this.onElementClicked = this.onElementClicked.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log('ViewerComponent => componentWillReceiveProps => ' + JSON.stringify(newProps));
        if (newProps.page != null) {
            this.onReceivedPage(newProps.page);
        }
    }

    onElementUpdated(element) {
        console.log('ViewerComponent => onElemenetUpdated');
    }

    onReceivedPage(page) {
        console.log('ViewerComponent => onReceivedPage => ' + JSON.stringify(page));
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

    onElementClicked(element) {
        console.log('ViewerComponent => onElementClicked => ' + JSON.stringify(element));
        this.props.selectElement(element);
    }

    createElement(type, innerHTML, key, styles, attributes){
        // var element;
        const data = {
            innerHTML: innerHTML,
            styles: styles,
            attributes: attributes,
        };
        // switch(type){
        //     case 'a':
        //         element = <a href={attributes && attributes.href ? attributes.href : '#'} target='_blank' style={styles}>{innerHTML ? innerHTML : 'Placeholder Link'}</a>
        //         break;
        //     case 'img':
        //         element = <img src={attributes && attributes.src ? attributes.src : 'https://noot.space/noot.gif'} alt={attributes && attributes.alt ? attributes.alt : 'noot.gif'} style={styles}/>
        //         break;
        //     case 'h1':
        //         element = <h1 style={styles}>{innerHTML ? innerHTML : 'Placeholder Header'}</h1>
        //         break;
        //     case 'p':
        //         element = <p style={styles}>Placeholder Text</p>
        //         break;
        //     case 'hr':
        //         element = <hr style={styles}/>
        //         break;
        //     default:
        //         throw console.error("Unsupported type!");
        // }

        //this onclick somehow gets called on browse bar click?
        // return <div className="element-wrapper" key={key} onClick={this.props.onElementClicked(element)}>{element}</div>;
        return <WrapperElement key={key} data={data} type={type} onClick={this.onElementClicked} />
    }

    render() {
        return(
            <div>
                {this.state.elements}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedElement: state.elements.selectedElement
});

const mapDispatchToProps = dispatch => {
    return {
        selectElement: (element) => {
            dispatch(selectElement(element));
        },
        deSelectElement: (element) => {
            dispatch(deSelectElement(element));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerComponent);