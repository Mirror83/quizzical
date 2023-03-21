import logo from "../logo.svg";
import blob from "../blob.svg";
import blob2 from "../blob2.svg";

export default function LoadingScreen(props) {
    return <div className="App">
          <img className="top-blob" src={blob} alt="blob"></img>
          <div className="content-container">
            <img
              className={props.networkError ? "logo" : "logo faster"}
              src={logo}
              alt="React logo"
            ></img>
            <main>
              {props.networkError ? (
                <div className="network-error">
                  <h1>Could not get questions</h1>
                  <p>
                    Check your internet connection and try reloading the page
                  </p>
                </div>
              ) : (
                <h1 className="loading">Loading questions...</h1>
              )}
            </main>
          </div>
          <img className="bottom-blob" src={blob2} alt="blob"></img>
        </div>
}