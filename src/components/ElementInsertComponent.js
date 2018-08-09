import React, { Component } from 'react';


export default class ElementInsertComponent extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='element-insert'>
                <i className="material-icons element-add" onMouseEnter={(evt) => {this.props.onInsertElementClicked(evt)}}>add</i>
            </div>
        );
    }
}