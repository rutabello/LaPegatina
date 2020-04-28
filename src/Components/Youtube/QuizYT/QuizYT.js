/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Shuffle from '../../Utils/Shuffle';
import { MyContext } from '../../../context/MyProvider';
import YTCountdown from '../YTCountdown/YTCountdown';

class QuizYT extends Component {

state={
    questions: this.props.questions,
    index: 0,
    // gameStatus: "playing",
    correctAnswer: this.props.questions[0].answers[0],
    points: 0,
    display: 'question',
    // counter: 0
    // clicked: false
}
// function the is passing to the next question{by increasing the index} and adding points for the right ones

    toNext = () => {

        const { questions, index } = this.state;
        // if(this.state.index > this.state.counter){
        if (index < 4) {
            this.setState({
                index: index + 1,
                correctAnswer: questions[index + 1].answers[0],
                display: 'question',

                // points: points + 1000,
                // counter: this.state.counter+1
            });
        } else {
            this.props.stopPlaying();
        }
    }

    checkIf = (e) => {

        const { correctAnswer, points } = this.state;

        const displayedAnswer = e.target.value;

        if (displayedAnswer === correctAnswer) {
            this.setState({
                points: points + 1000,
                display: 'timer',
            });

            setTimeout(() => {
                this.toNext();
            }, 5000);
        }
    }

    shuffledQuestions = () => {

        const { questions } = this.state;

        Shuffle(questions);

        this.setState({
            questions,
        });
    }


    render() {

        const { questions, index, points, display } = this.state;

        return (
            <MyContext.Consumer>
                {(context) => (

                    <div className="the-yt-quiz">
                        {display === 'timer'
                            ? (
                                <div>
                                    <YTCountdown toNext={this.toNext} />
                                </div>
                            )
                            : (
                                <div>
                                    <div className="quiz-text">
                                        <h4 className="quiz-text">{questions[index].question}</h4>
                                        {/* <h6 className ='quiz-text'>
                                            Score:
                                            {points}
                                        </h6> */}
                                    </div>
                                    <div className="btn-4-YT">
                                        {questions[index].answers.map((item, index) => (
                                            <button
                                                type="button"
                                                value={item}
                                                onClick={(e) => { this.checkIf(e); context.addPoints(points); }}
                                                key={index}
                                                className="myButtonYT buttonYT titleColorYT"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}


export default QuizYT;
