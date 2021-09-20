import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import dateFormat from 'dateformat';
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
import Avatar from '@material-ui/core/Avatar';
import Link from '@mui/material/Link';
import { FaRegCheckCircle } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
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

  const [yesCount, setYesCount] = useState(reviewData.helpfulness);
  const [noCount, setNoCount] = useState(0);
  const [vote, setVote] = useState(0);
  const [starRating, setStarRating] = useState(reviewData.rating);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div className={classes.root}>

      <Grid container style={{ borderBottom: "3px solid grey" }} spacing={1} padding={1}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {/* <Stack spacing={1}> */}
              <Rating name="quarter-rating" defaultValue={starRating} precision={0.25} readOnly />
            {/* </Stack> */}
          </Paper>
        </Grid>
        <Grid item xs={6} align={'right'}>
          <Paper className={classes.paper}>{reviewData.reviewer_name}{', '}{dateFormat(reviewData.date, "mmmm dS, yyyy")}</Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.bold} className={classes.paper}>
            <Typography className={classes.bold}>
              {reviewData.summary.slice(0, 60)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper}>
            <Typography >
              {reviewData.body}
            </Typography>
            <ImageList className={classes.imageList} cols={2.5}>
              {reviewData.photos.map((item) => (
                <ImageListItem style={{ width: 100, height: 100 }} spacing={2} padding={1} key={item.id}>
                  <img src={item.url} onClick={handleOpen}/>
                  <Modal open={open} onClose={handleClose}>
                  <Box sx={style} >
                  <img src={item.url} height='100%' width='auto' />
                  </Box>
                  </Modal>
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>
        {reviewData.recommend && (
          <Grid item xs={12} >
            <Paper className={classes.paper}>
              <Typography style={{ textAlign: 'flex-start' }}>
                <FaRegCheckCircle />
                {'  I recommend this product'}
              </Typography>
            </Paper>
          </Grid>
        )}
        {/* <Grid item xs={12} >
          <Paper className={classes.paper}>Staff Response: {reviewData.response}</Paper>
        </Grid> */}
        <Grid item xs={12} >
          <Paper className={classes.paper}>{'Was this review helpful? '}
            <Link component="button" underline="hover" color="black"
              onClick={() => {
                if (yesCount === reviewData.helpfulness && vote < 1) {
                  setYesCount(yesCount + 1);
                  setVote(vote + 1);
                }
                else if (yesCount === reviewData.helpfulness + 1) {
                  setYesCount(yesCount - 1);
                  setVote(vote - 1);
                }
              }}>
              {' Yes '}
            </Link>
            {'(' + yesCount + ') '}

            <Link component="button" underline="hover" color="black"
              onClick={() => {
                if (noCount === 0 && vote < 1) {
                  setNoCount(noCount + 1);
                  setVote(vote + 1);
                }
                else if (noCount === 1) {
                  setNoCount(noCount - 1);
                  setVote(vote - 1);
                }
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