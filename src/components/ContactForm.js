import React from 'react';
import styled from 'styled-components';
import Modal from './Modals/ModalAddContact';
import Notification from './Notification';

const Container = styled.div`
  position: relative;
`;

function ContactForm({ notice, apearNotice, hasError, addContact }) {
  return (
    <Container>
      <Notification message={notice} apearNotice={apearNotice} />
      {hasError && !hasError.includes('401') && (
        <Notification message={hasError} apearNotice={true} />
      )}
      {hasError && hasError.includes('401') && (
        <Notification serverError={true} apearNotice={true} />
      )}
      <Modal onAccept={addContact} text="Add Contact" />
    </Container>
  );
}

export default ContactForm;
