/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Shuffle from '../../Utils/Shuffle';


class QuizYT extends Component {

state={
    questions: this.props.questions,
    index: 0,
    // gameStatus: "playing",
    correctAnswer: this.props.questions[0].answers[0],
    points: 0,
    // counter: 0
    // clicked: false
}
// function the is passing to the next question{by increasing the index} and adding points for the right ones

    toNext = () => {

        const { questions, index, points } = this.state;
        // if(this.state.index > this.state.counter){
        if (index < 4) {
            this.setState({
                index: index + 1,
                correctAnswer: questions[index + 1].answers[0],
                points: points + 1000,
                // counter: this.state.counter+1
            });
        } else {
            this.props.stopPlaying();
        }
    }
    // checking if the button pressed is the right answer,
    // the right answer is always the first anwer from the object array
    // and only if it's right it goes to the next question

    checkIf = (e) => {

        const { correctAnswer } = this.state;

        const displayedAnswer = e.target.value;

        if (displayedAnswer === correctAnswer) {
            this.toNext();
        }
    }
    // IF CONDITION FOR THE GAME ENDING

    render() {

        const { questions, index, points } = this.state;

        return (
            <div className="the-yt-quiz">
                <div className="quiz-text">
                    <h4>{questions[index].question}</h4>
                    <h6>
                        Score:
                        {points}
                    </h6>
                </div>
                <div className="btn-4-YT">
                    {Shuffle(questions[index].answers).map((item, index) => (
                        <button
                            type="button"
                            value={item}
                            onClick={(e) => this.checkIf(e)}
                            key={index}
                            className="myButtonYT buttonYT titleColorYT"
                        >
                        {item}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}


export default QuizYT;
