import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPageMetas } from '../actions/metaActions';
import { addElement } from '../actions/elementActions';
import { changeRoute, setAuthenticated } from '../actions/pageActions';
import BrowseComponent from '../components/BrowseComponent';
import ViewerComponent from '../components/ViewerComponent';
import InspectorComponent from '../components/InspectorComponent';
import CreateRibbonComponent from '../components/CreateRibbonComponent';
import ElementInsertComponent from '../components/ElementInsertComponent';
import NavComponent from '../components/NavComponent';
import Cookies from 'js-cookie';


class MotherComponent extends Component {
    constructor(props) {
        super(props);
        this.onInsertElementClicked = this.onInsertElementClicked.bind(this);
        this.onAddElementClicked = this.onAddElementClicked.bind(this);
    }

    componentDidMount() {
        console.log("IS AUTHENTICATED: " + this.props.isAuthenticated);
        if(this.props.isAuthenticated || Cookies.get('Authorization')){
            this.props.setAuthenticated();
            this.props.fetchPageMetas();
        }else{
            this.props.changeRoute('login');
        }
    }

    onInsertElementClicked(evt) {
        console.log('MotherComponent => onInsertElementClicked');
        let buttonBounds = evt.target.getBoundingClientRect();
        this.refs.ribbon.showSelf(buttonBounds);
    }

    onAddElementClicked(type) {
        console.log('MotherComponent => onAddElementClicked => ' + JSON.stringify(type));
        this.props.addElement(type);
    }

    render() {
        return(
            <div style={{overflowY: 'hidden'}}>
                <div style={{display: 'flex', flex: 12, height: '100vh'}} className='container'>
                    <div style={{flex: 3, height: '100vh', overflowY: 'auto', border: '1px solid #222'}} className='panel'>
                        <BrowseComponent pageMetas={this.props.pageMetas} />
                    </div>
                    <div style={{flex: 6, overflowY: 'auto', position: 'relative'}} className='panel'>
                        <div style={{display: 'flex', flex: 12, flexDirection: 'column', justifyContent: 'space-between', height: '100%', overflow: 'hidden'}}>
                            <NavComponent />
                            <div style={{display: 'flex', flex: 11}}>
                                <ViewerComponent isLoading={this.props.isLoading} renderableElements={this.props.renderableElements} />
                            </div>
                            <div style={{display: 'flex', flex: 1, maxHeight: 35, padding: 15, justifySelf: 'flex-end'}}>
                                <ElementInsertComponent ref='ribbon' onInsertElementClicked={this.onInsertElementClicked} />
                            </div>
                        </div>
                    </div>
                    <div style={{flex: 3, overflowY: 'auto', border: '1px solid #222'}} className='panel'>
                        <InspectorComponent activeElement={this.props.activeElement} />
                    </div>
                </div>
                    <CreateRibbonComponent ref='ribbon' onAddElementClicked={this.onAddElementClicked} />
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
    activeElement: state.app.activeElement,
    isAuthenticated: state.app.isAuthenticated,
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPageMetas: () => {
            dispatch(fetchPageMetas());
        },
        addElement: (type) => {
            dispatch(addElement(type));
        },
        changeRoute: (route) => {
            dispatch(changeRoute(route))
        },
        setAuthenticated: () => {
            dispatch(setAuthenticated())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MotherComponent);