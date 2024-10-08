import React from 'react';
import './MobileView.css'

const MobileView = ({ onJoin, playerName, setPlayerName }) => {
  return (
    <div className="mobile-view">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={onJoin}>Join Game</button>
    </div>
  );
};

export default MobileView;
