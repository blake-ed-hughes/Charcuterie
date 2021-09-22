import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import Breakdown from './Breakdown.jsx';
import { getReviews, getAllReviews, getReviewsMeta } from './RatingsAxios';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@mui/material/Link';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'start-flex',
    color: theme.palette.text.secondary,
  },
  gridWrapper: {
    border: "1px solid grey"
  },
  formControl: {
    minWidth: '50%'
  },
  bold: {
    fontWeight: 800
  }
}));

function Ratings({ productId }) {

  const classes = useStyles();

  const [pid, setProductId] = useState(productId);
  const [reviewsData, setReviewsData] = useState([]);
  const [totalReviewsData, setTotalReviewsData] = useState([]);
  const [reviewsMetaData, setReviewsMetaData] = useState({});
  const [sortList, setSortList] = useState('relevant');
  const [reviewCount, setReviewCount] = useState(2);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);
  const [starSortResult, setStarSortResult] = useState([]);
  const [starSortResCount, setStarSortResCount] = useState(2);

  const handleChange = (event) => {
    setSortList(event.target.value);
  };


  const starSort = (one, two, three, four, five) => {
    // create a starSortedArray variable
    var sorted = [];
    var ratings = one.concat(two).concat(three).concat(four).concat(five);
    for (var j = 0; j < ratings.length; j++) {
      // iterate over the input array 'reviewsData'
      for (var i = 0; i < totalReviewsData.length; i++) {
        // create a conditional statement
        // if the array index at 'reviewsData[i]['rating']' matches
        if (ratings[j] === totalReviewsData[i]['rating']) {
          // push it to the sorted array
          sorted.push(totalReviewsData[i])
        }
      }
    }
    setStarSortResult(sorted);
  };


  useEffect(() => {
    if (starSortResult.length > 0) {
      setReviewsData(starSortResult);
      setReviewCount(starSortResult.length);
      setStarSortResCount(starSortResult.length);
    } else {
      if (starSortResCount !== 2) {
        setReviewCount(2)
        setStarSortResCount(2)
      }
      getReviews(pid, sortList, reviewCount)
        .then((response) => {
          setReviewsData(response.data.results);
        })
        .catch((err) => {
          console.log('Failure in getReviews axios call', err)
        });
    }
  }, [pid, sortList, reviewCount, starSortResult])


    useEffect(() => {

    getAllReviews(pid, sortList, totalReviewsCount)
      .then((response) => {
        setTotalReviewsData(response.data.results);
        if (response.data.results.length === 0) {
          setReviewCount(reviewCount - 2);
        }
        if (response.data.results.length !== 0) {
          setReviewCount(2);
        }
      })
      .catch((err) => {
        console.log('Failure in getAllReviews axios call', err)
      });

    getReviewsMeta(pid)
      .then((response) => {
        setReviewsMetaData(response.data);
      })
      .catch((err) => {
        console.log('Failure in getReviewsMeta axios call', err)
      });

  }, [pid, sortList, starSortResult, totalReviewsCount])


  return (

    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.bold} variant="h5" display="inline">{'Ratings & Reviews'}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper} >
              <Breakdown reviewsMetaData={reviewsMetaData} starSort={starSort} setTotalReviewsCount={setTotalReviewsCount} />
            </Paper>
          </Grid>


          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="body1" display="inline">{'Showing ' + reviewCount + ' of ' + totalReviewsCount + ' reviews, sorted by '}</Typography>

              {starSortResult.length === 0 && (
                <Select
                  value={sortList}
                  display="inline"
                  onChange={handleChange}>
                  <MenuItem variant="body2" value={'relevant'}>relevance</MenuItem>
                  <MenuItem variant="body2" value={'newest'}>most recent</MenuItem>
                  <MenuItem variant="body2" value={'helpful'}>helpfulness</MenuItem>
                </Select>
              )}

              {starSortResult.length !== 0 && (
                <Link variant="body1" style={{color: 'black'}} color="inherit" display="inline" >{' star count '}</Link>
              )}
              <Grid item xs={12} container >
                <Paper className={classes.paper}  padding={5} style={{marginBottom: '16px'}}>
                  <List style={{ maxHeight: '66vh', maxWidth: '100%', overflow: 'auto' }}>
                    {reviewsData.map((reviewData, index) =>

                      <ReviewTile spacing={4} padding={4} key={index} reviewData={reviewData} />

                    )}
                  </List>
                </Paper>
              </Grid>

              <Grid item container justifycontent='flex-start'>
                {reviewCount < totalReviewsCount && (
                  <Grid item xs={3}>
                  <Button  variant="contained" className={classes.formControl} spacing={1} onClick={() => {
                    if (starSortResult.length === 0) {
                      if ((reviewCount + 2) > totalReviewsCount) {
                        setReviewCount(reviewCount + 1)
                      } else {
                        setReviewCount(reviewCount + 2)
                      }
                    }
                  }
                  }
                   color="primary">
                    More Reviews
                  </Button>
                  </Grid>
                )}
                <Grid item xs={3}>
                <Button  variant="contained" className={classes.formControl} spacing={1} color="secondary">
                  Add Review +
                </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </div>

  );
}

export default Ratings;

