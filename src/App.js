import React from "react";

import Question from "./Question";

import "./App.css";

import logo from "./logo.svg";
import blob from "./blob.svg";
import blob2 from "./blob2.svg";

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [quizDone, setQuizDone] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [questionsReady, setQuestionsReady] = React.useState(false);
  const [networkError, setNetworkError] = React.useState(false);

  React.useEffect(() => {
    if (!quizDone) {
      getQuestions();
    }
  }, [quizDone]);

  async function getQuestions() {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      const resultsArray = data.results;
      console.log(resultsArray);
      const questionsArray = resultsArray.map((result) => {
        const choices = [
          ...result.incorrect_answers,
          result.correct_answer,
        ].sort();
        const shiftedChoices = [];
        for (let i = 0; i < 4; i++) {
          shiftedChoices.push({ id: i + 1, chosen: false, choice: choices[i] });
        }

        setQuestionsReady(true);
        setNetworkError(false);

        return {
          question: result.question,
          answer: result.correct_answer,
          choices: shiftedChoices,
          selectedChoice: null,
          correctlyAnswered: false,
        };
      });

      setQuestions(questionsArray);
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("Could not get the questions.");
        setNetworkError(true);
      } else console.log(error);
    }
  }

  const questionsAndChoices = questions.map((quiz) => (
    <Question
      key={quiz.question}
      id={quiz.question}
      quiz={quiz}
      selectedChoice={quiz.selectedChoice}
      selectChoice={selectChoice}
      quizDone={quizDone}
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
            selectedChoice: quiz.choices[choiceId - 1].chosen ? null : choiceId,
            choices: quiz.choices.map((choice) => {
              if (choice.id === choiceId) {
                return {
                  ...choice,
                  chosen: !quiz.choices[choiceId - 1].chosen,
                };
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

  function checkAnswers() {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQuestion) => {
        if (prevQuestion.selectedChoice === null) {
          return prevQuestion;
        } else if (
          prevQuestion.choices[prevQuestion.selectedChoice - 1].choice ===
          prevQuestion.answer
        ) {
          setCorrectCount((prevCount) => prevCount + 1);
          return { ...prevQuestion, correctlyAnswered: true };
        } else return prevQuestion;
      })
    );

    setQuizDone(true);
  }

  function playAgain() {
    setQuestions([]);
    setQuestionsReady(false);
    setQuizDone(false);
    setCorrectCount(0);
  }

  if (quizStarted) {
    if (!questionsReady) {
      return (
        <div className="App">
          <img className="top-blob" src={blob} alt="blob"></img>
          <div className="content-container">
            <img
              className={networkError ? "logo" : "logo faster"}
              src={logo}
              alt="React logo"
            ></img>
            {networkError ? (
              <div className="network-error">
                <h1>Could not get questions</h1>
                <p>Check your internet connection and try reloading the page</p>
              </div>
            ) : (
              <h1 className="loading">Loading questions...</h1>
            )}
          </div>
          <img className="bottom-blob" src={blob2} alt="blob"></img>
        </div>
      );
    } else
      return (
        <div className="App">
          <div className="questions">{questionsAndChoices}</div>
          <div className="outcome">
            {quizDone &&
              `You have answered ${Math.floor(
                correctCount / 2
              )}/5 questions correctly`}
          </div>{" "}
          <div
            className="check-answers"
            onClick={quizDone ? playAgain : checkAnswers}
          >
            {quizDone ? "Play again" : "Check answers"}
          </div>
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
