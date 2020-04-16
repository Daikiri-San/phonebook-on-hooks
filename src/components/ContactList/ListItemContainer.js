import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import { ContextOfTheme } from '../../contexts/ThemeContext';
import ListItem from './ListItem';

function ContactItemContainer({ id }) {
  const theme = useContext(ContextOfTheme);
  const contact = useSelector(state =>
    contactsSelectors.getTaskById(state, id),
  );
  const dispatch = useDispatch();
  const onRemoveContact = () => dispatch(contactsOperations.removeContact(id));
  return (
    <ListItem
      contact={contact}
      theme={theme}
      onRemoveContact={onRemoveContact}
    />
  );
}

export default ContactItemContainer;
