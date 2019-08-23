import React, { Component } from 'react'
import logo from '../assets/logo.svg'

export default class NavBar extends Component {
  container = React.createRef()
  state = {
    open: false,
    showInput: false,
    newUser: {
      name: ''
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
        showInput: false
      })
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.searchGame(this.props.searchValue)
    this.props.clearSearch()
  }
  handleClick = event => {
    const medium = event.target.innerText
    switch (medium) {
      case 'PC':
        this.props.fetchPcGames()
        break
      case 'PS4':
        this.props.fetchPs4Games()
        break
      case 'Xbox One':
        this.props.fetchXboxGames()
        break
      case 'Switch':
        this.props.fetchSwitchGames()
        break
      default:
        return null
    }
  }
  handleChange = event => {
    this.props.setSearch(event.target.value)
  }
  handleButtonClick = () => {
    this.props.fetchUsers()
    this.setState(state => {
      return {
        open: !state.open
      }
    })
  }
  selectUser (user) {
    this.props.setUser(user)
    this.setState({
      open: false
    })
    this.props.openProfile()
  }
  signOut = () => {
    this.props.signOut()
    this.setState({
      open: false,
      showInput: false
    })
  }
  openProfile = () => {
    this.props.openProfile()
  }
  handleUserSubmit = event => {
    event.preventDefault()
    this.props.userSubmit(this.state.newUser)
    this.clearAddUser()
  }
  clearAddUser = () => {
    this.setState({
      newUser: ''
    })
  }
  toggleForm = () => {
    this.setState({
      showInput: true
    })
  }
  addUser = event => {
    this.setState({
      newUser: {
        name: event.target.value
      }
    })
  }
  render () {
    const users = this.props.users.map(user => {
      return (
        <li
          className='links'
          key={user.id}
          onClick={() => this.selectUser(user)}
        >
          {user.name}
        </li>
      )
    })
    return (
      <div>
        <ul id='nav'>
          <div>
            <img id='logo' src={logo} alt='Website Logo' />
            <li>
              <a className='links' href='/'>
                Game Lobby
              </a>
            </li>
          </div>
          <div>
            <li>
              <form className='search-form' onSubmit={this.handleSubmit}>
                <input
                  placeholder='Search for a Game'
                  type='text'
                  value={this.props.searchValue}
                  onChange={this.handleChange}
                />
              </form>
            </li>
            <li className='links consoles' onClick={this.handleClick}>
              PC
            </li>
            <li className='links consoles' onClick={this.handleClick}>
              PS4
            </li>
            <li className='links consoles' onClick={this.handleClick}>
              Xbox One
            </li>
            <li className='links consoles' onClick={this.handleClick}>
              Switch
            </li>
          </div>
          <div>
            <li className='user'>
              {this.props.user.name
                ? [
                  <span>Hello {this.props.user.name} | &nbsp;</span>,
                  <div className='links' onClick={this.openProfile}>
                      Profile
                  </div>
                ]
                : [
                  this.state.showInput ? (
                    <form onSubmit={this.handleUserSubmit}>
                      <input
                        type='text'
                        name='name'
                        value={this.state.newUser.name}
                        onChange={this.addUser}
                        placeholder='Enter Name'
                        autoFocus
                      />
                    </form>
                  ) : (
                    [
                      <span className='links' onClick={this.toggleForm}>
                          Sign Up
                      </span>,
                      <span>&nbsp;| Select User:</span>
                    ]
                  )
                ]}
              <div className='container' ref={this.container}>
                <button
                  type='button'
                  className='button'
                  onClick={this.handleButtonClick}
                >
                  ☰
                </button>
                {this.state.open && (
                  <div className='dropdown'>
                    <ul>
                      {this.props.user.name
                        ? [
                          <li
                            key='sign out'
                            className='links'
                            onClick={this.signOut}
                          >
                              Sign Out
                          </li>,
                          users
                        ]
                        : users}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </div>
        </ul>
      </div>
    )
  }
}
