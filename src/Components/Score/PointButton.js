import React, { useContext } from "react";

import scoreboardContext from "../../context/scoreboardContext";

function PointButton({ points }) {
  const scoreboard = useContext(scoreboardContext);

  function updateScore() {
    scoreboard.addPoints(points);
  }

  return <button onClick={updateScore}>Add the{points} to your board!</button>;
}

export default PointButton;
