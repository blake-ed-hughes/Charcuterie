import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@material-ui/core/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegCheckCircle } from "react-icons/fa";
import trackClick from '../tracker';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRadioGroup } from '@mui/material/RadioGroup';
import { useFormControl } from '@mui/material/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  },
  bold: {
    fontWeight: 600
  },
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '90%',
    background: 'white',
    boxShadow: 24,
    border: '4px solid black',
    p: 4
  }

}));

function WriteReview() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'row-radio-buttons-recommendation-group',
    inputProps: { 'aria-label': item },
  });


  return (
    <div>

      <Button variant="contained" className={classes.formControl} spacing={1} color="secondary" onClick={handleOpen} >
        Add Review +
      </Button>


      <Modal
        open={open}
        onClose={handleClose} >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          validate
          autoComplete="off"
          className={classes.style}
          style={{ maxHeight: '100%', maxWidth: '100%', overflow: 'auto' }}>

          <Grid container spacing={2} item xs={12} justifyContent={'center'}>
            <Grid item xs={12} >
              <Typography style={{ textAlign: 'center', marginTop: '16px' }} variant="h6">{"Write Your Review"} </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography style={{ textAlign: 'center' }} variant="body2">{"About the " + "FILL_ME_IN_PLEASE"}</Typography>
              {/* productInfo.name */}
            </Grid>
          </Grid>


          <Grid container spacing={2} item xs={12} style={{ marginTop: '24px', }} justifyContent={'center'}>

            <Grid container justifyContent={'center'} style={{ marginTop: '24px', marginBottom: '24px' }} item xs={6}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>

                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '6px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"  Overall rating*  "}</Typography>
                </Grid>

                <Grid container justifyContent={'center'} item xs={12} >
                  <Rating name="quarter-rating" defaultValue={1} />
                </Grid>
              </Paper>


            </Grid>

            <Grid item xs={6} container justifyContent={'center'} style={{ marginTop: '24px', marginBottom: '24px' }} >
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Do you recommend this product?*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="recommendation">
                    <RadioGroup row aria-label="recommendation" name="row-radio-buttons-recommendation-group">
                      <FormControlLabel value="Yes" control={<Radio {...controlProps('a')} color="success" />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio {...controlProps('b')} color="secondary" />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>

            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                style={{width: '85%'}}
                color="secondary"
                required
                id="outlined-nickname"
                label="Nickname"
                defaultValue="Example: jackson11!"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                style={{width: '85%'}}
                required
                id="outlined-email"
                label="Email"
                defaultValue="Example: jackson11@email.com"
                helperText="For authentication reasons, you will not be emailed"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                multiline
                rows={4}
                style={{width: '85%'}}
                id="outlined-Review summary"
                label="Review summary"
                defaultValue="Example: Best purchase ever!"
                helperText="Up to 60 characters"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                required
                multiline
                rows={4}
                color="secondary"
                style={{width: '85%'}}
                id="outlined-Review body"
                label="Review body"
                defaultValue="Why did you like the product or not?"
                helperText="Up to 1000 characters"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                multiline
                rows={5}
                color="secondary"
                style={{width: '85%'}}
                id="outlined-photos"
                label="Photo url"
                defaultValue="Photo_url, Photo_url, Photo_url, Photo_url, Photo_url"
                helperText="Add up 5 (comma seperatated) urls"
              />
            </Grid>

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px'}} >
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Size*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="size">
                    <RadioGroup defaultValue="none" row aria-label="size" name="row-radio-buttons-characteristics-Size">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="1" control={<Radio/>} label="A size too small" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="2" control={<Radio/>} label="½ a size too small" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="3" control={<Radio/>} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="4" control={<Radio/>} label="½ a size too big" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="5" control={<Radio/>} label="A size too big" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px'}}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Width*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="width">
                    <RadioGroup defaultValue="none" row aria-label="Width" name="row-radio-buttons-characteristics-Width">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="1" control={<Radio/>} label="Too narrow" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="2" control={<Radio/>} label="Slightly narrow" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="3" control={<Radio/>} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="4" control={<Radio/>} label="Slightly wide" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="5" control={<Radio/>} label="Too wide" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px'}}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Comfort*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="comfort">
                    <RadioGroup defaultValue="none" row aria-label="Comfort" name="row-radio-buttons-characteristics-Comfort">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="1" control={<Radio/>} label="Uncomfortable" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="2" control={<Radio/>} label="Slightly uncomfortable" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="3" control={<Radio/>} label="Ok" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="4" control={<Radio/>} label="Comfortable" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="5" control={<Radio/>} label="Perfect" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px'}}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Quality*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="quality">
                    <RadioGroup defaultValue="none" row aria-label="Quality" name="row-radio-buttons-characteristics-Quality">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="1" control={<Radio/>} label="Poor" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="2" control={<Radio/>} label="Below average" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="3" control={<Radio/>} label="What I expected" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="4" control={<Radio/>} label="Pretty great" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="5" control={<Radio/>} label="Perfect" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px'}}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Length*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="length">
                    <RadioGroup defaultValue="none" row aria-label="Length" name="row-radio-buttons-characteristics-Length">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="1" control={<Radio/>} label="Runs Short" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="2" control={<Radio/>} label="Runs slightly short" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="3" control={<Radio/>} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="4" control={<Radio/>} label="Runs slightly long" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="5" control={<Radio/>} label="Runs long" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px'}}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Fit*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl component="fit">
                    <RadioGroup defaultValue="none" row aria-label="Fit" name="row-radio-buttons-characteristics-Fit">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="1" control={<Radio/>} label="Runs tight" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="2" control={<Radio/>} label="Runs slightly tight" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="3" control={<Radio/>} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="4" control={<Radio/>} label="Runs slightly loose" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <FormControlLabel value="5" control={<Radio/>} label="Runs loose" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            <Grid container spacing={2} item xs={12} justifyContent={'center'} style={{ margin: '16px' }}>
              <Button variant="contained" color="secondary" onClick={handleClose}>Submit Review</Button>
            </Grid>
          </Grid>

        </Box>
      </Modal>
    </div>
  );

}

export default WriteReview;