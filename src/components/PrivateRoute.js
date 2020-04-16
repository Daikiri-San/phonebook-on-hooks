import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth';
import routesPaths from '../routesPaths';

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={routesPaths.login} />
        )
      }
    />
  );
};

export default PrivateRoute;
