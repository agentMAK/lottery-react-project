import "./App.css";
import React from "react";
import web3 from './web3'
import lottery from './lottery'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {manager: ''}
  }

  async componentDidMount () {
    const manager = await lottery.methods.manager().call();
    
    this.setState({manager: manager})
  }
 

  render() {
    return (
      <div className="App">
        <h1>Lottery Contract</h1>
        <p>The manager of the contract is {this.state.manager}</p>
      </div>
    );
  }
}
export default App;
