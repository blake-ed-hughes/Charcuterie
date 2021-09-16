import React from 'react';
import {useState, useEffect} from 'react';
import {getProduct, getProductStyles} from './poAxios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  large: {
    width: '80px',
    height: '80px',
  }
}));

function StyleSelect(props) {
  const classes = useStyles();
  const [style, setStyle] = useState(props.style);
  const [thumbnails, setThumbnails] = useState([]);
  useEffect(() => {
    let thumbs = [];
    console.log(props.styles)
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
    <Grid container >
      <Grid item>
        <Typography>{'style > ' + style.name}</Typography>
      </Grid>
      <Grid item container justifyContent="space-evenly" alignItems="center">
        {thumbnails.map((url, index) => {
          console.log(index, props.styleIndex)
          if (index === props.styleIndex) {
            return(
              <Grid item xs={3} key={index}>
                <Badge color='primary'  badgeContent='' overlap='circular'>
                  <Avatar alt={'' + index} src={url} className={classes.large} onClick={updateIndex}/>
                </Badge>
              </Grid>
            )
          } else {
            return(
              <Grid item xs={3} key={index}>
                <Avatar alt={'' + index} src={url} className={classes.large} onClick={updateIndex}/>
              </Grid>
            )
          }
        })}
      </Grid>
    </Grid>
  );

}

function Overview(props) {
  const classes = useStyles();
  const [pid, setPID] = useState(props.productId);
  const [style, setStyle] = useState({});
  const [styleIndex, setStyleIndex] = useState(0);
  const [styles, setStyles] = useState([{photos:[{url:''}]}]);
  const [productInfo, setProductInfo] = useState({});
  const [stylePhotos, setPhotos] = useState([{url:''}]);
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
    .catch((err) => {console.log('styles', err)});
    getProduct(pid)
    .then((response) => {
      setProductInfo(response.data);
    })
    .catch((err) => {console.log('info', err)});
  }, [pid])

  function changeIndex(index) {
    setStyleIndex(index);
  }

  return(
    <div>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          padding={3}
        >
          <Grid item xs={12} sm={8} container justifyContent="center" >
          <Paper >
            {/* this is my image gall */
            console.log(styleIndex)}
            <img src={stylePhotos[0].url} height='auto' width='auto'/>
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
            <StyleSelect styleIndex={styleIndex} style={style} styles={styles} changeIndex={(e) => {changeIndex(e)}}/>
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