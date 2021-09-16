// resourses:
import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Answers from './Answers.jsx';
import Yes from './Yes.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bold: {},
  questionBlock: {},
  helpful: {},
  questionHelpful: {},
  report: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'start-flex',
    color: theme.palette.text.secondary,
  },
}));

export default function Questions({ question }) {

  const classes = useStyles();
  const [answerObj, setAnswerObj] = useState(question.answers);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    transformAnswersObject();
  }, [answerObj])

  const transformAnswersObject = () => {
    const answersArr = Object.values(answerObj).map(answer => answer);
    setAnswers(answersArr);
  }

  return (
    <div>
      <div className={classes.questionBlock}>
        <div>
          <p className={classes.bold}>Q: {' '}</p>
          <p className={classes.bold}>{question.question_body}</p>
        </div>
        <div className={classes.helpful}>


          <p className={classes.questionHelpful}>
            Helpful <Yes />
          </p>

          <p className={classes.report}>
            report
          </p>
        </div>
      </div> {console.log(answers)}
      {answers.map(answer => <Answers answer={answer} key={answer.id} />)}
    </div>
  );
}