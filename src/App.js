import "./App.css";
import React from "react";
import web3 from './web3'
import lottery from './lottery'


class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message:"Waiting on transaction success"});

    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(this.state.value, 'ether')})

    this.setState({ message: "You have been entered!!!"});
  }

  onClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message:"Waiting on transaction success"});

    await lottery.methods.pickWinner().send({from:accounts[0]})
    console.log('ex')

    this.setState({ message: "Winner has been picked!!!"});


  }

   componentDidMount = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)
    
    this.setState({manager, players, balance})
  }
 

  render() {
    return (
      <div className="App">
        <h1>Lottery Contract</h1>
        <p>The manager of the contract is {this.state.manager}</p>
        <p>There are currently people {this.state.players.length} entered competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ethers </p>
        
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      <hr />
      <h1>{this.state.message}</h1>
      <hr />
      <h4>Ready to pick a winner</h4>
      <button onClick={this.onClick}>Pick a Winner</button>
      <hr />
      
      </div>
    );
  }
}
export default App;
