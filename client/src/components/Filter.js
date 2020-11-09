import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import scaleTransition from './transitions/scale.module.css';

const Container = styled.div`
  border-radius: 2.2rem;
  margin: 0 auto 2.6rem;
  margin-top: 8rem;
  max-width: 44rem;
  box-shadow: ${props => props.shadow};
  padding: 1rem 1.4rem;
  background-color: #dae3ff;

  @media screen and (min-width: 30em) {
    padding: 1.4rem 2rem;
  }

  @media screen and (min-width: 48em) {
    margin-top: 0;
  }

  @media screen and (min-width: 60em) {
    padding: 2rem;
    max-width: 48rem;
  }
`;

const Label = styled.label`
  font-size: 1.8rem;
  font-weight: 500;
  font-family: 'Philosopher', sans-serif;
  cursor: pointer;

  @media screen and (min-width: 30em) {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  outline: none;
  font-size: 1.8rem;
  width: 100%;
  margin-top: 0.1rem;
  padding: 1rem;
  border-radius: 3rem;
  border: 0.2rem solid snow;
  background-color: ${props => props.backGroundColor};

  &:focus {
    border-color: #1d2bcc;
  }

  @media screen and (min-width: 30em) {
    font-size: 1.8rem;
    padding: 1.2rem 1.4rem 1rem;
  }
  @media screen and (min-width: 48em) {
    padding: 1.2rem 1.6rem 1rem;
  }
`;

function Filter({ value, onChangeFilter, theme, appear }) {
  return (
    <CSSTransition
      timeout={250}
      classNames={scaleTransition}
      in={appear}
      unmountOnExit
    >
      <Container shadow={theme.config.mainShadowBox}>
        <Label>
          Find contacts
          <Input
            backGroundColor={theme.config.inputColor}
            type="text"
            value={value}
            onChange={({ target: { value } }) => onChangeFilter(value)}
          />
        </Label>
      </Container>
    </CSSTransition>
  );
}

export default Filter;
