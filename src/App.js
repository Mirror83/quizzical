import React from "react";

import Question from "./Question";

import "./App.css";

import LoadingScreen from "./components/LoadingScreen";
import Welcome from "./components/Welcome";
import GameScreen from "./components/GameScreen";

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
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      const resultsArray = data.results;
      // console.log(resultsArray);
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
      return <LoadingScreen networkError={networkError} />;
    } else
      return (
        <GameScreen
          questionsAndChoices={questionsAndChoices}
          quizDone={quizDone}
          correctCount={correctCount}
          playAgain={() => playAgain()}
          checkAnswers={() => checkAnswers()}
        />
      );
  } else {
    // Welcome Page
    return <Welcome startQuiz={startQuiz} />;
  }
}

export default App;
