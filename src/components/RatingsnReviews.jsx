import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import { getReviews } from './r&rAxios';
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Ratings({ productId }) {
  const classes = useStyles();

  const [pid, setProductId] = useState(productId);
  const [reviewsData, setReviewsData] = useState([]);
  const [sortList, setSortList] = useState('newest');
  const [reviewCount, setReviewCount] = useState(0);


  const handleChange = (event) => {
     // console.log('sortList---> ', sortList);
    setSortList(event.target.value);
  };


  useEffect(() => {
    console.log('useEffect ran');
    console.log('sortList--> ', sortList);
    getReviews(pid, sortList)
      .then((response) => {
        setReviewsData(response.data.results);
        setReviewCount(response.data.count);
      })
      .catch((err) => { console.log('Failure in getReviews axios call', err)
      });
  }, [pid, sortList])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Ratings & Reviews</Paper>
        </Grid>
        <Grid item xs={4}>
          Breakdown
          <Paper className={classes.paper}>Future Breakdown Data</Paper>
        </Grid>
        <Grid item xs={8}>
          {reviewCount} reviews, sorted by
          <Select
            value={sortList}
            onChange={handleChange}>
            <MenuItem value={'relevant'}>relevance</MenuItem>
            <MenuItem value={'newest'}>newest reviews</MenuItem>
            <MenuItem value={'helpful'}>helpfulness</MenuItem>
          </Select>
          {/* Review Tile  */} {/* Conditional Sorting */}
          <Paper className={classes.paper}>
            <List style={{ maxHeight: '50vh', overflow: 'auto' }}>
              {/* Map Over List Items Review Data */}
              {reviewsData.map(reviewData =>
                <ListItem>
                  <ReviewTile reviewData={reviewData} />
                </ListItem>
              )}
            </List>
          </Paper>
          {/* More Reviews Buttons */} {/* Add Review Buttons */}
          <Button variant="outlined" color="primary" className={classes.button}>
            More Reviews
          </Button>
          <Button variant="outlined" color="secondary" className={classes.button}>
            Add Review +
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Ratings;

