import React, { useContext } from 'react';
import styled from 'styled-components';
import { ContextOfTheme } from '../contexts/ThemeContext';

const Text = styled.p`
  font-size: 2.4rem;
  color: ${props => props.color};

  @media screen and (min-width: 48em) {
    font-size: 3rem;
  }
`;

const TextNotification = ({ message }) => {
  const theme = useContext(ContextOfTheme);
  return <Text color={theme.config.messageColor}>{message}</Text>;
};

export default TextNotification;
