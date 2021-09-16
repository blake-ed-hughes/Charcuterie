// resourses:
import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  alignAnswer: {},
  bold: {},
  body: {},
  report: {},
  answerHelpful: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'start-flex',
    color: theme.palette.text.secondary,
  },
  gridWrapper: {
    border: "1px solid grey"
  }
}));

export default function Answers({ answer }) {
  console.log(answer);
  const classes = useStyles();


  return (
    <div>
      <div className={classes.alignAnswer} >
        <p className={classes.bold}>A: {' '}</p>
        <p className={classes.body}>{answer.body}</p>
      </div>

      <div className={classes.answerDetails}>
        <p className={classes.answererInfo}>
          by {answer.answerer_name} {' '}
          {answer.date}
        </p>

        <p className={classes.answerHelpful}>
          Helpful Yes (2)
        </p>
        <p className={classes.report}>
          report
        </p>

      </div>
    </div >
  );
}