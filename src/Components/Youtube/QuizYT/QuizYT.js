import React from 'react';
import Shuffle from '../../Utils/Shuffle'

const QuizYT = (props) => {
    console.log(props.questions)
    console.log(props.questions[0].answers[0])
    
    const checkIf = (e)=>{ 
     let answer=e.target.value  
       console.log(answer);  
    //    only with 2 equals works
         if (answer == props.questions[0].answers[0]) {
    alert('yes')   
}

    }  
// increase the index+1 on click
// if the question array is not returning nothing finish game
   
    return (
        <div className="the-yt-quiz">
            <h2>{props.questions[0].question}</h2>
           {Shuffle( props.questions[0].answers).map((item) =>
            <button value={item} onClick={(e)=> checkIf(e)} id={item} key= {item}
            className='myButtonYT buttonYT' >
                  <span className='titleColorYT'>{item}</span> 

        </button>
           )}
           
        </div>
    )
};
// displayedAnswer ={item} 


export default QuizYT; 

// 
// var i = 0;
// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// function myFunction() {  
  
//   document.getElementById("demo").innerHTML = fruits[i];
//   i++;
//   if(i == fruits.length){i = 0;}
// }