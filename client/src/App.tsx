import React, { useState } from 'react';
import 'typeface-roboto';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AuthContext from './context/authContext';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

export type ClientType = typeof client;

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
            <MainNavigation />
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/events" component={Events} />
              <Route path="/bookings" component={Bookings} />
              <Redirect from="/" to="/auth" />
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
};

export default App;
