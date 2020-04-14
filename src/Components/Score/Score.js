import React, { useState } from "react";
import ReactDOM from "react-dom";

import Scoreboard from "./Scoreboard";
import PointButton from "./PointButton";

import scoreboardContext from '../../context/scoreboardContext';

function Score(props) {
  // const [state, updateState] = useState(0);
  const [score, setScore] = useState(0);
// console.log (this.props.score)
const point= props.score
console.log(point)
  return (
    <scoreboardContext.Provider
      value={{ score, addPoints: points => setScore(score => score + points) }}
    >
      <div style={{ textAlign: "center" }}>
        <Scoreboard />
        <hr />
        {/* <PointButton points={1} />/ */}
        {/* to pass the count props */}
        <PointButton points={point} />
        <hr />
        {/* <button onClick={() => updateState(Math.random())}>Force Render</button> */}
      </div>
    </scoreboardContext.Provider>
  );
}
export default Score