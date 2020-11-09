import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import slideNoticeTransition from './transitions/slideNotice.module.css';

const Container = styled.div`
  background-color: red;
  border-radius: 0.8rem;
  max-width: 26rem;
  position: fixed;
  top: 8rem;
  right: 0;
  z-index: 4000;
`;

const Text = styled.p`
  display: inline-block;
  margin: 0 auto;
  color: snow;
  padding: 1.4rem;
  font-size: 1.8rem;

  @media screen and (min-width: 30em) {
    font-size: 2rem;
  }

  @media screen and (min-width: 48em) {
    font-size: 2.2rem;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.6rem;
  width: 14rem;
  margin: 0 auto 1rem;
  padding: 1rem 1.2rem;
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

  @media screen and (min-width: 48em) {
    font-size: 1.8rem;
    width: 17rem;
  }
`;

function Notification({ message, apearNotice, serverError }) {
  const reboot = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <CSSTransition
      timeout={250}
      classNames={slideNoticeTransition}
      in={apearNotice}
      unmountOnExit
    >
      <Container>
        {message && <Text>{message}</Text>}
        {serverError && (
          <>
            <Text>
              There are some server issue, please click on this button:
            </Text>{' '}
            <Button onClick={reboot}>Full Reboot Page</Button>{' '}
          </>
        )}
      </Container>
    </CSSTransition>
  );
}

export default Notification;
