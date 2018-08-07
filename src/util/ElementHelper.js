import React from 'react';

function createElementFromType(type, data) {
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

export var ElementHelper = {
    createElementFromType: createElementFromType
}