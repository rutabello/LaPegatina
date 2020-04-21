import React, {Component} from 'react';
import Shuffle from '../../Utils/Shuffle'


class QuizYT extends Component {

state={
    questions:this.props.questions,
    index: 0,
    gameStatus: "playing",
    correctAnswer:this.props.questions[0].answers[0],
    points: 0,
    counter: 0
    // clicked: false
}
// function the is passing to the next question{by increasing the index} and adding points for the right ones
toNext=()=>{
    // if(this.state.index > this.state.counter){
        if(this.state.index < 4){
        console.log (this.state.index)
    this.setState({
        index:this.state.index+1,
        correctAnswer: this.state.questions[this.state.index+1].answers[0],
        points: this.state.points + 1000,
        // counter: this.state.counter+1
    })
       }else {
         this.props.stopPlaying()
         }
}
// checking if the button pressed is the right answer, 
// the right answer is always the first anwer from the object array
// and only if it's right it goes to the next question
checkIf = (e)=>{  
  let displayedAnswer = e.target.value
  console.log (displayedAnswer)
    if (displayedAnswer == this.state.correctAnswer) {
    this.toNext()   
    }  
}
// IF CONDITION FOR THE GAME ENDING

   render(){
    return (
        <div className="the-yt-quiz">
        <div className="quiz-text">
            <h4>{this.state.questions[this.state.index].question}</h4>
            <h6>Score:{this.state.points}</h6>
            </div>
            <div className ="btn-4-YT">
           {Shuffle(this.state.questions[this.state.index].answers).map((item,index) =>
            <button value={item} onClick={(e)=> this.checkIf(e)} 
             key= {index}
            className='myButtonYT buttonYT' >
                  <span className='titleColorYT'>{item}</span> 

        </button>
           )}
           </div>
        </div>
        )
    }
}


export default QuizYT; 