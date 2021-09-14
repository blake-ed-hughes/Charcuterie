import React, { useState } from "react";

const HandleYesClick = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter+1);
  }
  return (
    <div>
      <button onClick={increment}>Yes</button>
      {counter}
    </div>
  );
}

export default HandleYesClick;