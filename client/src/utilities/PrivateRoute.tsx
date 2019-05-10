import React, { useContext } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import AuthContext from '../context/authContext';

interface PrivateRouteProps {
  component: React.FC<RouteComponentProps>;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const { token } = useContext(AuthContext);
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};

export default PrivateRoute;
