import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
constructor() {
    super();
     this.state = {
        playerName: '',
        amount: '',
        items: [],
        players:[],
        user: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
  }
  render() {
    return (

      <div className='app'>

        <header>
         <div className="wrapper">
                          <h1>KPL - Fantacy League</h1>
                          {this.state.user ?
                            <button onClick={this.logout}>Log Out</button>
                            :
                            <button onClick={this.login}>Log In</button>
                          }
                        </div>
            <div className='wrapper'>
              <h1>Add Players</h1>

            </div>

        </header>
 {this.state.user ?
                        <div>
                          <div > {this.state.user.email}
                          </div>
                        </div>
                        :
                        <div className='wrapper'>
                          <p>You must be logged in to see the list of players or submit to it.</p>
                        </div>
                      }
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="playerName" placeholder="Players Name" onChange={this.handleChange} value={this.state.playerName} />
                <input type="text" name="playerRole" placeholder="Players Role" onChange={this.handleChange} value={this.state.playerRole} />
                <input type="text" name="amount" placeholder="Amount" onChange={this.handleChange} value={this.state.amount} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
        <section className='display-item'>
          <div className="wrapper">

              {this.state.players.map((player) => {
                return (
                  //li key={player.id}>
                   <ul>{player.playerName} : {player.playerRole} : {player.amount}
                   <button onClick={() => this.removeItem(player.id)}>Remove Player</button>
                     </ul>
                 // </li>
                )
              })}

          </div>
        </section>
      </div>
    );
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const playersRef = firebase.database().ref('players');
    const player = {
      playerName: this.state.playerName,
      playerRole:this.state.playerRole,
      amount: this.state.amount
    }
    playersRef.push(player);
    this.setState({
      playerName: '',
      playerRole:'',
      amount: ''
    });
     playersRef.on('value', (snapshot) => {
        console.log(snapshot.val());
      });
  }

  componentDidMount() {
  auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    const playersRef = firebase.database().ref('players');
    playersRef.on('value', (snapshot) => {
      let players = snapshot.val();
      let newState = [];
      for (let player in players) {
        newState.push({
          id: player,
          playerName: players[player].playerName,
          playerRole: players[player].playerRole,
          amount:  players[player].amount
        });
      }
      this.setState({
        players: newState
      });
    });
  }
removeItem(playerId) {
  const playerRef = firebase.database().ref(`/players/${playerId}`);
  playerRef.remove();
}
logout() {
  auth.signOut()
     .then(() => {
       this.setState({
         user: null
       });
     });
}
login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
}
}
export default App;
