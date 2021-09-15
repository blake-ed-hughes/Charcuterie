import React from 'react';
import { getReviews } from './RatingsAxios';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



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

function ReviewTile({ reviewData }) {
  const classes = useStyles();

  return (

    <div className={classes.root}>

      <Grid container spacing={1} padding={1}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Star Rating: {reviewData.rating}</Paper>
        </Grid>
        <Grid item xs={3} >
          <Paper className={classes.paper}>{reviewData.reviewer_name}</Paper>
        </Grid>
        <Grid item xs={3} >
          <Paper className={classes.paper}>{reviewData.date.slice(0, 10)}</Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper}>Summary: {reviewData.summary}</Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper}>Body: {reviewData.body}</Paper>
        </Grid>
        {/* <Grid item xs={12} >
          <Paper className={classes.paper}>Recommended: {reviewData.recommend}</Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper}>Staff Response: {reviewData.response}</Paper>
        </Grid> */}
        <Grid item xs={12} >
          <Paper className={classes.paper}>Helpfulness: {reviewData.helpfulness}</Paper>
        </Grid>
      </Grid>

    </div>
  )
}

export default ReviewTile;