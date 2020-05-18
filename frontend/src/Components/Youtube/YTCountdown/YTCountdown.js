import React from 'react';
// import QuizYT from '../QuizYT/QuizYT';
import '../YTCountdown/YTCountdown.css';

import { useState, useEffect } from 'react';


const YTCountdown=  ({width, percent}) => {

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * width);
  });

  return (
    <div>
      <div className="progress-div" style={{ width: width }}>
        <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
};

// //       SIMPLE COUNTDOWN
// //     const [seconds, setSeconds] = React.useState(5);

// //     React.useEffect(() => {
// //         if (seconds > 0) {
// //             setTimeout(() => setSeconds(seconds - 1), 1000);
// //         }
// //     });

// //     return (
// //         <div className="YTCountdown">
// //             <h5>
// //                 {'Next question in '}
// //                 {seconds}
// //             </h5>
// //         </div>
// //     );
// // }

export default YTCountdown;
