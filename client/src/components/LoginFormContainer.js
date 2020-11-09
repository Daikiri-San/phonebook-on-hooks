import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { authOperations, authSelectors } from '../redux/auth';
import LoginForm from './LoginForm';

let AnimationStartID;
let AnimationEndID;

function RegisterFormContainer() {
  const theme = useContext(ContextOfTheme);
  const hasError = useSelector(authSelectors.getError);
  const dispatch = useDispatch();
  const [apearNotice, setApearNotice] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(AnimationStartID);
      clearTimeout(AnimationEndID);
    };
  }, []);

  const logIn = async (email, password) => {
    const checkedPassword = password.length !== 0;
    if (!checkedPassword) {
      setNotice('Hey! You need to enter the password :)');
      setApearNotice(true);

      return setTimeout(() => setApearNotice(false), 2400);
    }
    const user = {
      email,
      password,
    };
    errorOnLog();
    dispatch(authOperations.logIn(user));
  };

  const errorOnLog = () => {
    AnimationStartID = setTimeout(() => setApearNotice(true), 1000);
    AnimationEndID = setTimeout(() => setApearNotice(false), 5000);
  };

  return (
    <LoginForm
      theme={theme}
      logIn={logIn}
      hasError={hasError}
      apearNotice={apearNotice}
      notice={notice}
    />
  );
}

export default RegisterFormContainer;
