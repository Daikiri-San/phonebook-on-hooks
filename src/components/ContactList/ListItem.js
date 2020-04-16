import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const Item = styled.li`
  box-shadow: ${props => props.shadow};
  padding: 1rem 1.4rem;
  border-radius: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  background-color: snow;
  margin-bottom: 0.6rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (min-width: 30em) {
    padding: 1.2rem 1.4rem;
  }

  @media screen and (min-width: 48em) {
    padding: 1.4rem 1.6rem;
  }
`;

const Name = styled.p`
  font-size: 1.8rem;
  flex-basis: 48%;
  font-weight: 500;

  @media screen and (min-width: 30em) {
    flex-basis: 50%;
  }

  @media screen and (min-width: 48em) {
    font-size: 2rem;
    flex-basis: 52%;
  }
`;

const Number = styled.p`
  font-size: 1.6rem;
  flex-basis: 34%;
  font-weight: 500;

  @media screen and (min-width: 48em) {
    font-size: 1.8rem;
    flex-basis: 36%;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 3rem;
  margin-left: 0.4rem;
  max-width: 4rem;
  min-width: 4rem;
  max-height: 4rem;
  min-height: 4rem;
  border-radius: 0.8rem;
  background-color: #e82a2a;
  cursor: pointer;
  color: snow;
  transition: all 0.4s ease;

  &:hover,
  &:focus {
    background-color: #b80000;
    outline: none;
    transform: rotate(0.5turn);
  }

  &:active {
    background-color: #ff8080;
  }
`;

function ListItem({ contact, onRemoveContact, theme }) {
  const name = contact ? contact.name : '';
  const number = contact ? contact.number : '';
  let viewName;
  let viewNumber;
  if (name) {
    viewName = name.length > 12 ? `${name.slice(0, 12)}...` : name;
  }
  if (number) {
    viewNumber = number.length > 17 ? `${number.slice(0, 17)}...` : number;
  }

  return (
    <Item shadow={theme.config.mainShadowBox}>
      <Name>{viewName}</Name> <Number>{viewNumber}</Number>
      <Button type="button" onClick={onRemoveContact}>
        <CloseIcon fontSize="large" />{' '}
      </Button>
    </Item>
  );
}

export default ListItem;
