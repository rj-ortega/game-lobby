import React from 'react'
import Game from './Game'
import ProfileGame from './ProfileGame'

export default function CardContainer (props) {
  const getGames = () => {
    return props.games.map(game => {
      return <Game key={game.id} game={game} props={props} />
    })
  }
  const getProfileGames = () => {
    return props.userGames.map(game => {
      return <ProfileGame key={game.id} game={game} props={props} />
    })
  }
  return <>{props.profile ? getProfileGames() : getGames()}</>
}
