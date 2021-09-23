import React, { useState } from "react";
import Question from './Question.jsx';


const Report = () => {
  const [reported, setReport] = useState(false);

  const changeReportStatus = () => {
    setReport(true);
  }
  return (
    <a>
      <button onClick={changeReportStatus}><u>Report</u></button>
      {reported}
    </a>
  );
}

export default Report;