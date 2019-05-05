import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  TextField,
  Paper,
  Button,
  Grid,
  Avatar,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/PersonRounded';
import PersonAddIcon from '@material-ui/icons/PersonAddRounded';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import MyZoom from '../components/animations/MyZoom';

import { ClientType } from '../App';
import AuthContext from '../context/authContext';

const SIGN_IN = gql`
  query Login($user: UserInput) {
    login(user: $user) {
      userId
      token
      tokenExpiration
    }
  }
`;

const SIGN_UP = gql`
  mutation CreateUser($user: UserInput) {
    createUser(user: $user) {
      _id
      email
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      padding: theme.spacing(2),
      marginTop: theme.spacing(8),
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme.spacing(50)
    },
    btn: {
      position: 'absolute',
      width: theme.spacing(15),
      bottom: theme.spacing(2),
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    switchBtn: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(5),
      display: 'block'
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0
    },
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5)
    },
    input: {
      width: theme.spacing(30)
    }
  })
);

const Auth: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { login } = useContext(AuthContext);

  const signInHandler = (client: ClientType) => async () => {
    const {
      data: {
        login: { token, userId, tokenExpiration }
      }
    } = await client.query({
      query: SIGN_IN,
      variables: {
        user: { email, password }
      }
    });

    login(token, userId, tokenExpiration);
  };

  const signUpHandler = (client: ClientType) => async () => {
    const { data } = await client.mutate({
      mutation: SIGN_UP,
      variables: {
        user: { email, password }
      }
    });
    console.log(data);
  };

  const buttons = [
    {
      text: 'Sign in',
      clickHandler: signInHandler,
      isVisible: isSignIn
    },
    {
      text: 'Sign up',
      clickHandler: signUpHandler,
      isVisible: !isSignIn
    }
  ];

  return (
    <ApolloConsumer>
      {client => (
        <>
          <Paper elevation={3} className={classes.paper}>
            <MyZoom isVisible={isSignIn}>
              <Avatar className={classes.avatar}>
                <PersonIcon className={classes.icon} />
              </Avatar>
            </MyZoom>
            <MyZoom isVisible={!isSignIn}>
              <Avatar className={classes.avatar}>
                <PersonAddIcon className={classes.icon} />
              </Avatar>
            </MyZoom>
            <form noValidate /*autoComplete="off"*/>
              <Grid
                container
                justify="center"
                spacing={2}
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <Box height={60} />
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={classes.input}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    variant="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={classes.input}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setIsPasswordVisible(prev => !prev)}
                          >
                            {isPasswordVisible ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item>
                  <Box height={40} />
                </Grid>
              </Grid>
              {buttons.map(btn => (
                <MyZoom isVisible={btn.isVisible} key={btn.text}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={btn.clickHandler(client)}
                  >
                    {btn.text}
                  </Button>
                </MyZoom>
              ))}
            </form>
          </Paper>
          <Button
            className={classes.switchBtn}
            onClick={() => setIsSignIn(prev => !prev)}
          >
            {`Switch to ${isSignIn ? 'Sign Up' : 'Sign In'}`}
          </Button>
        </>
      )}
    </ApolloConsumer>
  );
};

export default Auth;
