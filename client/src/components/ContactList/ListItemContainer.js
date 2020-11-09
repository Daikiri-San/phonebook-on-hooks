import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { contactsOperations } from '../../redux/contacts';
import { ContextOfTheme } from '../../contexts/ThemeContext';
import ListItem from './ListItem';

function ContactItemContainer({ id, name, phone }) {
  const theme = useContext(ContextOfTheme);

  const dispatch = useDispatch();
  const onRemoveContact = () => dispatch(contactsOperations.removeContact(id));
  return (
    <ListItem
      theme={theme}
      name={name}
      phone={phone}
      onRemoveContact={onRemoveContact}
    />
  );
}

export default ContactItemContainer;
