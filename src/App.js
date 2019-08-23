import React, { Component } from 'react'
import CardContainer from './components/CardContainer'
import NavBar from './components/NavBar'
import AppNotFound from './components/AppNotFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

class App extends Component {
  state = {
    users: [],
    user: {
      id: '',
      name: ''
    },
    userGames: [],
    games: [],
    search: '',
    profile: false
  }
  componentDidMount () {
    this.fetchUsers()
    this.fetchGames()
  }
  fetchUsers = () => {
    fetch('http://localhost:3005/users')
      .then(res => res.json())
      .then(res =>
        this.setState({
          users: res
        })
      )
  }
  fetchPcGames = () => {
    this.closeProfile()
    fetch('http://localhost:3005/pc', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          games: res
        })
      )
  }
  fetchPs4Games = () => {
    this.closeProfile()
    fetch('http://localhost:3005/ps4', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          games: res
        })
      )
  }
  fetchXboxGames = () => {
    this.closeProfile()
    fetch('http://localhost:3005/xbox', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          games: res
        })
      )
  }
  fetchSwitchGames = () => {
    this.closeProfile()
    fetch('http://localhost:3005/switch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          games: res
        })
      )
  }
  fetchGames = () => {
    fetch('http://localhost:3005/games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          userGames: res
            .filter(game => {
              return game.user_id === this.state.user.id
            })
            .sort(function (a, b) {
              return a.id - b.id
            })
        })
      )
  }
  userSubmit = user => {
    fetch('http://localhost:3005/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          user: {
            id: res.id,
            name: res.name
          }
        })
      )
  }
  addGame = body => {
    fetch('http://localhost:3005/games', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(this.fetchGames)
  }
  setSearch = value => {
    this.setState({
      search: value
    })
  }
  deleteGame = game => {
    fetch(`http://localhost:3005/games/${game.id}`, {
      method: 'DELETE'
    }).then(this.fetchGames)
  }
  toggleFinished = game => {
    const body = {
      finished: !game.finished
    }
    fetch(`http://localhost:3005/games/${game.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.fetchGames)
  }
  togglePlaying = game => {
    const body = {
      playing: !game.playing
    }
    fetch(`http://localhost:3005/games/${game.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.fetchGames)
  }
  toggleWishlist = game => {
    const body = {
      wishlist: !game.wishlist
    }
    fetch(`http://localhost:3005/games/${game.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.fetchGames)
  }
  setUser = user => {
    this.setState({
      user: user
    })
    this.fetchGames()
  }
  signOut = () => {
    this.closeProfile()
    this.setState({
      user: ''
    })
  }
  clearSearch = () => {
    this.setState({
      search: ''
    })
  }
  openProfile = () => {
    this.setState({
      profile: true
    })
  }
  closeProfile = () => {
    this.setState({
      profile: false
    })
  }
  render () {
    return (
      <Router>
        <NavBar
          user={this.state.user}
          users={this.state.users}
          addUser={this.addUser}
          setSearch={this.setSearch}
          searchValue={this.state.search}
          searchGame={this.fetchGames}
          setUser={this.setUser}
          signOut={this.signOut}
          clearSearch={this.clearSearch}
          openProfile={this.openProfile}
          userSubmit={this.userSubmit}
          fetchPcGames={this.fetchPcGames}
          fetchPs4Games={this.fetchPs4Games}
          fetchXboxGames={this.fetchXboxGames}
          fetchSwitchGames={this.fetchSwitchGames}
          fetchUsers={this.fetchUsers}
        />

        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <CardContainer
                user={this.state.user}
                userGames={this.state.userGames}
                addGame={this.addGame}
                profile={this.state.profile}
                deleteGame={this.deleteGame}
                togglePlaying={this.togglePlaying}
                toggleFinished={this.toggleFinished}
                toggleWishlist={this.toggleWishlist}
                games={
                  this.state.profile ? this.state.userGames : this.state.games
                }
                fetchGames={this.fetchGames}
              />
            )}
          />
          <Route component={AppNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
