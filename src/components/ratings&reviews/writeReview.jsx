import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import trackClick from '../tracker';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useRadioGroup } from '@mui/material/RadioGroup'
import { useFormControl } from '@mui/material/FormControl';
import Axios from 'axios';
import API_key from '../../config';


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

function WriteReview({ name, pid, characteristics }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // yes / no radio button color -------------------------
  const [selectedValue, setSelectedValue] = useState('a');

  const handleColorChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // const controlProps = (item) => ({
  //   checked: selectedValue === item,
  //   onChange: handleColorChange,
  //   value: item,
  //   name: 'row-radio-buttons-recommendation-group',
  //   inputProps: { 'aria-label': item },
  // });

  // product name ----------------------------------------
  const [productName, setProductName] = useState('');

  useEffect(() => {
    setProductName(name);
  }, [name])

  // star input value-------------------------------------
  const [starInput, setStarInput] = useState({
    rating: 1
  })

  const handleStarChange = e => {
    setStarInput({
      ...starInput,
      [e.target.name]: Number(e.target.value),
    })
  }

  // form input value-------------------------------------
  const [formInput, setFormInput] = useState({
    product_id: pid,
    summary: "example: Best purchase ever!",
    body: "Why did you like the product or not?",
    name: "example: McLovin_69",
    email: "example: prestige_worldwide@gmail.com",
    photos: '["photo_url", "photo_url", "photo_url", "photo_url", "photo_url"]',
  });


  const handleFormChange = e => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    })
  }

  // star recommendation value--------------------------
  const [recInput, setRecInput] = useState({
    recommend: "true"
  });

  const handleRecChange = e => {
    setRecInput({
      ...recInput,
      [e.target.name]: e.target.value === "true",
    })
  }

  // characteristics input value-------------------------

/*  "Fit": {
      "id": 128432,
      "value": "3.0000000000000000"
  },
  "Length": {
      "id": 128433,
      "value": "3.0000000000000000"
  },
  "Comfort": {
      "id": 128434,
      "value": "3.0000000000000000"
  },
  "Quality": {
      "id": 128435,
      "value": "3.0000000000000000"
*/

  const [radioInput, setRadioInput] = useState({
    characteristics: {}
  });

  const handleRadioChange = e => {
    setRadioInput({
      ...radioInput,
      [e.target.name]: Number(e.target.value),
    })
  }

  const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    }),
  );

  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  MyFormControlLabel.propTypes = {
    value: PropTypes.any,
  };

  //----------------------------------------------
  // look into "yup" as validator
  //----------------------------------------------

  const [postInput, setPostInput] = useState({});

  useEffect(() => {
    setPostInput(
      {
      ...radioInput,
      ...recInput,
      ...formInput,
      ...starInput
    }
    )
  }, [radioInput, recInput, formInput, starInput]);

  // console.log('postInput-->', postInput);

  // post request--------------------------------------

  // function postNewReview (pid, handleClose) {
  //   return Axios({
  //     method: 'post',
  //     url:'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=' + pid,
  //     data: THIS WILL BE YOUR COMBINED INPUTS,
  //     headers: {'Authorization': API_key}
  //   })
  //   .then(resultOfSuccessfulPostRequest => {

  //     console.log("Posted New Review Successfully!")
  //     handleClose()
  //   })
  //   .catch((error) => {
  //     console.log('FAILED to send post form data --> ', error);
  //   });
  // }

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
              <Typography style={{ textAlign: 'center' }} variant="body2">{"About the " + productName}</Typography>
              {/* productInfo.name */}
            </Grid>
          </Grid>


          <Grid container spacing={2} item xs={12} style={{ marginTop: '24px', }} justifyContent={'center'}>

            <Grid container justifyContent={'center'} style={{ marginTop: '24px', marginBottom: '24px' }} item xs={6}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>

                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '6px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"  Overall rating*  "}</Typography>
                </Grid>

                <Grid container justifyContent={'center'} item xs={12} >
                  <Rating name="rating" value={formInput.rating} onChange={handleStarChange} size="large" />
                </Grid>
              </Paper>


            </Grid>

            <Grid item xs={6} container justifyContent={'center'} style={{ marginTop: '24px', marginBottom: '24px' }} >
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Do you recommend this product?*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >

                  <RadioGroup name="recommend" defaultValue="Yes" onChange={handleRecChange}>
                    <MyFormControlLabel value="true" label="Yes" control={<Radio color="success"/>} />
                    <MyFormControlLabel value="false" label="No" control={<Radio color="secondary"/>} />
                  </RadioGroup>

                </Grid>
              </Paper>
            </Grid>

            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                style={{ width: '85%' }}
                color="secondary"
                required
                id="outlined-nickname"
                label="Nickname"
                name="name"
                value={formInput.name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                style={{ width: '85%' }}
                required
                id="outlined-email"
                label="Email"
                name="email"
                value={formInput.email}
                onChange={handleFormChange}
                helperText="For authentication reasons, you will not be emailed"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                multiline
                rows={4}
                style={{ width: '85%' }}
                id="outlined-Review summary"
                label="Review summary"
                name="summary"
                value={formInput.summary}
                onChange={handleFormChange}
                helperText="Up to 60 characters"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                required
                multiline
                rows={4}
                color="secondary"
                style={{ width: '85%' }}
                id="outlined-Review body"
                label="Review body"
                name="body"
                value={formInput.body}
                onChange={handleFormChange}
                helperText="Up to 1000 characters"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                multiline
                rows={5}
                color="secondary"
                style={{ width: '85%' }}
                id="outlined-photos"
                label="Photo urls"
                name="photos"
                value={formInput.photos}
                onChange={handleFormChange}
                helperText="Add up 5 ['comma', 'seperatated'] urls"
              />
            </Grid>

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px' }} >
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Size*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >

                  <FormControl name="characteristics.size" value={'none'} onChange={handleRadioChange} component="fieldset">
                    <RadioGroup row aria-label="size" name="characteristics.size">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="1" control={<Radio />} label="A size too small" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="2" control={<Radio />} label="½ a size too small" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="3" control={<Radio />} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="4" control={<Radio />} label="½ a size too big" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="5" control={<Radio />} label="A size too big" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>

                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px' }}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Width*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl name="characteristics.width" value={'none'} onChange={handleRadioChange} component="fieldset">
                    <RadioGroup row aria-label="Width" name="characteristics.width">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="1" control={<Radio />} label="Too narrow" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="2" control={<Radio />} label="Slightly narrow" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="3" control={<Radio />} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="4" control={<Radio />} label="Slightly wide" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="5" control={<Radio />} label="Too wide" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px' }}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Comfort*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl name="characteristics.comfort" value={'none'} onChange={handleRadioChange} component="fieldset">
                    <RadioGroup row aria-label="Comfort" name="characteristics.comfort">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="1" control={<Radio />} label="Uncomfortable" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="2" control={<Radio />} label="Slightly uncomfortable" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="3" control={<Radio />} label="Ok" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="4" control={<Radio />} label="Comfortable" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="5" control={<Radio />} label="Perfect" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px' }}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Quality*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl name="characteristics.quality" value={'none'} onChange={handleRadioChange} component="fieldset">
                    <RadioGroup row aria-label="Quality" name="characteristics.quality">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="1" control={<Radio />} label="Poor" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="2" control={<Radio />} label="Below average" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="3" control={<Radio />} label="What I expected" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="4" control={<Radio />} label="Pretty great" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="5" control={<Radio />} label="Perfect" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px' }}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Length*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl name="characteristics.lengths" value={'none'} onChange={handleRadioChange} component="fieldset">
                    <RadioGroup row aria-label="Length" name="characteristics.lengths">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="1" control={<Radio />} label="Runs Short" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="2" control={<Radio />} label="Runs slightly short" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="3" control={<Radio />} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="4" control={<Radio />} label="Runs slightly long" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="5" control={<Radio />} label="Runs long" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            {/* {  && ( */}
            <Grid item container justifyContent={'center'} xs={6} style={{ marginBottom: '24px' }}>
              <Paper variant="outlined" style={{ border: '1px solid #C0C0C0', width: '85%' }}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey', marginLeft: '12px' }} sx={{ fontSize: 12 }} color="grey" gutterBottom variant="caption">{"Fit*"}</Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={12} >
                  <FormControl name="characteristics.fit" value={'none'} onChange={handleRadioChange} component="fieldset">
                    <RadioGroup row aria-label="Fit" name="characteristics.fit">
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="1" control={<Radio />} label="Runs tight" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="2" control={<Radio />} label="Runs slightly tight" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="3" control={<Radio />} label="Perfect" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="4" control={<Radio />} label="Runs slightly loose" />
                      </Grid>
                      <Grid container style={{ marginLeft: '12px' }} item xs={12} >
                        <MyFormControlLabel value="5" control={<Radio />} label="Runs loose" />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Paper>
            </Grid>
            {/* )} */}

            <Grid container spacing={2} item xs={12} justifyContent={'center'} style={{ margin: '16px' }}>
              <Button variant="contained" color="secondary" onClick={handleClose}>Submit Review</Button>
              {/* onClick={postNewReview} */}
            </Grid>
          </Grid>

        </Box>
      </Modal>
    </div>
  );

}

export default WriteReview;