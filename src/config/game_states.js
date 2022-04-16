const GAME_STATE_MESSAGE = Object.freeze({
  STARTED: 'Game Started',
  WAITING_FOR_USER: 'Waiting for the other player to join',
  INITIAL_STATE: 'Game not started yet',
  USER_LEFT: 'Player O just left the game, please wait while Player O rejoins'
});

export default GAME_STATE_MESSAGE;
