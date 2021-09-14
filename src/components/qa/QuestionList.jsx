import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Yes from './Yes.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions: [], answers: []};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // accordion
  }

  render() {
    return (
      <Grid container spacing={3}>
        <div>
          question1: blablabla.....
          <span>Helpful?
            <Yes />
          </span>
        </div>
      </Grid>
    );
  }
}

export default QuestionList;
