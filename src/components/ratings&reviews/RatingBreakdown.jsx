import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from '@mui/material/Link';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 0
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "green"
  }
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  hover: {
    backgroundColor: '#fff',
    color: 'grey',
    '&:hover': {
      backgroundColor: 'grey',
      color: '#fff',
  }
}});

function RatingBreakdown({starRatings}) {
  const classes = useStyles();

  const [oneStar, setOneStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);

  const [oneCount, setOneCount] = useState(0);
  const [twoCount, setTwoCount] = useState(0);
  const [threeCount, setThreeCount] = useState(0);
  const [fourCount, setFourCount] = useState(0);
  const [fiveCount, setFiveCount] = useState(0);


  const perStar = () => {

    var valSum = 0;
    var five = 0;
    var four = 0;
    var three = 0;
    var two = 0;
    var one = 0;

    for (var key in starRatings) {
      valSum += parseInt(starRatings[key]);
      if (key === "5") {
        five = parseInt(starRatings[key])
      }
      if (key === "4") {
        four = parseInt(starRatings[key])
      }
      if (key === "3") {
        three = parseInt(starRatings[key])
      }
      if (key === "2") {
        two = parseInt(starRatings[key])
      }
      if (key === "1") {
        one = parseInt(starRatings[key])
      }
    }

    setOneStar(Math.round((one/ valSum) * 100))
    setTwoStar(Math.round((two/ valSum) * 100))
    setThreeStar(Math.round((three/ valSum) * 100))
    setFourStar(Math.round((four/ valSum) * 100))
    setFiveStar(Math.round((five/ valSum) * 100))

    setOneCount(one)
    setTwoCount(two)
    setThreeCount(three)
    setFourCount(four)
    setFiveCount(five)

  }

  useEffect(() => {
    perStar()
  }, [starRatings]);


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item xs={12} container className={classes.hover} >
          <Grid item xs={3} align={'left'}>
            <Typography variant="body2">{'5 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={fiveStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{fiveCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover}>
          <Grid item xs={3} align={'left'}>
            <Typography variant="body2">{'4 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={fourStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{fourCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover}>
          <Grid item xs={3} align={'left'}>
            <Typography variant="body2">{'3 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={threeStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{threeCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover}>
          <Grid item xs={3} align={'left'}>
            <Typography variant="body2">{'2 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={twoStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{twoCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover}>
          <Grid item xs={3} align={'left'}>
            <Typography variant="body2">{'1 Star '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={oneStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{oneCount}</Typography>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}

export default RatingBreakdown;