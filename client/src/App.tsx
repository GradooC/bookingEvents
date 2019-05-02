import React from 'react';
import 'typeface-roboto';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <MainNavigation />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={Events} />
          <Route path="/bookings" component={Bookings} />
          <Redirect from="/" to="/auth" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
