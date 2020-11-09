import React from 'react';
import { useSelector } from 'react-redux';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import ContactList from './ContactList';

function ContactListContainer() {
  const contacts = useSelector(contactsSelectors.getContacts);
  const visibleContacts = useSelector(contactsSelectors.getVisibleContacts);
  return <ContactList contacts={contacts} visibleContacts={visibleContacts} />;
}

export default ContactListContainer;
