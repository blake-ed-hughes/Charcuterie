import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    border: '1px solid #005',
    boxShadow: 24,
    p: 4,
    color: "grey"
  }
}));

export default function AddQuestionModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [submitButton, setSubmitButton] = useState("Submit");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButton("We Have Received Your Question!");
  }

  return (
    <span>
      <Button spacing={1} variant="outlined" color="secondary" onClick={handleOpen}>ADD A QUESTION +</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What question do you have?
          </Typography>

          <form className={classes.style} onSubmit={handleSubmit}>

            <h2>What's Your Question?</h2>

            <div>
              <TextField required id="Nickname" label="Nickname" defaultValue="" />
            </div>

            <div>
              <TextField required id="Email" label="Email" defaultValue="" />
            </div>

            <div>
              <Typography variant="h6" component="h6">Want to upload an image?</Typography>
            <input type="file" />
            </div>

            <div>
              <TextField
                id="helperText"
                label="What's Your Question?"
                defaultValue=""
                helperText="less than 50 words"
              />
            </div>

            <button type="submit">{submitButton}</button>

          </form>

        </Box>
      </Modal>
    </span>
  );
}