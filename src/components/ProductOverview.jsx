import React from 'react';
import { useState, useEffect } from 'react';
import { getProduct, getProductStyles, postItemToCart } from './poAxios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  large: {
    width: '80px',
    height: '80px',
  },
  formControl: {
    minWidth: '95%'
  }
}));

function StyleSelect(props) {
  const classes = useStyles();
  const [style, setStyle] = useState(props.style);
  const [thumbnails, setThumbnails] = useState([]);
  useEffect(() => {
    let thumbs = [];
    for (let i = 0; i < props.styles.length; i++) {
      thumbs.push(props.styles[i].photos[0].thumbnail_url);
    }
    setStyle(props.style);
    setThumbnails(thumbs);
  }, [props]);

  function updateIndex(e) {
    props.changeIndex(parseInt(e.target.alt));
  }
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography>{'style > ' + style.name}</Typography>
      </Grid>
      <Grid item container justifyContent="space-evenly" alignItems="center">
        {thumbnails.map((url, index) => {
          if (index === props.styleIndex) {
            return (
              <Grid item xs={3} key={index}>
                <Badge color='primary' badgeContent='' overlap='circular'>
                  <Avatar alt={'' + index} src={url} className={classes.large} onClick={updateIndex} />
                </Badge>
              </Grid>
            )
          } else {
            return (
              <Grid item xs={3} key={index}>
                <Avatar alt={'' + index} src={url} className={classes.large} onClick={updateIndex} />
              </Grid>
            )
          }
        })}
      </Grid>
    </Grid>
  );

}

function AddToCart(props) {
  const classes = useStyles();
  const [size, setSize] = useState('');
  const [sizes, setSizes] = useState([{sku:'',size:'',quantity:''}]);
  const [quantity, setQuantity] = useState('');
  const [skuQty, setSkuQty] = useState(undefined);
  useEffect(() => {
    setSize('');
    let skus = [];
    for (let key in props.style.skus) {
      skus.push({sku: key, size: props.style.skus[key].size, quantity: props.style.skus[key].quantity})
    }
    setSizes(skus);
  }, [props])
  function handleSizeChange(e) {
    setSize(e.target.value);
    setSkuQty(props.style.skus[e.target.value].quantity);
    setQuantity('');
  }
  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }
  function quantitySelectBuilder(qty) {
    if (qty) {
      let list = []
      for (let i=1;i<=qty;i++) {
        list.push(<MenuItem value={i} key={i-1}>{i}</MenuItem>);
      }
      return(list);
    } else {
      return <MenuItem value='out'>OUT OF STOCK</MenuItem>;
    }
  }
  function addskuToCart() {
    let i = 0
    while (i < quantity) {
      postItemToCart(size)
      .catch((err) => {console.log('failed to add to cart')});
      i++;
    }
    console.log(`added ${i} items with sku ${size}`)
  }
  return (
    <Grid container spacing={3}>
      <Grid item container>
        <Grid item xs={8} >
          <FormControl className={classes.formControl}>
            <InputLabel >Select Size</InputLabel>
            <Select
              value={size}
              onChange={handleSizeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sizes.map((sizeObj, index) => <MenuItem value={sizeObj.sku} key={index}>{sizeObj.size}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
        <FormControl className={classes.formControl}>
          <InputLabel >Quantity</InputLabel>
          <Select
            id="qty_select"
            value={quantity}
            onChange={handleQuantityChange}
            >
              <MenuItem value="">
              <em>None</em>
              </MenuItem>
              {quantitySelectBuilder(skuQty)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Grid item xs={10}>
          <Button onClick={addskuToCart} variant="contained" className={classes.formControl}>Add To Cart</Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={()=>{console.log('added to favorites')}} variant="contained" className={classes.formControl}>fav</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

function Overview(props) {
  const classes = useStyles();
  const [pid, setPID] = useState(props.productId);
  const [style, setStyle] = useState({});
  const [styleIndex, setStyleIndex] = useState(0);
  const [styles, setStyles] = useState([{ photos: [{ url: '' }] }]);
  const [productInfo, setProductInfo] = useState({});
  const [stylePhotos, setPhotos] = useState([{ url: '' }]);
  useEffect(() => {
    setStyle(styles[styleIndex]);
    setPhotos([...styles[styleIndex].photos]);
  }, [styleIndex, styles])
  useEffect(() => {
    getProductStyles(pid)
      .then((response) => {

        setStyles(response.data.results);
        setStyle(response.data.results[styleIndex]);
        setPhotos([...response.data.results[styleIndex].photos]);
      })
      .catch((err) => { console.log('styles', err) });
    getProduct(pid)
      .then((response) => {
        setProductInfo(response.data);
      })
      .catch((err) => { console.log('info', err) });
  }, [pid])

  function changeIndex(index) {
    setStyleIndex(index);
  }

  return (
    <div>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          padding={3}
        >
          <Grid item xs={12} sm={8} container justifyContent="center" >
            <Paper >
              {/* this is my image gall */}
              <img src={stylePhotos[0].url} height='auto' width='auto' />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} spacing={10} container direction="column">
              {/* reviews */}
              {/* category */}
              <Typography variant='h6' color="textSecondary">{productInfo.category}</Typography>
              {/* title */}
              <Typography gutterBottom variant='h3'>{productInfo.name}</Typography>
              {/* price */}
              <Typography variant='subtitle1'>${productInfo.default_price}</Typography>
              {/* style selector */}
              <StyleSelect styleIndex={styleIndex} style={style} styles={styles} changeIndex={(e) => { changeIndex(e) }} />
              {/*  */}
              {/* add to cart */}
              <AddToCart style={style} />
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