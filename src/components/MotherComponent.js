import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPageMetas } from '../actions/metaActions';
import BrowseComponent from './BrowseComponent';

class MotherComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPageMetas();
    }

    render() {
        console.log('metas => ' + JSON.stringify(this.props.pageMetas));
        return(
            <div>
                <h1 style={{color: 'red'}}>{this.props.isLoading ? 'Loading' : 'Loaded'}</h1>
                <BrowseComponent pageMetas={this.props.pageMetas}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.metas.isLoading,
    pageMetas: state.metas.pageMetas
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPageMetas: () => {
            dispatch(fetchPageMetas());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MotherComponent);