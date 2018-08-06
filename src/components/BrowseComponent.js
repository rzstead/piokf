import React, { Component } from 'react';

class PageListItem extends Component {
    render() {
        return(
            <div>
                <h4>{this.props.element.title}</h4>
            </div>
        )
    }
}

export default class BrowseComponent extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let pageMetas = this.props.pageMetas || [];
        console.log('BrowseComponent rendering => ' + JSON.stringify(pageMetas));
        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {pageMetas.map((element, i) => 
                    {
                    return <PageListItem key={i} element={element} />
                    })
                }
            </div>
        );
    }
}