import React, { Component } from 'react';


export default class BrowseComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageMetas: []
        }
        this.onReceivedMetas = this.onReceivedMetas.bind(this);
    }

    onReceivedMetas(metas){
        this.setState({pageMetas: metas});
    }

    render(){
        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {this.state.pageMetas.map((element, i) => 
                    {
                    return(<div key={i} onClick={() => {this.props.onPageChoice(element.id)}}><h4 className="page-tab">{element.title}</h4></div>);
                    })
                }
            </div>
        );
    }
}