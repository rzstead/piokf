import React, { Component } from 'react';

class PageListItem extends Component {
    render() {
        return(
            <div>
                <h4 style={{color: 'red'}}>{this.props.element.title}</h4>
            </div>
        )
    }
}

export default class BrowseComponent extends Component{
    constructor(props) {
        super(props);
    }

    // onReceivedMetas(metas){
    //     this.setState({pageMetas: metas});
    // }

    render() {
        let pageMetas = this.props.pageMetas || [];
        console.log('BrowseComponent rendering => ' + JSON.stringify(pageMetas));
        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {pageMetas.map((element, i) => 
                    {
                    return <PageListItem key={i} element={element} />
                    // return(<div key={i} onClick={() => {this.props.onPageChoice(element.id)}}><h4 className="page-tab">{element.title}</h4></div>);
                    })
                }
            </div>
        );
    }
}