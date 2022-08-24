export default function Choice({ choiceText, selectChoice, chosen }) {
  return (
    <div className={chosen ? "choice chosen" : "choice"} onClick={selectChoice}>
      {choiceText}
    </div>
  );
}
