import React, { useContext } from 'react';
import styled from 'styled-components';
import { ContextOfTheme } from '../contexts/ThemeContext';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const SwitchThemeItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const MySunIcon = styled(Brightness5Icon)`
  position: absolute;
  left: 2.3rem;
  color: #ffe100;
  top: -1.1rem;
  z-index: 20;
  transition: all 0.2s linear;
  pointer-events: none;
`;

const MyDarkIcon = styled(Brightness4Icon)`
  position: absolute;
  left: 4.6rem;
  top: -1.1rem;
  z-index: 20;
  transition: all 0.2s linear;
  pointer-events: none;
`;

const LabelOfSwitch = styled.span`
  position: relative;
  padding: 0 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${props => props.color};

  @media screen and (min-width: 30em) {
    font-size: 2rem;
  }
  @media screen and (min-width: 48em) {
    font-size: 2.4rem;
  }
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 3rem;
`;

const Input = styled.input`
  display: none;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 2.2rem;
    width: 2.2rem;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + &:before {
    transform: translateX(2rem);
  }
`;

const ThemeSwitcher = () => {
  const theme = useContext(ContextOfTheme);

  return (
    <SwitchThemeItem>
      <LabelOfSwitch color={theme.config.contentColor}>
        {theme.theme === 'light' ? (
          <MySunIcon fontSize="large" />
        ) : (
          <MyDarkIcon color="primary" fontSize="large" />
        )}
      </LabelOfSwitch>
      <Label>
        <Input
          type="checkbox"
          checked={theme.theme === 'light'}
          onChange={theme.toggleTheme}
        />
        <Slider />
      </Label>
    </SwitchThemeItem>
  );
};

export default ThemeSwitcher;
