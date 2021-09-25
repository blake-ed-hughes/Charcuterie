import React from 'react';
import Rating from '@mui/material/Rating';
import dateFormat from 'dateformat';
import { getReviews } from './RatingsAxios';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Link from '@mui/material/Link';
import { FaRegCheckCircle } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import trackClick from '../tracker';
import ReviewPhoto from './ReviewPhoto.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '75%',
  height: '90%',
  bgcolor: 'transparent',
  boxShadow: 24,

};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'flex-start',
    color: theme.palette.text.secondary
  },
  imageList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  bold: {
    fontWeight: 600
  },
  hover: {
    color: 'grey',
    '&:hover': {
      color: 'blue',
    }
  }
}));

function ReviewTile({ reviewData }) {
  const classes = useStyles();

  const [yesCount, setYesCount] = useState(reviewData.helpfulness);
  const [noCount, setNoCount] = useState(0);
  const [vote, setVote] = useState(0);
  const [starRating, setStarRating] = useState(reviewData.rating);

  const [voteStyle1, setVoteStyle1] = useState();
  const [voteStyle2, setVoteStyle2] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reviewBody, setReviewBody] = useState();
  const [linkClick, setLinkClick] = useState(true);

  useEffect(() => {
    setStarRating(reviewData.rating)
    setReviewBody(reviewData.body.slice(0, 251))
  }, [reviewData]);

  return (

    <div className={classes.root}>

      <Grid container>

        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            {/* elevation={0} */}
            <Rating name="quarter-rating" value={starRating} precision={0.25} readOnly />
          </Paper>
        </Grid>
        <Grid item xs={9} align={'right'}>
          <Paper elevation={0} className={classes.paper} >
            <Typography style={{ marginTop: '6px' }}>{reviewData.reviewer_name + ', ' + dateFormat(reviewData.date, "mmmm dS, yyyy")}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper elevation={0} className={classes.bold} className={classes.paper}>
            <Typography className={classes.bold}>
              {reviewData.summary.slice(0, 61)}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper elevation={0} className={classes.paper}>

            <Grid item xs={12} >
              <Grid item xs={12} >
                {reviewData.body.length < 251 && (
                  <Typography style={{ color: 'grey' }}>{reviewBody} </Typography>
                )}
                {reviewData.body.length > 250 && (
                  <Typography style={{ color: 'grey' }}>{reviewBody + '...'} </Typography>
                )}
              </Grid>
              {reviewData.body.length > 250 && (
                <Grid item xs={12} style={{ marginTop: '8px', color: 'grey' }}>
                  {linkClick && (
                    <Link className={classes.hover} component="button" underline="always" color="inherit"
                      onClick={(e) => {
                        trackClick(e, 'ratings-and-reviews', () => {
                          setReviewBody(reviewData.body);
                          setLinkClick(false);
                        })
                      }}>{'Show More'}</Link>
                  )}
                </Grid>
              )}
            </Grid>

            <Grid item container style={{ marginTop: '14px' }} xs={12} >
              <ImageList className={classes.imageList} cols={2.5}>
                {reviewData.photos.map((photo) => (
                  <ImageListItem style={{ width: 100, height: 100 }}>
                    <ReviewPhoto photo={photo} key={photo.url} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

          </Paper>
        </Grid>

        {reviewData.recommend && (
          <Grid item xs={12} >
            <Paper elevation={0} className={classes.paper}>
              <Grid container item xs={12} >
                <Typography style={{ textAlign: 'flex-start' }}>
                  <FaRegCheckCircle />
                  {'  I recommend this product'}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        )}

        {reviewData.response && (
          <Grid item xs={12} >
            <Paper elevation={0} className={classes.paper} style={{ backgroundColor: '#D3D3D3' }}>{'Response: "\n"' + reviewData.response}</Paper>
          </Grid>
        )}

        <Grid item xs={12} >
          <Paper elevation={0} className={classes.paper}>{'Was this review helpful? '}

            <Link className={classes.hover} style={voteStyle1} component="button" underline="always" color="inherit"
              onClick={(e) => {
                trackClick(e, 'ratings-and-reviews', () => {
                  if (yesCount === reviewData.helpfulness && vote < 1) {
                    setYesCount(yesCount + 1);
                    setVote(vote + 1);
                    setVoteStyle1({
                      color: 'blue',
                      fontWeight: 800
                    })
                  }
                  else if (yesCount === reviewData.helpfulness + 1) {
                    setYesCount(yesCount - 1);
                    setVote(vote - 1);
                    setVoteStyle1()
                  }
                })
              }}>
              {' Yes '}
            </Link>
            {'(' + yesCount + ') '}

            <Link className={classes.hover} style={voteStyle2} component="button" underline="always" color="inherit"
              onClick={(e) => {
                trackClick(e, 'ratings-and-reviews', () => {
                  if (noCount === 0 && vote < 1) {
                    setNoCount(noCount + 1);
                    setVote(vote + 1);
                    setVoteStyle2({
                      color: 'blue',
                      fontWeight: 800
                    })
                  }
                  else if (noCount === 1) {
                    setNoCount(noCount - 1);
                    setVote(vote - 1);
                    setVoteStyle2()
                  }
                })
              }}>
              {' No '}
            </Link>
            {'(' + noCount + ')'}

          </Paper>
        </Grid>

      </Grid>

    </div>
  )
}

export default ReviewTile;