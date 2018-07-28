import React, { Component } from 'react';

import ViewerComponent from './ViewerComponent';
import InspectorComponent from "./InspectorComponent";
import { PageService } from '../services/PageService';
import BrowseComponent from './BrowseComponent';

/**
 * Main editor component that will contain the browser sidebar,
 * viewer, and property panel
 */
export default class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: []
        }
        this.foo = this.foo.bind(this);
        this.onPageChoice = this.onPageChoice.bind(this);
    }

    componentWillMount() {
        PageService.getPageMetas()
            .then(json => {
                console.log("Page meta ->"  + JSON.stringify(json));
                this.refs.browser.onReceivedMetas(json);
            });
    }

    foo(element) {
        console.log('EditorComponent received => ' + JSON.stringify(element));
        this.refs.inspector.onReceivedElement(element);
    }

    onPageChoice(id){
        PageService.getPage(id)
            .then(json =>{
                this.refs.viewer.onReceivedPage(json);
            });
    }

    render() {
        return(
            <div style={{display: 'flex', flex: 12, height: '100%' }} className='container'>
                <div style={{flex: 3, backgroundColor: 'red'}} className='panel'>
                <BrowseComponent ref='browser' onPageChoice={this.onPageChoice}/>
                </div>
                <div style={{width: 20, backgroundColor: 'grey'}} className='panel'>
                </div>
                <div style={{flex: 6, backgroundColor: 'green'}} className='viewer'>
                <ViewerComponent ref='viewer' onElementClicked={this.foo} />
                </div>
                <div style={{flex: 3, backgroundColor: 'blue'}} className='panel'>
                <InspectorComponent ref='inspector'/>
                </div>
            </div>
        )
    }
}