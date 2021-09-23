import React, { useState } from "react";
import Question from './Question.jsx';


const Yes = ({helpfulness}) => {
  const [count, setHelpCount] = useState(helpfulness);

  const increment = () => {
    setHelpCount(count+1);
  }
  return (
    <em>
      <sup onClick={increment}>Yes{' '}{count}
      </sup>
    </em>
  );
}

export default Yes;