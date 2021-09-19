// resourses:
import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  alignAnswer: {},
  bold: {},
  body: {},
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
  const classes = useStyles();


  return (

    <div className={classes.root}>
      <Grid container spacing={0}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>A: {answer.body}
          <Typography>by {answer.answerer_name} {' '} {answer.date.slice(0, 10)} {' | '}
          Helpful? <u>Yes</u> (2) {' | '} <u>Report</u>
          </Typography>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}