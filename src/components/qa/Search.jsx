import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Questions from './Questions.jsx';



const Search = ({question, questions, setQuestions, setQuestion, setClickBoolean}) => {
  const questionsArr = [];

  for (var i = 0 ; i < questions.length; i++) {
     questionsArr.push(questions[i].question_body);
  }

  const handleSearch = (event) => {
    // questions = the clicked question
    var clickedQuestion = event.target.innerHTML;
    // setQuestions();
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].question_body === clickedQuestion) {
        setQuestions(questions[i]);
        setQuestion(questions[i]);
        setClickBoolean(true);
      }
    }

  }

  return (
    <Grid container spacing={3}>
      <SearchIcon />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={questionsArr}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search For A Question" />}
        onChange={handleSearch}
      />
    </Grid>
  );
};

export default Search;



