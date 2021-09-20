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




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  moreReviewsButton: {},
  addReviewButton: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'start-flex',
    color: theme.palette.text.secondary,
  },
  gridWrapper: {
    border: "1px solid grey"
  }
}));

function Ratings({ productId }) {
  const classes = useStyles();

  const [pid, setProductId] = useState(productId);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewsMetaData, setReviewsMetaData] = useState({});
  const [sortList, setSortList] = useState('relevant');
  const [reviewCount, setReviewCount] = useState(2);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);


  const handleChange = (event) => {
    setSortList(event.target.value);
  };

  useEffect(() => {

    getReviews(pid, sortList, reviewCount)
      .then((response) => {
        setReviewsData(response.data.results);
        setReviewCount(response.data.count);
      })
      .catch((err) => {
        console.log('Failure in getReviews axios call', err)
      });

    getAllReviews(pid)
      .then((response) => {
        setTotalReviewsCount(response.data.count);
        if (response.data.results.length === 0) {
          setReviewCount(reviewCount - 2);
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

  }, [pid, sortList, reviewCount])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Ratings & Reviews</Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Breakdown reviewsMetaData={reviewsMetaData} />
          </Paper>
        </Grid>

        <Grid item xs={8}>
        {'Showing '} {reviewCount} {' of '} {totalReviewsCount} {' reviews, sorted by '}
          <Select
            value={sortList}
            onChange={handleChange}>
            <MenuItem value={'relevant'}>relevance</MenuItem>
            <MenuItem value={'newest'}>most recent</MenuItem>
            <MenuItem value={'helpful'}>helpfulness</MenuItem>
          </Select>

          <List style={{ maxHeight: '95vh', overflow: 'auto' }}>
            {reviewsData.map((reviewData, index) =>

              <ReviewTile spacing={4} padding={4} key={index} reviewData={reviewData} />

            )}
          </List>

          {reviewCount < totalReviewsCount && (
            <Button onClick={() => setReviewCount(reviewCount + 1)} variant="outlined" color="primary" className={classes.moreReviewsButton}>
              More Reviews
            </Button>
          )}
          <Button variant="outlined" color="secondary" className={classes.addReviewButton}>
            Add Review +
          </Button>
        </Grid>

      </Grid>
    </div>
  );
}

export default Ratings;

