import React, { useState } from "react";

const Yes = () => {
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

export default Yes;