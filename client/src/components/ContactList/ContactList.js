import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TextNotification from '../TextNotification';
import ListItem from './ListItemContainer';
import slideItemTransition from '../transitions/slideItem.module.css';
import slideListTransition from '../transitions/slideList.module.css';

const Container = styled.div`
  margin: 0 auto;
  max-width: 44rem;
  padding-bottom: 2rem;

  @media screen and (min-width: 60em) {
    max-width: 48rem;
  }
`;

const AlternativeContainer = styled(Container)`
  margin-top: 8rem;

  @media screen and (min-width: 48em) {
    margin-top: 0;
  }
`;

const List = styled.ul`
  margin-bottom: 3rem;
`;

function ContactList({ contacts, visibleContacts }) {
  return (
    <>
      {contacts.length < 2 ? (
        <AlternativeContainer>
          <CSSTransition
            timeout={500}
            classNames={{ ...slideListTransition }}
            in={true}
            appear
          >
            <TransitionGroup component={List}>
              {visibleContacts.map(({ _id, name, phone }) => {
                console.log(_id);
                return (
                  <CSSTransition
                    key={_id}
                    timeout={250}
                    classNames={slideItemTransition}
                  >
                    <ListItem id={_id} name={name} phone={phone} />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </CSSTransition>
          {contacts.length === 0 && (
            <TextNotification message={'You have no contacts. Add some :)'} />
          )}
          {contacts.length > 1 && visibleContacts.length === 0 && (
            <TextNotification message={'No contacts found :('} />
          )}
        </AlternativeContainer>
      ) : (
        <Container>
          <CSSTransition
            timeout={500}
            classNames={{ ...slideListTransition }}
            in={true}
            appear
          >
            <TransitionGroup component={List}>
              {visibleContacts.map(({ _id, name, phone }) => (
                <CSSTransition
                  key={_id}
                  timeout={250}
                  classNames={slideItemTransition}
                >
                  <ListItem id={_id} name={name} phone={phone} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </CSSTransition>
          {contacts.length === 0 && (
            <TextNotification message={'You have no contacts. Add some :)'} />
          )}
          {contacts.length > 1 && visibleContacts.length === 0 && (
            <TextNotification message={'No contacts found :('} />
          )}
        </Container>
      )}
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.array,
  ]),
};

export default ContactList;
