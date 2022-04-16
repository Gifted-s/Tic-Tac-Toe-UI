import { useEffect, useState } from 'react';
import Cell from '../Cell/Cell';
import './Main.css';
import { useToasts } from 'react-toast-notifications';
import boardPlaceHolder from '../../utils/boardPlaceHolder';
import checkWinCondition from '../../utils/checkWInCondition';
import TOAST_STATUS from '../../utils/toast_status';
import GAME_STATE_MESSAGE from '../../config/game_states';
const { STARTED, WAITING_FOR_USER, USER_LEFT, INITIAL_STATE } = GAME_STATE_MESSAGE;

const Main = ({ socket, roomCode, isOpponent, previousPlays }) => {
  const { addToast } = useToasts();
  const [board, setBoard] = useState(previousPlays || boardPlaceHolder);
  const [canPlay, setCanPlay] = useState(!isOpponent);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [stateMessage, setStateMessage] = useState(INITIAL_STATE);
  const [showStatusMessage, setShowStatusMessage] = useState(true);
  function showToast (message, status) {
    addToast(message, { appearance: status });
    setTimeout(() => {
      resetGame();
    }, 3000);
  }
  const USER_TURN = {
    YOUR_TURN: 'Your Turn',
    OPPONENT_TURN: 'Opponent turn, please wait'
  };

  useEffect(() => {
    socket.on('GAME_STATE_CHANGE', (state) => {
      if (state === WAITING_FOR_USER) {
        setStateMessage(WAITING_FOR_USER);
        setShowStatusMessage(true);
      } else if (state === STARTED) {
        setStateMessage(STARTED);
        setShowStatusMessage(true);
        setGameIsRunning(true);
        const playPending = JSON.parse(localStorage.getItem('pending_play'))?.status;
        if (playPending) {
          setCanPlay(true);
        }
      }
    });
    socket.on('USER_LEFT', () => {
      setGameIsRunning(false);
      setCanPlay(false);
      setStateMessage(USER_LEFT);
      setShowStatusMessage(true);
    });
    socket.on('UPDATE_GAME', (id, winMove) => {
      setShowStatusMessage(false);
      setBoard((data) => ({ ...data, [id]: 'O' }));
      localStorage.setItem('plays', JSON.stringify({ ...board, [id]: 'O' }));
      setCanPlay(true);
      localStorage.setItem('pending_play', JSON.stringify({ status: true }));

      if (winMove.win) {
        showToast(TOAST_STATUS.LOOSE.MESSAGE, TOAST_STATUS.LOOSE.STATUS);
      } else if (winMove.tie) {
        showToast(TOAST_STATUS.TIE.MESSAGE, TOAST_STATUS.TIE.STATUS);
      }
    });
    return () => socket.off('UPDATE_GAME');
  });

  function resetGame () {
    setBoard(boardPlaceHolder);
    localStorage.setItem('plays', JSON.stringify(boardPlaceHolder));
    setCanPlay(!isOpponent);
  }

  const handleCellClick = (e) => {
    if (!gameIsRunning) {
      return;
    }
    const id = e.currentTarget.id;
    if (canPlay && board[id] === '') {
      setBoard((data) => ({ ...data, [id]: 'X' }));
      const winMove = checkWinCondition({ ...board, [id]: 'X' });
      socket.emit('PLAY', { id, roomCode, winMove });

      if (winMove.win) {
        showToast(TOAST_STATUS.WIN.MESSAGE, TOAST_STATUS.WIN.STATUS);
      } else if (winMove.tie) {
        showToast(TOAST_STATUS.TIE.MESSAGE, TOAST_STATUS.TIE.STATUS);
      }
      localStorage.setItem('pending_play', JSON.stringify({ status: false }));
      localStorage.setItem('plays', JSON.stringify({ ...board, [id]: 'X' }));
      setCanPlay(false);
    }
  };

  const statusStyles = {
    color: gameIsRunning ? 'green' : 'yellow'
  };
  const turnDisplayStyle = `${canPlay ? 'text-success' : 'text-warning'} text-center my-2`;
  return (
    <>
      {
       showStatusMessage && <h6 style={statusStyles} className="text-center my-4"> {stateMessage}</h6>
      }
      {
        gameIsRunning && <h4 className={turnDisplayStyle}>{canPlay ? USER_TURN.YOUR_TURN : USER_TURN.OPPONENT_TURN}</h4>
      }
      <main>
        <section className="main-section">
          {
           Object.keys(boardPlaceHolder).map((id, i) => {
             return <Cell key={id} handleCellClick={handleCellClick} id={id} text={board[i]} />;
           })
          }
        </section>

      </main>
    </>
  );
};

export default Main;
