import React from "react";

import Question from "./Question";

import "./App.css";

import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import Welcome from "./components/Welcome";
import GameSetup from "./components/GameSetup";

function App() {
  const [startGameSetup, setStartGameSetUp] = React.useState(false);
  const [isGameSetUp, setIsGameSetUp] = React.useState(false);
  const [gameOptions, setGameOptions] = React.useState({
    category: "any",
    difficulty: "any",
  });

  const [questions, setQuestions] = React.useState([]);
  const [questionsReady, setQuestionsReady] = React.useState(false);
  const [networkError, setNetworkError] = React.useState(false);

  const [quizDone, setQuizDone] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);

  React.useEffect(() => {
    if (isGameSetUp && !quizDone) {
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
    console.log(trivia_db_url);

    return trivia_db_url;
  }

  async function getQuestions() {
    try {
      const response = await fetch(urlSetup());
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

  function gameSetUpDone() {
    setIsGameSetUp(true);
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
        correctCount={correctCount}
        playAgain={playAgain}
        checkAnswers={checkAnswers}
        changeOptions={changeOptions}
      />
    );
  } else if (isGameSetUp && !questionsReady) {
    return <LoadingScreen networkError={networkError} />;
  }

  // if (quizStarted) {
  //   if (!questionsReady) {
  //     return <LoadingScreen networkError={networkError} />;
  //   } else
  //     return (
  //       <GameScreen
  //         questionsAndChoices={questionsAndChoices}
  //         quizDone={quizDone}
  //         correctCount={correctCount}
  //         playAgain={playAgain}
  //         checkAnswers={checkAnswers}
  //       />
  //     );
  // } else {
  //   return <Welcome startQuiz={startQuiz} />;
  // }
}

export default App;
