import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import './dark-theme.css';
import MotherComponent from './components/MotherComponent';
import RouterComponent from './components/RouterComponent';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" style={{height: '100vh'}}>
          <RouterComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
