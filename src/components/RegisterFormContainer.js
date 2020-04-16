import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { authOperations, authSelectors } from '../redux/auth';
import RegisterForm from './RegisterForm';

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

  const register = (name, email, password) => {
    const checkedPassword = password.length >= 7;
    if (!checkedPassword) {
      setNotice('Hey! Password need to be longer than 7 symbols :)');
      setApearNotice(true);
      return setTimeout(() => setApearNotice(false), 2400);
    }
    const newUser = {
      name,
      email,
      password,
    };
    errorOnLog();
    dispatch(authOperations.register(newUser));
  };

  const errorOnLog = () => {
    AnimationStartID = setTimeout(() => setApearNotice(true), 1000);
    AnimationEndID = setTimeout(() => setApearNotice(false), 5600);
  };

  return (
    <RegisterForm
      theme={theme}
      hasError={hasError}
      registrate={register}
      apearNotice={apearNotice}
      notice={notice}
    />
  );
}

export default RegisterFormContainer;
