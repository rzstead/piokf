import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement, deleteElement } from '../actions/elementActions';
import { savePage } from '../actions/pageActions';
import { ElementHelper } from '../util/ElementHelper';

// textfield for editing attributes of an element
class AttributeTextField extends Component {
    render() {
        let name = this.props.name;
        let value = this.props.value;
        return(
            <div className='attribute-field'>
                <label className='attribute-field-name'>{name}</label><br />
                <textarea className='attribute-field-value' style={{resize: this.props.resize}} rows={1} value={value} onChange={(e) => {this.props.onChange(e, name)}} />
            </div>
        )
    }
}

class ColorField extends Component {
    render() {
        let name = this.props.name;
        let value = this.props.value;
        return(
            <div className='attribute-field'>
                <label className='attribute-field-name'>{name}</label>
                <input className='attribute-field-value-color' type='color' name={name} value={value} onChange={(e) => {this.props.onChange(e, name)}} />
                {/* spacer */}
                <div style={{flex: 4}} />
            </div>
        )
    }
}

class PropAttributesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
        this.onAddAttributesButtonClicked = this.onAddAttributesButtonClicked.bind(this);
    }

    onAddAttributesButtonClicked(evt) {
        let selected = this.state.selected;
        // console.log('PropAttributesComponent => onAddAttributesButtonClicked => ' + JSON.stringify(selected));
        // let selected = ['href', 'src'];
        this.props.onClick(evt, selected);
    }

    onCheckboxClicked(evt, prop) {
        let isChecked = evt.target.checked;
        console.log('PropAttributesComponent => onCheckBoxClicked => ' + prop + ' => ' + isChecked);
        let attributeArray = this.state.selected;
        let index = attributeArray.findIndex((attribute) => attribute == prop);

        if (isChecked) {
            if (index == -1) {
                attributeArray.push(prop);
            }
        } else {
            if (index != -1) {
                attributeArray.splice(index, 1);
            }
        }
        this.setState({selected: attributeArray});
    }

    render() {
        let radioButtons = [];
        for (let j = 0; j < this.props.values.length; ++j) {
            let value = this.props.values[j];
            radioButtons.push(
                <div className='style-button' style={{display: 'block'}}>
                    <label style={{padding: 4}}>
                        <input type='checkbox' value={value} onClick={(e) => {this.onCheckboxClicked(e, value)}} />
                        {value}
                    </label>
                    <br />
                </div>
            )
        }
        return(
            <div style={{overflowY: 'auto', height: 175, border: '1px solid #222', padding: 8, margin: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <div style={{position: 'sticky', top: 0, backgroundColor: 'white'}}>
                    <button onClick={this.onAddAttributesButtonClicked}>{this.props.title}</button>
                </div>
                {radioButtons}
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
        this.onSavePageButtonClicked = this.onSavePageButtonClicked.bind(this);
        this.onStyleChange = this.onStyleChange.bind(this);
        this.updateElementStyle = this.updateElementStyle.bind(this);
        this.updateElementAttribute = this.updateElementAttribute.bind(this);
        this.onAddStyleButtonClicked = this.onAddStyleButtonClicked.bind(this);
        this.onAddAttributesButtonClicked = this.onAddAttributesButtonClicked.bind(this);
        this.onDeleteElementButtonClicked = this.onDeleteElementButtonClicked.bind(this);
    }

    onAttributeChange(evt, attribute) {
        console.log('InspectorComponent => onAttributeChange => ' + attribute + ' => ' + evt.target.value);
        this.updateElementAttribute(attribute, evt.target.value);
    }

    onInnerHTMLChange(evt) {
        let innerHTML = evt.target.value;
        console.log('InspectorComponent => onInnerHTMLChange => ' + innerHTML);
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

    onStyleChange(evt, name) {
        console.log('InspectorComponent => onStyleChange => ' + name);
        this.updateElementStyle(name, evt.target.value);
    }

    // updates the specified style with specified style value
    updateElementStyle(styleName, styleValue) {
        let updatedElement = {...this.props.activeElement};
        let index = ElementHelper.findStyleAttributeIndex(styleName, updatedElement.styles);

        if (index != -1) {
            updatedElement.styles[index]['value'] = styleValue;
            this.props.updateElement(updatedElement);
        }
    }

    updateElementAttribute(attributeName, attributeValue) {
        let updatedElement = {...this.props.activeElement};
        let index = ElementHelper.findDataAttributeIndex(attributeName, updatedElement.attributes);

        console.log('InspectorComponent => updateElementAttribute => ' + attributeName + ' => ' + attributeValue + ' => ' + index);

        if (index != -1) {
            console.log('element index for attribute => ' + index);
            updatedElement.attributes[index]['value'] = attributeValue;
            this.props.updateElement(updatedElement);
        }
    }

    getStylePropsArray(styles) {
        let stylesArray = [];

        for (let j = 0; j < styles.length; ++j) {
            let style = styles[j];
            let key = Object.keys(style)[0];
            let value = style[key];

            let element;

            if (key.match(/color/i)) {
                // style is a color
                element = <ColorField name={key} value={value} onChange={this.onStyleChange} />
            } else {
                element = <AttributeTextField name={key} resize='none' value={value} onChange={this.onStyleChange}/>
            }
            stylesArray.push(element)
        }
        return stylesArray;
    }

    getAttributeArray(element) {
        let attributeArray = [];

        if (element != null && element.attributes != null) {
            for (let j = 0; j < element.attributes.length; ++j) {
                let attributes = element.attributes[j];
                let key = attributes['name'];
                let value = attributes['value'];

                attributeArray.push(
                    <AttributeTextField name={key} value={value} onChange={this.onAttributeChange} />
                )
            }
        }
        return attributeArray;
    }

    onSavePageButtonClicked() {
        console.log('InspectorComponent => onSavePageButtonClicked => ' + JSON.stringify(this.props.page));
        let page = {...this.props.page};
        console.log('SAVE_PAGE_DATA => ' + JSON.stringify(page));
        this.props.savePage(page);
    }

    onDeleteElementButtonClicked() {
        console.log('InspectorComponent => onDeleteElementButtonClicked');
        let page = {...this.props.page};
        let elementToDelete = {...this.props.activeElement};
        this.props.deleteElement(elementToDelete);
        // this.props.savePage(page);
    }

    onAddAttributesButtonClicked(evt, attributes) {
        console.log('InspectorComponent => onAttributesButtonClicked => ' + JSON.stringify(attributes));
        let activeElement = {...this.props.activeElement};
        let elementAttributes = [...activeElement.attributes];

        for (let j = 0; j < attributes.length; ++j) {
            let attribute = attributes[j];
            let index = elementAttributes.findIndex(s => s.name == attribute);

            if (index == -1) {
                elementAttributes.push({
                    name: attribute,
                    value: ""
                })
            }
        }
        console.log('elementAttributes => ' + JSON.stringify(elementAttributes));
        activeElement.attributes = elementAttributes;
        this.props.updateElement(activeElement);
    }

    onAddStyleButtonClicked(evt, styles) {
        console.log('InspectorComponent => onAddStyleButtonClicked => ' + JSON.stringify(styles));
        let activeElement = {...this.props.activeElement};
        let elementStyles = [...activeElement.styles];

        for (let j = 0; j < styles.length; ++j) {
            let style = styles[j];
            let index = elementStyles.findIndex(s => s.attribute == style);

            // property doesn't exist on our element, so let's add it
            if (index == -1) {
                elementStyles.push({
                    attribute: style,
                    value: ''
                });
            }
        }
        activeElement.styles = elementStyles;
        this.props.updateElement(activeElement);
    }

    onColorChange(evt) {
        console.log('InspectorComponent => onColorChange => ' + evt.target.value);
    }

    render() {
        const element = this.props.activeElement;
        console.log('element => ' + JSON.stringify(element));

        if (element == null || element.id == '') {
            // return just the title, don't show any editable attributes
            // probably a better way, but it works for now
            return <h3 className='component-title'>Properties</h3>
        }

        let attributeArray = this.getAttributeArray(element);
        let extractedStyles = ElementHelper.extractStyles(element);
        let styleArray = this.getStylePropsArray(extractedStyles);

        return(
            <div>
                <h3 className='component-title'>Properties</h3>
                {element.type ? <div><label>Type:</label><br /><TypeDropdown onChange={this.onTypeChange} value={element.type} /></div> : null}
                <h4>Attributes</h4>
                {element.innerHTML != null ? <AttributeTextField name='innerHTML' value={element.innerHTML} onChange={this.onInnerHTMLChange}/> : ''}
                <PropAttributesComponent onClick={this.onAddAttributesButtonClicked} values={this.props.availableAttributes} title='Add Attributes' />
                {attributeArray}

                <h4>Styles</h4>
                <PropAttributesComponent onClick={this.onAddStyleButtonClicked} title='Add Styles' values={this.props.availableStyles} />
                {styleArray}

                {element.type ? <button onClick={this.onDeleteElementButtonClicked}>Delete</button> : null}
                {element.type ? <button onClick={this.onSavePageButtonClicked}>Save Page</button> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    page: state.app.pageData,
    availableStyles: state.app.availableStyles,
    availableAttributes: ['alt', 'href']
});

const mapDispatchToProps = dispatch => {
    return {
        updateElement: (element) => {
            dispatch(updateElement(element));
        },
        deleteElement: (element) => {
            dispatch(deleteElement(element));
        },
        savePage: (page) => {
            dispatch(savePage(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorComponent);