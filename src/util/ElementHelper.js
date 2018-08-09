import React from 'react';
import WrapperElement from '../components/WrapperElement';

function mergeExtractedStylesToObject(extractedStyles) {
    let styles = {};

    for (let j = 0; j < extractedStyles.length; ++j) {
        let style = extractedStyles[j];
        let key = Object.keys(style)[0];
        let value = style[key];
        styles[key] = value;
    }
    return styles;
}

// this is a hack to get around how the API stores its styles:
// example:
// before => {'attribute': 'color', 'value': '#f00'}
// after  => {'color': '#f00'}
function mapStyles(data) {
    let extractedStyles = extractStyles(data);
    return mergeExtractedStylesToObject(extractedStyles);
}

function createElementFromType(type, data = {}, key) {
    let styles = mapStyles(data);

    switch (type) {
        case 'a':
            return <a href={data.attributes && data.attributes.href ? data.attributes.href : '#'} target='_blank' style={data.styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Link'}</a>
        case 'img':
            return <img src={data.attributes && data.attributes.src ? data.attributes.src : 'https://noot.space/noot.gif'} alt={data.attributes && data.attributes.alt && data.attributes.alt ? data.attributes.alt : 'noot.gif'} style={data.styles}/>
        case 'h1':
            return <h1 style={styles}>{data.innerHTML ? data.innerHTML : 'PlaceHolder Header'}</h1>
        case 'hr':
            return <hr style={data.styles}/>
        case 'p':
            return <p style={data.styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Text'}</p>
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

export var ElementHelper = {
    createElementFromType: createElementFromType,
    createElements: createElements,
    createPlaceholder: createPlaceholder,
    createWrappedElement: createWrappedElement,
    extractStyles: extractStyles
}