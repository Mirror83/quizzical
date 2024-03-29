import Confetti from "react-confetti";
import {gameStartAnimation, pauseTextColorAnimation} from "../animate_elements";
import React from "react";
import { gameConstants } from "../App";

export default function GameScreen(
  { gameMode,
    questionsAndChoices,
    correctCount, 
    quizDone, 
    playAgain,
    changeOptions,
    checkAnswers,
    time
   }) {
    const animationStarted = React.useRef(false);
    React.useEffect(() => {
      if (!quizDone && !animationStarted.current) {
        gameStartAnimation(gameMode);
        animationStarted.current = true;
      } else if (quizDone) {
        if (gameMode === gameConstants.TIMED_MODE)
          pauseTextColorAnimation();
        animationStarted.current = false;
      }
      
    }, [quizDone, gameMode]);
  
    return(
        <div className="App game">
          <main>
            {gameMode === gameConstants.TIMED_MODE &&
             <div className="timer">{time === 0 ? "Time's Up!" : time}</div>}
            {quizDone && correctCount === 5 && <Confetti tweenDuration={2500}/>}
            <div className="questions">{questionsAndChoices}</div>
            <div className="outcome">
              {quizDone &&
                `You have answered ${correctCount}/5 questions correctly`}
            </div>
            <div className="game-buttons">
              <div
                className="check-answers"
                onClick={quizDone ? playAgain : checkAnswers}>
                {quizDone ? "Play again" : "Check answers"}
              </div>
              {quizDone && <div className="check-answers change-difficulty" onClick = {() => changeOptions()}>Change difficulty and category</div>}
            </div>
          </main>
        </div>
        );
}