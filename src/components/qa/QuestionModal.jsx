import * as React from 'react';
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
}));

export default function AddQuestionModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>ADD A QUESTION +</Button>
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

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className={classes.style} noValidate autoComplete="off">
              <div>
                <TextField required id="firstName" label="First Name" defaultValue="" />
                <TextField required id="lastName" label="Last Name" defaultValue="" />
                <TextField
                  id="helperText"
                  label="What's Your Question?"
                  defaultValue=""
                  helperText="less than 50 words"
                />
                <Typography>
                  <button>Submit</button>
                </Typography>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}