import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement, deleteElement } from '../actions/elementActions';

// textfield for editing attributes of an element
class AttributeTextField extends Component {
    render() {
        let name = this.props.name;
        let value = this.props.value;
        return(
            <div style={{minWidth: 100}}>
                <label>{name}</label><br />
                <textarea value={value} onChange={(e) => {this.props.onChange(e, name)}} />
            </div>
        )
    }
}

class TypeDropdown extends Component {
    render() {
        return (
            <select name='type' style={{fontSize: 18, border: '1px solid white'}} onChange={this.props.onChange}>
                {/* TODO this could be generated dynamically w/ a service, but time is short for now */}
                <option value='a' selected={this.props.value == 'a'}>Link</option>
                <option value='img' selected={this.props.value == 'img'}>Image</option>
                <option value='h1' selected={this.props.value == 'h1'}>Header (H1)</option>
                <option value='p' selected={this.props.value == 'p'}>Paragraph</option>
            </select>
        )
    }
}


class InspectorComponent extends Component {
    constructor(props) {
        super(props);
        this.onAttributeChange = this.onAttributeChange.bind(this);
        this.onInnerHTMLChange = this.onInnerHTMLChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
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

    onTypeChange(evt) {
        console.log('InspectorComponent => onTypeChange');
        let type = evt.target.value;
        let updatedElement = {...this.props.activeElement};
        updatedElement.type = type;
        this.props.updateElement(updatedElement);
    }

    getAttributeArray(element) {
        let attributeArray = [];

        if (element != null && element.attributes != null) {
            for (let j = 0; j < element.attributes.length; ++j) {
                let attributes = element.attributes[j];

                for (let attribute in attributes) {
                    let value = attributes[attribute];
                    attributeArray.push(
                        <AttributeTextField name={attribute} value={value} onChange={this.onAttributeChange} />
                    )
                }
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
                {element && element.type ? <div><label>Type:</label><br /><TypeDropdown onChange={this.onTypeChange} value={element.type} /></div> : null}
                {element && element.innerHTML ? <AttributeTextField name='innerHTML' value={element.innerHTML} onChange={this.onInnerHTMLChange}/> : ''}
                {attributeArray}
                {element && element.type ? <button onClick={this.props.deleteElement}>Delete</button> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateElement: (element) => {
            dispatch(updateElement(element));
        },
        deleteElement: (element) => {
            dispatch(deleteElement(element));
        }
    }
}

export default connect(null, mapDispatchToProps)(InspectorComponent);