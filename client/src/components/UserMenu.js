import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { authSelectors, authOperations } from '../redux/auth';
import { ContextOfTheme } from '../contexts/ThemeContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-right: 2rem;
`;

const Avatar = styled.img.attrs({
  alt: '',
})`
  display: none;
  margin-right: 0.4rem;
  width: 5rem;
  height: auto;

  @media screen and (min-width: 30em) {
    display: inline-block;
  }
`;

const User = styled.span`
  display: none;
  max-width: 20rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color};

  @media screen and (min-width: 30em) {
    display: inline-block;
  }
`;

const Button = styled.button`
  display: none;
  font-size: 1.8rem;
  width: 14rem;
  padding: 1rem;
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
    display: block;
  }
`;

const UserMenu = () => {
  const theme = useContext(ContextOfTheme);
  const name = useSelector(authSelectors.getUserName);
  const avatar =
    'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg';
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authOperations.logOut());

  return (
    <Container>
      <Avatar src={avatar} />
      <User color={theme.config.messageColor}>Welcome, {name}</User>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={onLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserMenu;
