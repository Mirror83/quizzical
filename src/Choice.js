export default function Choice({
  choiceText,
  selectChoice,
  chosen,
  quizDone,
  correct,
}) {
  if (quizDone) {
    return (
      <div
        className={
          correct
            ? "choice correct"
            : chosen
            ? "choice wrong"
            : "choice not-chosen"
        }
      >
        {choiceText}
      </div>
    );
  } else
    return (
      <div
        className={chosen ? "choice chosen" : "choice"}
        onClick={selectChoice}
      >
        {choiceText}
      </div>
    );
}
