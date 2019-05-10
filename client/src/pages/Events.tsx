import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  TextField,
  Paper,
  Button,
  Container,
  Grid,
  Avatar,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Fab
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/CloseRounded';
import CheckIcon from '@material-ui/icons/CheckRounded';
import LibraryAdd from '@material-ui/icons/LibraryAddRounded';
import AddIcon from '@material-ui/icons/AddRounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalTitle: {
      display: 'flex',
      alignItems: 'center'
      // borderBottom: `1px solid ${theme.palette.secondary.main}`
    },
    cancelRoot: {
      fill: theme.palette.error.main
    },
    acceptRoot: {
      fill: theme.success.main
    },
    fab: {
      position: 'absolute',
      right: theme.spacing(4),
      bottom: theme.spacing(4)
    }
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" {...props} />;
  }
);

interface EventsProps {}

const Events: React.FC<EventsProps> = props => {
  // const {  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Fab
        size="large"
        color="secondary"
        onClick={() => setIsOpen(true)}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={() => setIsOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle classes={{ root: classes.modalTitle }}>
          <LibraryAdd />
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField autoFocus variant="outlined" fullWidth />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon classes={{ root: classes.cancelRoot }} />
          </IconButton>
          <IconButton onClick={() => setIsOpen(false)}>
            <CheckIcon classes={{ root: classes.acceptRoot }} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Events;
