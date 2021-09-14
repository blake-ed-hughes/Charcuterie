import React from 'react';
import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

function Ratings({productId}) {





  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Title */}
          <Paper className={classes.paper}>Ratings and Reviews</Paper>
        </Grid>
        <Grid item xs={4} >
          {/* Breakdown */}
          <Paper className={classes.paper}>Breakdown</Paper>
        </Grid>
        <Grid item xs={8}>
          {/* Reviews List */}
          <Paper className={classes.paper}>Reviews List</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Ratings;

