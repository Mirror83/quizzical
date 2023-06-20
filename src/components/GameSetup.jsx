import React from "react";

// import logo from "../logo.svg";
import blob from "../blob.svg";
import blob2 from "../blob2.svg";

import { setUpScreenAnimation } from "../animate_elements";
import { gameConstants } from "../App";

const categories = [
  "General Knowledge",
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theater",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime and Manga",
  "Entertainment: Cartoons & Animations",
];

const categoryOffset = 9;

export default function GameSetup(props) {
  React.useEffect(() => {
    setUpScreenAnimation();
  }, []);
  const optionElements = categories.map((category) => (
    <OptionElement
      value={categories.indexOf(category) + categoryOffset}
      text={category}
      key={categories.indexOf(category)}
    />
  ));

  return (
    <div className="App">
      <img className="top-blob" src={blob} alt="blob"></img>
      <main>
        <div className="content-container">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              props.gameSetUpDone();
            }}
          >
            <div>
              <h1 className="setup-title">Game Setup</h1>
              <label htmlFor="difficulty">Difficulty </label>
              <div>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={props.gameOptions.difficulty}
                  onChange={(e) => props.changeGameDifficulty(e.target.value)}
                >
                  <option value="any">Any</option>
                  <option value="easy">Easy</option>
                  <option value="hard">Hard</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="category">Cartegory </label>
              <select
                id="category"
                name="category"
                value={props.gameOptions.category}
                onChange={(e) => props.changeGameCategory(e.target.value)}
              >
                <option value="any">Any</option>
                {optionElements}
              </select>
            </div>

            <div>
              <label htmlFor="mode">Mode </label>
              <select
                id="mode"
                name="mode"
                value={props.gameOptions.mode}
                onChange={(e) => {
                  props.changeGameMode(Number(e.target.value));
                }}
              >
                <option value={gameConstants.DEFAULT_MODE}>Default</option>
                <option value={gameConstants.TIMED_MODE}>Timed</option>
              </select>
            </div>
            <button>Start quiz</button>
          </form>
        </div>
      </main>
      <img className="bottom-blob" src={blob2} alt="blob"></img>
    </div>
  );
}

function OptionElement(props) {
  return <option value={props.value}>{props.text}</option>;
}
