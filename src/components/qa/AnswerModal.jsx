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

export default function AnswerModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked');
  }

  return (
    <span>
      <Button spacing={1} color="secondary" onClick={handleOpen}>Add Answer</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.style}>

          <form className={classes.style} onSubmit={handleSubmit}>
            <h2>We Love Your Answer</h2>
            <div>
              <TextField required id="Nickname" label="Nickname" defaultValue="" />
            </div>

            <div>
              <TextField required id="Email" label="Email" defaultValue="" />
            </div>

            <div>
              <TextField
                id="helperText"
                label="Type answer here..."
                defaultValue=""
                helperText="less than 50 words"
              />
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>


          </form>

        </Box>
      </Modal>
    </span>
  );
};