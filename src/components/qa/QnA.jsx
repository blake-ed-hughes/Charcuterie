// resourses:
import React from 'react';
import { useState, useEffect } from 'react';

// material UI
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


// components:
import Paper from '@material-ui/core/Paper';
import Yes from './Yes.jsx';
import Search from './Search.jsx';
import { getQuestions, getAnswers } from './axiosHelper.js';

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

export default function QnA(props) {
  const classes = useStyles();
  const [pid, setPID] = useState(props.productId);
  const [questions, setQuestions] = useState({});
  const [question, setQuestion] = useState({});

  useEffect(() => {
    getQuestions(pid)
      .then((response) => {
        console.log(response.data.results);
        setQuestions(response.data.results);
        setQuestion(response.data.results[0]);
      })
      .catch((err) => { console.log('fail to get questions', err) });
  }, [pid])

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
            <Grid container spacing={6}>
              <Typography variant='h3' color="textSecondary">user:{question.asker_name}</Typography>

              <Typography variant='h4' color="textSecondary">Q: {question.question_body}</Typography>
              <span>Helpful?
                  <Yes />
              </span>
            </Grid>
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