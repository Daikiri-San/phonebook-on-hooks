import React, { useContext } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authOperations } from '../redux/auth';
import { ContextOfTheme } from '../contexts/ThemeContext';
import Modal from './Modals/ModalDelete';

const Container = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  border-radius: 6%;
  box-shadow: ${props => props.shadow};
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: snow;
`;

const Avatar = styled.img.attrs({
  alt: '',
})`
  max-width: 70%;
  height: auto;
  margin-bottom: 2rem;

  @media screen and (min-width: 30em) {
    margin-bottom: 3rem;
  }
`;

const User = styled.span`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  color: #333333;

  &:last-of-type {
    margin-bottom: 3rem;
  }

  @media screen and (min-width: 30em) {
    font-size: 2.4rem;

    &:last-of-type {
      margin-bottom: 3.6rem;
    }
  }
`;

const Profile = () => {
  const theme = useContext(ContextOfTheme);
  const name = useSelector(authSelectors.getUserName);
  const email = useSelector(authSelectors.getUserEmail);
  const avatar =
    'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg';
  const dispatch = useDispatch();
  const onDelete = () => dispatch(authOperations.deleteCurrentUser());
  return (
    <Container shadow={theme.config.mainShadowBox}>
      <Avatar src={avatar} />
      <User>{name}</User>
      <User>{email}</User>
      <Modal onAccept={onDelete} text="Delete Account" />
    </Container>
  );
};

export default Profile;
