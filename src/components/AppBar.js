import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { authSelectors } from '../redux/auth';
import UserMenu from './UserMenu';
import Navigation from './Navigation';

const Header = styled.header`
  width: 100%;
  box-shadow: ${props => props.shadow};
  background: ${props => props.backgroundColor};
  margin-bottom: 2rem;
  display: flex;

  @media screen and (min-width: 30em) {
    margin-bottom: 3rem;
  }

  @media screen and (min-width: 48em) {
    margin-bottom: 4rem;
  }

  @media screen and (min-width: 64em) {
    margin-bottom: 6rem;
  }
`;

const Appbar = () => {
  const theme = useContext(ContextOfTheme);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const isLoading = useSelector(authSelectors.getLoading);
  return (
    <Header
      shadow={theme.config.mainShadowBox}
      backgroundColor={theme.config.headerBGColor}
    >
      <Navigation />
      {isAuthenticated && !isLoading && <UserMenu />}
    </Header>
  );
};

export default Appbar;
