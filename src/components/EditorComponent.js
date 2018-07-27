import React, { Component } from 'react';

import ViewerComponent from './ViewerComponent';
import InspectorComponent from "./InspectorComponent";
import { PageService } from '../services/PageService';

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
    }

    componentWillMount() {
        console.log('should be fetching pages!');
        PageService.getPages()
            .then(json => {
                let page = json[0];
                console.log('received: ' + JSON.stringify(page));
                this.refs.viewer.onReceivedPage(page);
            });
    }

    foo(element) {
        console.log('EditorComponent received => ' + JSON.stringify(element));
        this.refs.inspector.onReceivedElement(element);
    }

    render() {
        return(
            <div style={{display: 'flex', flex: 12, height: '100%' }} className='container'>
                <div style={{flex: 3, backgroundColor: 'red'}} className='panel'>
                <p>TODO Add Browser Sidebar Here</p>
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