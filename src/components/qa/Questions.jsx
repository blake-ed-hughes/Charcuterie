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
  questionAndAnswers: {
    border: "1px solid grey"
  },
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
    <div className={classes.root}>
      <Grid container spacing={0}>

        <Grid item xs={6}> {' '}
          Q: {question.question_body}
        </Grid>

        <Grid item xs={6}>
          Helpful <Yes /> report
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>{answers.map(answer => <Answers answer={answer} key={answer.id} />)}</Paper>
        </Grid>
    </div>
  );
}