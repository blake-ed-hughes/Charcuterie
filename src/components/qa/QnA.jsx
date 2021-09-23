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
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';



// components:
import Paper from '@material-ui/core/Paper';
import Yes from './Yes.jsx';
import Search from './Search.jsx';
import { getQuestions, getAnswers } from './axiosHelper.js';
import Question from './Question.jsx';
import AddQuestionModal from "./QuestionModal.jsx";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchbar: {

  },
  formControl: {
    minWidth: '50%'
  },
  list: {
    'border-stlye': 'solid',
  },
  modal: {

  },
  title: {

  },
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
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionCount, setQuestionCount] = useState(4);
  const [isClicked, setClickBoolean] = useState(false);
  const [pid, setPid] = useState();
  const [buttonName, setButtonName] = useState('MORE ANSWERED QUESTIONS');

  const openModal = () => {
    // console.log('inside openModal function');
    return (<QuestionModal />);
  }
  const moreAnsweredQuestions = () => {
    if(buttonName === 'MORE ANSWERED QUESTIONS') {
      getQuestions(38321)
      .then((response) => {
        setQuestions(response.data.results);
        setQuestionCount(response.data.count);
      })
      .catch((err) => { console.log('fail to get questions', err) });

      setButtonName('GO BACK');
    } else {
      getQuestions(38321)
      .then((response) => {
        setQuestions(response.data.results.slice(0, 4));
        setQuestionCount(response.data.count);
      })
      .catch((err) => { console.log('fail to get questions', err) });
      setButtonName('MORE ANSWERED QUESTIONS');
    }
  }

  useEffect(() => {
    getQuestions(38321)
      .then((response) => {
        setQuestions(response.data.results.slice(0, 4));
        setQuestionCount(response.data.count);
      })
      .catch((err) => { console.log('fail to get questions', err) });
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestions([question]);
    }
  }, [question]);

  // useEffect(() => {
  //   moreAnsweredQuestions();
  // }, [buttonName]);

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}><h2>Questions & Answers</h2></Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Search questions={questions} setQuestions={setQuestions} setQuestion={setQuestion} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {questions.length > 0 && (
              <List style={{ maxHeight: '50vh', overflow: 'auto' }}>

                {questions.map((question, index) => {

                  return (
                    <Question className={classes.list} question={question} key={question.question_id} />
                  )
                })}

              </List>)}

            {questions.length === 0 && (
              <List style={{ maxHeight: '50vh', overflow: 'auto' }}>
                No question found...
              </List>
            )}

            <Button variant="contained" className={classes.formControl} spacing={1} color="primary" onClick={() => moreAnsweredQuestions()} >
              {buttonName}
          </Button>

            <AddQuestionModal />
          </Grid>

        </Grid>
      </Container>
    </div >
  );
}

