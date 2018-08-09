import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/pageActions';

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
    }

    onMetaClicked(meta) {
        console.log('BrowseComponent => onMetaClicked => ' + JSON.stringify(meta));
        this.props.fetchPage(meta.id);
    }

    render() {
        let pageMetas = this.props.pageMetas || [];

        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {pageMetas.map((pageMeta, i) => 
                    {
                    return <PageListItem key={i} pageMeta={pageMeta} onClick={this.onMetaClicked} />
                    })
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (id) => {
            dispatch(fetchPage(id));
        }
    }
}

export default connect(null, mapDispatchToProps)(BrowseComponent);