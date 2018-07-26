import React, { Component } from 'react';

/**
 * Main editor component that will contain the browser sidebar,
 * viewer, and property panel
 */
export default class EditorComponent extends Component {
    render() {
        return(
            <div style={{display: 'flex', flex: 12, height: '100%' }} className='container'>
                <div style={{flex: 3, backgroundColor: 'red'}} className='panel'>
                <p>TODO Add Browser Sidebar Here</p>
                </div>
                <div style={{flex: 6, backgroundColor: 'green'}} className='viewer'>
                <p>TODO Add Viewer Here</p>
                </div>
                <div style={{flex: 3, backgroundColor: 'blue'}} className='panel'>
                <p>TODO Add Property Panel Here</p>
                </div>
            </div>
        )
    }
}