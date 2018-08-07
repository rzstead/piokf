import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import './dark-theme.css';
import MotherComponent from './components/MotherComponent';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" style={{height: '100vh'}}>
          <MotherComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
