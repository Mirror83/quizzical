import React from "react";

import logo from "../logo.svg";
import blob from "../blob.svg";
import blob2 from "../blob2.svg";

import { welcomeAnimation } from "../animate_elements";

export default function Welcome(props) {
    React.useEffect(() => {
      welcomeAnimation();
    }, [])
    return <div className="App">
        <img className="top-blob" src={blob} alt="blob"></img>
        <main>
          <div className="content-container">
            <img className="logo" src={logo} alt="React logo"></img>
            <h1 className="title">Quizzical</h1>
            <p className="description">Test your trivia knowledge</p>
            <div className="start-quiz" onClick={props.startGameSetup}>
              Start
            </div>
          </div>
        </main>
        <img className="bottom-blob" src={blob2} alt="blob"></img>
      </div>
}