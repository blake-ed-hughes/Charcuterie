import React, { useState } from "react";
import Question from './Question.jsx';


const Yes = ({helpfulness}) => {
  const [count, setHelpCount] = useState(helpfulness);

  const increment = () => {
    setHelpCount(count+1);
  }
  return (
    <a>
      <button onClick={increment}><u>Yes</u></button>
      {count}
    </a>
  );
}

export default Yes;