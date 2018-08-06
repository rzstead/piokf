import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement } from '../actions/elementActions';

const A    =  ({data}) => <a href={data.attributes && data.attributes.href ? data.attributes.href : '#'} target='_blank' style={data.styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Link'}</a>
const IMG  =  ({data}) => <img src={data.attributes && data.attributes.src ? data.attributes.src : 'https://noot.space/noot.gif'} alt={data.attributes && data.attributes.alt && data.attributes.alt ? data.attributes.alt : 'noot.gif'} style={data.styles}/>
const H1   =  ({data}) => <h1 style={data.styles}>{data.innerHTML ? data.innerHTML : 'PlaceHolder Header'}</h1>
const HR   =  ({data}) => <hr style={data.styles}/>
const P    =  ({data}) => <p style={data.styles}>{data.innerHTML ? data.innerHTML : 'Placeholder Text'}</p>

class WrapperElement extends Component {
    constructor(props) {
        super(props);
        this.getElementForType = this.getElementForType.bind(this);
    }

    getElementForType(type) {
        console.log('WrapperElement => getElementForType => ' + type);
        console.log('data => ' + JSON.stringify(this.props.data));
        switch (type) {
            case 'a':
                return <A data={this.props.data} />
            case 'img':
                return <IMG data={this.props.data} />
            case 'h1':
                return <H1 data={this.props.data} />
            case 'hr':
                return <HR data={this.props.data} />
            case 'p':
                return <P data={this.props.data} />
            default:
                throw console.error('Unsupported type: ' + JSON.stringify(type));
        }
    }

    render() {
        let element = this.getElementForType(this.props.type);
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