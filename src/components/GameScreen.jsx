import Confetti from "react-confetti";
import {gameStartAnimation} from "../animate_elements";
import React from "react";

export default function GameScreen(props) {
  const correctCount = Math.floor(
    props.correctCount / 2
  );

  React.useEffect(() => {
    gameStartAnimation();
  }, [])
    return(
        <div className="App game">
          <main>
            {props.quizDone && correctCount === 5 && <Confetti tweenDuration={2500}/>}
            <div className="questions">{props.questionsAndChoices}</div>
            <div className="outcome">
              {props.quizDone &&
                `You have answered ${correctCount}/5 questions correctly`}
            </div>
            <div className="game-buttons">
              <div
                className="check-answers"
                onClick={props.quizDone ? props.playAgain : props.checkAnswers}>
                {props.quizDone ? "Play again" : "Check answers"}
              </div>
              {props.quizDone && <div className="check-answers change-difficulty" onClick = {() => props.changeOptions()}>Change difficulty and category</div>}
            </div>
          </main>
        </div>
        );
}