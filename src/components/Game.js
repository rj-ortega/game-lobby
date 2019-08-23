import React from 'react'
import Lightbox from 'lightbox-react'
import 'lightbox-react/style.css'
import Modal from './Modal'

export default class Game extends React.Component {
  state = {
    media: false,
    photoIndex: 0,
    isOpen: false,
    heart: false,
    modal: false
  }
  toggleModal = () => {
    this.setState({
      media: !this.state.media
    })
  }
  closeModal = () => {
    this.setState({
      modal: false
    })
  }
  handleHeart = event => {
    if (!this.props.props.user.name) {
      this.setState({
        modal: true
      })
      setTimeout(this.closeModal, 2500)
    } else {
      this.setState({
        heart: true
      })
      this.handleAddGame(event)
    }
  }
  handleAddGame = () => {
    const { game } = this.props
    const addZero = number => {
      return number < 10 ? '0' + number : number
    }
    const dates = game.release_dates.map(dates => {
      return `${addZero(dates.m)}/${dates.y}`
    })
    const body = {
      user_id: this.props.props.user.id,
      name: game.name,
      cover: game.cover.url,
      genres: game.genres.map(e => e.name),
      platforms: game.platforms.map(e => e.name),
      rating: game.rating.toFixed(2),
      rating_count: game.rating_count,
      release_dates: dates,
      screenshots: game.screenshots.map(e => e.url),
      summary: game.summary,
      url: game.url
    }
    this.props.props.addGame(body)
  }
  render () {
    const { game } = this.props
    const { photoIndex, isOpen } = this.state
    const media = game.screenshots.map(image => {
      return image.url.replace('thumb', '1080p')
    })
    const addZero = number => {
      return number < 10 ? '0' + number : number
    }
    const dates = game.release_dates.map(dates => {
      return `${addZero(dates.m)}/${dates.y}`
    })
    return (
      <>
        <div className='card'>
          <img
            className='covers'
            src={game.cover.url.replace('thumb', '720p')}
            alt={`${game.name}`}
          />
          <div className='info'>
            <div>
              <h3>{game.name}</h3>
              <span
                className='links'
                onClick={() => this.setState({ isOpen: true })}
              >
                Screenshots
              </span>
              <p>Released: {dates.join(', ')}</p>
              <p>Platforms: {game.platforms.map(e => e.name).join(', ')}</p>
              <p>Genre: {game.genres.map(e => e.name).join(', ')}</p>
              <p>User Ratings: {game.rating.toFixed(2)}</p>
              <p>Review Count: {game.rating_count}</p>
              <p>
                More Info:{' '}
                <a target='_blank' rel='noopener noreferrer' href={game.url}>
                  IGDB Page
                </a>
              </p>
              {this.props.props.userGames.some(userGame => {
                return userGame.name === game.name
              }) ? (
                <i className='fas fa-heart fa-lg' onClick={this.handleHeart} />
                ) : (
                  <i className='far fa-heart fa-lg' onClick={this.handleHeart} />
                )}
            </div>
            <p className='description'>{game.summary}</p>
          </div>
        </div>
        {this.state.modal && <Modal closeModal={this.closeModal} />}
        {isOpen && (
          <Lightbox
            mainSrc={media[photoIndex]}
            nextSrc={media[(photoIndex + 1) % media.length]}
            prevSrc={media[(photoIndex + media.length - 1) % media.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + media.length - 1) % media.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % media.length
              })
            }
          />
        )}
      </>
    )
  }
}
