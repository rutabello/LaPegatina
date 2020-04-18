import React, {Component} from 'react';
import Shuffle from '../../Utils/Shuffle'
import { render } from '@testing-library/react';

class QuizYT extends Component {

state={
    questions:this.props.questions,
    index: 0,
    gameStatus: "playing",
    // correctAnswer:this.props.displayedAnswer
   
}


toNext=()=>{

    if(this.state.questions){
    this.setState({
        index:this.state.index+1
    })
       }else {
         this.props.stopPlaying()
         }
}
    // console.log(props.questions)
    // console.log(props.questions[0].answers[0])
    
checkIf = (e)=>{ 
    // let answer= this.state.questions[this.state.index].answers[0]
     let an=e.target.value  
       console.log(an);  
    //    only with 2 equals works
         if (an == this.state.questions[this.state.index].answers[0]) {
    alert('yes')   
}

}
// now we have tthe alert only when you clik the firs button and it goes to the next question, 
// after at the end is still undefined question, if you change to array lenght it works , but it gives you only one quastion out of 3
// COMBINE BOTH FUNCTIONS, 
// CHECK THE BUTTON VALUE NOT THE ID
// IF CONDITION FOR THE GAME ENDING

   render(){
    return (
        <div className="the-yt-quiz">
            <h2>{this.state.questions[this.state.index].question}</h2>
           {Shuffle(this.state.questions[this.state.index].answers).map((item,index) =>
            <button value={item} onClick={(e)=>{ this.checkIf(e); this.toNext() }} 
             key= {index}
            className='myButtonYT buttonYT' >
                  <span className='titleColorYT'>{item}</span> 

        </button>
           )}
           
        </div>
    )
}
}
// displayedAnswer ={item} 


export default QuizYT; 