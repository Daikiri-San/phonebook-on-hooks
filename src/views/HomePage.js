import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { authSelectors } from '../redux/auth';
import routesPaths from '../routesPaths';

const Container = styled.div`
  margin: 0 auto;
  max-width: 70rem;
  text-align: center;
`;

const Greetings = styled.p`
  display: inline-block;
  font-family: 'Philosopher', sans-serif;
  font-size: 2.2rem;
  color: ${props => props.color};

  @media screen and (min-width: 30em) {
    font-size: 3rem;
  }

  @media screen and (min-width: 48em) {
    font-size: 3.4rem;
  }

  @media screen and (min-width: 64em) {
    font-size: 4rem;
  }
`;

const MyLink = styled(Link)`
  color: ${props => props.color};
  transition: color 0.2s linear;

  &:hover,
  &:focus {
    color: tomato;
  }

  &:active {
    color: red;
  }
`;

const HomePage = () => {
  const theme = useContext(ContextOfTheme);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  return (
    <Container>
      <Greetings color={theme.config.messageColor}>
        Hi there! At this App you can create your own online Phonebook and use
        it! :) To begin you need to click
      </Greetings>
      {isAuthenticated ? (
        <Greetings color={theme.config.messageColor}>
          {' '}
          <MyLink to={routesPaths.contacts} color={theme.config.linkColor}>
            Contacts
          </MyLink>{' '}
          and start using it!
        </Greetings>
      ) : (
        <Greetings color={theme.config.messageColor}>
          {' '}
          <MyLink to={routesPaths.register} color={theme.config.linkColor}>
            Sign up
          </MyLink>{' '}
          or{' '}
          <MyLink to={routesPaths.login} color={theme.config.linkColor}>
            Login
          </MyLink>
        </Greetings>
      )}
    </Container>
  );
};

export default HomePage;
