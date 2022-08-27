import { decode } from "html-entities";

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
        {decode(choiceText)}
      </div>
    );
  } else
    return (
      <div
        className={chosen ? "choice chosen" : "choice"}
        onClick={selectChoice}
      >
        {decode(choiceText)}
      </div>
    );
}
