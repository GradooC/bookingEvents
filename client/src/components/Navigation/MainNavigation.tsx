import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import EventIcon from '@material-ui/icons/EventRounded';
import AuthIcon from '@material-ui/icons/HowToRegRounded';
import BookingIcon from '@material-ui/icons/CheckCircleOutlineRounded';

interface MainNavigationProps {}

const MainNavigation: React.FC<MainNavigationProps> = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title="Events">
          <IconButton color="inherit" component={Link} to="/events">
            <EventIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Authorization">
          <IconButton color="inherit" component={Link} to="/auth">
            <AuthIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bookings">
          <IconButton color="inherit" component={Link} to="/bookings">
            <BookingIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
