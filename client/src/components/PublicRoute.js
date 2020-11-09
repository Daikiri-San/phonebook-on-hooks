import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth';
import routesPaths from '../routesPaths';

const PublicRoute = ({ component: Component, ...routeProps }) => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  return (
    <Route
      {...routeProps}
      render={props =>
        !isAuthenticated && routeProps.restricted ? (
          <Component {...props} />
        ) : (
          <Redirect to={routesPaths.contacts} />
        )
      }
    />
  );
};

export default PublicRoute;
