import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPageMetas } from '../actions/metaActions';
import BrowseComponent from './BrowseComponent';
import ElementInsertComponent from './ElementInsertComponent';
import ViewerComponent from './ViewerComponent';
import InspectorComponent from './InspectorComponent';

class MotherComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPageMetas();
    }

    render() {
        console.log('metas => ' + JSON.stringify(this.props.pageMetas));
        return(
            <div style={{overflowY: 'hidden'}}>
                <div style={{display: 'flex', flex: 12, height: '100vh'}} className='container'>
                    <div style={{flex: 3, height: '100vh', overflowY: 'auto'}} className='panel'>
                        <BrowseComponent pageMetas={this.props.pageMetas}/>
                    </div>
                    <div className='element-insert'>
                        <ElementInsertComponent />
                    </div>
                    <div style={{flex: 6, overflowY: 'auto'}} className='panel'>
                        <ViewerComponent />
                    </div>
                    <div style={{flex: 3}} className='panel'>
                        <InspectorComponent />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.metas.isLoading,
    pageMetas: state.metas.pageMetas
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPageMetas: () => {
            dispatch(fetchPageMetas());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MotherComponent);