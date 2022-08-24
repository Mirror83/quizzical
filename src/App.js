import React from "react";

import Questions from "./questions";
import Question from "./Question";

import "./App.css";

import logo from "./logo.svg";
import blob from "./blob.svg";
import blob2 from "./blob2.svg";

// TO DO: Refactor the code into seperate components

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [questions, setQuestions] = React.useState(Questions);

  const questionsAndChoices = questions.map((quiz) => (
    <Question
      key={quiz.question}
      id={quiz.question}
      quiz={quiz}
      selectedChoice={quiz.selectedChoice}
      selectChoice={selectChoice}
    />
  ));

  function startQuiz() {
    setQuizStarted(true);
  }

  function selectChoice(questionId, choiceId) {
    const selected = questions.find(
      (question) => question.question === questionId
    );

    setQuestions((prevQuestions) =>
      prevQuestions.map((quiz) => {
        if (quiz.question === questionId) {
          return {
            ...quiz,
            selectedChoice: choiceId,
            choices: quiz.choices.map((choice) => {
              if (choice.id === choiceId) {
                return { ...choice, chosen: true };
              } else {
                return { ...choice, chosen: false };
              }
            }),
          };
        } else {
          return quiz;
        }
      })
    );
    console.log(selected.question, selected.choices[choiceId - 1]);
  }

  if (quizStarted) {
    return (
      <div className="App">
        <div className="questions">{questionsAndChoices}</div>
        <div className="check-answers">Check answers</div>
      </div>
    );
  } else {
    // Welcome Page
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
