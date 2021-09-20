import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import Characteristics from './Characteristics.jsx';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { getReviewsMeta } from './RatingsAxios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  bold: {
    fontWeight: 600
  }
}));

function Breakdown({ reviewsMetaData }) {

  const classes = useStyles();

  // average rating/ star rating

  const [starAvgRating, setStarAvgRating] = useState(0);
  const [ratingSum, setRatingSum] = useState(0);
  const [recPercent, setRecPercent] = useState(0);

  const updateRating = () => {
    var ratingsObj = reviewsMetaData.ratings;
    var keySum = 0;
    var valSum = 0;
    var averageRating = 0;
    for (var key in ratingsObj) {
      keySum += parseInt(key) * parseInt(ratingsObj[key]);
      valSum += parseInt(ratingsObj[key]);
    }
    averageRating = Math.round((keySum / valSum) * 10) / 10;
    setStarAvgRating(averageRating);
    setRatingSum(valSum);
  }

  const getRecPercent = () => {
    //get percentage
    var recsObj = reviewsMetaData.recommended;
    var valSum = 0;
    var recs = 0;
    var percent = 0;
    for (var key in recsObj) {
      valSum += parseInt(recsObj[key]);
      if (key === "true") {
        recs += parseInt(recsObj[key]);
      }
    }
    percent = Math.round((recs / valSum) * 100);
    setRecPercent(percent);
  }

  useEffect(() => {
    updateRating()
    getRecPercent()
  }, [reviewsMetaData]);

  return (

    <div className={classes.root} >

      <Grid container spacing={1} padding={1}>

        <Grid item xs={12}>

          <Paper className={classes.paper} style={{ height: 70 }}>
            <Grid item xs={12} container spacing={1} >

              <Grid style={{ textAlign: 'right' }} item xs={2} padding={2} >
                <Typography variant="h4" className={classes.bold}>{starAvgRating + ''}</Typography>
              </Grid>
              <Grid style={{ textAlign: 'center' }} item xs={8}>
                <Rating name="quarter-rating" value={starAvgRating} precision={0.25} readOnly />
              </Grid>

              <Grid style={{ textAlign: 'left' }} item xs={12} style={{ height: 20 }}>
                <Typography variant="caption" className={classes.bold}>{ratingSum}{' total reviews'}</Typography>
              </Grid>

            </Grid>
          </Paper>

        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="caption" style={{ height: 10 }}>
              {recPercent}{'% of reviewers recommend this product'}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper}>
            <RatingBreakdown starRatings={reviewsMetaData.ratings}/>
            </Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper}>
          <Characteristics characteristicData={reviewsMetaData.characteristics}/>
            </Paper>
        </Grid>

      </Grid>

    </div >
  )
}

export default Breakdown;