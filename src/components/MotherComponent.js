import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPageMetas } from '../actions/metaActions';
import BrowseComponent from '../components/BrowseComponent';
import ViewerComponent from '../components/ViewerComponent';
import InspectorComponent from '../components/InspectorComponent';


class MotherComponent extends Component {
    componentDidMount() {
        this.props.fetchPageMetas();
    }

    render() {
        return(
            <div style={{overflowY: 'hidden'}}>
                <div style={{display: 'flex', flex: 12, height: '100vh'}} className='container'>
                    <div style={{flex: 3, height: '100vh', overflowY: 'auto', border: '1px solid #222'}} className='panel'>
                        <BrowseComponent pageMetas={this.props.pageMetas} />
                    </div>
                    <div className='element-insert'>
                        {/* <ElementInsertComponent ref='ribbon' onInsertElementClicked={this.onInsertElementClicked} /> */}
                    </div>
                    <div style={{flex: 6, overflowY: 'auto'}} className='panel'>
                        <h3>{this.props.pageData.title}</h3>
                        <ViewerComponent renderableElements={this.props.renderableElements} />
                    </div>
                    <div style={{flex: 3, border: '1px solid #222'}} className='panel'>
                        <InspectorComponent activeElement={this.props.activeElement} />
                    </div>
                </div>
                {/* <CreateRibbonComponent ref='ribbon' onAddElementClicked={this.onAddElementClicked} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.app.isLoading,
    isEditing: state.app.isEditing,
    error: state.app.error,
    pageMetas: state.app.pageMetas,
    pageData: state.app.pageData,
    renderableElements: state.app.renderableElements,
    activeElement: state.app.activeElement
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPageMetas: () => {
            dispatch(fetchPageMetas());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MotherComponent);