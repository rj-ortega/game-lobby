import React from 'react'
import Lightbox from 'lightbox-react'
import 'lightbox-react/style.css'

export default class Game extends React.Component {
  state = {
    media: false,
    photoIndex: 0,
    isOpen: false
  }
  toggleModal = () => {
    this.setState({
      media: !this.state.media
    })
  }
  handleHeart = event => {
    this.props.props.deleteGame(this.props.game)
  }
  handleAddGame = () => {
    const { game } = this.props
    const body = { ...game, user_id: this.props.props.user.id }
    this.props.props.addGame(body)
  }
  handleClock = () => {
    this.props.props.toggleWishlist(this.props.game)
  }
  handleSquare = () => {
    this.props.props.toggleFinished(this.props.game)
  }
  handleRock = () => {
    this.props.props.togglePlaying(this.props.game)
  }
  render () {
    const { game } = this.props
    const { photoIndex, isOpen } = this.state
    const media = game.screenshots.map(image => {
      return image.replace('thumb', '1080p')
    })
    return (
      <>
        <div className='card'>
          <img
            className='covers'
            src={game.cover.replace('thumb', '720p')}
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
              <p>Released: {game.release_dates.join(', ')}</p>
              <p>Platforms: {game.platforms.join(', ')}</p>
              <p>Genre: {game.genres.join(', ')}</p>
              <p>User Ratings: {game.rating}</p>
              <p>Review Count: {game.rating_count}</p>
              <p>
                More Info:{' '}
                <a target='_blank' rel='noopener noreferrer' href={game.url}>
                  IGDB Page
                </a>
              </p>
              Favorite:{' '}
              <i className='fas fa-heart fa-lg' onClick={this.handleHeart} />
              Playing:{' '}
              {game.playing ? (
                <i
                  className='fas fa-hand-rock fa-lg'
                  onClick={this.handleRock}
                />
              ) : (
                <i
                  className='far fa-hand-rock fa-lg'
                  onClick={this.handleRock}
                />
              )}
              Wishlist:{' '}
              {game.wishlist ? (
                <i className='fas fa-clock fa-lg' onClick={this.handleClock} />
              ) : (
                <i className='far fa-clock fa-lg' onClick={this.handleClock} />
              )}
              Finished:{' '}
              {game.finished ? (
                <i
                  className='fas fa-check-square fa-lg'
                  onClick={this.handleSquare}
                />
              ) : (
                <i
                  className='far fa-check-square fa-lg'
                  onClick={this.handleSquare}
                />
              )}
            </div>
            <p className='description'>{game.summary}</p>
          </div>
        </div>
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
