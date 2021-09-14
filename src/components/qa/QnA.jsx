// resourses:
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// components:
import Paper from '@material-ui/core/Paper';
import Yes from './Yes.jsx';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function QnA() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Search />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <QuestionList />
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper}>MORE ANSWERED QUESTIONS</Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper}>ADD A QUESTION</Paper>
        </Grid>

      </Grid>
    </div>
  );
}