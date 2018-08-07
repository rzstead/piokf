import React, { Component } from 'react';

export default class InspectorComponent extends Component {
    getAttributeArray(element) {
        let attributeArray = [];

        for (let j = 0; j < element.attributes.length; ++j) {
            let attributes = element.attributes[j];

            for (let attribute in attributes) {
                let value = attributes[attribute];
                attributeArray.push(
                    <div>
                        <label>{attribute}</label><br />
                        <textarea value={value} />
                    </div>
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
                {element && element.innerHTML ? <textarea value={element.innerHTML} /> : ''}
                {attributeArray}
            </div>
        )
    }
}