import React, { useState } from 'react';
import 'typeface-roboto';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AuthContext from './context/authContext';
import PrivateRoute from './utilities/PrivateRoute';
import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

export type ClientType = typeof client;

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    success: PaletteColor;
  }

  interface ThemeOptions {
    success?: PaletteColor;
  }
}

const theme = createMuiTheme({
  success: {
    light: lightGreen[300],
    main: lightGreen[500],
    dark: lightGreen[700],
    contrastText: '#000'
  },
  palette: {
    primary: {
      main: blueGrey[900]
    },
    secondary: {
      main: orange[400]
    }
  }
});

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = (token: string, userId: string, tokenExpiration: number) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <>
      <CssBaseline />
      <ApolloProvider client={client}>
        <AuthContext.Provider
          value={{
            token,
            userId,
            login,
            logout
          }}
        >
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <MainNavigation />
              <Switch>
                {token && <Redirect from="/auth" to="/events" />}
                <Route path="/auth" component={Auth} />
                <Route path="/events" component={Events} />
                <PrivateRoute path="/bookings" component={Bookings} />
                {!token && <Redirect to="/auth" />}
              </Switch>
            </ThemeProvider>
          </BrowserRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
};

export default App;
