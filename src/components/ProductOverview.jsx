import React from 'react';
import {useState, useEffect} from 'react';
import {getProduct, getProductStyles} from './poAxios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({

}));

function Overview(props) {
  const classes = useStyles();
  const [pid, setPID] = useState(props.productId);
  const [style, setStyle] = useState({});
  const [styles, setStyles] = useState({});
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    getProductStyles(pid)
    .then((response) => {
      setStyles(response.data.results);
      setStyle(response.data.results[0]);
    })
    .catch((err) => {console.log('styles', err)});
    getProduct(pid)
    .then((response) => {
      setProductInfo(response.data);
    })
    .catch((err) => {console.log('info', err)});
  }, [pid])

  return(
    <div >
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item xs container>
        <Paper >
          {/* this is my image gall */}
          <p>{JSON.stringify(styles)}</p>
        </Paper>
        </Grid>
        <Grid item xs container direction="column">
          <p>{JSON.stringify(productInfo)}</p>
          <Paper>
          {/* reviews */}
          {/* category */}
          {/* title */}
          <Typography gutterBottom variant='h4'>{productInfo.name}</Typography>
          {/* price */}
          <Typography variant='subtitle1'>${productInfo.default_price}</Typography>
          {/* style selector */}
          {/*  */}
          {/* add to cart */}
          </Paper>
        </Grid>
        {/* possibly description */}
      </Grid>
    </div>
  )
}


export default Overview;