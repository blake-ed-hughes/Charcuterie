import React from 'react';
import { getReviewsMeta } from './RatingsAxios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

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

function Breakdown({ reviewsMetaData }) {

  const classes = useStyles();

  return (

    <div className = { classes.root } >

      <Grid container spacing={1} padding={1}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>Star Rating Average</Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper}>Recommended Percent</Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper}>Stars Bar Count Per Star</Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper className={classes.paper}>Characteristics</Paper>
        </Grid>

      </Grid>

    </div >
  )
}

export default Breakdown;