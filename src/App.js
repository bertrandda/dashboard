import React, { Component } from 'react';

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import './App.css';

import Module from './components/Module';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: []
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.modules}
        <Icon className="floating-button" onClick={this.addModule} path={mdiPlus} size={2} color="white" />
      </div>
    );
  }

  componentDidMount() {
    this.loadModules();
  }

  loadModules = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      this.setState(prevState => ({
        modules: [...prevState.modules, React.createElement(Module, { key: key, idKey: key, type: value.type, data: value.data, delete: this.deleteModule })]
      }))
    }
  }

  addModule = () => {
    const newKey = this.generateKey();
    this.setState(prevState => ({
      modules: [...prevState.modules, React.createElement(Module, { key: newKey, idKey: newKey, delete: this.deleteModule })]
    }))
  }

  deleteModule = (idToDelete) => {
    this.setState(prevState => ({
      modules: prevState.modules.filter(mod => mod.props.idKey !== idToDelete)
    }));
    localStorage.removeItem(idToDelete);
  }

  generateKey = () => {
    let S4 = () => { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) };
    return (S4() + S4());
  }
}

export default App;
