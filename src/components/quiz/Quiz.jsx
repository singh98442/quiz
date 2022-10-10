import React, { useEffect, useState } from 'react'
import './Quiz.scss'
import useSound from "use-sound"
import play from '../../assets/play.mp3';
import correct from '../../assets/correct.mp3';
import wrong from '../../assets/wrong.mp3';

const Quiz = ({ setStop, data, questionNumber, setQuestionNumber }) => {

    const [question, setQuestion] = useState(null)
    const [answerSelected, setAnswerSelected] = useState(null)
    const [className, setClassName] = useState("answers")

    const [letsplay] = useSound(play);
    const[correctall] = useSound(correct);
    const[wrongall] = useSound(wrong);

    useEffect(() => {
        letsplay();
    }, [letsplay]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);

    }

    const handleClick = (a) => {
        setAnswerSelected(a)
        setClassName("answerList active");

        setTimeout(() => {
            setClassName(a.correct ? "answerList correct" : "answerList wrong")

        }, 3000);

        delay(5000, () => {
            if (a.correct) {
                correctall();
                delay((1000), ()=>{

                    setQuestionNumber((pre) => pre + 1);
                    setAnswerSelected(null);
                })
            } else {

                wrongall();
                delay(1000,()=>{

                    setStop(true)
                })
            }
        })
    }

   
    return (
        <div className='quiz'>
            <div className="questions">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (

                    <div className={answerSelected === a ? className : "answerList"} onClick={() => handleClick(a)}>{a.text}</div>
                ))}

            </div>

        </div>
    )
}

export default Quiz
