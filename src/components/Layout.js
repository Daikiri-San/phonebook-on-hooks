import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { authSelectors } from '../redux/auth';
import AppBar from './AppBar';
import Notification from './Notification';
import Spinner from './Spinner';

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  min-width: 32rem;
  background: ${props => props.color};
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 56rem;
  padding: 0 2rem;
`;

const Layout = ({ children }) => {
  const hasError = useSelector(authSelectors.getError);
  const isLoading = useSelector(authSelectors.getLoading);
  const theme = useContext(ContextOfTheme);

  return (
    <Background color={theme.config.mainBGColor}>
      {isLoading && <Spinner />}
      {hasError && hasError.includes('401') && (
        <Notification serverError={true} apearNotice={true} />
      )}
      <AppBar />
      <Container>{children}</Container>
    </Background>
  );
};

export default Layout;
