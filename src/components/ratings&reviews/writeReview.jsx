/*

{"product_id": 38322,
"rating": 3,
"summary": "Do you believe in life after love?",

"body": "No matter how hard I try. You keep pushing me aside. And I can't break through. There's no talking to you. So sad that you're leaving. It takes time to believe it. But after all is said and done. You're gonna be the lonely one, oh. Do you believe in life after love? I can feel something inside me say, I really don't think you're strong enough now. Do you believe in life after love? I can feel something inside me say, I really don't think you're strong enough now.",

"recommend": true,
"name": "cher",
"email": "cherilyn.sarkisian@gmail.com",
"date": "2019-01-01T00:00:00.000Z",
"photos": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfkpxt8kZkCr5lJidE5kxkP66BrJbAHKWFA&usqp=CAU"],
"characteristics":{ "128429": 5, "128430": 5 }
}

*/

//--------------------------------------------------------------------------
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
import Stack from '@mui/material/Stack';
import Overview from '../ProductOverview.jsx'
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


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

  // const card = (
  //   <CardContent>
  //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
  //     Overall rating:
  //     </Typography>
  //     <Rating name="quarter-rating" defaultValue={1} />
  //   </CardContent>
  // );
  // name of product (pass down state to get)

  // radio button recommendation

  // radio button characteristics

  // form submission should be conditional

  // upon submit send post request with all params


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
              <Typography style={{ textAlign: 'center' }} variant="body2">{"About the " + " Camo Onesie"}</Typography>
              {/* productInfo.name */}
            </Grid>
          </Grid>


          <Grid container spacing={2} item xs={12} style={{marginTop: '24px', }} justifyContent={'center'}>

            <Grid container justifyContent={'center'} style={{marginTop:'24px'}} item xs={6}>


              <Paper variant="outlined" style={{border: '1px solid #C0C0C0', minWidth: '80%'}}>
                <Grid item xs={12} >
                  <Typography style={{ textAlign: 'center', color: 'grey' }} sx={{ fontSize: 14 }} color="grey" gutterBottom variant="caption">{"  Overall rating:  "}</Typography>
                </Grid>

                <Grid item xs={12} >
                  <Rating name="quarter-rating" defaultValue={1} />
                </Grid>
              </Paper>


            </Grid>

            <Grid item xs={6} container justifyContent={'center'} style={{marginTop:'24px'}} >

            </Grid>

            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                fullWidth
                required
                id="outlined-nickname"
                label="Nickname"
                defaultValue="Example: jackson11!"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                fullWidth
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
                fullWidth
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
                fullWidth
                id="outlined-Review body"
                label="Review body"
                defaultValue="Why did you like the product or not?"
                helperText="Up to 1000 characters"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={6} >
              <TextField
                color="secondary"
                fullWidth
                id="outlined-photos"
                label="Photo url"
                defaultValue="Photo_url, Photo_url"
                helperText="Add up 5 (comma seperatated) urls"
              />
            </Grid>

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