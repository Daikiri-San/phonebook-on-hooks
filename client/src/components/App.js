import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import routes from '../routes';
import routesPaths from '../routesPaths';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout from './Layout';
import Spinner from './Spinner';
import '../base.css';

function App() {
  const globalRoutes = routes.filter(
    route => !route.restricted && !route.private,
  );
  const specificRoutes = routes.filter(
    route => route.restricted || route.private,
  );
  return (
    <ThemeContext>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {globalRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
            {specificRoutes.map(route =>
              route.private ? (
                <PrivateRoute key={route.path} {...route} />
              ) : (
                <PublicRoute key={route.path} {...route} />
              ),
            )}
            <Redirect to={routesPaths.home} />
          </Switch>
        </Suspense>
      </Layout>
    </ThemeContext>
  );
}

export default App;
