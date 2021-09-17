// resourses:
import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';

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
import Questions from './Questions.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  moreQuestionsButton: {},
  addQuestionButton: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'start-flex',
    color: theme.palette.text.secondary,
  },
  gridWrapper: {
    border: "1px solid grey"
  }
}));

export default function QnA() {
  const classes = useStyles();
  // const [pid, setPID] = useState(props.productId);
  const [questions, setQuestions] = useState({});
  const [question, setQuestion] = useState({});

  useEffect(() => {
    getQuestions(38326)
      .then((response) => {
        setQuestions(response.data.results);
        setQuestion(response.data.results[0]);
      })
      .catch((err) => { console.log('fail to get questions', err) });
  }, [38326])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>Questions & Answers</Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Search />
          </Paper>

          <div className={classes.gridWrapper}>
            {questions && questions.length && questions.map(question => {
              return (
                <Questions question={question} key={question.question_id} />
              )
            })}
          </div>

          <Button onClick={() => setReviewCount(reviewCount + 1)} variant="outlined" color="primary" className={classes.moreQuestionsButton}>
            MORE ANSWERED QUESTIONS
        </Button>

          <Button variant="outlined" color="secondary" className={classes.addQuestionButton}>
            ADD A QUESTION +
        </Button>
        </Grid>

      </Grid>
    </div >
  );
}