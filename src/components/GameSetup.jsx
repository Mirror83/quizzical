import React from "react";

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
 "Entertainment: Cartoons & Animations"
];

const categoryOffset = 9;

export default function GameSetup(props) {
    
    const optionElements = categories.map(
        category => <OptionElement 
        value={categories.indexOf(category) + categoryOffset} 
        text={category}
        key={categories.indexOf(category)} 
    />);
 
    return <div className="App">
        <main>
            <div className="content-container">
            <form action=""
             onSubmit={
                (e) => {
                    e.preventDefault()
                    props.gameSetUpDone()
                }
            }>
                <label htmlFor="difficulty">Difficulty: </label>
                <select id="difficulty" 
                name="difficulty" 
                value={props.gameOptions.difficulty} 
                onChange={(e) => props.changeGameDifficulty(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="easy">Easy</option>
                    <option value="hard">Hard</option>
                    <option value="medium">Medium</option>
                </select>

                <label htmlFor="category">Cartegory: </label>
                <select id="category" 
                name="category" 
                value={props.gameOptions.category} 
                onChange={(e) => props.changeGameCategory(e.target.value)}>
                    <option value="any">Any</option>
                    {optionElements}
                </select>
                <button className="start-quiz">
                    Start quiz
                </button>
            </form>
            </div>
        </main>
    </div>
}

function OptionElement(props) {
   return <option value={props.value}>{props.text}</option> 
}