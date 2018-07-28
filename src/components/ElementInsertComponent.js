import React, { Component } from 'react';


export default class ElementInsertComponent extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <i style={{margin:0, marginTop: 150, color: '#666'}} className="material-icons" onMouseEnter={(evt) => {this.props.onInsertElementClicked(evt)}}>add_circle_outline</i>
            </div>
        );
    }
}