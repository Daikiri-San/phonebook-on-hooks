import React from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import routesPaths from '../routesPaths';
import Notification from './Notification';

const Form = styled.form`
  margin: 0 auto 3.4rem;
  max-width: 46rem;
  box-shadow: ${props => props.shadow};
  border-radius: 6%;
  padding: 2rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: #dae3ff;

  @media screen and (min-width: 30em) {
    padding: 2.6rem 3rem;
  }

  @media screen and (min-width: 48em) {
    padding: 3.6rem;
  }
`;

const Label = styled.label`
  position: relative;
  font-size: 1.8rem;
  font-family: 'Philosopher', sans-serif;
  transition: all 0.1s linear;
  cursor: pointer;
  ${props =>
    props.error &&
    css`
      color: red;
    `}

  @media screen and (min-width: 30em) {
    font-size: 2rem;
  }

  @media screen and (min-width: 48em) {
    font-size: 2.2rem;
  }
`;

const Input = styled.input`
  outline: none;
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 1.6rem;
  padding: 1rem;
  border-radius: 3rem;
  border: 0.2rem solid snow;
  background-color: snow;

  &:focus {
    border-color: #1d2bcc;
  }

  ${props =>
    props.isValid &&
    css`
      border: 0.2rem solid lightgreen;
    `}
  ${props =>
    props.error &&
    css`
      border: 0.2rem solid red;
    `}

    @media screen and (min-width: 30em) {
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
    padding: 1.2rem 1.4rem 1rem;
  }

  @media screen and (min-width: 48em) {
    margin-bottom: 2rem;
    padding: 1.2rem 1.6rem 1rem;
  }
`;

const Button = styled.button`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 auto;
  width: 10rem;
  padding: 1.4rem;
  border: none;
  border-radius: 1rem;
  background-color: #4a69cf;
  cursor: pointer;
  color: snow;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: #404fff;
    color: snow;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    outline: none;
  }

  &:active {
    background-color: #7883ff;
  }

  @media screen and (min-width: 30em) {
    width: 12rem;
    padding: 1.4rem;
  }

  @media screen and (min-width: 48em) {
    font-size: 1.8rem;
    width: 14rem;
    padding: 1.6rem;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  top: 6rem;
  color: red;
  font-size: 1.4rem;

  @media screen and (min-width: 30em) {
    top: 6.8rem;
    font-size: 1.6rem;
  }

  @media screen and (min-width: 48em) {
    top: 7.2rem;
  }
`;

const MyLink = styled(Link)`
  color: #1d2bcc;
  transition: color 0.2s linear;
  font-size: 2rem;
  font-family: 'Philosopher', sans-serif;

  &:hover,
  &:focus {
    color: tomato;
  }

  &:active {
    color: red;
  }

  @media screen and (min-width: 48em) {
    font-size: 2.2rem;
  }
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin: 1.2rem auto 0;

  @media screen and (min-width: 48em) {
    margin: 2rem auto 0;
  }
`;

function LoginForm({ notice, apearNotice, theme, logIn, hasError }) {
  return (
    <>
      <Notification message={notice} apearNotice={apearNotice} />
      {hasError && hasError.includes('400') && (
        <Notification
          message="Sorry, but it seems that email or password was written incorrect 😞"
          apearNotice={apearNotice}
        />
      )}
      {hasError && hasError.includes('401') && (
        <Notification serverError={true} apearNotice={true} />
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = <ErrorText>Email is Required</ErrorText>;
          }
          if (values.email && !values.email.includes('@')) {
            errors.email = (
              <ErrorText>Email needs to include "@" symbol</ErrorText>
            );
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          logIn(values.email, values.password);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} shadow={theme.config.mainShadowBox}>
            {errors.email && touched.email ? (
              <Label error>
                Email
                <Input
                  error
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </Label>
            ) : (
              <Label>
                Email
                {touched.email ? (
                  <Input
                    isValid
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                ) : (
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                )}
                {errors.email && touched.email && errors.email}
              </Label>
            )}

            <Label>
              Password
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Label>

            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
            <LinkContainer>
              <MyLink to={routesPaths.register}>Sign Up</MyLink>
            </LinkContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
