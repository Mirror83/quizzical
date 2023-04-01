import React from "react";

import Question from "./Question";

import "./App.css";

import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import Welcome from "./components/Welcome";
import GameSetup from "./components/GameSetup";

// Game constants
const gameConstants = {
  NUM_CHOICES: 4,
  DEFAULT_MODE: 0,
  TIMED_MODE: 1,
  DEFAULT_TIME_IN_SECONDS: 60,
};

// Task: Code clean-up required
function App() {
  const [startGameSetup, setStartGameSetUp] = React.useState(false);
  const [isGameSetUp, setIsGameSetUp] = React.useState(false);
  const [gameOptions, setGameOptions] = React.useState({
    category: "any",
    difficulty: "any",
    mode: gameConstants.TIMED_MODE,
  });

  const [questions, setQuestions] = React.useState({
    correctCount: 0,
    questions: [],
  });
  const [questionsReady, setQuestionsReady] = React.useState(false);
  const getQuestionsCalled = React.useRef(false);
  const [networkError, setNetworkError] = React.useState(false);

  const [time, setTime] = React.useState(gameConstants.DEFAULT_TIME_IN_SECONDS);
  const intervalObject = React.useRef(null);

  const [quizDone, setQuizDone] = React.useState(false);

  React.useEffect(() => {
    if (
      gameOptions.mode === gameConstants.TIMED_MODE &&
      intervalObject.current === null &&
      questionsReady
    ) {
      intervalObject.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  }, [gameOptions, intervalObject, questionsReady]);

  React.useEffect(() => {
    if (isGameSetUp && !quizDone && !getQuestionsCalled.current) {
      getQuestionsCalled.current = true;
      // eslint-disable-next-line
      getQuestions();
    }
  }, [isGameSetUp, quizDone]);

  function urlSetup() {
    let trivia_db_url = "https://opentdb.com/api.php?amount=5";
    if (gameOptions.category === "any" && gameOptions.difficulty === "any") {
      trivia_db_url += "";
    } else if (gameOptions.category === "any") {
      trivia_db_url += `&difficulty=${gameOptions.difficulty}`;
    } else if (gameOptions.difficulty === "any") {
      trivia_db_url += `&category=${gameOptions.category}`;
    } else {
      trivia_db_url += `&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}`;
    }

    trivia_db_url += "&type=multiple";

    return trivia_db_url;
  }

  async function getQuestions() {
    try {
      const response = await fetch(urlSetup());
      const data = await response.json();
      const resultsArray = data.results;
      const questionsArray = resultsArray.map((result) => {
        const choices = [
          ...result.incorrect_answers,
          result.correct_answer,
        ].sort();
        const shiftedChoices = [];
        for (let i = 0; i < gameConstants.NUM_CHOICES; i++) {
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

      setQuestions({ correctCount: 0, questions: questionsArray });
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("Could not get the questions.");
        setNetworkError(true);
      } else console.log(error);
    }
  }

  const questionsAndChoices = questions.questions.map((quiz) => (
    <Question
      key={quiz.question}
      id={quiz.question}
      quiz={quiz}
      selectedChoice={quiz.selectedChoice}
      selectChoice={selectChoice}
      quizDone={quizDone}
    />
  ));

  function gameSetUpDone() {
    setIsGameSetUp(true);
  }

  function selectChoice(questionId, choiceId) {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      questions: prevQuestions.questions.map((quiz) => {
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
      }),
    }));
  }

  function checkAnswers() {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      questions: prevQuestions.questions.map((prevQuestion) => {
        if (prevQuestion.selectedChoice === null) {
          return prevQuestion;
        } else if (
          prevQuestion.choices[prevQuestion.selectedChoice - 1].choice ===
          prevQuestion.answer
        ) {
          prevQuestions.correctCount += 1;
          return { ...prevQuestion, correctlyAnswered: true };
        } else return prevQuestion;
      }),
    }));

    if (gameOptions.mode === gameConstants.TIMED_MODE) {
      clearInterval(intervalObject.current);
      intervalObject.current = null;
    }

    setQuizDone(true);
  }

  React.useEffect(() => {
    if (
      gameOptions.mode === gameConstants.TIMED_MODE &&
      time < 0 &&
      !quizDone
    ) {
      setTime(0);
      clearInterval(intervalObject.current);
      intervalObject.current = null;
      checkAnswers();
    }
  }, [gameOptions, time, quizDone]);

  function playAgain() {
    setQuestions({ correctCount: 0, questions: [] });
    setQuestionsReady(false);
    setQuizDone(false);
    getQuestionsCalled.current = false;
    if (gameOptions.mode === gameConstants.TIMED_MODE)
      setTime(gameConstants.DEFAULT_TIME_IN_SECONDS);
  }

  function changeStartGameSetup() {
    setStartGameSetUp((prevSetup) => !prevSetup);
  }

  function changeGameCategory(newCategory) {
    setGameOptions((prevOptions) => ({
      ...prevOptions,
      category: newCategory,
    }));
  }

  function changeGameDifficulty(newDifficulty) {
    setGameOptions((prevOptions) => ({
      ...prevOptions,
      difficulty: newDifficulty,
    }));
  }

  function changeOptions() {
    setIsGameSetUp(false);
    playAgain();
  }

  if (!startGameSetup) {
    return <Welcome startGameSetup={changeStartGameSetup} />;
  } else if (startGameSetup && !isGameSetUp) {
    return (
      <GameSetup
        gameOptions={gameOptions}
        changeGameCategory={changeGameCategory}
        changeGameDifficulty={changeGameDifficulty}
        gameSetUpDone={gameSetUpDone}
      />
    );
  }

  if (isGameSetUp && questionsReady) {
    return (
      <GameScreen
        questionsAndChoices={questionsAndChoices}
        quizDone={quizDone}
        correctCount={questions.correctCount}
        playAgain={playAgain}
        checkAnswers={checkAnswers}
        changeOptions={changeOptions}
        gameMode={gameOptions.mode}
        time={time}
      />
    );
  } else if (isGameSetUp && !questionsReady) {
    return <LoadingScreen networkError={networkError} />;
  }
}

export { App, gameConstants };
