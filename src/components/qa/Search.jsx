import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (
      <Grid container spacing={3}>
          <SearchIcon />
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" question="question" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
          </label>
          <input type="submit" value="Search" />
        </form>
      </Grid>
    );
  }
}

export default Search;


//       {questions && questions.length && questions.map(question => {
//   return (
//     <Question question={question} key={question.question_id} />
// )
// })}