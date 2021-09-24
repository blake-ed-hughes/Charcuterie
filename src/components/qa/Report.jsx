import React, { useState } from "react";
import Question from './Question.jsx';


const Report = () => {
  const [reported, setReport] = useState(false);
  const [buttonText, setButtonText] = useState("Report");


  const changeReportStatus = (e) => {

    setReport(true);
    setButtonText("Reported");

  }
  return (

    <button onClick={changeReportStatus}>{buttonText}</button>

  );
}

export default Report;