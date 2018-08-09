import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage, createPage } from '../actions/pageActions';

class PageListItem extends Component {
    render() {
        return(
            <div onClick={() => this.props.onClick(this.props.element)}>
                <h4>{this.props.element.title}</h4>
            </div>
        )
    }
}

class BrowseComponent extends Component {
    constructor(props) {
        super(props);
        this.onMetaClicked = this.onMetaClicked.bind(this);
        this.onAddPageButtonClicked = this.onAddPageButtonClicked.bind(this);
    }

    onMetaClicked(meta) {
        console.log('BrowseComponent => onMetaClicked => ' + JSON.stringify(meta));
        this.props.fetchPage(meta.id);
    }

    onAddPageButtonClicked() {
        console.log('BrowseComponent => onAddPageButtonClicked');
        // placeholder for now... Waiting for API to be fixed
        let page = {
            title: 'Some fun page',
            parent_page_id: null
        };
        console.log('addPage => TODO call API when it is implemented!');
        // this.props.createPage(page);
    }

    render() {
        let pageMetas = this.props.pageMetas || [];

        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {pageMetas.map((element, i) => 
                    {
                    return <PageListItem key={i} element={element} onClick={this.onMetaClicked} />
                    })
                }
                <button onClick={this.onAddPageButtonClicked}>Add Page</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (id) => {
            dispatch(fetchPage(id));
        },
        createPage: (page) => {
            dispatch(createPage(page));
        }
    }
}

export default connect(null, mapDispatchToProps)(BrowseComponent);