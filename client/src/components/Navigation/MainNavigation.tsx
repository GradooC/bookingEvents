import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import EventIcon from '@material-ui/icons/EventRounded';
import AuthIcon from '@material-ui/icons/HowToRegRounded';
import BookingIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import AuthContext from '../../context/authContext';

const MainNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title="Events">
          <IconButton color="inherit" component={Link} to="/events">
            <EventIcon />
          </IconButton>
        </Tooltip>
        {!authContext.token ? (
          <Tooltip title="Authorization">
            <IconButton color="inherit" component={Link} to="/auth">
              <AuthIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {authContext.token ? (
          <Tooltip title="Bookings">
            <IconButton color="inherit" component={Link} to="/bookings">
              <BookingIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
