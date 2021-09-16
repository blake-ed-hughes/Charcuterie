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
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  },
  imageList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  bold: {
    fontWeight: 600
  }
}));

function ReviewTile({ reviewData }) {
  const classes = useStyles();

  return (

    <div className={classes.root}>

      <Grid container  style={{borderBottom: "3px solid grey" }} spacing={1} padding={1}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Star Rating: {reviewData.rating}</Paper>
        </Grid>
        <Grid item xs={6} align={'right'}>
          <Paper className={classes.paper}>{reviewData.reviewer_name}{', '}{reviewData.date.slice(0, 10)}</Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.bold} className={classes.paper}>
            <Typography className={classes.bold}>
              {reviewData.summary.slice(0, 60)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper}>{reviewData.body}</Paper>
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