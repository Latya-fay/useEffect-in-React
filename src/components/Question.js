import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          onAnswered(false); // Answer times out
          return 10; // Reset the timer for the next question
        }
        return prevTime - 1; // Decrement the timer
      });
    }, 1000);

    return () => {
      clearTimeout(timerId); // Cleanup timeout on unmount
    };
  }, [timeRemaining, onAnswered]); // Re-run effect when timeRemaining changes

  return (
    <div>
      <h1>{question.prompt}</h1>
      <h4>Time Remaining: {timeRemaining} seconds</h4>
      {question.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onAnswered(answer === question.correctAnswer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

export default Question;
