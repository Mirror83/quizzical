import Choice from "./Choice";

export default function Question({ quiz, selectChoice, id }) {
  const choices = quiz.choices.map((choice) => (
    <Choice
      choiceText={choice.choice}
      id={choice.id}
      selectChoice={() => selectChoice(id, choice.id)}
      chosen={choice.chosen}
    />
  ));

  return (
    <div className="quiz">
      <div className="question">{quiz.question}</div>
      <div className="choices">{choices}</div>
    </div>
  );
}
