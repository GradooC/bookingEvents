import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/EventRounded';
import WhatshotIcon from '@material-ui/icons/WhatshotRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';
import BookingIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import AuthContext from '../../context/authContext';
import Box from '@material-ui/core/Box';

import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconBtnRoot: {
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.1)
      }
    }
  })
);

const MainNavigation: React.FC = () => {
  const { token, logout } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <WhatshotIcon color="secondary" />
        <Typography variant="h5">BookingEvents</Typography>
        <Box flexGrow={1} />
        <Tooltip title="Events">
          <IconButton
            color="inherit"
            classes={{ root: classes.iconBtnRoot }}
            component={Link}
            to="/events"
          >
            <EventIcon />
          </IconButton>
        </Tooltip>
        {!token ? (
          <Tooltip title="Authorization">
            <IconButton
              color="inherit"
              classes={{ root: classes.iconBtnRoot }}
              component={Link}
              to="/auth"
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {token ? (
          <>
            <Tooltip title="Bookings">
              <IconButton
                color="inherit"
                classes={{ root: classes.iconBtnRoot }}
                component={Link}
                to="/bookings"
              >
                <BookingIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                classes={{ root: classes.iconBtnRoot }}
                onClick={logout}
              >
                <ExitIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
