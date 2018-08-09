import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/pageActions';
class NavComponent extends Component{

    constructor(props){
        super(props);
        this.onLinkClicked = this.onLinkClicked.bind(this);
    }

    onLinkClicked(id){
        console.log('link with id: ' + id + " clicked!");
        this.props.fetchPage(id);
    }

    render(){
        let links = this.props.navData.links.map(link => {
            let children;
            if(link.children){
              children = <div className="dropdown-content">
                    {link.children.map(child =>{
                        return(
                            <a key={child.id} onClick={() => {this.onLinkClicked(child.id)}}>{child.name}</a> 
                        );
                    })} 
                </div>  
            }
            return(
                <div className="dropdown">
                    <a key={link.id} onClick={() => {this.onLinkClicked(link.id)}}>{link.name}</a> 
                    {children}
                </div>
            );
        });
        return <nav>
                    <h3 style={{marginLeft:15, marginRight: 15, display:'inline-block'}}>{this.props.navData.brand}</h3>
                    {links}
               </nav>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (id) => {
            dispatch(fetchPage(id))
        }
    }
};

const mapStateToProps = state => ({
    navData: state.app.navData
});

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent)