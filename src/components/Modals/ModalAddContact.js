import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { Modal } from '@material-ui/core';
import { Formik } from 'formik';
import { ContextOfTheme } from '../../contexts/ThemeContext';

const ModalContainer = styled.div`
  border-radius: 2rem;
  background-color: #dae3ff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
`;

const ButtonAdd = styled.button`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  position: absolute;
  top: -5rem;
  left: 1rem;
  width: 12rem;
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
    padding: 1.4rem;
  }

  @media screen and (min-width: 48em) {
    top: 1rem;
    left: -11rem;
    font-size: 1.8rem;
    width: 14rem;
    padding: 1.6rem;
  }

  @media screen and (min-width: 60em) {
    left: -13rem;
  }
`;

const CloseButton = styled.button`
  display: inline-block;
  margin-left: auto;
  border: none;
  font-size: 3rem;
  border-top-right-radius: 2rem;
  border-bottom-left-radius: 1rem;
  flex-basis: 8%;
  height: 3.8rem;
  width: 3.8rem;
  background-color: #e82a2a;
  cursor: pointer;
  color: snow;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: #b80000;
    outline: none;
  }

  &:active {
    background-color: #ff8080;
  }
`;

const Form = styled.form`
  width: 28rem;
  padding: 0 2rem 2rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: #dae3ff;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;

  @media screen and (min-width: 26em) {
    width: 34rem;
  }

  @media screen and (min-width: 30em) {
    padding: 0 2.6rem 2.6rem;
    width: 40rem;
  }

  @media screen and (min-width: 48em) {
    padding: 0 3.6rem 2.6rem;
    width: 46rem;
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

const ModalButtonAdd = styled(ButtonAdd)`
  position: static;
  margin: 0 auto;
`;

const ErrorText = styled.div`
  position: absolute;
  top: 6rem;
  color: red;
  font-size: 1.4rem;

  @media screen and (min-width: 30em) {
    top: 6.4rem;
    font-size: 1.6rem;
  }

  @media screen and (min-width: 48em) {
    top: 6.8rem;
  }
`;

function ModalWindow({ text, onAccept }) {
  const theme = useContext(ContextOfTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <ButtonAdd
        type="button"
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        {text}
      </ButtonAdd>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalContainer>
          <CloseButton onClick={handleClose}>×</CloseButton>
          <Formik
            initialValues={{ name: '', number: '' }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = <ErrorText>Name is Required</ErrorText>;
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const result = onAccept(values.name, values.number);
              setSubmitting(false);
              if (result !== false) {
                resetForm();
                handleClose();
              }
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
              <Form onSubmit={handleSubmit}>
                {errors.name ? (
                  <Label error>
                    Name
                    <Input
                      error
                      type="text"
                      name="name"
                      backGroundColor={theme.config.inputColor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                  </Label>
                ) : (
                  <Label>
                    Name
                    {touched.name ? (
                      <Input
                        isValid
                        type="text"
                        name="name"
                        backGroundColor={theme.config.inputColor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    ) : (
                      <Input
                        type="text"
                        name="name"
                        backGroundColor={theme.config.inputColor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    )}
                    {errors.name && touched.name && errors.name}
                  </Label>
                )}

                <Label>
                  Number
                  <Input
                    type="tel"
                    name="number"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                  />
                  {errors.number && touched.number && errors.number}
                </Label>
                <ModalButtonAdd type="submit" disabled={isSubmitting}>
                  Add contact
                </ModalButtonAdd>
              </Form>
            )}
          </Formik>
        </ModalContainer>
      </Modal>
    </>
  );
}

export default ModalWindow;
