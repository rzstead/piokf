import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement } from '../actions/elementActions';

// textfield for editing attributes of an element
class AttributeTextField extends Component {
    render() {
        let name = this.props.name;
        let value = this.props.value;
        return(
            <div style={{minWidth: 100}}>
                <label>{name}</label>
                <textarea value={value} onChange={(e) => {this.props.onChange(e, name)}} />
            </div>
        )
    }
}


class InspectorComponent extends Component {
    constructor(props) {
        super(props);
        this.onAttributeChange = this.onAttributeChange.bind(this);
        this.onInnerHTMLChange = this.onInnerHTMLChange.bind(this);
    }

    onAttributeChange(evt, attribute) {
        console.log('InspectorComponent => onAttributeChange => ' + attribute + ' => ' + evt.target.value);
        let updatedElement = {...this.props.activeElement};
        updatedElement.attributes[0][attribute] = evt.target.value;
        console.log('InspectorComponent => activeElement => ' + JSON.stringify(this.props.activeElement));
        this.props.updateElement(updatedElement);
    }

    onInnerHTMLChange(evt) {
        let innerHTML = evt.target.value;
        console.log('InspectorComponent => onInnerHTMLCHange => ' + innerHTML);
        let updatedElement = {...this.props.activeElement};
        updatedElement.innerHTML = innerHTML;
        this.props.updateElement(updatedElement);
    }

    getAttributeArray(element) {
        let attributeArray = [];

        for (let j = 0; j < element.attributes.length; ++j) {
            let attributes = element.attributes[j];

            for (let attribute in attributes) {
                let value = attributes[attribute];
                attributeArray.push(
                    <AttributeTextField name={attribute} value={value} onChange={this.onAttributeChange} />
                )
            }
        }
        return attributeArray;
    }

    render() {
        const element = this.props.activeElement;
        let attributeArray = this.getAttributeArray(element);
        // TODO get styles

        return(
            <div>
                <h3 className='component-title'>Properties</h3>
                {element && element.type ? <h2>{element.type}</h2>: ''}
                {element && element.innerHTML ? <AttributeTextField name='innerHTML' value={element.innerHTML} onChange={this.onInnerHTMLChange}/> : ''}
                {attributeArray}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateElement: (element) => {
            dispatch(updateElement(element));
        }
    }
}

export default connect(null, mapDispatchToProps)(InspectorComponent);