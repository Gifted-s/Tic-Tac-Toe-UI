import config from './config';

async function validateGameRoom (roomId) {
  const response = await fetch(`${config.API_ROOT}/check-room/${roomId}`);
  const { available } = await response.json();
  return available;
}

export default {
  validateGameRoom
};
