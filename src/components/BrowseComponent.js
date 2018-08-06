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

    onMetaClicked(element) {
        console.log('BrowseComponent => onMetaClicked => ' + JSON.stringify(element));
        this.props.fetchPage(element.id);
    }

    render() {
        let pageMetas = this.props.pageMetas || [];
        console.log('BrowseComponent rendering => ' + JSON.stringify(pageMetas));
        return(
            <div className="browser-component">
                <h3 className="component-title">My Pages</h3>
                {pageMetas.map((element, i) => 
                    {
                    return <PageListItem key={i} element={element} onClick={this.onMetaClicked} />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    page: state.pages.page
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (id) => {
            dispatch(fetchPage(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseComponent);