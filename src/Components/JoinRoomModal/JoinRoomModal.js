import './JoinRoomModal.css';
import { motion } from 'framer-motion';
import { v4 } from 'uuid';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import config from '../../api/config';
import copyText from '../../utils/copyText';
const backgrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const modal = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },

  visible: {
    y: '00px',
    opacity: 1,
    transition: {
      delay: 0.5
    }
  }
};

const JoinRoomModal = ({ showModal, setShowModal, setRoomCode }) => {
  const [link, setLink] = useState(null);
  const [showLink, setShowLink] = useState(false);
  const { addToast } = useToasts();
  const handleGenerateLink = () => {
    const gameId = v4();
    setRoomCode(gameId);
    setLink(`${config.FRONTEND_ROOT}/opponent/${gameId}`);
    setShowLink(true);
    setShowModal(false);
  };

  const handleCopyLink = () => {
    copyText(link);
    addToast('Link copied, Please share link with your friend and start game', { appearance: 'success' });
  };
  return (
    <>

      {showModal && (
        <motion.div
          className="join-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="join-room-modal-card col-md-12" variants={modal}>
            <div className="join-box">
              <h1 className="join-room-modal-card-title text-secondary text-center">You are not in any game yet</h1>
              <button onClick={handleGenerateLink} className="btn btn-primary btn-lg mt-4">
                Play with a Friend
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {
        showLink && (

          <motion.div
            className="join-container"
            variants={backgrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h4 style={{ cursor: 'pointer' }} onClick={() => {
              setShowModal(true);
              setShowLink(false);
            }} className="text-end m-4 font-weight-bold text-light "> <i className="fas fa-times"></i>
            </h4>
            <motion.div className="join-room-modal-card col-md-12" variants={modal}>
              <div className="join-box">
                <h1 className="join-room-modal-card-title text-secondary text-center">Share this link with a friend</h1>
                <div class="form-group col-md-12">
                  <input type="text" value={link} disabled class="form-control bg-light" id="exampleInputPassword1" />
                </div>
                <div>
                  <button onClick={handleCopyLink} className="btn btn-primary btn-lg mt-4 mx-1">
                    Copy Link
                  </button>

                  <button onClick={() => setShowLink(false)} className="btn btn-primary btn-lg mt-4 mx-1">
                    Start Game
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )
      }

    </>
  );
};

export default JoinRoomModal;
