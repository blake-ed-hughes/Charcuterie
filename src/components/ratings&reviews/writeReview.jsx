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
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegCheckCircle } from "react-icons/fa";
import trackClick from '../tracker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: '90%',
  bgcolor: 'transparent',
  boxShadow: 24,

};

onst useStyles = makeStyles((theme) => ({
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

}));

function WriteReview () {
  const classes = useStyles();

// onclick for add review > open modal

// set up modal structure with title and name of product
// (pass down state to get both)

  // create a review form

  // title them as so with astrisks for mandatory inputs

   // radio buttons for stars?

   // radio button recommendation

   // radio button characteristics

   // text inputs for all else

  // form submission should be conditional

    // upon submit send post request with all params


  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            WRITE SOMETHING
          </Typography>

          <form className={classes.style} noValidate autoComplete="off">
            <div>
              <TextField required id="Nickname" label="Nickname" defaultValue="" />
              <TextField required id="Email" label="Email" defaultValue="" />
              <TextField
                id="helperText"
                label="Type answer here..."
                defaultValue=""
                helperText="less than 50 words"
              />

              <button>Submit</button>

            </div>
          </form>

        </Box>
      </Modal>
    </div>
  );

}

export default WriteReview;