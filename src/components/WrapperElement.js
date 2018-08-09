import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectElement } from '../actions/elementActions';

class WrapperElement extends Component {
    constructor(props) {
        super(props);
        this.onElementClicked = this.onElementClicked.bind(this);
    }

    onElementClicked(e) {
        e.preventDefault();
        console.log('WrapperElement => onElementClicked => ' + JSON.stringify(this.props.element));
        this.props.selectElement(this.props.element);
    }

    render() {
        return(
            <div class='element-wrapper' onClick={this.onElementClicked}>
                {this.props.renderableElement}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectElement: (element) => {
            dispatch(selectElement(element));
        }
    }
}

export default connect(null, mapDispatchToProps)(WrapperElement);