export default function GameScreen(props) {
    return(
        <div className="App">
          <main>
            <div className="questions">{props.questionsAndChoices}</div>
            <div className="outcome">
              {props.quizDone &&
                `You have answered ${Math.floor(
                  props.correctCount / 2
                )}/5 questions correctly`}
            </div>
            <div
              className="check-answers"
              onClick={props.quizDone ? props.playAgain : props.checkAnswers}
            >
              {props.quizDone ? "Play again" : "Check answers"}
            </div>
          </main>
        </div>
        );
}