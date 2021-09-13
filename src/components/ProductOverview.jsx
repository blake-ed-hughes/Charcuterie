import React from 'react';
import {useState, useEffect} from 'react';
import {getProduct, getProductStyles} from './poAxios';
import Grid from '@material-ui/core/Grid';

function Overview(props) {


  const [style, setStyle] = useState(null);
  const [styles, setStyles] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    getProductStyles(props.productId)
    .then((response) => {
      setStyles(response.data.results);
      setStyle(response.data.results[0]);
    })
    .catch((err) => {console.log('styles', err)});
    getProduct(props.productId)
    .then((response) => {
      setProductInfo(response.data);
    })
    .catch((err) => {console.log('info', err)});
  }, [])

  return(
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
    >
      <Grid xs container>
        {/* this is my image gall */}
        <p>{JSON.stringify(styles)}</p>
      </Grid>
      <Grid xs container >
        <p>{JSON.stringify(productInfo)}</p>
        {/* reviews */}
        {/* category */}
        {/* title */}
        {/* price */}
        {/* style selector */}
        {/*  */}
        {/* add to cart */}
      </Grid>
      {/* possibly description */}
    </Grid>
  )
}

export default Overview;