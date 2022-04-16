import './Cell.css';
const Cell = ({ handleCellClick, id, text }) => {
  return (
    <div id={id} className={`cell ${text === 'X' ? 'text-success' : 'text-warning'}`} onClick={handleCellClick}>
      {text}
    </div>
  );
};

export default Cell;
