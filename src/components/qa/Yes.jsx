import React, { useState } from "react";

const Yes = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter+1);
  }
  return (
    <a>
      <button onClick={increment}><u>Yes</u></button>
      {counter}
    </a>
  );
}

export default Yes;