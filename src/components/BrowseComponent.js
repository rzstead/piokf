import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage, createPage, createChildPage, deletePage } from '../actions/pageActions';

class PageListItem extends Component {
    render() {
        let children = [];
        if(this.props.pageMeta.children){
            children = this.props.pageMeta.children.map(pageMeta => {
                return <div className="page-tab page-child" style={{color: '#333'}}>
                            <span className='page-tab-wrapper' style={{display:'flex', flex: '12'}}>
                                <p style={{display:'flex', flex: '11'}} onClick={() => this.props.onClick(pageMeta)}>{pageMeta.title}</p>
                                <i style={{display:'flex', flex: '1'}} onClick={() => this.props.onDeletePageClicked(pageMeta.id, this.props.pageMeta.id)} className='material-icons page-delete'>delete</i>
                            </span>
                        </div>
            });
        }
        children.push(
             <div onClick={() => this.props.onSubPageAdd(this.props.pageMeta.id)} className='page-tab add-sub-page'>
                <i className="material-icons">add</i>
             </div>
        );
        return(
            <div>
                <div className='page-tab'>
                    <span className='page-tab-wrapper' style={{display:'flex', flex: '12'}}>
                        <h4 style={{display:'flex', flex: '11'}} onClick={() => this.props.onClick(this.props.pageMeta)}>{this.props.pageMeta.title}</h4>
                        <i style={{display:'flex', flex: '1'}} onClick={() => this.props.onDeletePageClicked(this.props.pageMeta.id)} className='material-icons page-delete'>delete</i>
                    </span>
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
        this.onDeletePageClicked = this.onDeletePageClicked.bind(this);
    }

    onMetaClicked(meta) {
        console.log('BrowseComponent => onMetaClicked => ' + JSON.stringify(meta));
        this.props.fetchPage(meta.id);
    }

    onSubPageAdd(parentId){
        var childTitle = prompt("Enter your Sub Page name.");
        if(childTitle){
            this.props.createChildPage(childTitle, parentId);
        }
    }

    onAddPageButtonClicked() {
        console.log('BrowseComponent => onAddPageButtonClicked');
        let title = prompt("Enter a new page name.");
        if(title){
            console.log('addPage => TODO call API when it is implemented!');
            this.props.createPage(title);
        }
    }

    onDeletePageClicked(pageId, parentId){
        console.log("onDeletePageClicked => parentId: " + parentId);
        this.props.deletePage(pageId, parentId);
    }

    render() {
        let pageMetas = this.props.pageMetas || [];

        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {pageMetas.map((pageMeta, i) =>
                    {
                    return <PageListItem key={i} pageMeta={pageMeta} onSubPageAdd={this.onSubPageAdd} onDeletePageClicked={this.onDeletePageClicked} onClick={this.onMetaClicked} />
                    })
                }
                <div className='add-parent-page' onClick={this.onAddPageButtonClicked}>
                    <i className='material-icons'>add</i>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (id) => {
            dispatch(fetchPage(id));
        },
        createPage: (title) => {
            dispatch(createPage(title));
        },
        createChildPage: (childTitle, parentId) => {
            dispatch(createChildPage(childTitle, parentId))
        },
        deletePage: (id, parentId) => {
            dispatch(deletePage(id, parentId))
        }
    }
}

const mapStateToProps = state => ({
    pageMetas: state.app.pageMetas,
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseComponent);