import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import config from '../../api/config';
import { useToasts } from 'react-toast-notifications';
import copyText from '../../utils/copyText';

function Footer ({ roomId }) {
  const { addToast } = useToasts();
  const clearGame = () => {
    localStorage.clear('room-id');
    localStorage.clear('plays');
    localStorage.clear('pending_play');
    window.location = '/';
  };
  const handleCopyLink = () => {
    copyText(`${config.FRONTEND_ROOT}/opponent/${roomId}`); addToast('Link copied, Please share link with your friend and start game', { appearance: 'success' });
  };
  return (
        <div className='container fixed-bottom mb-2'>

            <div className='col-md-12  d-flex justify-content-around '>
                <button onClick={clearGame} className='btn btn-primary'>
                    New Game <FontAwesomeIcon icon={faArrowRotateBackward} />
                </button>
                <button onClick={handleCopyLink} className='btn btn-primary '>
                    Copy Link  <FontAwesomeIcon icon={faCopy} />
                </button>

            </div>

        </div>
  );
}

export default Footer;
