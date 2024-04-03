import { useEffect, useState } from "react";
import { decode } from 'html-entities';
import Window from "../window/Window";
import { useQuery } from '@tanstack/react-query';

export default function QuizContent({ url }) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(-1);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [allowedToFetch, setAllowedToFetch] = useState(true);

    const { data, isPending, isError, isSuccess } = useQuery({
       queryKey: ["quizQuestions"],
       queryFn: () => fetch(url).then(res => {
        setAllowedToFetch(false);
        return res.json();
       }),
       enabled: allowedToFetch
    });

    useEffect(() => {
        createAnswerArray();
    }, [isSuccess, currentQuestion]);

    if (!data || isPending) {
        return (<Window title={"Loading, please wait..."} />);
    }

    if (isError) {
        return (<Window title={"Something went wrong..."}>
                    <button onClick={() => location.reload()}>Try Again!</button>
                </Window>);
    }

    function createAnswerArray() {
        if (data) {
            let arr = [...data["results"][currentQuestion]["incorrect_answers"]];
            let index = Math.floor(Math.random() * arr.length);
            setCorrectAnswer(index);
            arr.splice(index, 0, data["results"][currentQuestion]["correct_answer"]);
            setAnswers(arr);
        }
    }

    function handleNextQuestion() {
        currentQuestion < data["results"].length ? setCurrentQuestion(currentQuestion + 1) : null;
        setHasAnswered(false);
        setSelectedAnswer(null);
    }

    function handleFinishQuiz() {
        setFinished(true);
    }

    function checkAnswer(index) {
        if (!hasAnswered) {
            setSelectedAnswer(index);
            setHasAnswered(true);
            setScore(s => index === correctAnswer ? s + 1 : s);

        }
    }

    return (
        <>
            {
                !finished ?
                    <Window title={`${currentQuestion + 1}. ${decode(data["results"][currentQuestion]["question"])}`}>
                        <div className="answers-container">
                            {answers.map((answer, index) => (
                                <p key={index}
                                    onClick={() => checkAnswer(index)}
                                    className={hasAnswered && (index === selectedAnswer) ? (index === correctAnswer) ? "correct_answer" : "incorrect_answer" : ""}
                                    style={{
                                        backgroundColor: hasAnswered && index === correctAnswer && "#3acd3c",
                                        pointerEvents: hasAnswered && "none"
                                    }}>{decode(answer)}</p>
                            ))}
                        </div>
                        {
                            currentQuestion < data["results"].length - 1
                                ? <button disabled={hasAnswered === true ? false : true} onClick={handleNextQuestion}>Next Question</button>
                                : <button disabled={hasAnswered === true ? false : true} onClick={handleFinishQuiz}>Finish</button>
                        }
                    </Window>
                    :
                    <Window title={score > 0 ? "Congratulations! 🏆" : "Better Luck Next Time! 🍀"}>
                        <p className="finish-text">Your score is: {score} / {data["results"].length}</p>
                        <button onClick={() => location.reload()}>Play Again!</button>
                    </Window>
            }
        </>
    );
}