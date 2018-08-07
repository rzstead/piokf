import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement } from '../actions/elementActions';
import { ElementHelper } from '../util/ElementHelper';

class WrapperElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let element = ElementHelper.createElementFromType(this.props.type, this.props.data);
        // let element = this.getElementForType(this.props.type);
        return(
            <div className='element-wrapper' onClick={() => { this.props.onClick(this.props.data)}}>
                {element}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // data: state.elements.selectedElement
});

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps, null)(WrapperElement);