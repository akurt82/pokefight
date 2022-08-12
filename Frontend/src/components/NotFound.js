import React from "react";
import pokeball from "../media/pokeball.png";

function NotFound() {
  return (
    <div>
      <div>
        <h1>
          4<img src={pokeball} alt="pokeball" id="pokeball" />4
        </h1>
        <h2>Uh-oh!</h2>
        <h4>You look lost on your journey!</h4>
      </div>
    </div>
  );
}

export default NotFound;
