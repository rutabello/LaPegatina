import React from 'react';

const QuizYT = () => {
    let nr=''
let num=[2,4,9,6] 
    return (
        <div className="the-yt-quiz">
            <h2>How many members are in the band?</h2>
           { num.map((nr) =>
            <button key= {nr} displayedNr ={nr} className='myButtonYT buttonYT' >
                  <span className='titleColorYT'>{nr}</span> 
        </button>
           )}
           
        </div>
    )
};


export default QuizYT; 