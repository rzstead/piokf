import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement } from '../actions/elementActions';

class InspectorComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     element: {
        //         props: {}
        //     }
        // }
    }

    componentWillReceiveProps(nextProps) {
        console.log('InspectorComponent => componentWillReceiveProps => ' + JSON.stringify(nextProps));
        this.setState({element: nextProps.selectedElement});
    }

    onReceivedElement(element) {
        console.log('InspectorComponent received => ' + JSON.stringify(element));
        // this.setState({element: element});
    }

    handleChange(e, prop) {
        let text = this.props.selectedElement.children + e.target.value;
        console.log('InspectorComponent => handleChange => ' + text);
        // let element = { ...this.props.selectedElement };
        // element[prop] = element[prop] + e.target.value;
        // console.log('new element => ' + JSON.stringify(element));
        // this.props.updateElement(element);
    }

    render() {
        let element = this.props.selectedElement || {};
        let styleKeys = Object.keys(element.styles || {});
        let styles = [];

        styleKeys.map(style => {
            styles.push(
                <div>
                    <label style={{display: 'inline'}}>{style}: </label>
                    <p style={{display: 'inline'}}>{element.styles[style]}</p>
                </div>
            )
        })

        console.log('InspectorComponent => render => ' + JSON.stringify(element));
        return(
            <div>
                <h3 className='component-title'>Properties</h3>
                {element && element.innerHTML ? <textarea value={element.innerHTML} onChange={(e) => {this.handleChange(e, element.innerHTML)}} /> : null }
                {styles}
                {/* <p>Children:{element.innerHTML}</p> */}
                {/* <textarea>{element.type}</textarea> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedElement: state.elements.selectedElement
});

const mapDispatchToProps = dispatch => {
    return {
        updateElement: (element) => {
            dispatch(updateElement(element));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InspectorComponent);