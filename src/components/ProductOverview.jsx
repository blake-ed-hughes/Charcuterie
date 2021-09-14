import React from 'react';
import {useState, useEffect} from 'react';
import {getProduct, getProductStyles} from './poAxios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({

}));

function Overview(props) {
  const classes = useStyles();
  const [pid, setPID] = useState(props.productId);
  const [style, setStyle] = useState({});
  const [styles, setStyles] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [stylePhotos, setPhotos] = useState([{url:''}]);
  useEffect(() => {
    getProductStyles(pid)
    .then((response) => {
      setStyles(response.data.results);
      setStyle(response.data.results[0]);
      setPhotos([...response.data.results[0].photos]);
    })
    .catch((err) => {console.log('styles', err)});
    getProduct(pid)
    .then((response) => {
      setProductInfo(response.data);
    })
    .catch((err) => {console.log('info', err)});
  }, [pid])

  return(
    <div>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          padding={3}
          // direction="row"
          // justifyContent="space-around"
          // alignItems="flex-start"
        >
          <Grid item xs={12} sm={8} container justifyContent="center">
          <Paper >
            {/* this is my image gall */}
            <img src={stylePhotos[stylePhotos.length-1].url} height='100%'/>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={4} container direction="column">
            <Paper >
            {/* reviews */}
            {/* category */}
            <Typography variant='h6' color="textSecondary">{productInfo.category}</Typography>
            {/* title */}
            <Typography gutterBottom variant='h3'>{productInfo.name}</Typography>
            {/* price */}
            <Typography variant='subtitle1'>${productInfo.default_price}</Typography>
            {/* style selector */}
            {/*  */}
            {/* add to cart */}
            </Paper>
          </Grid>
        </Grid>
        {/* possibly description */}
        <Paper elevation={3}>
          <Typography variant='subtitle2'>{productInfo.description}</Typography>
        </Paper>
      </Container>
    </div>
  )
}


export default Overview;