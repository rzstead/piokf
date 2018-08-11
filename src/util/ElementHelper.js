import React from 'react';
import WrapperElement from '../components/WrapperElement';

function mergeExtractedStylesToObject(extractedStyles) {
    let styles = {};

    for (let j = 0; j < extractedStyles.length; ++j) {
        let style = extractedStyles[j];
        let key = Object.keys(style)[0];
        let value = style[key];

        if (isNaN(value)) {
            // is a string
            styles[key] = value;
        } else {
            // is a number
            styles[key] = parseInt(value);
        }
    }
    return styles;
}

function mergeExtractedAttributesToObject(extractedAttributes) {
    let attributes = {};

    for (let j = 0; j < extractedAttributes.length; ++j) {
        let attribute = extractedAttributes[j];
        let key = Object.keys(attribute)[0];
        let value = attribute[key];
        attributes[key] = value;
    }
    return attributes;
}

// this is a hack to get around how the API stores its styles:
// example:
// before => {'attribute': 'color', 'value': '#f00'}
// after  => {'color': '#f00'}
function mapStyles(data) {
    let extractedStyles = extractStyles(data);
    return mergeExtractedStylesToObject(extractedStyles);
}

// this is a hack to get around how API stores its attributes:
// example:
// before => { 'name': 'href', 'value': 'www.google.com' }
// after  => { 'href': 'www.google.com' }
function mapAttributes(data) {
    let extractedAttributes = extractAttributes(data);
    console.log('extractedAttributes => ' + JSON.stringify(extractedAttributes));
    return mergeExtractedAttributesToObject(extractedAttributes);
}

function createElementFromType(type, data = {}, key) {
    let styles = mapStyles(data);
    let attributes = mapAttributes(data);

    switch (type) {
        case 'a':
            return <a href={attributes.href ? attributes.href : '#'} target='_blank' style={styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Link'}</a>
        case 'img':
            return <img src={attributes.src ? attributes.src : 'https://noot.space/noot.gif'} alt={data.attributes.alt ? data.attributes.alt : 'noot.gif'} style={styles}/>
        case 'h1':
            return <h1 style={styles}>{data.innerHTML ? data.innerHTML : 'PlaceHolder Header'}</h1>
        case 'hr':
            return <hr style={styles}/>
        case 'p':
            return <p style={styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Text'}</p>
        default:
            throw console.error('Unsupported type: ' + JSON.stringify(type));
    }
}

function createPlaceholder(type) {
    return {
        type: type, 
        id: '',
        attributes: {

        },
        styles: {

        },
        innerHTML: 'test'
    }
}

function createWrappedElement(type, element = {}, key) {
    let renderableElement = createElementFromType(type, element, key);
    return <WrapperElement key={key} element={element} renderableElement={renderableElement} />
}


function createElements(pageData, isWrapped) {
    let elements = [];

    pageData.elements.map((element, i) => {
        let type = element.type;
        let key = i;
        let data = {
            innerHTML: element.innerHTML,
            styles: element.styles,
            attributes: element.attributes[0]
        }
        if(isWrapped){
            elements.push(createWrappedElement(type, element, key));
        }else{
            elements.push(createElementFromType(type, element, key));
        }
    });
    return elements;
}

// find the correct style object in the styleArray that has the given type for 'attribute'
// returns -1 if not found
function findStyleAttributeIndex(attributeType, styleArray) {
    return styleArray.findIndex(s => s.attribute == attributeType);
}

// find the correct attribute in the attributeArray
// returns -1 if not found
function findDataAttributeIndex(attributeType, attributeArray) {
    return attributeArray.findIndex(a => a.name == attributeType);
}

// extract the {'attribute': 'value'} styles from element into
// an array containing the actual value for each such as
// [{'backgroundColor': 'red'}, {'fontSize': 18}]
function extractStyles(element) {
    let stylesArray = [];

    if (element != null && element.styles != null) {
        for (var j = 0; j < element.styles.length; ++j) {
            // {attribute: 'someAttribute', value: 'someValue'}
            let styleObject = element.styles[j];
            let style = {
                [styleObject.attribute]: styleObject.value
            }
            stylesArray.push(style);
        }
    }
    return stylesArray;
}

function extractAttributes(element) {
    let attributesArray = [];
    
    if (element != null && element.attributes != null) {
        for (var j = 0; j < element.attributes.length; ++j) {
            // { name: 'attribute_name', value: 'someValue' }
            let attributeObject = element.attributes[j];
            let attribute = {
                [attributeObject.name]: attributeObject.value
            }
            attributesArray.push(attribute);
        }
    }
    return attributesArray;
}

export var ElementHelper = {
    createElementFromType: createElementFromType,
    createElements: createElements,
    createPlaceholder: createPlaceholder,
    createWrappedElement: createWrappedElement,
    extractStyles: extractStyles,
    findStyleAttributeIndex: findStyleAttributeIndex,
    findDataAttributeIndex: findDataAttributeIndex
}