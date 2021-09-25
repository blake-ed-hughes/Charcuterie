import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { postQuestion } from './axiosHelper.js';

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

function AddQuestionModal({name, pid}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // --------------------------------------------------------------

  const [qa_formInput, setQAFormInput] = useState({
    product_id: 38321,
    name: "",
    email: "",
    body: ""
  });

  const [submitButton, setSubmitButton] = useState("SUBMIT QUESTION");

  const handleChange = e => {
    setQAFormInput({
      ...qa_formInput,
      [e.target.name]: e.target.value,
    });
  }
  const handlPostQuestion = () => {
    postQuestion(qa_formInput);
    setSubmitButton("SUBMITTED");
    setTimeout(function(){ handleClose()}, 2000);
  }

  return (
    <div>

      <Button variant="contained" spacing={1} color="secondary" onClick={handleOpen} >
        Add Question +
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
          className={classes.style}
          style={{ maxHeight: '30%', maxWidth: '100%', overflow: 'auto' }}>

          <Grid container spacing={2} item xs={12} justifyContent={'center'}>
            <Grid item xs={12} >
              <Typography style={{ textAlign: 'center', marginTop: '16px' }} variant="h6">{"Write Your Question"} </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} item xs={12} style={{ marginTop: '24px', }} justifyContent={'center'}>

            <Grid item container justifyContent={'center'} xs={12} >
              <TextField
                style={{width: '85%'}}
                color="secondary"
                required
                label="Nickname"
                name="name"
                value={qa_formInput.nickname}
                onChange={handleChange}
                helperText="No special characters please, must be letters and numbers"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={12} >
              <TextField
                style={{width: '85%'}}
                color="secondary"
                required
                label="Email"
                name="email"
                value={qa_formInput.email}
                onChange={handleChange}
                helperText="For authentication reasons, you will not be emailed"
              />
            </Grid>
            <Grid item container justifyContent={'center'} xs={12} >
              <TextField
                color="secondary"
                multiline
                rows={4}
                style={{width: '85%'}}
                label="Question"
                name="body"
                value={qa_formInput.body}
                onChange={handleChange}
                helperText="Up to 60 characters"
              />
            </Grid>

            <Grid container spacing={2} item xs={12} justifyContent={'center'} style={{ margin: '16px' }}>
              <Button variant="contained" color="secondary" onClick={handlPostQuestion}>{submitButton}</Button>
            </Grid>
          </Grid>

        </Box>
      </Modal>
    </div>
  );
}

export default AddQuestionModal;