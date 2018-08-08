import React from 'react';
import WrapperElement from '../components/WrapperElement';

function createElementFromType(type, data = {}, key) {
    switch (type) {
        case 'a':
            return <a href={data.attributes && data.attributes.href ? data.attributes.href : '#'} target='_blank' style={data.styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Link'}</a>
        case 'img':
            return <img src={data.attributes && data.attributes.src ? data.attributes.src : 'https://noot.space/noot.gif'} alt={data.attributes && data.attributes.alt && data.attributes.alt ? data.attributes.alt : 'noot.gif'} style={data.styles}/>
        case 'h1':
            return <h1 style={data.styles}>{data.innerHTML ? data.innerHTML : 'PlaceHolder Header'}</h1>
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


function createElements(pageData) {
    let elements = [];

    pageData.elements.map((element, i) => {
        let type = element.type;
        let key = i;
        let data = {
            innerHTML: element.innerHTML,
            styles: element.styles[0],
            attributes: element.attributes[0]
        }
        let renderableElement = createElementFromType(type, data, key);
        elements.push(<WrapperElement key={key} element={element} renderableElement={renderableElement} />)
    });
    return elements;
}

export var ElementHelper = {
    createElementFromType: createElementFromType,
    createElements: createElements,
    createPlaceholder: createPlaceholder,
    createWrappedElement: createWrappedElement
}