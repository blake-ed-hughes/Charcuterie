import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from '@mui/material/Link';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';
import trackClick from '../tracker';

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
  }
});

function RatingBreakdown({ starRatings, starSort }) {
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

  const [oneStarSort, setOneStarSort] = useState([]);
  const [twoStarSort, setTwoStarSort] = useState([]);
  const [threeStarSort, setThreeStarSort] = useState([]);
  const [fourStarSort, setFourStarSort] = useState([]);
  const [fiveStarSort, setFiveStarSort] = useState([]);

  const [starStyle1, setStarStyle1] = useState();
  const [starStyle2, setStarStyle2] = useState();
  const [starStyle3, setStarStyle3] = useState();
  const [starStyle4, setStarStyle4] = useState();
  const [starStyle5, setStarStyle5] = useState();

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

    setOneStar(Math.round((one / valSum) * 100))
    setTwoStar(Math.round((two / valSum) * 100))
    setThreeStar(Math.round((three / valSum) * 100))
    setFourStar(Math.round((four / valSum) * 100))
    setFiveStar(Math.round((five / valSum) * 100))

    setOneCount(one)
    setTwoCount(two)
    setThreeCount(three)
    setFourCount(four)
    setFiveCount(five)

  }

  useEffect(() => {
    starSort(oneStarSort, twoStarSort, threeStarSort, fourStarSort, fiveStarSort);
  }, [oneStarSort, twoStarSort, threeStarSort, fourStarSort, fiveStarSort]);

  useEffect(() => {
    perStar()
  }, [starRatings]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item xs={12} container className={classes.hover} onClick={(e)=>{trackClick(e, 'ratings-and-reviews', () => {
          if (fiveStarSort.length === 0) {
            setFiveStarSort([5])
            setStarStyle5({
              color: 'blue',
              fontWeight: 800
            });

          } else {
            setFiveStarSort([])
            setStarStyle5();
          }
        })
        }} >
          <Grid item xs={3} align={'left'}>
            <Typography style={starStyle5} variant="body2">{'5 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={fiveStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{fiveCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover} onClick={(e)=>{trackClick(e, 'ratings-and-reviews', () => {
          if (fourStarSort.length === 0) {
            setFourStarSort([4])
            setStarStyle4({
              color: 'blue',
              fontWeight: 800
            });
          } else {
            setFourStarSort([])
            setStarStyle4();
          }
        })
        }}>
          <Grid item xs={3} align={'left'}>
            <Typography style={starStyle4} variant="body2">{'4 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={fourStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{fourCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover}  onClick={(e)=>{trackClick(e, 'ratings-and-reviews', () => {
          if (threeStarSort.length === 0) {
            setThreeStarSort([3])
            setStarStyle3({
              color: 'blue',
              fontWeight: 800
            });
          } else {
            setThreeStarSort([])
            setStarStyle3();
          }
        })
        }}>
          <Grid item xs={3} align={'left'}>
            <Typography style={starStyle3} variant="body2">{'3 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={threeStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{threeCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover} onClick={(e)=>{trackClick(e, 'ratings-and-reviews', () => {
          if (twoStarSort.length === 0) {
            setTwoStarSort([2])
            setStarStyle2({
              color: 'blue',
              fontWeight: 800
            });
          } else {
            setTwoStarSort([])
            setStarStyle2();
          }
        })
        }}>
          <Grid item xs={3} align={'left'}>
            <Typography style={starStyle2} variant="body2">{'2 Stars '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={twoStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{twoCount}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.hover} onClick={(e)=>{trackClick(e, 'ratings-and-reviews', () => {
          if (oneStarSort.length === 0) {
            setOneStarSort([1])
            setStarStyle1({
              color: 'blue',
              fontWeight: 800
            });
          } else {
            setOneStarSort([])
            setStarStyle1();
          }
        })
        }}>
          <Grid item xs={3} align={'left'}>
            <Typography style={starStyle1} variant="body2">{'1 Star '}</Typography>
          </Grid>
          <Grid item xs={8} >
            <BorderLinearProgress variant="determinate" value={oneStar} />
          </Grid>
          <Grid item xs={1} align={'right'}>
            <Typography variant="body2">{oneCount}</Typography>
          </Grid>
        </Grid>

        { (oneStarSort.length > 0|| twoStarSort.length > 0 || threeStarSort.length > 0 || fourStarSort.length > 0 || fiveStarSort.length > 0) && (
        <Grid item xs={12} align={'left'}>
           <Grid item xs={12} align={'left'}>
           <Link variant="caption" style={{fontWeight: '800', color: 'blue'}} underline='always'
           onClick={(e)=>{trackClick(e, 'ratings-and-reviews', () => {
              setFiveStarSort([])
              setStarStyle5();
              setFourStarSort([])
              setStarStyle4();
              setThreeStarSort([])
              setStarStyle3();
              setTwoStarSort([])
              setStarStyle2();
              setOneStarSort([])
              setStarStyle1();
            })
            }}>{'remove all filters'}</Link>
           </Grid>
          { (fiveStarSort.length > 0) && (
           <Grid item xs={12} align={'left'}>
           <Typography variant="caption">{'showing 5 stars'}</Typography>
           </Grid>
           )}
           { (fourStarSort.length > 0) && (
           <Grid item xs={12} align={'left'}>
           <Typography variant="caption">{'showing 4 stars'}</Typography>
           </Grid>
           )}
           { (threeStarSort.length > 0) && (
           <Grid item xs={12} align={'left'}>
           <Typography variant="caption">{'showing 3 stars'}</Typography>
           </Grid>
           )}
           { (twoStarSort.length > 0) && (
           <Grid item xs={12} align={'left'}>
           <Typography variant="caption">{'showing 2 stars'}</Typography>
           </Grid>
           )}
           { (oneStarSort.length > 0) && (
           <Grid item xs={12} align={'left'}>
           <Typography variant="caption">{'showing 1 stars'}</Typography>
           </Grid>
           )}
          </Grid>
        )}

      </Grid>
    </div>
  );
}

export default RatingBreakdown;