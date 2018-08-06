import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPageMetas } from '../actions/metaActions';
import { createElementFromType } from '../actions/elementActions';
import BrowseComponent from './BrowseComponent';
import ElementInsertComponent from './ElementInsertComponent';
import ViewerComponent from './ViewerComponent';
import InspectorComponent from './InspectorComponent';
import CreateRibbonComponent from './CreateRibbonComponent';

class MotherComponent extends Component {
    constructor(props) {
        super(props);
        this.onInsertElementClicked = this.onInsertElementClicked.bind(this);
        this.onAddElementClicked = this.onAddElementClicked.bind(this);
    }

    componentDidMount() {
        this.props.fetchPageMetas();
    }

    onInsertElementClicked(evt) {
        console.log('MotherComponent => onInsertElementClicked');
        let buttonBounds = evt.target.getBoundingClientRect();
        this.refs.ribbon.showSelf(buttonBounds);
    }

    onAddElementClicked(type) {
        console.log('MotherComponent => onAddElementClicked => ' + JSON.stringify(type));
        this.props.createElementFromType(type);
    }

    render() {
        console.log('metas => ' + JSON.stringify(this.props.pageMetas));
        return(
            <div style={{overflowY: 'hidden'}}>
                <div style={{display: 'flex', flex: 12, height: '100vh'}} className='container'>
                    <div style={{flex: 3, height: '100vh', overflowY: 'auto', border: '1px solid #222'}} className='panel'>
                        <BrowseComponent pageMetas={this.props.pageMetas} />
                    </div>
                    <div className='element-insert'>
                        <ElementInsertComponent ref='ribbon' onInsertElementClicked={this.onInsertElementClicked} />
                    </div>
                    <div style={{flex: 6, overflowY: 'auto'}} className='panel'>
                        <ViewerComponent ref='viewer' page={this.props.page} />
                    </div>
                    <div style={{flex: 3, border: '1px solid #222'}} className='panel'>
                        <InspectorComponent />
                    </div>
                </div>
                <CreateRibbonComponent ref='ribbon' onAddElementClicked={this.onAddElementClicked} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.metas.isLoading,
    pageMetas: state.metas.pageMetas,
    page: state.pages.page
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPageMetas: () => {
            dispatch(fetchPageMetas());
        },
        createElementFromType: (type) => {
            dispatch(createElementFromType(type));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MotherComponent);