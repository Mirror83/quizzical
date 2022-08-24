import Choice from "./Choice";

export default function Question({ quiz, selectChoice, id, quizDone }) {
  const choices = quiz.choices.map((choice) => (
    <Choice
      key={choice.choice}
      choiceText={choice.choice}
      id={choice.id}
      selectChoice={() => selectChoice(id, choice.id)}
      chosen={choice.chosen}
      quizDone={quizDone}
      correct={choice.choice === quiz.answer ? true : false}
    />
  ));

  return (
    <div className="quiz">
      <div className="question">{quiz.question}</div>
      <div className="choices">{choices}</div>
    </div>
  );
}
