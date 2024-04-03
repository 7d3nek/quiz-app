import { useEffect, useState } from "react";
import Window from "../window/Window";


export default function Menu({ onUrlGenerated }) {

    const MAX_QUESTIONS = 10;
    const categories = {
        any: "Any Category",
        9: "General Knowledge",
        10: "Entertainment: Books",
        11: "Entertainment: Film",
        12: "Entertainment: Music",
        13: "Entertainment: Musicals & Theatres",
        14: "Entertainment: Television",
        15: "Entertainment: Video Games",
        16: "Entertainment: Board Games",
        17: "Science & Nature",
        18: "Science: Computers",
        19: "Science: Mathematics",
        20: "Mythology",
        21: "Sports",
        22: "Geography",
        23: "History",
        24: "Politics",
        25: "Art",
        26: "Celebrities",
        27: "Animals",
        28: "Vehicles",
        29: "Entertainment: Comics",
        30: "Science: Gadgets",
        31: "Entertainment: Japanese Anime & Manga",
        32: "Entertainment: Cartoon & Animations"
    };

    const difficulties = ["Easy", "Medium", "Hard"];

    const [questionAmount, setQuestionAmount] = useState(1);
    const [category, setCategory] = useState(9);
    const [difficulty, setDifficulty] = useState("easy");
    const [type, setType] = useState("multiple");
    const [url, setUrl] = useState("");

    function handleNumOfQuestionsChange(e) {
        let num = e.target.value > 10 ? 10 : e.target.value;
        num = num < 1 ? 1 : num;
        setQuestionAmount(num);
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
    }

    function handleDifficultyChange(e) {
        setDifficulty(e.target.value);
    }

    function handleTypeChange(e) {
        setType(e.target.value);
    }

    function generateUrl() {
        let newUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;
        newUrl += category !== "any" ? `&category=${category}` : "";
        newUrl += `&difficulty=${difficulty}&type=${type}`;
        setUrl(newUrl);
        onUrlGenerated(newUrl);
    }

    return (
        <Window title="Menu">
            <label htmlFor="questionAmount">Number of Questions</label>
            <input defaultValue={1} onChange={handleNumOfQuestionsChange} type="number" min={1} max={MAX_QUESTIONS} id="questionAmount" name="questionAmount" /><br />
            <label htmlFor="category">Category</label>
            <select onChange={handleCategoryChange} id="category" name="category">
                {Object.keys(categories).map((value, key) => (
                    <option key={key} value={value}>{categories[value]}</option>
                ))}
            </select><br />
            <label htmlFor="difficulty">Difficulty</label>
            <select onChange={handleDifficultyChange} id="difficulty" name="difficulty">
                {difficulties.map((value, index) => (
                    <option key={index} value={value.toLowerCase()}>{value}</option>
                ))}
            </select><br />
            <label htmlFor="type">Type of Questions</label>
            <select onChange={handleTypeChange} id="type" name="type">
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
                {/* <option value="any">Mixed</option> */}
            </select>
            <button onClick={generateUrl}>Start quiz</button>
        </Window>
        // <div className="container">
        //     <h2>Menu</h2>
        //     <label htmlFor="questionAmount">Number of Questions</label>
        //     <input defaultValue={1} onChange={handleNumOfQuestionsChange} type="number" min={1} max={MAX_QUESTIONS} id="questionAmount" name="questionAmount" /><br />
        //     <label htmlFor="category">Category</label>
        //     <select onChange={handleCategoryChange} id="category" name="category">
        //         {Object.keys(categories).map((value, key) => (
        //             <option key={key} value={value}>{categories[value]}</option>
        //         ))}
        //     </select><br />
        //     <label htmlFor="difficulty">Difficulty</label>
        //     <select onChange={handleDifficultyChange} id="difficulty" name="difficulty">
        //         {difficulties.map((value, index) => (
        //             <option key={index} value={value.toLowerCase()}>{value}</option>
        //         ))}
        //     </select><br />
        //     <label htmlFor="type">Type of Questions</label>
        //     <select onChange={handleTypeChange} id="type" name="type">
        //         <option value="multiple">Multiple Choice</option>
        //         <option value="boolean">True / False</option>
        //         {/* <option value="any">Mixed</option> */}
        //     </select>
        //     <button onClick={generateUrl}>Start quiz</button>
        // </div>
    );
}