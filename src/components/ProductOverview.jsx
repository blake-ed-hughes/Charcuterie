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
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ZoomInIcon from '@mui/icons-material/ZoomIn';


const useStyles = makeStyles((theme) => ({
  large: {
    height: '75px',
    width: '75px'
  },
  formControl: {
    minWidth: '95%'
  },
  mainPhoto: {

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
      <Grid item container justifyContent="space-evenly" alignItems="center" spacing={2}>
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
  const [sizes, setSizes] = useState([{ sku: '', size: '', quantity: '' }]);
  const [quantity, setQuantity] = useState('');
  const [skuQty, setSkuQty] = useState(undefined);
  useEffect(() => {
    setSize('');
    let skus = [];
    for (let key in props.style.skus) {
      skus.push({ sku: key, size: props.style.skus[key].size, quantity: props.style.skus[key].quantity })
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
      for (let i = 1; i <= qty; i++) {
        list.push(<MenuItem value={i} key={i - 1}>{i}</MenuItem>);
      }
      return (list);
    } else {
      return <MenuItem value='out'>OUT OF STOCK</MenuItem>;
    }
  }
  function addskuToCart() {
    let i = 0
    while (i < quantity) {
      postItemToCart(size)
        .catch((err) => { console.log('failed to add to cart') });
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
          <Button onClick={() => { console.log('added to favorites') }} variant="contained" className={classes.formControl}>fav</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

function Gallery(props) {
  const classes = useStyles();
  const [photos, setPhotos] = useState(props.photos);
  const [mainPhotoIndex, setIndex] = useState(0);
  const [barIndex, setBarIndex] = useState(0);
  useEffect(() => {
    setPhotos(props.photos);
    setIndex(0);
    setBarIndex(0);
  }, [props]);

  function changeIndex(e) {
    setIndex(parseInt(e.target.id));
  }

  function imgBar(firstIndex) {
    let htmlArr = [];
    htmlArr.push(<img src={photos[firstIndex].thumbnail_url} height='auto' key={firstIndex} id={firstIndex} onClick={changeIndex} />);
    if (photos.length > 2) {
      htmlArr.push(<img src={photos[firstIndex + 1].thumbnail_url} height='auto' key={firstIndex + 1} id={firstIndex + 1} onClick={changeIndex} />);
      htmlArr.push(<img src={photos[firstIndex + 2].thumbnail_url} height='auto' key={firstIndex + 2} id={firstIndex + 2} onClick={changeIndex} />);
      htmlArr.push(<img src={photos[firstIndex + 3].thumbnail_url} height='auto' key={firstIndex + 3} id={firstIndex + 3} onClick={changeIndex} />);
    }

    return htmlArr;
  }

  function backPhoto() {
    if (mainPhotoIndex > 0) {
      setIndex(mainPhotoIndex - 1);
    }
  }
  function nextPhoto() {
    if (mainPhotoIndex < photos.length - 1) {
      setIndex(mainPhotoIndex + 1);
    }
  }
  function lowerBarIndex() {
    if (barIndex > 0) {
      setBarIndex(barIndex - 1);
    }
  }
  function raiseBarIndex() {
    if (barIndex < photos.length - 4) {
      setBarIndex(barIndex + 1);
    }
  }

  return (
    <Grid item container alignItems="center" justifyContent="space-between" xs={10}>
      <Grid item xs={2}>
        <Stack spacing={3}>
          <IconButton onClick={lowerBarIndex}><KeyboardArrowUpIcon /></IconButton>
          {imgBar(barIndex)}
          <IconButton onClick={raiseBarIndex}><KeyboardArrowDownIcon /></IconButton>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        {/**arrow button */}
        <IconButton onClick={backPhoto}><ArrowBackIcon /></IconButton>
      </Grid>
      <Grid item xs={6} container alignItems="center">
        <img src={photos[mainPhotoIndex].url} height='auto' width='100%' className={classes.mainPhoto}/>
      </Grid>
      <Grid item xs={1}>
        {/* <IconButton>Fullscreen</IconButton>
        Need to make fullscreen function*/}
        {/**arrow button */}
        <IconButton onClick={nextPhoto}><ArrowForwardIcon /></IconButton>
      </Grid>
    </Grid>
  )
}

function Overview(props) {
  const classes = useStyles();
  const [pid, setPID] = useState(props.productId);
  const [style, setStyle] = useState({});
  const [styleIndex, setStyleIndex] = useState(0);
  const [styles, setStyles] = useState([{ photos: [{ url: '', thumbnail_url: '' }, { url: '', thumbnail_url: '' }] }]);
  const [productInfo, setProductInfo] = useState({});
  const [stylePhotos, setPhotos] = useState([{ url: '', thumbnail_url: '' }, { url: '', thumbnail_url: '' }]);
  const [isExpanded, setExpand] = useState(false);
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

  function fullscreenToggle() {
    setExpand(!isExpanded);
  }
  if (isExpanded) {
    return (
          <Grid container justifyContent="center" direction="row">
            <Gallery photos={stylePhotos} />
            <Grid item xs={1}>
              <IconButton onClick={fullscreenToggle}><FullscreenExitIcon /></IconButton>
            </Grid>
          </Grid>
        )
  } else {
    return (
      <div>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            padding={3}
          >
            <Grid item xs={12} sm={8} container justifyContent="center" direction="row">
              <Gallery photos={stylePhotos} />
              <Grid item xs={1}>
                <IconButton onClick={fullscreenToggle}><FullscreenIcon /></IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} spacing={10} container direction="column">
              {/* reviews */}
              <Typography variant='h6' color="textSecondary">{productInfo.category}</Typography>
              <Typography gutterBottom variant='h3'>{productInfo.name}</Typography>
              {/* price still needs sale update*/}
              <Typography variant='subtitle1'>${productInfo.default_price}</Typography>
              <StyleSelect styleIndex={styleIndex} style={style} styles={styles} changeIndex={(e) => { changeIndex(e) }} />
              <AddToCart style={style} />
            </Grid>
          </Grid>
          <Paper elevation={3}>
            <Typography variant='subtitle2'>{productInfo.description}</Typography>
          </Paper>
        </Container>
      </div>
    )
  }
}



export default Overview;