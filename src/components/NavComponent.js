import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/pageActions';
import { fetchPageMetas } from '../actions/metaActions';

class NavComponent extends Component{

    constructor(props){
        super(props);
        this.onLinkClicked = this.onLinkClicked.bind(this);
    }

    onLinkClicked(id){
        console.log('link with id: ' + id + " clicked!");
        this.props.fetchPage(id);
    }

    componentWillMount(){
        this.props.fetchPageMetas();
    }

    render(){
        console.log(this.props.pageMetas)
        let links = this.props.pageMetas.map(page => {
            let children;
            if(page.children){
              children = <div className="dropdown-content">
                    {page.children.map(child =>{
                        return(
                            <a key={child.id} onClick={() => {this.onLinkClicked(child.id)}}>{child.title}</a> 
                        );
                    })} 
                </div>  
            }
            return(
                <div className="dropdown">
                    <a key={page.id} onClick={() => {this.onLinkClicked(page.id)}}>{page.title}</a> 
                    {children}
                </div>
            );
        });
        return <nav>
                    {links}
               </nav>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (id) => {
            dispatch(fetchPage(id))
        },
        fetchPageMetas: () =>{
            dispatch(fetchPageMetas())
        }
    }
};

const mapStateToProps = state => ({
    pageMetas: state.app.pageMetas,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent)