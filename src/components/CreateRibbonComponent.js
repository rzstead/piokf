import React, { Component } from 'react';


export default class CreateRibbonComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            top: '0',
            left: '0',
            className: 'ribbon hide'
        }
        this.showSelf = this.showSelf.bind(this);
        this.hideSelf = this.hideSelf.bind(this);
    }

    showSelf(buttonBounds){
        let top = buttonBounds.bottom - 34;
        let left = buttonBounds.left;
        this.setState({top: top, left: left, className:'ribbon show'});
    }

    hideSelf(){
        this.setState({className:'ribbon hide'});
    }

    render(){
        let top = this.state.top;
        let left = this.state.left;
        return(
            <div className={this.state.className} style={{top: top, left: left}} onMouseLeave={this.hideSelf}>
                <i className="material-icons">link</i>
                <i className="material-icons">photo</i>
                <i className="material-icons">format_bold</i>
                <i className="material-icons">text_fields</i>
                <i className="material-icons">code</i>
            </div>
        );
    }
}