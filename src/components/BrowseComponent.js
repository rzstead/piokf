import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/pageActions';

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
                {pageMetas.map((element, i) => 
                    {
                    return <PageListItem key={i} element={element} onClick={this.onMetaClicked} />
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