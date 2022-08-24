import React from "react";

import Questions from "./questions";

import "./App.css";

import logo from "./logo.svg";
import blob from "./blob.svg";
import blob2 from "./blob2.svg";

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);

  const questionsAndChoices = Questions.map((quiz) => (
    <div className="quiz">
      <div className="question">{quiz.question}</div>
      <div className="choices">
        {quiz.choices.map((choice) => (
          <div className="choice">{choice}</div>
        ))}
      </div>
    </div>
  ));

  function startQuiz() {
    setQuizStarted(true);
  }

  if (quizStarted) {
    return (
      <div className="App">
        <div className="questions">{questionsAndChoices}</div>
        <div className="check-answers">Check answers</div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <img className="top-blob" src={blob} alt="blob"></img>
        <div className="content-container">
          <img className="logo" src={logo} alt="React logo"></img>
          <h1 className="title">Quizzical</h1>
          <p className="description">Test your trivia knowledge</p>
          <div className="start-quiz" onClick={startQuiz}>
            Start Quiz
          </div>
        </div>
        <img className="bottom-blob" src={blob2} alt="blob"></img>
      </div>
    );
  }
}

export default App;
