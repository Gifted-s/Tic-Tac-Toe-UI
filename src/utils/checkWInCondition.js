function checkWinCondition (temporalBoard) {
  if (
    (temporalBoard[0] === 'X' && temporalBoard[1] === 'X' && temporalBoard[2] === 'X') ||
      (temporalBoard[0] === 'O' && temporalBoard[1] === 'O' && temporalBoard[2] === 'O') ||
      (temporalBoard[3] === 'X' && temporalBoard[4] === 'X' && temporalBoard[5] === 'X') ||
      (temporalBoard[3] === 'O' && temporalBoard[4] === 'O' && temporalBoard[5] === 'O') ||
      (temporalBoard[6] === 'X' && temporalBoard[7] === 'X' && temporalBoard[8] === 'X') ||
      (temporalBoard[6] === 'O' && temporalBoard[7] === 'O' && temporalBoard[8] === 'O') ||
      (temporalBoard[0] === 'X' && temporalBoard[4] === 'X' && temporalBoard[8] === 'X') ||
      (temporalBoard[0] === 'O' && temporalBoard[4] === 'O' && temporalBoard[8] === 'O') ||
      (temporalBoard[2] === 'X' && temporalBoard[4] === 'X' && temporalBoard[6] === 'X') ||
      (temporalBoard[2] === 'O' && temporalBoard[4] === 'O' && temporalBoard[6] === 'O') ||
      (temporalBoard[0] === 'X' && temporalBoard[3] === 'X' && temporalBoard[6] === 'X') ||
      (temporalBoard[0] === 'O' && temporalBoard[3] === 'O' && temporalBoard[6] === 'O') ||
      (temporalBoard[1] === 'X' && temporalBoard[4] === 'X' && temporalBoard[7] === 'X') ||
      (temporalBoard[1] === 'O' && temporalBoard[4] === 'O' && temporalBoard[7] === 'O') ||
      (temporalBoard[2] === 'X' && temporalBoard[5] === 'X' && temporalBoard[8] === 'X') ||
      (temporalBoard[2] === 'O' && temporalBoard[5] === 'O' && temporalBoard[8] === 'O')
  ) {
    return { win: true };
  } else if (temporalBoard[0] && temporalBoard[1] && temporalBoard[2] && temporalBoard[3] && temporalBoard[4] && temporalBoard[5] && temporalBoard[6] && temporalBoard[7] && temporalBoard[8]) {
    return { tie: true };
  } else {
    return false;
  }
}

export default checkWinCondition;
