import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useMedia } from 'react-use';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { authSelectors, authOperations } from '../redux/auth';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ThemeSwitcher from './ThemeSwitcher';
import routes from '../routes';

const MenuIcon = styled(DehazeIcon)`
  color: snow;
`;

const Nav = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media screen and (min-width: 48em) {
    padding: 1.4rem 2.4rem;
  }

  @media screen and (min-width: 64em) {
    padding: 2rem 4rem;
  }
`;

const LinkContainer = styled.div`
  justify-self: flex-end;
  padding-left: 1rem;

  @media screen and (min-width: 48em) {
    padding-left: 2rem;
  }
`;

const NavItem = styled(NavLink).attrs(props => ({
  activeClassName: props.activeClassName || 'activeLink',
  activeStyle: {
    color: 'tomato',
  },
}))`
  font-size: 2.4rem;
  font-family: 'Philosopher', sans-serif;
  font-weight: 500;
  text-decoration: none;
  color: ${props => props.color};
  transition: color 0.2s linear;

  &:hover {
    color: #4a70f7;
  }

  @media screen and (min-width: 64em) {
    font-size: 2.6rem;
  }
`;

const DesktopNavItem = styled(NavItem)`
  &:not(:first-of-type) {
    margin-left: 2rem;
  }
`;

const MobileButtom = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 4rem;
  height: 4rem;
  background-color: #4a69cf;
  margin-left: 2rem;
  border: none;
  border-radius: 0.4rem;

  &:hover,
  &:focus,
  &:active {
    background-color: #404fff;
    color: snow;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    outline: none;
  }
`;

const MobileNav = styled.nav`
  position: absolute;
  display: none;
   z-index: 100;
  top: 4rem;
  right: 0;

  ${MobileButtom}:hover & ,
  ${MobileButtom}:focus & {
    display: flex;
    flex-direction: column;
  }
`;

const MobileNavItem = styled(NavItem)`
  min-width: 14rem;
  padding: 1rem;
  color: #333333;
  text-align: center;
  margin-left: none;
  background: ${props => props.background};
  color: ${props => props.color};

  &:hover,
  &:focus {
    background: linear-gradient(90deg, #41e06e 0%, #91ffb1 50%, #41e06e 100%);
  }
`;

const MobileLogOut = styled.p`
  font-size: 2.4rem;
  font-family: 'Philosopher', sans-serif;
  font-weight: 500;
  text-decoration: none;
  color: ${props => props.color};
  transition: color 0.2s linear;
  min-width: 14rem;
  padding: 1rem;
  color: #333333;
  cursor: pointer;
  text-align: center;
  margin-left: none;
  background: ${props => props.background};
  color: ${props => props.color};

  &:hover,
  &:focus {
    color: #4a70f7;
    background: linear-gradient(90deg, #41e06e 0%, #91ffb1 50%, #41e06e 100%);
  }

  @media screen and (min-width: 64em) {
    font-size: 2.6rem;
  }
`;

const User = styled.div`
  min-width: 14rem;
  width: 18rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  background: ${props => props.background};
  border: 0.3rem tomato solid;
`;

const UserInfo = styled.span`
  display: inline-block;
  text-align: end;
  max-width: 10rem;
  padding: 0 1rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.color};
`;

const Avatar = styled.img.attrs({
  alt: '',
})`
  display: inline-block;
  width: 5rem;
  padding: 1 0.3rem;
`;

function Navigation() {
  const theme = useContext(ContextOfTheme);
  const name = useSelector(authSelectors.getUserName);
  const avatar =
    'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg';
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authOperations.logOut());
  const mobile = useMedia('(max-width: 30em)');
  const tablet = useMedia('(min-width: 30em) and (max-width: 48em)');
  const desktop = useMedia('(min-width: 48em)');

  const forAll = routes.filter(route => !route.private && !route.restricted);
  const publicOnly = routes.filter(route => !route.private && route.restricted);
  const privateOnly = routes.filter(route => route.private);
  return (
    <Nav>
      {forAll.map(route => (
        <DesktopNavItem
          exact={route.exact}
          key={route.label}
          to={route.path}
          color={theme.config.messageColor}
        >
          {route.label}
        </DesktopNavItem>
      ))}

      {mobile && (
        <>
          <ThemeSwitcher />
          <MobileButtom>
            <MenuIcon fontSize="large" />
            <MobileNav>
              {isAuthenticated && (
                <User
                  background={theme.config.mobileMenu}
                  color={theme.config.messageColor}
                >
                  <Avatar src={avatar} />
                  <UserInfo color={theme.config.messageColor}>
                    Welcome, {name}
                  </UserInfo>
                </User>
              )}
              {isAuthenticated &&
                privateOnly.map(route => (
                  <MobileNavItem
                    exact={route.exact}
                    key={route.label}
                    to={route.path}
                    background={theme.config.mobileMenu}
                    color={theme.config.messageColor}
                  >
                    {route.label}
                  </MobileNavItem>
                ))}
              {isAuthenticated && (
                <MobileLogOut
                  onClick={onLogout}
                  background={theme.config.mobileMenu}
                  color={theme.config.messageColor}
                >
                  Logout
                </MobileLogOut>
              )}
              {!isAuthenticated &&
                publicOnly.map(route => (
                  <MobileNavItem
                    exact={route.exact}
                    key={route.label}
                    to={route.path}
                    background={theme.config.mobileMenu}
                    color={theme.config.messageColor}
                  >
                    {route.label}
                  </MobileNavItem>
                ))}
            </MobileNav>
          </MobileButtom>
        </>
      )}
      {tablet && (
        <>
          <ThemeSwitcher />
          <MobileButtom>
            <MenuIcon fontSize="large" />
            <MobileNav>
              {isAuthenticated &&
                privateOnly.map(route => (
                  <MobileNavItem
                    exact={route.exact}
                    key={route.label}
                    to={route.path}
                    background={theme.config.mobileMenu}
                    color={theme.config.messageColor}
                  >
                    {route.label}
                  </MobileNavItem>
                ))}
              {isAuthenticated && (
                <MobileLogOut
                  onClick={onLogout}
                  background={theme.config.mobileMenu}
                  color={theme.config.messageColor}
                >
                  Logout
                </MobileLogOut>
              )}
              {!isAuthenticated &&
                publicOnly.map(route => (
                  <MobileNavItem
                    exact={route.exact}
                    key={route.label}
                    to={route.path}
                    background={theme.config.mobileMenu}
                    color={theme.config.messageColor}
                  >
                    {route.label}
                  </MobileNavItem>
                ))}
            </MobileNav>
          </MobileButtom>
        </>
      )}
      {desktop && (
        <>
          {isAuthenticated &&
            privateOnly.map(route => (
              <DesktopNavItem
                exact={route.exact}
                key={route.label}
                to={route.path}
                color={theme.config.messageColor}
              >
                {route.label}
              </DesktopNavItem>
            ))}
          <ThemeSwitcher />
          {!isAuthenticated && (
            <LinkContainer>
              {publicOnly.map(route => (
                <DesktopNavItem
                  exact={route.exact}
                  key={route.label}
                  to={route.path}
                  color={theme.config.messageColor}
                >
                  {route.label}
                </DesktopNavItem>
              ))}
            </LinkContainer>
          )}
        </>
      )}
    </Nav>
  );
}

export default Navigation;
