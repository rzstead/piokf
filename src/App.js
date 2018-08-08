import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
//import './dark-theme.css';
import './components/EditorComponent';
import LoginComponent from './components/LoginComponent';
import BasicPageComponent from './components/BasicPageComponent';
import EditorComponent from './components/EditorComponent';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: '100vh'}}>
            <Route path='/login' component={LoginComponent}/>
            <Route path='/editor' component={EditorComponent}/>
            <BasicPageComponent />
      </div>
    );
  }
}

export default App;
