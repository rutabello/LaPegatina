/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Shuffle from '../../Utils/Shuffle';
import { MyContext } from '../../../context/MyProvider';
import  YTCountdown from '../YTCountdown/YTCountdown';
import Confetti from 'react-confetti';

class QuizYT extends Component {

    state={
        index: 0,
        percent: 1,
        correctAnswer: this.props.questions[0].answers[0],
        answers: Shuffle(this.props.questions[0].answers),
        points: 0,
        display: 'question',
        giveMeConfetti:true,
    }
    // function the is passing to the next question{by increasing the index} and adding points for the right ones
    updateProgress = (field, val) => {
        this.setState({ [field]: val });
      };

    toNext = () => {
        const { questions } = this.props;
        const { index } = this.state;

        // if(this.state.index > this.state.counter){
        if (index < 4) {
            this.setState({
                index: index + 1,
                correctAnswer: questions[index + 1].answers[0],
                answers: Shuffle(questions[index + 1].answers),
                display: 'question',
                giveMeConfetti: true,
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
                points: points + 357,
                display: 'timer',
            });

            this.props.showConfetti();
            // this.updateProgress("percent", this.state.percent + 1)
            setTimeout(() => {
                this.toNext();
            }, 5000);
            localStorage.setItem ('yt_points_1', this.state.points)
        }
    }

    render() {

        const { questions } = this.props;
        const { index, points, display, answers, giveMeConfetti } = this.state;

        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className="the-yt-quiz">
                        {display === 'timer'
                            ? (
                                <div className="confeti-countdown">
                                    {giveMeConfetti &&
                                        <Confetti
                                        width={window.innerWidth}
                                        height={window.innerHeight}
                                        recycle={false}
                                        gravity={0.6}
                                        />
                                    }
                                    <YTCountdown
                                        toNext={this.toNext}
                                        width={900} percent={this.state.percent}
                                    />
                                </div>
                            )
                            : (
                                <div>
                                    <div className="show">
                                        <h4 className="quiz-text">{questions[index].question}</h4>
                                    </div>
                                    <div className="btn-4-YT">
                                        {answers.map((item, index) => (
                                            <button
                                                type="button"
                                                value={item}
                                                onClick={(e) => {this.checkIf(e)}}
                                                key={index}
                                                className="myButtonYT buttonYT titleColorYT"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}


export default QuizYT;