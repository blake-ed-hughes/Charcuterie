import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Search = ({questions, setQuestions}) => {
  const questionsArr = [];
  for (var i = 0 ; i < questions.length; i++) {
     questionsArr.push(questions[i].question_body);
  }

  // handleSearch(event) {
  //   // questions = the clicked question
  //   setQuestions(event.target.value);
  // }

  return (
    <Grid container spacing={3}>
      <SearchIcon />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={questionsArr}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search For A Question" />}
        // onChange={handleSearch}
      />
    </Grid>
  );
};

export default Search;




//      <form >
{/* <label>
<input
  value={props.searchString}
  type="text"
  className="qa-search-bar"
  placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
</label>
<input type="submit" value="Search" />
</form> */}