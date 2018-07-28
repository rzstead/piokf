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
            <div>
                {this.state.pageMetas.map((element, i) => 
                    {
                    return(<h1 key={i} onClick={() => {this.props.onPageChoice(element.id)}}>{element.title}</h1>);
                    })
                }
            </div>
        );
    }
}