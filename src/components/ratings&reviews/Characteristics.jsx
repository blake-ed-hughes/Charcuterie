import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';
import Slider from "@material-ui/core/Slider";


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
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const CustumSlider = withStyles({
  root: {
    color: "transparent"
  },
  thumb: {
    marginLeft: -10,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderRadius: "0px",
    borderTop: "15px solid purple",
    marginTop: "0px"
  },
  track: {
    height: 10
  },
  rail: {
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  mark: {
    backgroundColor: "#ffff",
    height: 12,
    width: 3,
    marginLeft: -3
  }
})(Slider);

function Characteristics({ characteristicData }) {
  const classes = useStyles();

  const [comfort, setComfort] = useState(0);
  const [fit, setFit] = useState(0);
  const [quality, setQuality] = useState(0);
  const [length, setLength] = useState(0);

  const perChar = () => {

    var comfortVal = 0;
    var fitVal = 0;
    var qualityVal = 0;
    var lengthVal = 0;

    for (var key in characteristicData) {
      if (key === "Comfort") {
        comfortVal = characteristicData[key].value;
      }
      if (key === "Fit") {
        fitVal = characteristicData[key].value;
      }
      if (key === "Quality") {
        qualityVal = characteristicData[key].value;
      }
      if (key === "Length") {
        lengthVal = characteristicData[key].value;
      }
    }

    setComfort(parseFloat(comfortVal).toFixed(2) * 10);
    setFit(parseFloat(fitVal).toFixed(2) * 10);
    setQuality(parseFloat(qualityVal).toFixed(2) * 10);
    setLength(parseFloat(lengthVal).toFixed(2) * 10);
  }

  useEffect(() => {
    perChar()
  }, [characteristicData]);

  return (

    <div className={classes.root} >
      <Grid item xs={12} container spacing={1} >

        {fit > 0 && (
          <Grid item xs={12} container >

            <Grid item xs={12} align={'left'}>
              <Typography variant="body2" style={{ height: 12 }} >{' Fit '}</Typography>
            </Grid>
            <Grid item xs={12} style={{ height: 24 }}  >
              <div className={classes.margin}>
                <CustumSlider value={fit} color="primary" step={25} marks min={0} max={100} style={{ height: 8 }} readOnly />
              </div>
            </Grid>
            <Grid item xs={6} align={'left'} >
              <Typography variant="caption" style={{ height: 10 }}>{' Too small'}</Typography>
            </Grid>
            <Grid item xs={6} align={'right'} >
              <Typography variant="caption" style={{ height: 10 }}>{'Too large '}</Typography>
            </Grid>

          </Grid>
        )}

        {length > 0 && (
          <Grid item xs={12} container >

            <Grid item xs={12} align={'left'}>
              <Typography variant="body2" style={{ height: 12 }} >{' Length '}</Typography>
            </Grid>
            <Grid item xs={12} style={{ height: 24 }}  >
              <div className={classes.margin}>
                <CustumSlider value={length} color="primary" step={25} marks min={0} max={100} style={{ height: 8 }} readOnly />
              </div>
            </Grid>
            <Grid item xs={6} align={'left'} >
              <Typography variant="caption" style={{ height: 10 }}>{' Too short'}</Typography>
            </Grid>
            <Grid item xs={6} align={'right'} >
              <Typography variant="caption" style={{ height: 10 }}>{'Too long '}</Typography>
            </Grid>

          </Grid>
        )}

        {comfort > 0 && (
          <Grid item xs={12} container >

            <Grid item xs={12} align={'left'}>
              <Typography variant="body2" style={{ height: 12 }} >{' Comfort '}</Typography>
            </Grid>
            <Grid item xs={12} style={{ height: 24 }}  >
              <div className={classes.margin}>
                <CustumSlider value={comfort} color="primary" step={25} marks min={0} max={100} style={{ height: 8 }} readOnly />
              </div>
            </Grid>
            <Grid item xs={6} align={'left'} >
              <Typography variant="caption" style={{ height: 10 }}>{' Not comfy'}</Typography>
            </Grid>
            <Grid item xs={6} align={'right'} >
              <Typography variant="caption" style={{ height: 10 }}>{'Very comfy '}</Typography>
            </Grid>

          </Grid>
        )}

        {quality > 0 && (
          <Grid item xs={12} container >

            <Grid item xs={12} align={'left'}>
              <Typography variant="body2" style={{ height: 12 }} >{' Quality '}</Typography>
            </Grid>
            <Grid item xs={12} style={{ height: 24 }}  >
              <div className={classes.margin}>
                <CustumSlider value={quality} color="primary" step={25} marks min={0} max={100} style={{ height: 8 }} readOnly />
              </div>
            </Grid>
            <Grid item xs={6} align={'left'} >
              <Typography variant="caption" style={{ height: 10 }}>{' Poor'}</Typography>
            </Grid>
            <Grid item xs={6} align={'right'} >
              <Typography variant="caption" style={{ height: 10 }}>{'Excellent '}</Typography>
            </Grid>

          </Grid>
        )}

      </Grid>

    </div>
  )
}

export default Characteristics;