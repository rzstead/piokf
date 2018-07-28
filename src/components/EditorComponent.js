import React, { Component } from 'react';

import ViewerComponent from './ViewerComponent';
import InspectorComponent from "./InspectorComponent";
import { PageService } from '../services/PageService';
import BrowseComponent from './BrowseComponent';
import CreateRibbonComponent from './CreateRibbonComponent';
import ElementInsertComponent from './ElementInsertComponent';

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
        this.onInsertElementClicked = this.onInsertElementClicked.bind(this);
        this.onAddElementClicked = this.onAddElementClicked.bind(this);
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

    onInsertElementClicked(evt){
        let buttonBounds = evt.target.getBoundingClientRect();
        this.refs.ribbon.showSelf(buttonBounds);
    }

    onAddElementClicked(type){
        this.refs.viewer.addElement(type);
    }

    render() {
        return(
            <div style={{overflowY: 'hidden'}}>
                <div style={{display: 'flex', flex: 12, height: '100vh'}} className='container'>
                    <div style={{flex: 3, backgroundColor: 'white', height: '100vh', overflowY: 'auto'}} className='panel'>
                    <BrowseComponent ref='browser' onPageChoice={this.onPageChoice}/>
                    </div>
                    <div className='element-insert'>
                    <ElementInsertComponent ref='ribbon' onInsertElementClicked={this.onInsertElementClicked}/>
                    </div>
                    <div style={{flex: 6, backgroundColor: 'white', overflowY:'auto'}} className='viewer'>
                    <ViewerComponent ref='viewer' onElementClicked={this.foo} />
                    </div>
                    <div style={{flex: 3, backgroundColor: 'blue'}} className='panel'>
                    <InspectorComponent ref='inspector'/>
                    </div>
                </div>
                <CreateRibbonComponent ref='ribbon' onAddElementClicked={this.onAddElementClicked}/>
            </div>
        )
    }
}