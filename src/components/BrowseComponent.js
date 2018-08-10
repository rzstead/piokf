import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage, createPage } from '../actions/pageActions';

class PageListItem extends Component {
    render() {
        let children;
        if(this.props.pageMeta.children){
            children = this.props.pageMeta.children.map(pageMeta => {
                return <div className="page-tab page-child" style={{color: '#333'}}onClick={() => this.props.onClick(pageMeta)}>
                            <p>{pageMeta.title}</p>
                        </div>
            });
        }
        return(
            <div>
                <div className='page-tab'onClick={() => this.props.onClick(this.props.pageMeta)}>
                    <h4>{this.props.pageMeta.title}</h4>
                <button onClick={() => this.props.onSubPageAdd(this.props.pageMeta.id)} className="sub-page-button">Add Sub Page</button>
                </div>
                {children}
            </div>

        )
    }
}

class BrowseComponent extends Component {
    constructor(props) {
        super(props);
        this.onMetaClicked = this.onMetaClicked.bind(this);
        this.onAddPageButtonClicked = this.onAddPageButtonClicked.bind(this);
        this.onSubPageAdd = this.onSubPageAdd.bind(this);
    }

    onMetaClicked(meta) {
        console.log('BrowseComponent => onMetaClicked => ' + JSON.stringify(meta));
        this.props.fetchPage(meta.id);
    }

    onSubPageAdd(parentId){
        var childTitle = prompt("Enter your Sub Page name.");
        if(childTitle){
            this.props.addChildPage(childTitle, parentId);
        }
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
                {pageMetas.map((pageMeta, i) => 
                    {
                    return <PageListItem key={i} pageMeta={pageMeta} onSubPageAdd={this.onSubPageAdd} onClick={this.onMetaClicked} />
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
        },
        addChildPage: (childTitle, parentId) => {
            dispatch(addChildPage(childTitle, parentId))
        }
    }
}

export default connect(null, mapDispatchToProps)(BrowseComponent);