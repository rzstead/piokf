import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/EditorComponent';
import EditorComponent from './components/EditorComponent';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: '100vh'}}>
        <EditorComponent />
      </div>
    );
  }
}

export default App;
