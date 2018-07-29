import React, { Component } from 'react';


export default class ElementInsertComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            locations: [{
                    height: '32px'
                },
                {
                    height: '120px'
                },
                {
                    height: '560px'
                },
                {
                    height: '310px'
                },
                {
                    height: '80px'
                },

            ]
        }
    }

    addLocation(location){
        let locations = this.state.locations;
        locations.push(location);
        this.setState({locations:locations});
    }

    render(){
        return(
            <div>
                {this.state.locations.map((location, i) =>{
                    return(
                    <i key={i} style={{margin:0, top: location.height}} className="material-icons element-add" onMouseEnter={(evt) => {this.props.onInsertElementClicked(evt)}}>add_circle_outline</i>
                    );
                })}
            </div>
        );
    }
}