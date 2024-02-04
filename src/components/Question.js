import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timerId;

    const timerTick = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          onAnswered(false);
          return 10;
        }
        return prevTime - 1;
      });
    };

    // Use setTimeout for better compatibility with testing
    timerId = setTimeout(() => {
      const intervalId = setInterval(timerTick, 1000);
      return () => clearInterval(intervalId);
    }, 0);

    return () => clearTimeout(timerId); // Use clearTimeout here
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
