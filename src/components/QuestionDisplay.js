import React from 'react';
import './QuestionDisplay.css'; // Import the CSS file

const QuestionDisplay = (props) => {
  const { questionDetails, handleAnswer } = props;
  const { question, options } = questionDetails;

  const onClickHandleAnswer = (event) => {
    handleAnswer(event.target.value);
  };

  return (
    <div className="question-display-container">
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {Object.entries(options).map(([key, value]) => (
          <button
            key={key}
            value={key}
            onClick={onClickHandleAnswer}
            className="option-button"
          >
            {key}: {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
