import Swal from 'sweetalert2';
function fireGameRoomFullMessage () {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Sorry there are two players in this game already!',
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Start a new game'
  }).then(() => {
    localStorage.clear('room-id');
    localStorage.clear('plays');
    localStorage.clear('pending_play');
    window.location = '/';
  });
}
export default fireGameRoomFullMessage;
