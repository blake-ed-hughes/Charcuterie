import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


const Search = (props) => {

  return (
    <Grid container spacing={3}>
      <SearchIcon />
      <form >
        <label>
          <input
            value={props.searchString}
            type="text"
            className="qa-search-bar"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
        </label>
        <input type="submit" value="Search" />
      </form>
    </Grid>
  );
};

export default Search;


//       {questions && questions.length && questions.map(question => {
//   return (
//     <Question question={question} key={question.question_id} />
// )
// })}