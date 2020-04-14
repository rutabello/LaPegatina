import React, { useContext } from "react";

import scoreboardContext from "../../context/scoreboardContext";

function Scoreboard() {
  const scoreboard = useContext(scoreboardContext);

  return <div>Score: {scoreboard.score}</div>;
}

export default Scoreboard;
