import Header from '../Components/Header/Header';
import Main from '../Components/Main/Main';
import JoinRoomModal from '../Components/JoinRoomModal/JoinRoomModal';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import apis from '../api/apis';
import config from '../api/config';
import Footer from '../Components/Footer/Footer';
import fireGameRoomFullMessage from '../utils/showGameRoomInvalid';
import Swal from 'sweetalert2';
const socket = io.connect(config.API_ROOT);

function Home () {
  const previousGameId = JSON.parse(localStorage.getItem('room-id'))?.gameId;
  const plays = JSON.parse(localStorage.getItem('plays'));
  const { gameId } = useParams();
  // Do not show join modal if user is an opponent(indicated by gameId presence) but show modal if user is not an opponent and if there is no previous ongoing game
  const [showModal, setShowModal] = useState(gameId ? false : !previousGameId);
  const [roomCode, setRoomCode] = useState(gameId || null);
  // Set playboard to previous plays if the gameId matches previous game id or if previous game id is present and the game id is absent
  const [previousPlays] = useState(gameId && previousGameId === gameId ? plays : previousGameId && !gameId ? plays : null);
  useEffect(() => {
    // Rejoin existing game if previous game id matches the game id
    if (previousGameId && previousGameId === gameId) {
      joinRoom(previousGameId);
    } else if (gameId && gameId !== previousGameId) { // Join a new game if previous game id is not thesame as game id
      joinRoom(gameId);
    } else if (!gameId && previousGameId) { // Join a previous game if there exist a previous game id and there is no game id
      joinRoom(previousGameId);
    } else {
      joinRoom(roomCode); // Join new game
    }
  }, [roomCode]);

  async function joinRoom (room) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Loading...',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    const available = await apis.validateGameRoom(room);
    Swal.close();
    if (available) {
      if (room) {
        socket.emit('JOIN_ROOM', room);
        localStorage.setItem('room-id', JSON.stringify({ gameId: room }));
      }
      if (gameId) {
        socket.emit('CAN_START', { room });
      }
    } else {
      fireGameRoomFullMessage();
    }
  }
  return (
        <>
            <JoinRoomModal
                showModal={showModal}
                setShowModal={setShowModal}
                setRoomCode={setRoomCode}
            />

            <Header />
            <Main socket={socket} roomCode={roomCode || previousGameId} isOpponent={!!gameId} previousPlays={previousPlays} />
            <Footer roomId={roomCode}/>
            </>
  );
}

export default Home;
