import "./App.css";

import logo from "./logo.svg";
import blob from "./blob.svg";
import blob2 from "./blob2.svg";

function App() {
  return (
    <div className="App">
      <img className="top-blob" src={blob} alt="blob"></img>
      <div className="content-container">
        <h1 className="title">Quizzical</h1>
        <p className="description">Test your trivia knowledge</p>
        <div className="start-quiz">Start Quiz</div>
      </div>
      <img className="bottom-blob" src={blob2} alt="blob"></img>
    </div>
  );
}

export default App;
