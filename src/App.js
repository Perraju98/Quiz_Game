import './App.css';
import { useState, useEffect } from 'react';
import QRCodeDisplay from './components/QRCodeDisplay';
import QuestionDisplay from './components/QuestionDisplay';
import MobileView from './components/MobileView';

const questions = [
  {
    question: "What is the capital of France?",
    options: { A: "Paris", B: "London", C: "Berlin", D: "Madrid" },
    answer: "A",
  },
  {
    question: "What is 2 + 2?",
    options: { A: "3", B: "4", C: "2", D: "5" },
    answer: "B",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Saturn" },
    answer: "B",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Arctic Ocean", D: "Pacific Ocean" },
    answer: "D",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: { A: "Charles Dickens", B: "Mark Twain", C: "William Shakespeare", D: "Jane Austen" },
    answer: "C",
  },
];

const App = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  const resetGame = () => {
    setPlayers([]);
    setPlayerName('');
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setFeedback({ message: '', type: '' });
    setGameOver(false);
    setScores({});
    setGameStarted(false);
  };

  const handleJoin = () => {
    if (playerName.trim() !== '' && !gameStarted) {
      setPlayers((prevPlayers) => [...prevPlayers, playerName]);
      setScores((prevScores) => ({ ...prevScores, [playerName]: 0 }));
      setPlayerName('');
      setGameStarted(true);
    }
  };

  const handleAnswer = (userAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const currentPlayer = players[players.length - 1];

    setScores((prevScores) => {
      const newScore = userAnswer === correctAnswer ? (prevScores[currentPlayer] || 0) + 1 : prevScores[currentPlayer] || 0;
      return { ...prevScores, [currentPlayer]: newScore };
    });

    if (userAnswer === correctAnswer) {
      setFeedback({ message: `Congratulations ${currentPlayer}, you are correct!`, type: 'correct' });
    } else {
      setFeedback({ message: `Sorry ${currentPlayer}, that's incorrect. The correct answer was ${questions[currentQuestionIndex].options[correctAnswer]}.`, type: 'incorrect' });
    }

    setIsAnswered(true);
  };

  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setIsAnswered(false);
          setFeedback({ message: '', type: '' });
        } else {
          setGameOver(true);
          setFeedback({ message: "Game Over! You've completed the quiz.", type: 'complete' });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAnswered, currentQuestionIndex]);

  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  const mobileUrl = "http://192.168.29.213:3000";

  return (
    <div className="app-container">
      <h1 className="app-title">Quiz Game</h1>
      <QRCodeDisplay url={mobileUrl} />
      <div className="player-section">
        <h2 className="players-title">Players:</h2>
        <ul className="players-list">
          {players.map((player, index) => (
            <li key={index} className="player-item">{player}: {scores[player] || 0}</li>
          ))}
        </ul>
        {isMobile() ? (
          <MobileView onJoin={handleJoin} playerName={playerName} setPlayerName={setPlayerName} />
        ) : (
          <div className="desktop-join">
            <input
              type="text"
              className="name-input"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
            />
            <button className="join-button" onClick={handleJoin}>Join Game</button>
          </div>
        )}
        {feedback.message && <h2 className={`feedback-message ${feedback.type}`}>{feedback.message}</h2>}
        {gameOver && (
          <div className="game-over">
            <h2 className="final-scores-title">Final Scores:</h2>
            <ul className="players-list">
              {players.map((player, index) => (
                <li key={index} className="player-item">{player}: {scores[player] || 0}</li>
              ))}
            </ul>
            <button className="restart-button" onClick={resetGame}>Restart Game</button>
          </div>
        )}
        {!gameOver && players.length > 0 && !isAnswered && (
          <QuestionDisplay
            questionDetails={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
            feedback={feedback}
          />
        )}
      </div>
    </div>
  );
};

export default App;
