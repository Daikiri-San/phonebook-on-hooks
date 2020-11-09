import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import App from './App';

function AppContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return <App />;
}

export default AppContainer;
