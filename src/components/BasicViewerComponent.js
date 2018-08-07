import React, { Component } from 'react';
import { connect } from 'react-redux';

// Simple component that will renders a collection of renderable elements
export default class BasicViewerComponent extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>{this.props.title}</h1>
                </div>
                {this.props.renderableElements}
            </div>
        )
    }
}

// Simple Component that simply renders a collection of renderable elements
// to the screen

// class BasicViewerComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.onReceivedPage = this.onReceivedPage.bind(this);
//     }


//     componentWillReceiveProps(newProps) {
//         if (newProps.page != null && i < 1) {
//             this.onReceivedPage(newProps.page);
//             i = 1;
//         }
//     }

//     onReceivedPage(page) {
//         let renderableElements = [];
//         page.elements.map((element, key) => {
//             let type = element.type;
//             let data = {
//                 attributes: element.attributes,
//                 styles: element.styles,
//                 innerHTML: element.innerHTML,
//             }
//             let renderableElement = ElementHelper.createElementFromType(type, key, data);
//             renderableElements.push(renderableElement);
//         });
//         this.props.createRenderableElements(renderableElements);
//     }

//     render() {
//         return(
//             <div>
//                 {this.props.renderableElements}
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     renderableElements: state.pages.renderableElements,
//     page: state.pages.page
// });

// const mapDispatchToProps = dispatch => {
//     return {
//         createRenderableElements: (elements) => {
//             dispatch(createRenderableElements(elements));
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BasicViewerComponent);