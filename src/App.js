import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import MainScene from './components/MainScene';


class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <div className="header"><Header /></div> */}
        <div className="main"><MainScene/></div>
      </div>
    );
  }
}

export default App;

